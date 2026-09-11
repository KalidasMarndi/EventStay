import { api } from './api';
import type {
  Event,
  CreateEventDto,
  UpdateEventDto,
  PaginatedResponse,
  PaginationQuery,
  EventCategory,
  EventStatus,
} from '@/types/api-types';

export interface QueryEventsParams extends PaginationQuery {
  category?: EventCategory;
  city?: string;
  status?: EventStatus;
  search?: string;
}

export const eventsApi = {
  list: (params?: QueryEventsParams, token?: string | null) => {
    const query = params ? '?' + new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';
    return api.get<PaginatedResponse<Event>>(`/events${query}`, token);
  },

  getById: (id: string, token?: string | null) =>
    api.get<Event>(`/events/${id}`, token),

  getBySlug: (slug: string, token?: string | null) =>
    api.get<Event>(`/events/slug/${slug}`, token),

  create: (data: CreateEventDto, token: string) =>
    api.post<Event>('/events', data, token),

  update: (id: string, data: UpdateEventDto, token: string) =>
    api.put<Event>(`/events/${id}`, data, token),

  delete: (id: string, token: string) =>
    api.delete<void>(`/events/${id}`, token),

  updateMicrosite: (id: string, micrositeConfig: any, token: string) =>
    api.put<Event>(`/events/${id}/microsite`, micrositeConfig, token),

  publish: (id: string, token: string) =>
    api.post<Event>(`/events/${id}/publish`, {}, token),

  unpublish: (id: string, token: string) =>
    api.post<Event>(`/events/${id}/unpublish`, {}, token),
};
