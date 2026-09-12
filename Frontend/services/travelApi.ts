import { api } from './api';

export interface TravelService {
  id: string;
  eventId: string;
  type: 'FLIGHT' | 'AIRPORT_VIP' | 'TRANSFER' | 'VISA' | 'EXPERIENCE' | 'TRAVEL_SUPPORT';
  name: string;
  description?: string;
  status: 'DRAFT' | 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  destination?: string;
  provider?: string;
  price?: number;
  currency: string;
  capacity?: number;
  startDate?: string;
  endDate?: string;
  time?: string;
  location?: string;
  notes?: string;
  inclusions: string[];
  images: string[];
  isVisible: boolean;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export type TravelServiceCreateInput = Omit<TravelService, 'id' | 'eventId' | 'createdAt' | 'updatedAt'>;

export const travelApi = {
  getEventServices: async (eventId: string): Promise<TravelService[]> => {
    return await api.get<TravelService[]>(`/travel-services/event/${eventId}`);
  },

  getPublicServices: async (slug: string): Promise<TravelService[]> => {
    return await api.get<TravelService[]>(`/travel-services/public/${slug}`);
  },

  createService: async (eventId: string, data: TravelServiceCreateInput): Promise<TravelService> => {
    return await api.post<TravelService>(`/travel-services/event/${eventId}`, data);
  },

  updateService: async (id: string, data: Partial<TravelServiceCreateInput>): Promise<TravelService> => {
    return await api.patch<TravelService>(`/travel-services/${id}`, data);
  },

  deleteService: async (id: string): Promise<void> => {
    return await api.delete<void>(`/travel-services/${id}`);
  },
};
