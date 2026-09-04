export interface Event {
  id: string;
  name: string;
  slug: string;
  type: string;
  destination: string;
  startDate: string;
  endDate: string;
  totalGuests: number;
  hotels: number;
  roomsAllocated: number;
  roomsBooked: number;
  status: 'Booking Open' | 'Booking Closed' | 'Completed' | 'Upcoming';
  logo?: string;
  brandColors?: { primary: string; secondary: string };
  heroImage?: string;
  welcomeMessage?: string;
  bookingDeadline?: string;
}

export const eventsData: Event[] = [
  {
    id: "EVT-2026-001",
    name: "Global Leadership Summit 2026",
    slug: "global-leadership-summit-2026",
    type: "MICE / Conference",
    destination: "Dubai, UAE",
    startDate: "2026-11-12",
    endDate: "2026-11-15",
    totalGuests: 320,
    hotels: 3,
    roomsAllocated: 180,
    roomsBooked: 124,
    status: 'Booking Open',
    welcomeMessage: "Welcome to the Global Leadership Summit 2026. Please secure your stay and explore our exclusive experiences.",
    bookingDeadline: "2026-10-15"
  },
  {
    id: "EVT-2026-002",
    name: "Ananya & Rohan — Destination Wedding",
    slug: "ananya-rohan-wedding",
    type: "Destination Wedding",
    destination: "Goa, India",
    startDate: "2026-12-18",
    endDate: "2026-12-21",
    totalGuests: 180,
    hotels: 2,
    roomsAllocated: 95,
    roomsBooked: 71,
    status: 'Booking Open',
    welcomeMessage: "Join us in celebrating the union of Ananya & Rohan. We have arranged exclusive stays and events for our beloved guests.",
    bookingDeadline: "2026-11-01"
  },
  {
    id: "EVT-2026-003",
    name: "Tech Innovators Retreat",
    slug: "tech-innovators-retreat",
    type: "Corporate Retreat",
    destination: "Bali, Indonesia",
    startDate: "2026-09-05",
    endDate: "2026-09-09",
    totalGuests: 85,
    hotels: 1,
    roomsAllocated: 50,
    roomsBooked: 45,
    status: 'Upcoming',
    welcomeMessage: "Prepare to unwind, connect, and innovate at the annual Tech Innovators Retreat.",
    bookingDeadline: "2026-08-01"
  }
];
