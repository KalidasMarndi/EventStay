export interface Booking {
  id: string;
  guestName: string;
  eventName: string;
  hotelName: string;
  roomType: string;
  nights: number;
  amount: number;
  currency: string;
  paymentStatus: 'Paid' | 'Payment Pending' | 'Refunded';
  bookingStatus: 'Confirmed' | 'Held' | 'Cancelled';
}

export const bookingsData: Booking[] = [
  {
    id: "BK-2026-01842",
    guestName: "Priya Sharma",
    eventName: "Global Leadership Summit 2026",
    hotelName: "Grand Marina Hotel",
    roomType: "Deluxe Room",
    nights: 2,
    amount: 43600,
    currency: "INR",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed"
  },
  {
    id: "BK-2026-01843",
    guestName: "Arjun Mehta",
    eventName: "Global Leadership Summit 2026",
    hotelName: "Palm Grove Resort",
    roomType: "Garden Suite",
    nights: 3,
    amount: 55500,
    currency: "INR",
    paymentStatus: "Payment Pending",
    bookingStatus: "Held"
  },
  {
    id: "BK-2026-01844",
    guestName: "Samantha Lee",
    eventName: "Tech Innovators Retreat",
    hotelName: "Azure Sands Retreat",
    roomType: "Ocean View Villa",
    nights: 4,
    amount: 100000,
    currency: "INR",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed"
  },
  {
    id: "BK-2026-01845",
    guestName: "Rohan Desai",
    eventName: "Ananya & Rohan — Destination Wedding",
    hotelName: "Palm Grove Resort",
    roomType: "Garden Suite",
    nights: 3,
    amount: 55500,
    currency: "INR",
    paymentStatus: "Paid",
    bookingStatus: "Confirmed"
  }
];
