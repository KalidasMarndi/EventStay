import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { StripeProvider } from './providers/stripe.provider';
import { PaymentProvider } from './interfaces/payment-provider.interface';

@Injectable()
export class PaymentsService {
  private provider: PaymentProvider;

  constructor(
    private prisma: PrismaService,
    private stripeProvider: StripeProvider,
  ) {
    // Abstracted behind interface
    this.provider = this.stripeProvider;
  }

  async createPaymentSession(bookingId: string) {
    const booking = await this.prisma.booking.findUnique({ where: { id: bookingId } });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.status !== 'PENDING') throw new BadRequestException('Booking is not pending');

    const intent = await this.provider.createPaymentIntent(
      booking.totalAmount, 
      'INR', 
      { bookingId: booking.id }
    );

    await this.prisma.payment.create({
      data: {
        bookingId: booking.id,
        amount: booking.totalAmount,
        providerPaymentId: intent.providerPaymentId,
        provider: 'STRIPE',
      },
    });

    return { clientSecret: intent.clientSecret };
  }

  async handleStripeWebhook(signature: string, payload: Buffer) {
    const secret = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_test';
    
    let event;
    try {
      event = this.provider.verifyWebhookSignature(payload, signature, secret);
    } catch (err) {
      throw new BadRequestException(`Webhook Error: ${(err as Error).message}`);
    }

    const idempotencyKey = event.request?.idempotency_key || event.id;

    // Verify Idempotency inside a transaction
    return this.prisma.$transaction(async (tx) => {
      const existingEvent = await tx.payment.findFirst({
        where: { idempotencyKey },
      });
      if (existingEvent) {
        // Already processed
        return { received: true, alreadyProcessed: true };
      }

      if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object as any;
        const providerPaymentId = paymentIntent.id;

        const payment = await tx.payment.findUnique({ where: { providerPaymentId } });
        if (payment) {
          await tx.payment.update({
            where: { id: payment.id },
            data: { status: 'COMPLETED', idempotencyKey },
          });

          await tx.booking.update({
            where: { id: payment.bookingId },
            data: { status: 'CONFIRMED' },
          });

          // Here, we would ideally enqueue a BullMQ job for email notifications.
          // BullMQ will be set up in the NotificationsModule.
        }
      }
      return { received: true };
    });
  }
}
