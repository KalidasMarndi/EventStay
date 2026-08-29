"use client";

import { useMemo, useState, useEffect } from "react";
import {
  CloudSun,
  FileText,
  MapPin,
  Search,
  Send,
  Users,
} from "lucide-react";
import { useAuth, useUser } from "@clerk/nextjs";
import { api } from "@/services/api";

const DASHBOARD_VIDEO = "/Videos/135145-761273495.mp4";
const LOBBY_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1800&q=80";
const BEACH_IMAGE = "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80";
const BALLROOM_IMAGE = "https://images.unsplash.com/photo-1519167758481-83f29da8c0d1?auto=format&fit=crop&w=1600&q=80";

const navItems = ["Overview", "Guests", "Rooms", "Payments", "Itinerary", "Messages", "Documents"] as const;

const timeline = [
  { label: "Microsite live", time: "02 Jan" },
  { label: "Booking opens", time: "08 Jan" },
  { label: "Reminder sent", time: "18 Jan" },
  { label: "Booking deadline", time: "30 Jan" },
  { label: "Check-in", time: "14 Feb" },
];

const actions = [
  { title: "2 guests have not selected a room", action: "Send reminder", tone: "urgent" },
  { title: "1 payment needs follow-up", action: "Review", tone: "warn" },
  { title: "Garden Villa inventory is low", action: "Add rooms", tone: "low" },
];

const messages = [
  { title: "Invitation sent", status: "Sent", time: "08 Jan · 09:12" },
  { title: "Payment reminder", status: "Scheduled", time: "24 Jan · 10:00" },
  { title: "Check-in information", status: "Draft", time: "12 Feb · 16:00" },
];

const guests = [
  { name: "Priya Mehta", party: 1, room: "Garden Villa", payment: "Paid", arrival: "Fri 14 Feb" },
  { name: "Alex Doe", party: 1, room: "Sea View Room", payment: "Paid", arrival: "Fri 14 Feb" },
  { name: "Sam Kapoor", party: 2, room: "Family Suite", payment: "Pending", arrival: "Sat 15 Feb" },
];

const arrivals = [
  { title: "Guests arriving Friday", detail: "2 guests · Taj Exotica lobby" },
  { title: "Guests arriving Saturday", detail: "2 guests · late check-in window" },
  { title: "Early check-in requests", detail: "1 party from 12:00" },
  { title: "Airport transfers", detail: "Shuttle 1 on time" },
];

const documents = [
  "Rooming list",
  "Guest manifest",
  "Payment report",
  "Event itinerary",
];

const team = [
  { role: "Hotel liaison", name: "Maya" },
  { role: "Guest support", name: "Arjun" },
  { role: "Event planner", name: "Neha" },
];

type Visibility = "guest" | "private" | "staff";

type ItineraryItem = {
  id: string;
  day: "FRI · 14 FEB" | "SAT · 15 FEB";
  time: string;
  title: string;
  venue: string;
  dress: string;
  host: string;
  rsvp: string;
  visibility: Visibility;
  outdoor?: boolean;
  transport?: { pickup: string; departure: string; capacity: string };
  attachment: string;
};

const itinerarySeed: ItineraryItem[] = [
  {
    id: "checkin",
    day: "FRI · 14 FEB",
    time: "14:00",
    title: "Guest check-in",
    venue: "Taj Exotica lobby",
    dress: "Resort casual",
    host: "Maya",
    rsvp: "4 attending",
    visibility: "guest",
    transport: { pickup: "Dabolim arrivals", departure: "12:30", capacity: "4 / 5" },
    attachment: "Arrival map",
  },
  {
    id: "tea",
    day: "FRI · 14 FEB",
    time: "17:30",
    title: "Welcome high tea",
    venue: "Sea-view lawn",
    dress: "Garden smart",
    host: "Neha",
    rsvp: "4 attending",
    visibility: "guest",
    outdoor: true,
    attachment: "High-tea menu",
  },
  {
    id: "sangeet",
    day: "FRI · 14 FEB",
    time: "20:00",
    title: "Sangeet & dinner",
    venue: "Grand ballroom",
    dress: "Festive evening",
    host: "Arjun",
    rsvp: "4 attending",
    visibility: "guest",
    attachment: "Seating plan",
  },
  {
    id: "breakfast",
    day: "SAT · 15 FEB",
    time: "09:00",
    title: "Breakfast",
    venue: "Coral restaurant",
    dress: "Daywear",
    host: "Maya",
    rsvp: "Open seating",
    visibility: "guest",
    attachment: "Breakfast menu",
  },
  {
    id: "staff",
    day: "SAT · 15 FEB",
    time: "14:00",
    title: "Vendor walkthrough",
    venue: "Beachfront mandap",
    dress: "Staff",
    host: "Neha",
    rsvp: "Staff only",
    visibility: "staff",
    outdoor: true,
    attachment: "Vendor notes",
  },
  {
    id: "ceremony",
    day: "SAT · 15 FEB",
    time: "16:30",
    title: "Wedding ceremony",
    venue: "Beachfront mandap",
    dress: "Traditional / formal",
    host: "Neha",
    rsvp: "4 attending",
    visibility: "guest",
    outdoor: true,
    transport: { pickup: "Hotel porte-cochère", departure: "15:40", capacity: "4 / 5" },
    attachment: "Venue map",
  },
  {
    id: "reception",
    day: "SAT · 15 FEB",
    time: "20:30",
    title: "Reception",
    venue: "Sunset deck",
    dress: "Black tie optional",
    host: "Arjun",
    rsvp: "4 attending",
    visibility: "guest",
    outdoor: true,
    attachment: "Reception run-of-show",
  },
  {
    id: "private",
    day: "SAT · 15 FEB",
    time: "23:30",
    title: "Family toast",
    venue: "Presidential suite",
    dress: "Private",
    host: "Neha",
    rsvp: "Immediate family",
    visibility: "private",
    attachment: "Family note",
  },
];

const visibilityLabel: Record<Visibility, string> = {
  guest: "Guest-visible",
  private: "Private",
  staff: "Staff-only",
};

function nextVisibility(current: Visibility): Visibility {
  if (current === "guest") return "private";
  if (current === "private") return "staff";
  return "guest";
}

export function DashboardShowcase() {
  const [tab, setTab] = useState<(typeof navItems)[number]>("Overview");
  const [query, setQuery] = useState("");
  const [guestPreview, setGuestPreview] = useState(false);
  const [items, setItems] = useState(itinerarySeed);
  
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [bookingsCount, setBookingsCount] = useState(0);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const token = await getToken();
        if (token) {
          const res = await api.get<{ data: any[] }>('/bookings', token);
          if (res && res.data) {
            setBookingsCount(res.data.length);
          }
        }
      } catch (err) {
        console.error("Failed to fetch bookings", err);
      }
    }
    fetchBookings();
  }, [getToken]);

  const filteredGuests = guests.filter((guest) =>
    guest.name.toLowerCase().includes(query.toLowerCase())
  );

  const visibleItinerary = useMemo(
    () => (guestPreview ? items.filter((item) => item.visibility === "guest") : items),
    [guestPreview, items]
  );

  const friday = visibleItinerary.filter((item) => item.day === "FRI · 14 FEB");
  const saturday = visibleItinerary.filter((item) => item.day === "SAT · 15 FEB");

  return (
    <div className="relative mt-16 isolate min-h-[calc(100vh-5rem)] overflow-visible rounded-[24px] border border-white/15 bg-black text-white md:mt-20">
      <div className="sticky top-0 -z-10 h-screen overflow-hidden rounded-[24px]">
        <video className="absolute inset-0 h-full w-full object-cover opacity-80" src={DASHBOARD_VIDEO} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
        <img src={LOBBY_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover opacity-10 mix-blend-screen" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(236,168,214,0.1),transparent_38%),linear-gradient(180deg,rgba(3,3,3,0.3),rgba(3,3,3,0.8)_78%,#030303)]" />
      </div>

      <div className="relative z-10 -mt-[100vh] p-5 md:p-8 lg:p-10">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Event dashboard</p>
            <h3 className="mt-3 font-display text-4xl md:text-5xl">
              {isLoaded && user ? `${user.firstName}'s Event` : "Aanya & Rishabh · Goa"}
            </h3>
            <p className="mt-3 max-w-xl text-sm text-white/60">Taj Exotica · 14—16 February · {bookingsCount > 0 ? bookingsCount : 4} / 10 rooms booked</p>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Dashboard sections">
            {navItems.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setTab(item)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] uppercase tracking-[0.12em] ${
                  tab === item ? "border-[#eca8d6] bg-[#eca8d6] text-black" : "border-white/15 text-white/60 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        <div className="mb-4 flex flex-wrap gap-3 rounded-2xl border border-amber-200/20 bg-amber-200/10 px-4 py-3 text-sm text-amber-100">
          <span>Ceremony starts in 45 minutes</span>
          <span className="text-white/30">·</span>
          <span>Shuttle 2 is at capacity</span>
        </div>

        {(tab === "Overview" || tab === "Rooms" || tab === "Payments") && (
          <section className="mb-6 grid gap-4 lg:grid-cols-3">
            <article className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/55 p-5">
              <img src={BEACH_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
              <div className="relative">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">Event overview</p>
                <p className="mt-3 font-display text-3xl">4 / 10 rooms</p>
                <p className="mt-2 text-sm text-white/60">₹1.2L received · deadline 30 Jan</p>
              </div>
            </article>
            <article className="rounded-2xl border border-white/10 bg-black/55 p-5 lg:col-span-2">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">Action center</p>
              <div className="space-y-3">
                {actions.map((item) => (
                  <div key={item.title} className={`flex flex-col gap-3 rounded-xl border bg-white/[0.04] px-4 py-3 sm:flex-row sm:items-center sm:justify-between ${item.tone === "urgent" ? "border-[#eca8d6]/40" : "border-white/10"}`}>
                    <p className="text-sm">{item.title}</p>
                    <button type="button" className="rounded-full border border-[#eca8d6]/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-[#eca8d6]">
                      {item.action}
                    </button>
                  </div>
                ))}
              </div>
            </article>
          </section>
        )}

        {(tab === "Overview" || tab === "Messages") && (
          <section className="mb-6 grid gap-4 lg:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-black/55 p-5">
              <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">Event timeline</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {timeline.map((step, index) => (
                  <div key={step.label} className="min-w-[140px] flex-1">
                    <p className="font-mono text-[10px] text-[#eca8d6]">{step.time}</p>
                    <p className="mt-2 text-sm">{step.label}</p>
                    {index < timeline.length - 1 && <div className="mt-3 h-px bg-white/15" />}
                  </div>
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-white/10 bg-black/55 p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">Communications hub</p>
                <button type="button" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-white/80">
                  <Send className="h-3 w-3" /> Send update
                </button>
              </div>
              <ul className="space-y-3">
                {messages.map((message) => (
                  <li key={message.title} className="flex items-center justify-between gap-3 border-b border-white/10 pb-3 last:border-0">
                    <div>
                      <p className="text-sm">{message.title}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">{message.time}</p>
                    </div>
                    <span className="rounded-full border border-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white/60">{message.status}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        )}

        {(tab === "Overview" || tab === "Guests") && (
          <section className="mb-6 rounded-2xl border border-white/10 bg-black/55 p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">Guest list management</p>
              <label className="relative block w-full sm:max-w-xs">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search guests"
                  className="w-full rounded-full border border-white/15 bg-black/40 py-2 pl-9 pr-4 text-sm text-white outline-none placeholder:text-white/35"
                />
              </label>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
                  <tr>
                    <th className="pb-3 font-medium">Name</th>
                    <th className="pb-3 font-medium">Party size</th>
                    <th className="pb-3 font-medium">Room choice</th>
                    <th className="pb-3 font-medium">Payment</th>
                    <th className="pb-3 font-medium">Arrival date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((guest) => (
                    <tr key={guest.name} className="border-t border-white/10">
                      <td className="py-3">{guest.name}</td>
                      <td className="py-3 text-white/70">{guest.party}</td>
                      <td className="py-3 text-white/70">{guest.room}</td>
                      <td className="py-3 text-white/70">{guest.payment}</td>
                      <td className="py-3 text-white/70">{guest.arrival}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {(tab === "Overview" || tab === "Guests") && (
          <section className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {arrivals.map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/10 bg-black/55 p-4">
                <p className="text-sm">{item.title}</p>
                <p className="mt-2 text-xs text-white/50">{item.detail}</p>
              </article>
            ))}
          </section>
        )}

        {(tab === "Overview" || tab === "Itinerary") && (
          <section className="mb-6 overflow-hidden rounded-2xl border border-white/10 bg-black/70">
            <div className="relative min-h-[160px] overflow-hidden">
              <video className="absolute inset-0 h-full w-full object-cover opacity-80" src={DASHBOARD_VIDEO} autoPlay muted loop playsInline preload="metadata" aria-hidden="true" />
              <img src={BALLROOM_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
              <div className="relative flex flex-col gap-4 p-5 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">Event itinerary</p>
                  <h4 className="mt-2 font-display text-3xl">Day-by-day for the wedding weekend</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setGuestPreview((current) => !current)}
                  className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.12em] ${
                    guestPreview ? "border-[#eca8d6] bg-[#eca8d6] text-black" : "border-white/20 text-white"
                  }`}
                >
                  {guestPreview ? "Guest view on" : "Guest view preview"}
                </button>
              </div>
            </div>
            <div className="grid gap-6 p-5 lg:grid-cols-2">
              {[{ label: "FRI · 14 FEB", rows: friday }, { label: "SAT · 15 FEB", rows: saturday }].map((day) => (
                <div key={day.label}>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#eca8d6]">{day.label}</p>
                  <div className="space-y-3">
                    {day.rows.map((item) => (
                      <article key={item.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="font-mono text-[11px] text-white/50">{item.time}</p>
                            <h5 className="mt-1 text-base">{item.title}</h5>
                            <p className="mt-1 flex items-center gap-1.5 text-xs text-white/55"><MapPin className="h-3 w-3" /> {item.venue}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            {item.outdoor && (
                              <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white/70">
                                <CloudSun className="h-3 w-3" /> 29° clear
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => setItems((current) => current.map((row) => row.id === item.id ? { ...row, visibility: nextVisibility(row.visibility) } : row))}
                              className="rounded-full border border-white/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-white/70"
                            >
                              {visibilityLabel[item.visibility]}
                            </button>
                          </div>
                        </div>
                        <div className="mt-3 grid gap-2 text-xs text-white/55 sm:grid-cols-2">
                          <p>Dress · {item.dress}</p>
                          <p>Host · {item.host}</p>
                          <p>RSVP · {item.rsvp}</p>
                          <p className="inline-flex items-center gap-1"><FileText className="h-3 w-3" /> {item.attachment}</p>
                        </div>
                        {item.transport && (
                          <p className="mt-3 text-xs text-white/50">
                            Shuttle · pickup {item.transport.pickup} · departs {item.transport.departure} · {item.transport.capacity} seats
                          </p>
                        )}
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {(tab === "Overview" || tab === "Documents") && (
          <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <article className="rounded-2xl border border-white/10 bg-black/55 p-5">
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">Quick documents</p>
              <div className="grid gap-3 sm:grid-cols-2">
                {documents.map((doc) => (
                  <button key={doc} type="button" className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4 text-left text-sm hover:border-[#eca8d6]/40">
                    {doc}
                  </button>
                ))}
              </div>
            </article>
            <article className="rounded-2xl border border-white/10 bg-black/55 p-5">
              <p className="mb-4 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">
                <Users className="h-3.5 w-3.5" /> Team collaboration
              </p>
              <ul className="space-y-3">
                {team.map((person) => (
                  <li key={person.role} className="flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-sm">
                    <span className="text-white/60">{person.role}</span>
                    <span>{person.name}</span>
                  </li>
                ))}
              </ul>
            </article>
          </section>
        )}
      </div>
    </div>
  );
}
