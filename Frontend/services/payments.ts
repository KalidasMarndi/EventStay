import { api } from './api';

export interface CreatePaymentResponse {
  paymentId: string;
  providerPaymentId: string;
  clientSecret?: string;
  paymentUrl?: string;
  amount: number;
  currency: string;
}

export interface VerifyPaymentResponse {
  success: boolean;
  bookingReference: string;
  paymentId: string;
}

export const paymentsApi = {
  create: async (data: { bookingReference: string; guestSessionId?: string }): Promise<CreatePaymentResponse> => {
    return await api.post<CreatePaymentResponse>('/payments/create', data);
  },

  verify: async (data: { bookingReference: string; paymentId: string; paymentToken?: string }): Promise<VerifyPaymentResponse> => {
    return await api.post<VerifyPaymentResponse>('/payments/verify', data);
  },
};
