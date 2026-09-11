import { Injectable } from '@nestjs/common';
import {
  CreatePaymentSessionResponse,
  IPaymentProvider,
  VerifyPaymentResponse,
} from './payment-provider.interface';

@Injectable()
export class MockPaymentProvider implements IPaymentProvider {
  async createSession(
    amount: number,
    currency: string,
    bookingReference: string,
    metadata?: Record<string, any>,
  ): Promise<CreatePaymentSessionResponse> {
    // Generate a mock provider payment ID
    const providerPaymentId = `MOCK_PAY_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Return mock session details
    return {
      providerPaymentId,
      clientSecret: `mock_secret_${providerPaymentId}`,
      amount,
      currency,
    };
  }

  async verifyPayment(
    providerPaymentId: string,
    paymentToken?: string, // The frontend could send "success" or "fail" as the token to simulate outcomes
  ): Promise<VerifyPaymentResponse> {
    // If the frontend explicitly sends "fail", simulate a failed payment.
    const isSuccess = paymentToken !== 'fail';

    return {
      success: isSuccess,
      providerPaymentId,
      // In a real provider, we would fetch the actual amount and currency paid.
      // For mock, we just echo back success. The service logic should handle mismatch if needed.
      amount: 0, 
      currency: '',
      metadata: { simulated: true },
    };
  }
}
