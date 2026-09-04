export interface Supplier {
  id: string;
  name: string;
  location: string;
  category: 'Hotel' | 'Transport' | 'Airline' | 'Visa' | 'Experience' | 'Venue';
  status: 'Active' | 'Inactive';
  details?: string;
}

export const suppliersData: Supplier[] = [
  {
    id: "SUP-001",
    name: "Palm Grove Resort",
    location: "Goa, India",
    category: "Hotel",
    status: "Active",
    details: "60 rooms allocated"
  },
  {
    id: "SUP-002",
    name: "Grand Marina Hotel",
    location: "Dubai, UAE",
    category: "Hotel",
    status: "Active",
    details: "120 rooms allocated"
  },
  {
    id: "SUP-003",
    name: "Azure Sands Retreat",
    location: "Bali, Indonesia",
    category: "Hotel",
    status: "Active",
    details: "50 rooms allocated"
  },
  {
    id: "SUP-004",
    name: "Premium Chauffeurs",
    location: "Dubai, UAE",
    category: "Transport",
    status: "Active"
  },
  {
    id: "SUP-005",
    name: "Global Airways",
    location: "Worldwide",
    category: "Airline",
    status: "Active"
  },
  {
    id: "SUP-006",
    name: "Express Visa Services",
    location: "Mumbai, India",
    category: "Visa",
    status: "Active"
  }
];
