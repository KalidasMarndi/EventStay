import { api } from './api';
import type {
  Booking,
  CreateBookingDto,
  PaginatedResponse,
  PaginationQuery,
} from '@/types/api-types';

export const bookingsApi = {
  list: (params?: PaginationQuery, token?: string | null) => {
    const query = params ? '?' + new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';
    return api.get<PaginatedResponse<Booking>>(`/bookings${query}`, token);
  },

  getById: (id: string, token: string) =>
    api.get<Booking>(`/bookings/${id}`, token),

  getByReference: (reference: string) =>
    api.get<Booking>(`/bookings/reference/${reference}`),

  create: (data: CreateBookingDto, token?: string | null) =>
    api.post<Booking>('/bookings', data, token),

  cancel: (id: string, token: string) =>
    api.put<Booking>(`/bookings/${id}/cancel`, {}, token),
};
