import { api } from './api';
import type { Venue, PaginatedResponse, PaginationQuery } from '@/types/api-types';

export interface QueryVenuesParams extends PaginationQuery {
  city?: string;
}

export const venuesApi = {
  list: (params?: QueryVenuesParams, token?: string | null) => {
    const query = params ? '?' + new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';
    return api.get<PaginatedResponse<Venue>>(`/venues${query}`, token);
  },

  getById: (id: string, token?: string | null) =>
    api.get<Venue>(`/venues/${id}`, token),
};
