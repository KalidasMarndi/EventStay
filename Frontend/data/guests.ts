export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  event: string;
  country: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  bookingStatus: 'Confirmed' | 'Held' | 'Cancelled';
  paymentStatus: 'Paid' | 'Payment Pending' | 'Refunded';
  travelStatus: 'Arriving' | 'Checked In' | 'Departed' | 'Not Arrived';
}

export const guestsData: Guest[] = [
  {
    id: "GST-1001",
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "+91 9876543210",
    event: "Global Leadership Summit 2026",
    country: "India",
    roomType: "Deluxe Room",
    checkIn: "2026-11-12",
    checkOut: "2026-11-14",
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
    travelStatus: "Not Arrived"
  },
  {
    id: "GST-1002",
    name: "Arjun Mehta",
    email: "arjun.m@example.com",
    phone: "+91 9123456789",
    event: "Global Leadership Summit 2026",
    country: "India",
    roomType: "Garden Suite",
    checkIn: "2026-11-11",
    checkOut: "2026-11-14",
    bookingStatus: "Held",
    paymentStatus: "Payment Pending",
    travelStatus: "Not Arrived"
  },
  {
    id: "GST-1003",
    name: "Samantha Lee",
    email: "sam.lee@example.com",
    phone: "+1 555-1234",
    event: "Tech Innovators Retreat",
    country: "USA",
    roomType: "Ocean View Villa",
    checkIn: "2026-09-05",
    checkOut: "2026-09-09",
    bookingStatus: "Confirmed",
    paymentStatus: "Paid",
    travelStatus: "Not Arrived"
  }
];
