export interface InventoryAllotment {
  eventId: string;
  supplierId: string;
  hotelName: string;
  location: string;
  roomType: string;
  totalAllocation: number;
  bookedCount: number;
  heldCount: number;
  availableCount: number;
  negotiatedRate: number;
  currency: string;
  bookingDeadline: string;
  minimumStay: number;
  inclusions: string[];
  status: 'Active' | 'Closed' | 'Sold Out';
}

export const inventoryData: InventoryAllotment[] = [
  {
    eventId: "EVT-2026-002",
    supplierId: "SUP-001",
    hotelName: "Palm Grove Resort",
    location: "Goa, India",
    roomType: "Garden Suite",
    totalAllocation: 60,
    bookedCount: 42,
    heldCount: 5,
    availableCount: 13,
    negotiatedRate: 18500,
    currency: "INR",
    bookingDeadline: "2026-09-18",
    minimumStay: 2,
    inclusions: ["Breakfast", "Airport transfer", "Welcome dinner"],
    status: 'Active'
  },
  {
    eventId: "EVT-2026-001",
    supplierId: "SUP-002",
    hotelName: "Grand Marina Hotel",
    location: "Dubai, UAE",
    roomType: "Deluxe Room",
    totalAllocation: 120,
    bookedCount: 76,
    heldCount: 8,
    availableCount: 36,
    negotiatedRate: 21800,
    currency: "INR",
    bookingDeadline: "2026-10-01",
    minimumStay: 3,
    inclusions: ["Breakfast", "Lounge access", "Free WiFi"],
    status: 'Active'
  },
  {
    eventId: "EVT-2026-003",
    supplierId: "SUP-003",
    hotelName: "Azure Sands Retreat",
    location: "Bali, Indonesia",
    roomType: "Ocean View Villa",
    totalAllocation: 50,
    bookedCount: 45,
    heldCount: 2,
    availableCount: 3,
    negotiatedRate: 25000,
    currency: "INR",
    bookingDeadline: "2026-08-15",
    minimumStay: 3,
    inclusions: ["Breakfast", "Spa session", "Airport transfer"],
    status: 'Active'
  }
];
