import { Injectable } from '@nestjs/common';
import { PaymentProvider } from '../interfaces/payment-provider.interface';
import Stripe from 'stripe';

@Injectable()
export class StripeProvider implements PaymentProvider {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_mock', {
      apiVersion: '2026-07-29.dahlia', // Fixed based on compiler error
    });
  }

  async createPaymentIntent(amount: number, currency: string, metadata?: Record<string, string>) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // convert to smallest unit
      currency: currency.toLowerCase(),
      metadata,
    });
    return {
      clientSecret: paymentIntent.client_secret!,
      providerPaymentId: paymentIntent.id,
    };
  }

  verifyWebhookSignature(payload: Buffer, signature: string, secret: string) {
    return this.stripe.webhooks.constructEvent(payload, signature, secret);
  }

  async refundPayment(providerPaymentId: string) {
    const refund = await this.stripe.refunds.create({
      payment_intent: providerPaymentId,
    });
    return refund.status === 'succeeded';
  }
}
