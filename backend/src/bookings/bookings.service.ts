import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { PaginationDto, paginate } from '../common/dto/pagination.dto';

import { InventoryLockerService } from '../inventory/inventory-locker.service';

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly lockerService: InventoryLockerService,
  ) {}

  async create(dto: CreateBookingDto, userId?: string) {
    // Generate premium booking reference EVS-XXXXXX
    const bookingReference = `EVS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Use a transaction to atomically decrement seats and create the booking
    return this.prisma.$transaction(async (tx) => {
      // Use Postgres FOR UPDATE to lock the row and prevent race conditions
      const events = await tx.$queryRaw<any[]>`
        SELECT id, status, "availableSeats", "pricePerHead" 
        FROM events 
        WHERE id = ${dto.eventId} 
        FOR UPDATE
      `;

      if (!events || events.length === 0) {
        throw new NotFoundException({
          code: 'EVENT_NOT_FOUND',
          message: 'Event not found',
        });
      }
      
      const event = events[0];
      if (event.status !== 'PUBLISHED') {
        throw new BadRequestException({
          code: 'EVENT_NOT_AVAILABLE',
          message: 'Event is not accepting bookings',
        });
      }
      if (event.availableSeats < dto.quantity) {
        throw new BadRequestException({
          code: 'INSUFFICIENT_SEATS',
          message: `Only ${event.availableSeats} seat(s) available`,
        });
      }

      const pricePerHead = event.pricePerHead ?? 0;
      let totalAmount = pricePerHead * dto.quantity;
      let stayPackageAmount = 0;

      if (dto.stayPackageId && dto.stayPackageQuantity) {
        // Lock the stay package row
        const packages = await tx.$queryRaw<any[]>`
          SELECT id, price, "availableRooms" 
          FROM stay_packages 
          WHERE id = ${dto.stayPackageId} AND "eventId" = ${dto.eventId}
          FOR UPDATE
        `;
        if (!packages || packages.length === 0) {
          throw new NotFoundException({
            code: 'STAY_PACKAGE_NOT_FOUND',
            message: 'Stay package not found for this event',
          });
        }
        const stayPackage = packages[0];
        if (stayPackage.availableRooms < dto.stayPackageQuantity) {
          throw new BadRequestException({
            code: 'INSUFFICIENT_ROOMS',
            message: `Only ${stayPackage.availableRooms} room(s) available`,
          });
        }
        // Verify the hold exists and belongs to the user
        if (dto.stayPackageHoldId) {
          const isValidHold = await this.lockerService.verifyHold(
            dto.stayPackageHoldId, 
            dto.stayPackageId, 
            dto.stayPackageQuantity, 
            userId || dto.guestSessionId || 'anonymous'
          );
          if (!isValidHold) {
            throw new BadRequestException({
              code: 'INVALID_OR_EXPIRED_HOLD',
              message: 'The inventory hold is invalid or has expired',
            });
          }
        } else {
          // In a fully strict system, we could mandate a holdId.
          // For now, if no holdId is provided, we just rely on standard FOR UPDATE locking.
        }

        stayPackageAmount = stayPackage.price * dto.stayPackageQuantity;
        totalAmount += stayPackageAmount;

        // Remove the decrement logic. It will be handled upon Payment verification
        // (confirmBooking method) in Phase 7.
      }

      const booking = await tx.booking.create({
        data: {
          userId: userId || null,
          guestName: dto.guestName,
          guestEmail: dto.guestEmail,
          guestPhone: dto.guestPhone,
          guestCountry: dto.guestCountry,
          eventId: dto.eventId,
          quantity: dto.quantity,
          stayPackageId: dto.stayPackageId,
          stayPackageQuantity: dto.stayPackageQuantity ?? 0,
          holdId: dto.stayPackageHoldId,
          totalAmount,
          notes: dto.notes,
          status: 'PENDING',
          bookingReference,
        },
        include: {
          event: { select: { id: true, title: true, startDate: true, slug: true, featuredImage: true } },
          stayPackage: { select: { id: true, name: true } },
        },
      });

      // Removed event availableSeats decrement logic here. It will be handled 
      // in confirmBooking.
      
      // Removed lockerService.releaseHold here. Hold will be verified and released
      // when payment is successful.

      return booking;
    });
  }

  async findAllForUser(userId: string, query: PaginationDto) {
    const { page = 1, limit = 20 } = query;
    const [total, bookings] = await this.prisma.$transaction([
      this.prisma.booking.count({ where: { userId } }),
      this.prisma.booking.findMany({
        where: { userId },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              startDate: true,
              featuredImage: true,
            },
          },
          stayPackage: {
            select: { id: true, name: true, price: true },
          },
          payments: { select: { id: true, status: true, amount: true } },
        },
      }),
    ]);
    return paginate(bookings, total, page, limit);
  }

  async findById(id: string, userId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, userId },
      include: { event: true, payments: true },
    });
    if (!booking)
      throw new NotFoundException({
        code: 'BOOKING_NOT_FOUND',
        message: 'Booking not found',
      });
    return booking;
  }

  async findByReference(reference: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { bookingReference: reference },
      include: { 
        event: { select: { id: true, title: true, startDate: true, slug: true, featuredImage: true, venue: true } },
        stayPackage: { select: { id: true, name: true, stay: true } }
      },
    });
    if (!booking)
      throw new NotFoundException({
        code: 'BOOKING_NOT_FOUND',
        message: 'Booking not found',
      });
    return booking;
  }

  async cancel(id: string, userId: string) {
    const booking = await this.prisma.booking.findFirst({
      where: { id, userId },
    });
    if (!booking)
      throw new NotFoundException({
        code: 'BOOKING_NOT_FOUND',
        message: 'Booking not found',
      });
    if (booking.status === 'CANCELLED') {
      throw new BadRequestException({
        code: 'ALREADY_CANCELLED',
        message: 'Booking is already cancelled',
      });
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.booking.update({
        where: { id },
        data: { status: 'CANCELLED' },
      });
      await tx.event.update({
        where: { id: booking.eventId },
        data: { availableSeats: { increment: booking.quantity } },
      });
      if (booking.stayPackageId && booking.stayPackageQuantity > 0) {
        await tx.stayPackage.update({
          where: { id: booking.stayPackageId },
          data: { availableRooms: { increment: booking.stayPackageQuantity } },
        });
      }
      return updated;
    });
  }

  async confirmBooking(id: string) {
    return this.prisma.$transaction(async (tx) => {
      const booking = await tx.booking.findUnique({
        where: { id },
        include: { event: true, stayPackage: true },
      });

      if (!booking) {
        throw new NotFoundException('Booking not found');
      }

      if (booking.status === 'CONFIRMED') {
        return booking; // Idempotent response
      }

      // Decrement inventory
      if (booking.stayPackageId && booking.stayPackageQuantity > 0) {
        await tx.stayPackage.update({
          where: { id: booking.stayPackageId },
          data: {
            availableRooms: { decrement: booking.stayPackageQuantity },
            bookedRooms: { increment: booking.stayPackageQuantity },
          },
        });
      }

      await tx.event.update({
        where: { id: booking.eventId },
        data: { availableSeats: { decrement: booking.quantity } },
      });

      // Release hold if exists
      if (booking.holdId) {
        await this.lockerService.releaseHold(booking.holdId);
      }

      const updated = await tx.booking.update({
        where: { id },
        data: { status: 'CONFIRMED' },
      });

      return updated;
    });
  }
}
