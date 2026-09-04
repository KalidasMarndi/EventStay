export interface Payment {
  transactionId: string;
  guestName: string;
  eventId: string;
  amount: number;
  currency: string;
  method: 'UPI' | 'Card' | 'Bank Transfer' | 'Payment Link';
  date: string;
  status: 'Completed' | 'Pending' | 'Refunded' | 'Failed';
}

export const paymentsData: Payment[] = [
  {
    transactionId: "TXN-00192837",
    guestName: "Priya Sharma",
    eventId: "EVT-2026-001",
    amount: 43600,
    currency: "INR",
    method: "Card",
    date: "2026-08-15T10:30:00Z",
    status: "Completed"
  },
  {
    transactionId: "TXN-00192838",
    guestName: "Arjun Mehta",
    eventId: "EVT-2026-001",
    amount: 55500,
    currency: "INR",
    method: "Payment Link",
    date: "2026-08-16T14:45:00Z",
    status: "Pending"
  },
  {
    transactionId: "TXN-00192839",
    guestName: "Samantha Lee",
    eventId: "EVT-2026-003",
    amount: 100000,
    currency: "INR",
    method: "Bank Transfer",
    date: "2026-07-20T09:15:00Z",
    status: "Completed"
  },
  {
    transactionId: "TXN-00192840",
    guestName: "Rohan Desai",
    eventId: "EVT-2026-002",
    amount: 55500,
    currency: "INR",
    method: "UPI",
    date: "2026-09-01T16:20:00Z",
    status: "Completed"
  }
];
