export interface PaymentProvider {
  createPaymentIntent(amount: number, currency: string, metadata?: any): Promise<{ clientSecret: string, providerPaymentId: string }>;
  verifyWebhookSignature(payload: any, signature: string, secret: string): any;
  refundPayment(providerPaymentId: string): Promise<boolean>;
}
