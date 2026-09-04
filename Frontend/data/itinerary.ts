export interface ItineraryItem {
  id: string;
  eventId: string;
  day: string;
  date: string;
  time: string;
  title: string;
  location?: string;
  description?: string;
}

export const itineraryData: ItineraryItem[] = [
  // Event EVT-2026-001 - Global Leadership Summit
  {
    id: "ITN-001",
    eventId: "EVT-2026-001",
    day: "DAY 01 — ARRIVAL & WELCOME",
    date: "2026-11-12",
    time: "10:00",
    title: "Airport Transfers",
    location: "Dubai International Airport"
  },
  {
    id: "ITN-002",
    eventId: "EVT-2026-001",
    day: "DAY 01 — ARRIVAL & WELCOME",
    date: "2026-11-12",
    time: "14:00",
    title: "Hotel Check-in",
    location: "Grand Marina Hotel"
  },
  {
    id: "ITN-003",
    eventId: "EVT-2026-001",
    day: "DAY 01 — ARRIVAL & WELCOME",
    date: "2026-11-12",
    time: "18:30",
    title: "Welcome Reception",
    location: "Marina Terrace"
  },
  {
    id: "ITN-004",
    eventId: "EVT-2026-001",
    day: "DAY 01 — ARRIVAL & WELCOME",
    date: "2026-11-12",
    time: "20:00",
    title: "Welcome Dinner",
    location: "Grand Ballroom"
  },
  {
    id: "ITN-005",
    eventId: "EVT-2026-001",
    day: "DAY 02 — LEADERSHIP SUMMIT",
    date: "2026-11-13",
    time: "08:30",
    title: "Breakfast",
    location: "Dining Hall"
  },
  {
    id: "ITN-006",
    eventId: "EVT-2026-001",
    day: "DAY 02 — LEADERSHIP SUMMIT",
    date: "2026-11-13",
    time: "09:30",
    title: "Opening Session",
    location: "Main Auditorium"
  },
  {
    id: "ITN-007",
    eventId: "EVT-2026-001",
    day: "DAY 02 — LEADERSHIP SUMMIT",
    date: "2026-11-13",
    time: "11:00",
    title: "Keynote",
    location: "Main Auditorium"
  },
  {
    id: "ITN-008",
    eventId: "EVT-2026-001",
    day: "DAY 02 — LEADERSHIP SUMMIT",
    date: "2026-11-13",
    time: "13:00",
    title: "Lunch",
    location: "Terrace Gardens"
  },
  {
    id: "ITN-009",
    eventId: "EVT-2026-001",
    day: "DAY 02 — LEADERSHIP SUMMIT",
    date: "2026-11-13",
    time: "15:00",
    title: "Workshops",
    location: "Meeting Rooms A-D"
  },
  {
    id: "ITN-010",
    eventId: "EVT-2026-001",
    day: "DAY 02 — LEADERSHIP SUMMIT",
    date: "2026-11-13",
    time: "19:30",
    title: "Gala Dinner",
    location: "Sky Lounge"
  },
  {
    id: "ITN-011",
    eventId: "EVT-2026-001",
    day: "DAY 03 — EXPERIENCES",
    date: "2026-11-14",
    time: "09:00",
    title: "Group Excursion",
    location: "Desert Safari"
  },
  {
    id: "ITN-012",
    eventId: "EVT-2026-001",
    day: "DAY 03 — EXPERIENCES",
    date: "2026-11-14",
    time: "13:00",
    title: "Lunch",
    location: "Safari Camp"
  },
  {
    id: "ITN-013",
    eventId: "EVT-2026-001",
    day: "DAY 03 — EXPERIENCES",
    date: "2026-11-14",
    time: "16:00",
    title: "Free Time"
  },
  {
    id: "ITN-014",
    eventId: "EVT-2026-001",
    day: "DAY 03 — EXPERIENCES",
    date: "2026-11-14",
    time: "19:00",
    title: "Farewell Dinner",
    location: "Beachside Pavilion"
  }
];
