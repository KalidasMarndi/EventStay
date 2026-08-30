"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarDays,
  Check,
  CreditCard,
  MapPin,
  Users,
  Volume2,
  VolumeX,
  Building,
  ClipboardCheck,
  Plane,
  Map,
  LifeBuoy,
} from "lucide-react";
import Link from "next/link";

const HOTEL_VIDEO = "https://cdn.pixabay.com/video/2022/10/16/135143-761273487_large.mp4";
const HOTEL_AMBIENCE = "https://cdn.pixabay.com/download/audio/2026/07/08/audio_80df566438.mp3?filename=mirostar-real-estate-hotel-resort-560320.mp3";

const eventTypes = [
  {
    id: "wedding",
    label: "Destination Wedding",
    destination: "Goa",
    venue: "Taj Exotica",
    roomsBooked: 42,
    roomsTotal: 60,
    guestsInvited: 184,
    guestsConfirmed: 96,
    payments: "₹18.4L",
    deadline: "Booking closes 30 Jan",
    guestCopy: "Couples share a private wedding stay with ocean-view rooms, villas, and a single booking page for every invited guest.",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
    cover: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85",
    alt: "Destination wedding by the water",
    couple: "Aanya & Rishabh",
    dates: "14—16 Feb",
  },
  {
    id: "offsites",
    label: "Corporate Offsite",
    destination: "Udaipur",
    venue: "Oberoi Udaivilas",
    roomsBooked: 28,
    roomsTotal: 40,
    guestsInvited: 52,
    guestsConfirmed: 41,
    payments: "₹9.6L",
    deadline: "Booking closes 12 Mar",
    guestCopy: "Leadership teams pick rooms against a contracted block, with work sessions and dinners already mapped to the stay.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
    cover: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=900&q=85",
    alt: "Palace hotel courtyard for a corporate offsite",
    couple: "Northstar Offsite",
    dates: "04—07 Apr",
  },
  {
    id: "mice",
    label: "MICE",
    destination: "Dubai",
    venue: "Madinat Jumeirah",
    roomsBooked: 74,
    roomsTotal: 90,
    guestsInvited: 210,
    guestsConfirmed: 168,
    payments: "AED 412K",
    deadline: "Booking closes 08 May",
    guestCopy: "Delegates book conference rates, meeting-adjacent rooms, and airport transfers from one branded event page.",
    image: "https://images.unsplash.com/photo-1512453979798-5ea955f9af5b?auto=format&fit=crop&w=1600&q=85",
    cover: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=900&q=85",
    alt: "City skyline for a MICE gathering",
    couple: "Summit Week",
    dates: "18—21 Jun",
  },
  {
    id: "group",
    label: "Group Celebration",
    destination: "Jaipur",
    venue: "Rambagh Palace",
    roomsBooked: 19,
    roomsTotal: 32,
    guestsInvited: 68,
    guestsConfirmed: 44,
    payments: "₹6.1L",
    deadline: "Booking closes 22 Aug",
    guestCopy: "Families and friends hold a palace block, choose packages together, and keep every stay in one guest list.",
    image: "https://images.unsplash.com/photo-1477587458883-47145f255f1c?auto=format&fit=crop&w=1600&q=85",
    cover: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=900&q=85",
    alt: "Palace hotel for a group celebration",
    couple: "Mehra Family",
    dates: "09—11 Oct",
  },
] as const;

const productMoments = [
  { number: "01", eyebrow: "Inventory / hotel allocation", title: "Keep every room in the plan.", description: "Protect room types, contracted rates, and booking deadlines without a spreadsheet in sight.", image: "https://images.unsplash.com/photo-1760848540819-cc289af59dcc?auto=format&fit=crop&w=1600&q=85", alt: "Hotel café terrace with red umbrellas", stat: "18 rooms held", preview: "inventory" },
  { number: "02", eyebrow: "Branded event microsite", title: "One beautiful place for every guest.", description: "Share the story, the stay packages, and a simple booking path in a page made for your event.", image: "https://images.unsplash.com/photo-1683830971510-1348fd4acbd5?auto=format&fit=crop&w=1600&q=85", alt: "Restaurant tables prepared for guests", stat: "62 invitations sent", preview: "microsite" },
  { number: "03", eyebrow: "Live booking visibility", title: "See every yes as it happens.", description: "Watch bookings, payments, and room availability update as your guests make their plans.", image: "https://images.unsplash.com/photo-1606599220504-5cc77fd409f3?auto=format&fit=crop&w=1600&q=85", alt: "Café courtyard decorated with lights", stat: "Destination wedding", preview: "visibility" },
  { number: "04", eyebrow: "Guest booking journey", title: "From first look to confirmed stay.", description: "Guests choose a package, enter their details, and receive an immediate confirmation—on any device.", image: "https://images.unsplash.com/photo-1725022672140-8107943a28e3?auto=format&fit=crop&w=1600&q=85", alt: "Courtyard tables at a hotel venue", stat: "12 rooms remaining", preview: "journey" },
];

const liveUpdates = [
  { label: "Ananya has booked a stay", detail: "2 guests · 3 nights", tone: "booking" },
  { label: "Inventory just updated", detail: "12 rooms remaining", tone: "inventory" },
  { label: "Destination wedding is live", detail: "Goa · 184 guests invited", tone: "event" },
  { label: "Rohan has completed payment", detail: "Ocean-view suite reserved", tone: "booking" },
];

const activityFeed = [
  { name: "Priya Mehta", action: "booked Garden Villa", time: "2m ago" },
  { name: "Arjun Shah", action: "completed payment", time: "11m ago" },
  { name: "Neha Kapoor", action: "selected Sea View Room", time: "28m ago" },
  { name: "Maya Rao", action: "requested early check-in", time: "1h ago" },
];

const micrositeSteps = [
  { id: "cover", label: "Cover" },
  { id: "stay", label: "Stay" },
  { id: "book", label: "Book your stay" },
];

const featureCards = [
  {
    icon: CalendarDays,
    category: "Event Management",
    title: "Centralized Events",
    description: "Create and manage destination weddings, corporate offsites, and group stays from a single dashboard.",
    detail: "Custom microsites & timelines",
  },
  {
    icon: Building,
    category: "Stays & Inventory",
    title: "Room Allocations",
    description: "Hold contracted rooms, define packages, and track live availability without touching a spreadsheet.",
    detail: "Real-time room tracking",
  },
  {
    icon: ClipboardCheck,
    category: "Guest Bookings",
    title: "Seamless Journey",
    description: "Guests view your branded event page, select their stay, and receive immediate confirmations.",
    detail: "Self-serve booking flow",
  },
  {
    icon: CreditCard,
    category: "Payments",
    title: "Direct Collections",
    description: "Securely process room payments and deposits from guests right when they book their stay.",
    detail: "Integrated processing",
  },
  {
    icon: Map,
    category: "Destinations",
    title: "Location Guides",
    description: "Guide your guests with rich venue details, local recommendations, and travel itineraries.",
    detail: "Venue & map integration",
  },
  {
    icon: LifeBuoy,
    category: "Travel Support",
    title: "Guest Assistance",
    description: "Provide dedicated support for guest inquiries, special requests, and seamless arrival coordination.",
    detail: "Concierge capabilities",
  }
];

function ProductPreview({ type }: { type: string }) {
  if (type === "inventory") return <div className="space-y-2"><div className="flex justify-between text-[10px]"><span>PALM GROVE RESORT</span><span className="text-[#eab308]">18 HELD</span></div><div className="rounded-lg border border-white/10 bg-white/10 p-2.5 text-[10px]"><div className="flex justify-between"><span>Garden suite</span><span>08 / 12</span></div><div className="mt-2 h-1 rounded-full bg-white/10"><div className="h-full w-2/3 rounded-full bg-[#eab308]" /></div></div><div className="flex items-center gap-2 text-[10px] text-white/60"><CalendarDays className="h-3 w-3" /> Booking closes 18 Sep</div></div>;
  if (type === "microsite") return <div className="flex gap-3"><div className="w-2/3 rounded-lg border border-white/10 bg-white/10 p-2.5"><p className="font-display text-base">Aanya &amp; Rishabh</p><p className="mt-1 text-[9px] text-white/55">GOA · 14—16 NOV</p><div className="mt-3 rounded bg-[#eab308] px-2 py-1.5 text-center text-[9px] font-medium text-black">BOOK YOUR STAY</div></div><div className="flex-1 rounded-lg border border-white/10 bg-white/10 p-2"><div className="h-10 rounded bg-white/20" /><div className="mt-2 h-1.5 w-full rounded bg-white/20" /><div className="mt-1 h-1.5 w-3/4 rounded bg-white/10" /></div></div>;
  if (type === "visibility") return <div className="flex items-center gap-4"><div className="grid h-16 w-16 place-items-center rounded-full border-4 border-[#eab308] text-center text-[10px]">73%<br /><span className="text-[7px] text-white/50">BOOKED</span></div><div className="space-y-2 text-[10px]"><p className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-[#eab308]" /> Priya booked 2 nights</p><p className="flex items-center gap-2 text-white/60"><CreditCard className="h-3 w-3" /> ₹1.28L received</p><p className="flex items-center gap-2 text-white/60"><Users className="h-3 w-3" /> 42 guests confirmed</p></div></div>;
  return <div className="flex items-center justify-between gap-2 text-center text-[9px]"><div><div className="grid h-8 w-8 place-items-center rounded-full border border-[#eab308] bg-[#eab308]/20">1</div><p className="mt-1">SELECT</p></div><div className="h-px flex-1 bg-white/20" /><div><div className="grid h-8 w-8 place-items-center rounded-full border border-[#eab308] bg-[#eab308]/20">2</div><p className="mt-1">DETAILS</p></div><div className="h-px flex-1 bg-white/20" /><div><div className="grid h-8 w-8 place-items-center rounded-full bg-[#eab308] text-black"><Check className="h-4 w-4" /></div><p className="mt-1">CONFIRMED</p></div></div>;
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [updateIndex, setUpdateIndex] = useState(0);
  const [isUpdateVisible, setIsUpdateVisible] = useState(false);
  const [eventId, setEventId] = useState<(typeof eventTypes)[number]["id"]>("wedding");
  const [phoneStep, setPhoneStep] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const eventType = eventTypes.find((item) => item.id === eventId) ?? eventTypes[0];
  const bookedPct = Math.round((eventType.roomsBooked / eventType.roomsTotal) * 100);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.15 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) { setIsUpdateVisible(false); return; }
    const interval = window.setInterval(() => {
      setUpdateIndex((current) => (current + 1) % liveUpdates.length);
      setIsUpdateVisible(true);
      window.setTimeout(() => setIsUpdateVisible(false), 5500);
    }, 15000);
    return () => window.clearInterval(interval);
  }, [isVisible]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.18;
    if (isAudioOn) audio.play().catch(() => setIsAudioOn(false));
    else audio.pause();
  }, [isAudioOn]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhoneStep((current) => (current + 1) % micrositeSteps.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [eventId]);

  const activeUpdate = liveUpdates[updateIndex];

  return (
    <section id="features" ref={sectionRef} className="relative bg-black text-white" aria-label="EventStay product features">
      <audio ref={audioRef} src={HOTEL_AMBIENCE} loop preload="none" />

      <div className="sticky top-0 h-screen overflow-hidden">
        <video className="absolute inset-0 h-full w-full object-cover" src={HOTEL_VIDEO} autoPlay muted={!isAudioOn} loop playsInline preload="metadata" aria-label="Hotel café and hospitality setting" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/80" />
        <div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/75 backdrop-blur-md md:left-10 md:top-10"><span className="h-1.5 w-1.5 rounded-full bg-[#eab308] shadow-[0_0_10px_#eab308]" /> Live event stay</div>
        <button type="button" onClick={() => setIsAudioOn((current) => !current)} aria-pressed={isAudioOn} aria-label={isAudioOn ? "Mute lobby sound" : "Unmute lobby sound"} className="absolute right-6 top-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/25 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.15em] text-white/80 backdrop-blur-md transition-colors hover:bg-black/45 md:right-10 md:top-10">
          {isAudioOn ? <Volume2 className="h-3.5 w-3.5" /> : <VolumeX className="h-3.5 w-3.5" />}{isAudioOn ? "Sound on" : "Sound muted"}
        </button>
      </div>

      <div className="relative z-10 -mt-[100vh] pb-36 pt-[58vh] md:pb-40 md:pt-[52vh]">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-12 max-w-4xl md:mb-16">
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-white/60"><span className="h-px w-10 bg-white/40" /> Product experience</span>
            <h2 className="font-display text-5xl leading-[0.92] tracking-tight md:text-7xl lg:text-[104px]">From venue atmosphere<br /><span className="text-white/60">to confirmed stays.</span></h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">EventStay helps you reserve, share, track, and confirm the stay experience around every celebration.</p>
            <Link href="/create-event" className="mt-7 inline-flex items-center gap-3 border-b border-white/70 pb-2 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:border-[#eab308] hover:text-[#eab308]">Create an event <ArrowUpRight className="h-4 w-4" /></Link>
          </div>

          <div className="mb-16 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Choose your event type</p>
            <div className="flex min-w-max gap-2 md:min-w-0 md:flex-wrap">
              {eventTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => { setEventId(type.id); setPhoneStep(0); }}
                  className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.12em] transition-colors ${
                    eventId === type.id
                      ? "border-[#eab308] bg-[#eab308] text-black"
                      : "border-white/15 bg-white/5 text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 rounded-[24px] border border-white/15 bg-[#0a0a0a]/92 p-6 shadow-2xl backdrop-blur-md md:p-8">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Booking progress</p>
                <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                  <h3 className="font-display text-4xl md:text-5xl">{eventType.roomsBooked} / {eventType.roomsTotal} rooms booked</h3>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#eab308]">{eventType.deadline}</span>
                </div>
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-[#eab308] transition-all duration-500" style={{ width: `${bookedPct}%` }} />
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Payments received</p>
                    <p className="mt-2 font-display text-2xl">{eventType.payments}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Guests</p>
                    <p className="mt-2 text-sm text-white/80">{eventType.guestsConfirmed} confirmed of {eventType.guestsInvited}</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Destination</p>
                    <p className="mt-2 flex items-center gap-2 text-sm text-white/80"><MapPin className="h-3.5 w-3.5 text-[#eab308]" /> {eventType.destination}</p>
                  </div>
                </div>
                <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/60">{eventType.guestCopy}</p>
              </div>
              <div>
                <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">Live activity</p>
                <ul className="space-y-3">
                  {activityFeed.map((item) => (
                    <li key={item.name} className="flex items-start justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
                      <div>
                        <p className="text-sm text-white">{item.name}</p>
                        <p className="mt-0.5 text-xs text-white/50">{item.action}</p>
                      </div>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-white/35">{item.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-6 md:space-y-10">
            {productMoments.map((moment, index) => {
              const imageOnRight = index % 2 === 0;
              const image = index === 0 ? eventType.image : moment.image;
              const alt = index === 0 ? eventType.alt : moment.alt;
              const stat = index === 0 ? `${eventType.roomsBooked} / ${eventType.roomsTotal} rooms` : index === 2 ? eventType.label : moment.stat;
              return (
                <article key={moment.number} className="group grid overflow-hidden rounded-[24px] border border-white/15 bg-[#0a0a0a]/92 shadow-2xl backdrop-blur-md lg:min-h-[460px] lg:grid-cols-2">
                  <div className={`relative min-h-[290px] overflow-hidden lg:min-h-full ${imageOnRight ? "lg:order-2" : ""}`}>
                    <img src={image} alt={alt} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-5 rounded-full border border-white/20 bg-black/35 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">{stat}</span>
                  </div>
                  <div className="flex flex-col justify-between p-7 md:p-10 lg:p-12">
                    <div>
                      <div className="mb-10 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.15em] text-white/45">
                        <span>{moment.number}</span>
                        <span>{moment.eyebrow}</span>
                      </div>
                      <h3 className="max-w-lg font-display text-4xl leading-[0.96] md:text-5xl">{moment.title}</h3>
                      <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">{index === 0 ? eventType.guestCopy : moment.description}</p>
                    </div>
                    <div className="mt-10">
                      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">Hover to preview</p>
                      <div className="origin-bottom rounded-xl border border-white/10 bg-white/[0.06] p-4 text-white/85 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#eab308]/40 group-hover:bg-white/[0.10]">
                        <ProductPreview type={moment.preview} />
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="mt-24 mb-12">
            <span className="mb-6 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
              <span className="h-px w-6 bg-white/30" /> Core Capabilities
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight">Built for every stage of your event.</h2>
            <p className="mt-6 text-white/60 text-base md:text-lg max-w-2xl leading-relaxed">From initial room blocks to the final guest arrival, EventStay provides the tools to manage group travel effortlessly.</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featureCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <article
                  key={idx}
                  className="group relative flex flex-col justify-between rounded-[24px] border border-white/10 bg-[#0a0a0a]/80 p-8 shadow-xl backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-white/30 hover:bg-[#111]/95 hover:shadow-2xl"
                >
                  <div className="absolute inset-0 overflow-hidden rounded-[24px] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute -inset-[100%] bg-gradient-to-br from-white/[0.04] to-transparent" />
                  </div>

                  <div className="relative z-10">
                    <div className="mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/60 transition-colors duration-500 group-hover:border-[#eab308]/40 group-hover:bg-[#eab308]/10 group-hover:text-[#eab308]">
                      <Icon className="h-6 w-6" />
                    </div>
                    
                    <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 transition-colors duration-500 group-hover:text-[#eab308]/80">
                      {card.category}
                    </p>
                    
                    <h3 className="mb-5 font-display text-3xl tracking-tight text-white transition-colors duration-500 group-hover:text-white">
                      {card.title}
                    </h3>
                    
                    <p className="text-sm leading-relaxed text-white/50 transition-colors duration-500 group-hover:text-white/70">
                      {card.description}
                    </p>
                  </div>
                  
                  <div className="relative z-10 mt-10 border-t border-white/10 pt-5 transition-colors duration-500 group-hover:border-white/20">
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30 transition-colors duration-500 group-hover:text-white/60">
                      → {card.detail}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>

          <div id="guest-experience" className="mt-16 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">What guests see</p>
              <h3 className="mt-4 font-display text-4xl md:text-5xl">The microsite, from cover image to Book your stay.</h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/60">A phone-sized path through the destination story, stay options, and a single booking action.</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {micrositeSteps.map((step, index) => (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setPhoneStep(index)}
                    className={`rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                      phoneStep === index ? "border-[#eab308] text-[#eab308]" : "border-white/15 text-white/50"
                    }`}
                  >
                    {step.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-center lg:justify-end">
              <div className="relative w-[260px] rounded-[36px] border border-white/20 bg-black p-3 shadow-2xl">
                <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-white/10" />
                <div className="overflow-hidden rounded-[28px] bg-[#111]">
                  {phoneStep === 0 && (
                    <div className="relative h-[520px]">
                      <img src={eventType.cover} alt="" className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                      <div className="absolute bottom-0 p-5">
                        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/70">{eventType.destination} · {eventType.dates}</p>
                        <p className="mt-2 font-display text-3xl">{eventType.couple}</p>
                        <p className="mt-2 text-xs text-white/70">{eventType.venue}</p>
                      </div>
                    </div>
                  )}
                  {phoneStep === 1 && (
                    <div className="flex h-[520px] flex-col p-5">
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/40">Stay options</p>
                      <div className="mt-4 space-y-3">
                        {["Sea View Room", "Garden Villa", "Family Suite"].map((room, index) => (
                          <div key={room} className={`rounded-2xl border p-4 ${index === 0 ? "border-[#eab308]/60 bg-[#eab308]/10" : "border-white/10 bg-white/5"}`}>
                            <p className="text-sm">{room}</p>
                            <p className="mt-1 text-xs text-white/50">{index === 0 ? "4 remaining" : index === 1 ? "2 remaining" : "Waitlist"}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {phoneStep === 2 && (
                    <div className="relative flex h-[520px] flex-col justify-end p-5">
                      <img src={eventType.cover} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
                      <div className="relative rounded-2xl border border-white/15 bg-black/70 p-4 backdrop-blur-md">
                        <p className="font-display text-2xl">Book your stay</p>
                        <p className="mt-2 text-xs text-white/60">{eventType.roomsBooked} rooms already held for this event.</p>
                        <div className="mt-4 rounded-full bg-[#eab308] px-4 py-3 text-center text-xs font-medium uppercase tracking-[0.12em] text-black">Confirm booking</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-5 py-3">
            <p className="text-center text-xs uppercase tracking-[0.16em] text-white/70">Built for weddings, offsites, conferences, and group stays</p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 z-40 border-t border-white/10 bg-black/85 px-6 py-4 backdrop-blur-xl md:px-12">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="font-display text-2xl md:text-3xl">Your event deserves one place for every stay.</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/create-event" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#eab308] px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-black">Create an event <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href="#guest-experience" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white">View guest experience <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>

      <div aria-live="polite" className={`pointer-events-none fixed bottom-24 right-5 z-50 w-[min(360px,calc(100vw-40px))] transition-all duration-500 ${isUpdateVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
        <div className="rounded-2xl border border-white/15 bg-[#111]/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex gap-3">
            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${activeUpdate.tone === "inventory" ? "bg-amber-300" : "bg-[#eab308]"} shadow-[0_0_10px_currentColor]`} />
            <div>
              <p className="text-sm font-medium text-white">{activeUpdate.label}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white/50">{activeUpdate.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
