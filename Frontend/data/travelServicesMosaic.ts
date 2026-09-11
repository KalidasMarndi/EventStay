import { Plane, FileText, Crown, Car, Building, Headphones, CalendarDays, BedDouble } from "lucide-react";

export type SlideDirection = 'up' | 'down' | 'left' | 'right' | 'diagonal-left' | 'diagonal-right';

export interface TravelServiceMosaic {
  id: string;
  icon: any;
  category: string;
  title: string;
  shortDescription: string;
  action: string;
  href: string;
  
  // Reveal layer data
  image: string;
  revealDirection: SlideDirection;
  extendedDescription: string;
  features: string[];
  
  // Layout specific attributes for the mosaic
  size: 'small' | 'medium' | 'large';
  desktopPosition: string; // Tailwind class string for position
}

export const travelServicesMosaic: TravelServiceMosaic[] = [
  {
    id: "flight-support",
    icon: Plane,
    category: "Arrival & Departure",
    title: "Flight Support",
    shortDescription: "Group flight bookings, private charters, and seamless arrival coordination.",
    action: "Request Quote",
    href: "/travel-support/flights",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80",
    revealDirection: "left",
    extendedDescription: "Coordinate group air travel from departure to destination with one dedicated workflow.",
    features: ["Group Flights", "Private Charters", "Arrival Coordination"],
    size: "medium",
    desktopPosition: "col-span-1"
  },
  {
    id: "visa",
    icon: FileText,
    category: "Compliance",
    title: "Visa & Documentation",
    shortDescription: "Hassle-free visa processing and travel document checks for international groups.",
    action: "Check Req",
    href: "/travel-support/visa",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    revealDirection: "up",
    extendedDescription: "End-to-end assistance for group visas, permits, and global travel compliance.",
    features: ["Global Visas", "Permits", "Document Verification"],
    size: "medium",
    desktopPosition: "col-span-1"
  },
  {
    id: "airport-vip",
    icon: Crown,
    category: "Fast-Track",
    title: "Airport VIP Services",
    shortDescription: "Meet and greet, priority immigration, and exclusive lounge access globally.",
    action: "Learn More",
    href: "/travel-support/airport-vip",
    image: "https://images.unsplash.com/photo-1540339832862-4745ea79c7ee?auto=format&fit=crop&w=800&q=80",
    revealDirection: "right",
    extendedDescription: "Fast-track security, exclusive lounge access, and personal meet-and-greet.",
    features: ["VIP Lounges", "Priority Immigration", "Meet & Greet"],
    size: "large",
    desktopPosition: "col-span-2"
  },
  {
    id: "ground-transfers",
    icon: Car,
    category: "Logistics",
    title: "Ground Transfers",
    shortDescription: "Executive sedans, group coaches, and seamless hotel-to-venue logistics.",
    action: "Book Now",
    href: "/travel-support/transfers",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80",
    revealDirection: "down",
    extendedDescription: "Premium chauffeurs, private cars, and reliable logistics from arrival to departure.",
    features: ["Chauffeurs", "Group Coaches", "Executive Sedans"],
    size: "medium",
    desktopPosition: "col-span-1"
  },
  {
    id: "premium-stays",
    icon: Building,
    category: "Accommodation",
    title: "Premium Stays",
    shortDescription: "Handpicked hotels and resorts for comfort, convenience, and unforgettable stays.",
    action: "View Stays",
    href: "/travel-support/stays",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    revealDirection: "diagonal-left",
    extendedDescription: "Manage event-specific accommodation and premium stays for every guest.",
    features: ["Luxury Hotels", "Resorts", "Negotiated Rates"],
    size: "large",
    desktopPosition: "col-span-2"
  },
  {
    id: "24-7-support",
    icon: Headphones,
    category: "Assistance",
    title: "24/7 Travel Support",
    shortDescription: "Round-the-clock assistance for you and your group, anytime, anywhere.",
    action: "Get Support",
    href: "/travel-support/assistance",
    image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=800&q=80",
    revealDirection: "diagonal-right",
    extendedDescription: "Round-the-clock assistance before, during and after the journey for peace of mind.",
    features: ["Always On", "Concierge Desk", "Emergency Response"],
    size: "medium",
    desktopPosition: "col-span-1"
  },
  {
    id: "events",
    icon: CalendarDays,
    category: "Experiences",
    title: "Events & Experiences",
    shortDescription: "Curated activities, gala dinners, and local experiences tailored for your group.",
    action: "Explore",
    href: "/destinations",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
    revealDirection: "up",
    extendedDescription: "Curated activities, gala dinners, entertainment and local experiences tailored to the group.",
    features: ["Gala Dinners", "Curated Events", "Local Tours"],
    size: "medium",
    desktopPosition: "col-span-1"
  },
  {
    id: "event-inventory",
    icon: BedDouble,
    category: "Planning",
    title: "Event Inventory",
    shortDescription: "Manage room blocks, negotiated rates, and booking rules seamlessly.",
    action: "Manage Blocks",
    href: "/create-event",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    revealDirection: "right",
    extendedDescription: "Secure and manage dedicated room allocations and block parameters efficiently.",
    features: ["Room Allocations", "Booking Rules", "Live Availability"],
    size: "medium",
    desktopPosition: "col-span-1"
  }
];
