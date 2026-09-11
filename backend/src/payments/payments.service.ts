import { Injectable, BadRequestException, NotFoundException, Inject } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { VerifyPaymentDto } from './dto/verify-payment.dto';
import { MockPaymentProvider } from './providers/mock-payment.provider';
import { BookingsService } from '../bookings/bookings.service';
import { InventoryLockerService } from '../inventory/inventory-locker.service';

@Injectable()
export class PaymentsService {
  constructor(
    private prisma: PrismaService,
    private bookingsService: BookingsService,
    private lockerService: InventoryLockerService,
    // In a real app, you might inject IPaymentProvider based on config
    private paymentProvider: MockPaymentProvider,
  ) {}

  async createPayment(dto: CreatePaymentDto) {
    const booking = await this.prisma.booking.findUnique({
      where: { bookingReference: dto.bookingReference },
      include: { event: true, stayPackage: true },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.status !== 'PENDING') {
      throw new BadRequestException(`Booking is in ${booking.status} state, cannot initiate payment.`);
    }

    // Verify the hold is still active if there is a stayPackage
    if (booking.stayPackageId && booking.holdId) {
      const isValidHold = await this.lockerService.verifyHold(
        booking.holdId,
        booking.stayPackageId,
        booking.stayPackageQuantity,
        dto.guestSessionId || booking.userId || 'anonymous',
      );

      if (!isValidHold) {
        throw new BadRequestException({
          code: 'INVALID_OR_EXPIRED_HOLD',
          message: 'The inventory hold has expired. Please select your room quantity again.',
        });
      }
    }

    // Determine the currency. Using INR default as requested in prompt if event doesn't specify.
    // In our schema, stayPackage has currency.
    const currency = booking.stayPackage?.currency || 'INR';

    // Call the provider
    const session = await this.paymentProvider.createSession(
      booking.totalAmount,
      currency,
      booking.bookingReference,
    );

    // Create Payment record
    const payment = await this.prisma.payment.create({
      data: {
        bookingId: booking.id,
        provider: 'STRIPE', // Or whatever enum fits Mock
        providerPaymentId: session.providerPaymentId,
        amount: session.amount,
        currency: session.currency,
        status: 'PENDING',
      },
    });

    return {
      paymentId: payment.id,
      ...session,
    };
  }

  async verifyPayment(dto: VerifyPaymentDto) {
    // 1. Find Payment
    const payment = await this.prisma.payment.findUnique({
      where: { id: dto.paymentId },
      include: { booking: true },
    });

    if (!payment) {
      throw new NotFoundException('Payment record not found');
    }

    if (payment.booking.bookingReference !== dto.bookingReference) {
      throw new BadRequestException('Payment does not match the provided booking reference');
    }

    // Idempotency: if already paid, just return success
    if (payment.status === 'COMPLETED') {
      return { success: true, message: 'Payment was already processed.' };
    }

    if (!payment.providerPaymentId) {
      throw new BadRequestException('Payment record missing provider ID');
    }

    // 2. Verify with Provider
    const verification = await this.paymentProvider.verifyPayment(
      payment.providerPaymentId,
      dto.paymentToken,
    );

    if (!verification.success) {
      // Mark as FAILED
      await this.prisma.payment.update({
        where: { id: payment.id },
        data: { status: 'FAILED', metadata: verification.metadata || {} },
      });
      throw new BadRequestException('Payment verification failed');
    }

    // 3. Re-verify the Hold (Crucial: to ensure it didn't expire during payment screen)
    if (payment.booking.stayPackageId && payment.booking.holdId) {
      // Use the injected Redis client from LockerService to verify existence
      const holdRaw = await this.lockerService['redisClient'].get(`hold:${payment.booking.holdId}`);
      if (!holdRaw) {
        // The hold expired. The payment went through but we can't fulfill.
        // In a real system, we'd trigger a refund here.
        await this.prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'COMPLETED', metadata: { issue: 'Hold expired before payment completion, needs refund' } },
        });
        throw new BadRequestException('Inventory hold expired during payment. Please contact support for a refund.');
      }
    }

    // 4. Everything is good. Run the confirmation transaction!
    await this.prisma.$transaction(async (tx) => {
      // Update Payment
      await tx.payment.update({
        where: { id: payment.id },
        data: { status: 'COMPLETED', metadata: verification.metadata || {} },
      });

      await tx.booking.update({
        where: { id: payment.bookingId },
        data: { status: 'CONFIRMED' },
      });

      if (payment.booking.stayPackageId && payment.booking.stayPackageQuantity > 0) {
        await tx.stayPackage.update({
          where: { id: payment.booking.stayPackageId },
          data: {
            availableRooms: { decrement: payment.booking.stayPackageQuantity },
            bookedRooms: { increment: payment.booking.stayPackageQuantity },
          },
        });
      }

      await tx.event.update({
        where: { id: payment.booking.eventId },
        data: { availableSeats: { decrement: payment.booking.quantity } },
      });
    });

    // Release the hold outside the transaction
    if (payment.booking.holdId) {
      await this.lockerService.releaseHold(payment.booking.holdId);
    }

    return {
      success: true,
      bookingReference: payment.booking.bookingReference,
      paymentId: payment.id,
    };
  }
}
