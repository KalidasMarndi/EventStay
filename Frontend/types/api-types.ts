export type UserRole = 'USER' | 'ORGANIZER' | 'ADMIN';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';
export type EventCategory = 'MUSIC' | 'TECH' | 'SPORTS' | 'WEDDING' | 'CORPORATE' | 'OTHER';

export interface Venue {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: number;
}

export interface StayPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  capacity: number;
  availableRooms: number;
  eventId: string;
  stayId: string;
}

export interface Stay {
  id: string;
  name: string;
  type: string; // HOTEL, VILLA, etc.
  city: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: EventCategory;
  city: string;
  startDate: string;
  endDate: string;
  capacity: number;
  availableSeats: number;
  pricePerHead: number;
  status: EventStatus;
  organizerId: string;
  venueId: string;
  
  venue?: Venue;
  stayPackages?: (StayPackage & { stay: Stay })[];
}

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELLED';

export interface Booking {
  id: string;
  bookingReference: string;
  userId: string;
  eventId: string;
  stayPackageId?: string;
  status: BookingStatus;
  quantity: number;
  stayPackageQuantity: number;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  
  event?: Event;
  stayPackage?: StayPackage;
}

export interface CreateBookingDto {
  eventId: string;
  quantity: number;
  stayPackageId?: string;
  stayPackageQuantity?: number;
  notes?: string;
}

export interface CreateEventDto {
  title: string;
  description: string;
  category: EventCategory;
  city: string;
  startDate: string;
  endDate: string;
  capacity: number;
  pricePerHead: number;
  venueId: string;
}
