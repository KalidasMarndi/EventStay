export interface Hotel {
  id: string;
  name: string;
  location: string;
  roomType: string;
  negotiatedRate: number;
  currency: string;
  allocation: number;
  booked: number;
  held: number;
  available: number;
  bookingCloses: string;
  minimumStay: number;
  inclusions: string[];
}

export const hotelsData: Hotel[] = [
  {
    id: "HTL-001",
    name: "Palm Grove Resort",
    location: "Goa, India",
    roomType: "Garden Suite",
    negotiatedRate: 18500,
    currency: "INR",
    allocation: 60,
    booked: 42,
    held: 5,
    available: 13,
    bookingCloses: "2026-09-18",
    minimumStay: 2,
    inclusions: [
      "Breakfast",
      "Airport transfer",
      "Welcome dinner"
    ]
  },
  {
    id: "HTL-002",
    name: "Grand Marina Hotel",
    location: "Dubai, UAE",
    roomType: "Deluxe Room",
    negotiatedRate: 21800,
    currency: "INR",
    allocation: 120,
    booked: 76,
    held: 8,
    available: 36,
    bookingCloses: "2026-10-01",
    minimumStay: 3,
    inclusions: [
      "Breakfast",
      "Lounge access",
      "Free WiFi"
    ]
  },
  {
    id: "HTL-003",
    name: "Azure Sands Retreat",
    location: "Bali, Indonesia",
    roomType: "Ocean View Villa",
    negotiatedRate: 25000,
    currency: "INR",
    allocation: 50,
    booked: 45,
    held: 2,
    available: 3,
    bookingCloses: "2026-08-15",
    minimumStay: 3,
    inclusions: [
      "Breakfast",
      "Spa session",
      "Airport transfer"
    ]
  }
];
