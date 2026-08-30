import { api } from './api';
import type { PaymentSession } from '@/types/api-types';

export const paymentsApi = {
  createSession: (bookingId: string, token: string) =>
    api.post<PaymentSession>(`/payments/${bookingId}/create-session`, {}, token),
};
