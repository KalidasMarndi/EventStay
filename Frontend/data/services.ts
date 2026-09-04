export interface TravelService {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  status: 'Active' | 'Inactive';
}

export const travelServicesData: TravelService[] = [
  {
    id: "SRV-001",
    name: "Airport VIP Services",
    category: "Airport Assistance",
    shortDescription: "Fast-track security, exclusive lounge access, personal meet-and-greet.",
    fullDescription: "Fast-track security, exclusive lounge access, personal meet-and-greet and priority airport assistance.",
    features: [
      "Fast-track security",
      "Lounge access",
      "Meet & greet",
      "Baggage assistance",
      "Priority transfer"
    ],
    status: 'Active'
  },
  {
    id: "SRV-002",
    name: "Visa & Documentation",
    category: "Compliance",
    shortDescription: "End-to-end assistance for group visas and permits.",
    fullDescription: "End-to-end assistance for group visas, permits, documentation and travel compliance.",
    features: [
      "Group visa processing",
      "Travel permits",
      "Documentation checks",
      "Compliance assistance"
    ],
    status: 'Active'
  },
  {
    id: "SRV-003",
    name: "Ground Transfers",
    category: "Transportation",
    shortDescription: "Premium chauffeurs and seamless group transportation.",
    fullDescription: "Premium chauffeurs, group coaches and seamless transportation from airport arrival to hotel and event venues.",
    features: [
      "Premium chauffeurs",
      "Group coaches",
      "Airport to hotel",
      "Venue shuttles"
    ],
    status: 'Active'
  },
  {
    id: "SRV-004",
    name: "Flight Support",
    category: "Air Travel",
    shortDescription: "Group flight coordination and arrival tracking.",
    fullDescription: "Group flight coordination, arrival tracking, departure assistance and itinerary support.",
    features: [
      "Group flight booking",
      "Arrival tracking",
      "Departure assistance",
      "Itinerary management"
    ],
    status: 'Active'
  },
  {
    id: "SRV-005",
    name: "Travel Concierge",
    category: "Guest Support",
    shortDescription: "Personalized assistance for guests.",
    fullDescription: "Personalized assistance for guests before, during and after the event.",
    features: [
      "24/7 support desk",
      "Local recommendations",
      "Booking modifications",
      "Special requests"
    ],
    status: 'Active'
  },
  {
    id: "SRV-006",
    name: "Event Experiences",
    category: "Activities",
    shortDescription: "Curated activities and local excursions.",
    fullDescription: "Curated activities, excursions, gala dinners and local experiences tailored to each group.",
    features: [
      "City tours",
      "Gala dinners",
      "Team building",
      "Cultural experiences"
    ],
    status: 'Active'
  }
];
