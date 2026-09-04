import { api } from './api';

export interface Stay {
  id: string;
  name: string;
  city: string;
  [key: string]: any;
}

export interface InventoryItem {
  id: string;
  eventId: string;
  stayId: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
  availableRooms: number;
  bookedRooms: number;
  heldRooms: number;
  capacity: number;
  bookingDeadline?: string;
  minimumStay: number;
  maximumStay?: number;
  inclusions: string[];
  cancellationPolicy?: string;
  paymentPolicy?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  stay?: Stay;
}

export interface InventoryStats {
  totalAllocation: number;
  booked: number;
  held: number;
  available: number;
  utilization: number;
  activeEvents: number;
  hotels: number;
  roomTypes: number;
  lowAvailability: number;
}

export const inventoryApi = {
  create: async (data: any): Promise<InventoryItem> => {
    return api.post<InventoryItem>('/v1/inventory', data);
  },

  getAllByEvent: async (eventId: string): Promise<InventoryItem[]> => {
    return api.get<InventoryItem[]>(`/v1/inventory?eventId=${eventId}`);
  },

  getStats: async (eventId: string): Promise<InventoryStats> => {
    return api.get<InventoryStats>(`/v1/inventory/stats?eventId=${eventId}`);
  },

  update: async (id: string, data: any): Promise<InventoryItem> => {
    return api.patch<InventoryItem>(`/v1/inventory/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return api.delete<void>(`/v1/inventory/${id}`);
  }
};
