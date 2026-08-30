"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { api } from "@/services/api";
import { Event } from "@/types/api-types";
import { useAuth } from "@clerk/nextjs";

const guestPath = [
  { step: "01", title: "Cover", copy: "Destination image and event name." },
  { step: "02", title: "Story", copy: "Dates, venue, and why they are invited." },
  { step: "03", title: "Rooms", copy: "Packages still available for this event." },
  { step: "04", title: "Pay", copy: "Guest details and a single payment step." },
  { step: "05", title: "Confirmation", copy: "Stay reserved, no chasing the host." },
];

const organizerControls = [
  { title: "Custom branding", copy: "Logos, colors, and couple or company names on the page." },
  { title: "Invite-only access", copy: "A private link, not a public hotel booking site." },
  { title: "Packages and deadline", copy: "The rooms and rates guests are allowed to choose." },
  { title: "Guest-visible itinerary", copy: "Only the moments you mark for guests appear here." },
  { title: "Preview mode", copy: "See the page as a guest before you send it." },
];

const guestItinerary = [
  {
    day: "FRI · 14 FEB",
    rows: [
      { time: "14:00", title: "Guest check-in", venue: "Taj Exotica lobby" },
      { time: "17:30", title: "Welcome high tea", venue: "Sea-view lawn" },
      { time: "20:00", title: "Sangeet & dinner", venue: "Grand ballroom" },
    ],
  },
  {
    day: "SAT · 15 FEB",
    rows: [
      { time: "09:00", title: "Breakfast", venue: "Coral restaurant" },
      { time: "16:30", title: "Wedding ceremony", venue: "Beachfront mandap" },
      { time: "20:30", title: "Reception", venue: "Sunset deck" },
    ],
  },
];

export function MicrositeGuestSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  const { getToken, isLoaded } = useAuth();
  const [eventData, setEventData] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.08 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    async function fetchEvent() {
      try {
        const data = await api.get<{ data: Event[] }>('/events');
        if (data && data.data && data.data.length > 0) {
          setEventData(data.data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvent();
  }, []);

  const handleBooking = async () => {
    if (!eventData || !eventData.stayPackages?.length) return;
    
    try {
      const token = await getToken();
      if (!token) {
        alert("Please sign in to book.");
        return;
      }
      
      const payload = {
        eventId: eventData.id,
        quantity: 1,
        stayPackageId: eventData.stayPackages[0].id,
        stayPackageQuantity: 1
      };
      
      const result = await api.post('/bookings', payload, token);
      alert("Booking successful! " + (result as any).bookingReference);
    } catch (err: any) {
      alert("Booking failed: " + err.message);
    }
  };

  return (
    <section
      id="guest-microsite"
      ref={sectionRef}
      className="relative bg-black py-24 text-white lg:py-32 overflow-hidden"
      aria-label="Guest microsite experience"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          src="/Videos/362909.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,168,214,0.1),transparent_40%)]" />
      </div>

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 z-10">
        <div className={`mb-14 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-sm text-white/40">
            <span className="h-px w-8 bg-white/30" />
            What guests open
          </span>
          <h2 className="font-display text-5xl leading-[0.9] tracking-tight md:text-7xl lg:text-[88px]">
            The page they keep.
            <br />
            <span className="text-white/35">Cover to confirmation.</span>
          </h2>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="overflow-hidden border border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">
                {eventData ? `stay.eventstay.com/${eventData.slug}` : 'stay.eventstay.com/loading...'}
              </span>
            </div>
            <div className="relative min-h-[280px] bg-[#111]">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(236,168,214,0.18),transparent_45%,#0a0a0a)]" />
              <div className="relative flex min-h-[280px] flex-col justify-end p-6 md:p-10">
                {isLoading ? (
                  <p className="animate-pulse text-white/50">Loading event data...</p>
                ) : eventData ? (
                  <>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">
                      {eventData.city} · {new Date(eventData.startDate).toLocaleDateString()}
                    </p>
                    <h3 className="mt-3 font-display text-4xl md:text-5xl">{eventData.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{eventData.venue?.name || 'Destination'} · {eventData.category.toLowerCase()} stay</p>
                  </>
                ) : (
                  <>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/55">Goa · 14—16 February</p>
                    <h3 className="mt-3 font-display text-4xl md:text-5xl">Aanya &amp; Rishabh</h3>
                    <p className="mt-2 text-sm text-white/60">Taj Exotica · destination wedding stay</p>
                  </>
                )}
              </div>
            </div>
            <div className="grid gap-px bg-white/10 sm:grid-cols-3">
              {eventData?.stayPackages?.length ? (
                eventData.stayPackages.map((pkg) => (
                  <div key={pkg.id} className="bg-black px-5 py-5">
                    <p className="text-sm">{pkg.name}</p>
                    <p className="mt-1 text-xs text-white/45">{pkg.availableRooms} rooms available</p>
                    <p className="mt-1 text-[10px] text-[#eca8d6]">₹{pkg.price}</p>
                  </div>
                ))
              ) : (
                ["Sea View Room", "Garden Villa", "Family Suite"].map((room) => (
                  <div key={room} className="bg-black px-5 py-5">
                    <p className="text-sm">{room}</p>
                    <p className="mt-1 text-xs text-white/45">Available for this event</p>
                  </div>
                ))
              )}
            </div>
            <div className="border-t border-white/10 px-6 py-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm text-white/60">One action for every invited guest.</p>
                <button 
                  onClick={handleBooking}
                  className="rounded-full bg-[#eca8d6] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-black hover:bg-white transition-colors"
                >
                  Book your stay
                </button>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            {guestPath.map((item) => (
              <div 
                key={item.step} 
                className="group relative overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] backdrop-blur-md px-6 py-5 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(236,168,214,0.1)] hover:-translate-y-1 cursor-default"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#eca8d6]/0 via-[#eca8d6]/10 to-[#eca8d6]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                <div className="relative z-10 flex items-baseline gap-4">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#eca8d6] group-hover:text-white transition-colors duration-300">{item.step}</span>
                  <h3 className="font-display text-3xl group-hover:text-[#eca8d6] transition-colors duration-300">{item.title}</h3>
                </div>
                <p className="relative z-10 mt-3 text-sm text-white/50 leading-relaxed group-hover:text-white/80 transition-colors duration-300">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          <article className="border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">What the organizer controls</p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl">The builder you already have, on the guest page.</h3>
            <ul className="mt-8 space-y-5">
              {organizerControls.map((item) => (
                <li key={item.title} className="border-t border-white/10 pt-4">
                  <p className="text-sm font-medium">{item.title}</p>
                  <p className="mt-1 text-sm text-white/50">{item.copy}</p>
                </li>
              ))}
            </ul>
          </article>

          <article className="border border-white/10 bg-white/[0.02] p-6 md:p-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/40">Guest itinerary</p>
            <h3 className="mt-3 font-display text-3xl md:text-4xl">As it appears on the microsite.</h3>
            <p className="mt-3 text-sm text-white/50">Staff-only and private moments stay off this view.</p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              {guestItinerary.map((day) => (
                <div key={day.day}>
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-[#eca8d6]">{day.day}</p>
                  <ul className="space-y-4">
                    {day.rows.map((row) => (
                      <li key={row.title}>
                        <p className="font-mono text-[11px] text-white/40">{row.time}</p>
                        <p className="mt-1 text-sm">{row.title}</p>
                        <p className="text-xs text-white/45">{row.venue}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-16 border border-white/10 px-6 py-10 md:px-12 md:py-14">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <h3 className="max-w-xl font-display text-4xl md:text-5xl">Preview the guest page, then create the event behind it.</h3>
            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <a href="#guest-microsite" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em]">
                Preview guest experience <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link href="/create-event" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#eca8d6] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-black">
                Create an event <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
