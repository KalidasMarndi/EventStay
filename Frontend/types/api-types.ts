/* ═══════════════════════════════════════════════════════════════════
   EventStay — Shared API Types
   Aligned with backend Prisma schema
   ═══════════════════════════════════════════════════════════════════ */

// ─── Enums ─────────────────────────────────────────────────────────

export type UserRole = 'USER' | 'ORGANIZER' | 'ADMIN';

export type EventStatus = 'DRAFT' | 'PUBLISHED' | 'CANCELLED' | 'COMPLETED';

export type EventCategory =
  | 'WEDDING'
  | 'CORPORATE'
  | 'CONFERENCE'
  | 'MICE'
  | 'INCENTIVE'
  | 'CULTURAL'
  | 'MUSIC'
  | 'SPORTS'
  | 'OTHER';

export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED';

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export type PaymentProvider = 'STRIPE' | 'RAZORPAY' | 'PAYPAL';

export type MediaType = 'IMAGE' | 'VIDEO' | 'DOCUMENT';

// ─── Models ────────────────────────────────────────────────────────

export interface User {
  id: string;
  clerkId: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
  description?: string;
  images: string[];
  amenities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: EventCategory;
  city: string;
  venueId: string;
  organizerId: string;
  startDate: string;
  endDate: string;
  capacity: number;
  availableSeats: number;
  pricePerHead: number;
  status: EventStatus;
  featuredImage?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;

  // Relations
  venue?: Venue;
  stayPackages?: (StayPackage & { stay: Stay })[];
}

export interface Stay {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  description: string;
  pricePerNight: number;
  availableRooms: number;
  rating: number;
  images: string[];
  amenities: string[];
  createdAt: string;
  updatedAt: string;
}

export interface StayPackage {
  id: string;
  eventId: string;
  stayId: string;
  name: string;
  description?: string;
  price: number;
  availableRooms: number;
  capacity: number;
  createdAt: string;
  updatedAt: string;

  // Relations
  stay?: Stay;
}

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
  updatedAt: string;

  // Relations
  event?: Event;
  stayPackage?: StayPackage;
  payments?: Payment[];
}

export interface Payment {
  id: string;
  bookingId: string;
  provider: PaymentProvider;
  providerPaymentId?: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  eventId?: string;
  stayId?: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface Media {
  id: string;
  url: string;
  type: MediaType;
  ownerId?: string;
  eventId?: string;
  venueId?: string;
  stayId?: string;
  createdAt: string;
  updatedAt: string;
}

// ─── DTOs ──────────────────────────────────────────────────────────

export interface CreateEventDto {
  title: string;
  description: string;
  category: EventCategory;
  city: string;
  venueId: string;
  startDate: string;
  endDate: string;
  capacity: number;
  pricePerHead: number;
  featuredImage?: string;
  status?: EventStatus;
  tags?: string[];
}

export interface UpdateEventDto extends Partial<CreateEventDto> {}

export interface CreateBookingDto {
  eventId: string;
  quantity: number;
  stayPackageId?: string;
  stayPackageQuantity?: number;
  notes?: string;
}

export interface CreateStayDto {
  name: string;
  city: string;
  address: string;
  description: string;
  pricePerNight: number;
  availableRooms: number;
  rating?: number;
  images?: string[];
  amenities?: string[];
}

export interface CreateVenueDto {
  name: string;
  address: string;
  city: string;
  state: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  capacity: number;
  description?: string;
  images?: string[];
  amenities?: string[];
}

// ─── Pagination ────────────────────────────────────────────────────

export interface PaginationQuery {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ─── Payment Session ───────────────────────────────────────────────

export interface PaymentSession {
  sessionId: string;
  url: string;
}
