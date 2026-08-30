import { api } from './api';
import type { Stay, PaginatedResponse, PaginationQuery } from '@/types/api-types';

export interface QueryStaysParams extends PaginationQuery {
  city?: string;
  minPrice?: number;
  maxPrice?: number;
}

export const staysApi = {
  list: (params?: QueryStaysParams, token?: string | null) => {
    const query = params ? '?' + new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';
    return api.get<PaginatedResponse<Stay>>(`/stays${query}`, token);
  },

  getById: (id: string, token?: string | null) =>
    api.get<Stay>(`/stays/${id}`, token),
};
