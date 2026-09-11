export interface CreatePaymentSessionResponse {
  providerPaymentId: string;
  clientSecret?: string;
  paymentUrl?: string;
  amount: number;
  currency: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  providerPaymentId: string;
  amount: number;
  currency: string;
  metadata?: Record<string, any>;
}

export interface IPaymentProvider {
  createSession(
    amount: number,
    currency: string,
    bookingReference: string,
    metadata?: Record<string, any>,
  ): Promise<CreatePaymentSessionResponse>;

  verifyPayment(
    providerPaymentId: string,
    paymentToken?: string, // e.g., signature or token
  ): Promise<VerifyPaymentResponse>;
}
