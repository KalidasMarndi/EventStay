import { api } from './api';
import { Event } from '@/types/api-types';

export interface DashboardSummary {
  totalEvents: number;
  activeEvents: number;
  totalBookings: number;
  confirmedBookings: number;
  totalGuests: number;
  paymentsReceived: number;
  paymentsPending: number;
  paymentsFailed: number;
}

export interface DashboardInventory {
  total: number;
  booked: number;
  available: number;
  held: number;
}

export interface DashboardEvent extends Event {
  health: 'HEALTHY' | 'NEEDS_ATTENTION' | 'CRITICAL';
}

export interface DashboardActivity {
  id: string;
  type: 'BOOKING' | 'PAYMENT' | 'SYSTEM';
  title: string;
  description: string;
  date: string;
}

export interface DashboardAlert {
  type: 'info' | 'warning' | 'critical';
  message: string;
}

export interface DashboardOverviewResponse {
  summary: DashboardSummary;
  inventory: DashboardInventory;
  events: DashboardEvent[];
  activity: DashboardActivity[];
  alerts: DashboardAlert[];
  isEmpty?: boolean;
}

export const dashboardApi = {
  getOverview: async (eventId?: string): Promise<DashboardOverviewResponse> => {
    const query = eventId ? `?eventId=${eventId}` : '';
    return await api.get<DashboardOverviewResponse>(`/dashboard/overview${query}`);
  },
};
