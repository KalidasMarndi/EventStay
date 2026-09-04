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
  ShieldCheck,
  Award,
  Globe,
  Grid,
} from "lucide-react";
import Link from "next/link";
import { InventoryCapabilitySection } from "./InventoryCapabilitySection";

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
    icon: Plane,
    category: "Arrival & Departure",
    title: "Airport VIP Services",
    description: "Fast-track security, exclusive lounge access, personal meet-and-greet and priority airport assistance.",
    detail: "VIP LOUNGES",
    image: "https://images.unsplash.com/photo-1540339832862-4745ea79c7ee?auto=format&fit=crop&w=1600&q=85", // luxury terminal
    span: "col-span-12 lg:col-span-6",
    layout: "horizontal",
    number: "01"
  },
  {
    icon: ClipboardCheck,
    category: "Travel Compliance",
    title: "Visa & Documentation",
    description: "End-to-end assistance for group visas, permits, documentation and travel compliance.",
    detail: "GLOBAL VISAS",
    image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?auto=format&fit=crop&w=800&q=85", // travel documents/desk
    span: "col-span-12 lg:col-span-6",
    layout: "horizontal",
    number: "02"
  },
  {
    icon: MapPin,
    category: "Logistics",
    title: "Ground Transfers",
    description: "Premium chauffeurs, private cars, group coaches and seamless logistics from arrival to departure.",
    detail: "CHAUFFEURS",
    image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=85", // luxury car
    span: "col-span-12 md:col-span-4",
    layout: "compact",
    number: "03"
  },
  {
    icon: Building,
    category: "Accommodations",
    title: "Premium Stays",
    description: "Handpicked hotels, resorts, villas and accommodations for comfort, convenience and unforgettable stays.",
    detail: "LUXURY STAYS",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85", // luxury resort
    span: "col-span-12 md:col-span-4",
    layout: "vertical",
    number: "04"
  },
  {
    icon: LifeBuoy,
    category: "Concierge",
    title: "24/7 Travel Support",
    description: "Round-the-clock assistance before, during and after the journey for your peace of mind.",
    detail: "ALWAYS ON",
    image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?auto=format&fit=crop&w=800&q=85", // concierge desk
    span: "col-span-12 md:col-span-4",
    layout: "compact",
    number: "05"
  },
  {
    icon: CalendarDays,
    category: "Experiences",
    title: "Events & Experiences",
    description: "Curated activities, gala dinners, entertainment and local experiences tailored to the group.",
    detail: "CURATED EVENTS",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85", // elegant dinner
    span: "col-span-12",
    layout: "footer",
    number: "06"
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
    <>
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

          </div>
        </div>
      </section>

      <InventoryCapabilitySection />

      <section className="relative w-full overflow-hidden bg-[#faf9f6] pb-20 pt-16 md:pb-28 md:pt-24 border-t border-black/5">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2400&q=85" alt="Luxury destination" className="h-full w-full object-cover object-center opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-[#faf9f6]/95" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-white/60" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
          <div className="mb-10 text-center mx-auto max-w-3xl flex flex-col items-center">
            <span className="mb-4 inline-flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#d97706] font-medium">
              OUR PRODUCTS
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-zinc-900 drop-shadow-sm">Everything your <span className="text-[#d97706] italic pr-1">event</span> needs.</h2>
            <p className="mt-5 text-zinc-600 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">From planning to execution, we provide end-to-end solutions for unforgettable events and seamless travel experiences.</p>
          </div>

          <div className="mb-12 flex flex-wrap items-center justify-center gap-3 text-xs tracking-wide">
            <button className="flex items-center gap-2 rounded-xl bg-zinc-900 px-5 py-2.5 text-white shadow-xl shadow-black/10 transition-transform hover:scale-105"><div className="grid grid-cols-2 gap-0.5"><div className="h-1.5 w-1.5 bg-[#eab308] rounded-sm"/><div className="h-1.5 w-1.5 bg-[#eab308] rounded-sm"/><div className="h-1.5 w-1.5 bg-[#eab308] rounded-sm"/><div className="h-1.5 w-1.5 bg-[#eab308] rounded-sm"/></div> All Products</button>
            <button className="flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur-md px-5 py-2.5 text-zinc-600 border border-black/5 hover:bg-white shadow-sm transition-all hover:scale-105"><CalendarDays className="h-3.5 w-3.5 text-zinc-400" /> Planning</button>
            <button className="flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur-md px-5 py-2.5 text-zinc-600 border border-black/5 hover:bg-white shadow-sm transition-all hover:scale-105"><Plane className="h-3.5 w-3.5 text-zinc-400" /> Travel</button>
            <button className="flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur-md px-5 py-2.5 text-zinc-600 border border-black/5 hover:bg-white shadow-sm transition-all hover:scale-105"><Building className="h-3.5 w-3.5 text-zinc-400" /> Stays</button>
            <button className="flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur-md px-5 py-2.5 text-zinc-600 border border-black/5 hover:bg-white shadow-sm transition-all hover:scale-105"><MapPin className="h-3.5 w-3.5 text-zinc-400" /> Experiences</button>
            <button className="flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur-md px-5 py-2.5 text-zinc-600 border border-black/5 hover:bg-white shadow-sm transition-all hover:scale-105"><LifeBuoy className="h-3.5 w-3.5 text-zinc-400" /> Support</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {featureCards.map((card, idx) => {
              const Icon = card.icon;
              
              if (card.layout === "horizontal") {
                return (
                  <article key={idx} className={`${card.span} group relative overflow-hidden rounded-[24px] border border-white/60 bg-[#faf9f6]/95 backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#eab308]/40 hover:shadow-2xl flex flex-col md:flex-row min-h-[320px] md:min-h-[380px]`}>
                    <div className="md:w-1/2 flex flex-col justify-center p-8 lg:p-12 relative z-10 order-2 md:order-1">
                      <div className="flex items-center gap-4 mb-6">
                        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#d97706]">{card.number}</p>
                        <div className="h-px w-6 bg-black/10" />
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d97706] font-medium">{card.category}</p>
                      </div>
                      
                      <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-black/5 bg-white shadow-sm text-zinc-700 transition-all duration-500 group-hover:border-[#eab308]/30 group-hover:bg-[#fef9c3] group-hover:text-[#d97706]">
                        <Icon className="h-5 w-5" />
                      </div>
                      
                      <h3 className="mb-4 font-display text-4xl tracking-tight text-zinc-900">{card.title}</h3>
                      <p className="mb-8 text-sm leading-relaxed text-zinc-600 max-w-sm">{card.description}</p>
                      
                      <Link href="/create-event" className="mt-auto inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-500 transition-colors group-hover:text-[#d97706]">
                        Explore {card.category.split(' ')[0]} <ArrowUpRight className="h-3 w-3" />
                      </Link>
                    </div>
                    
                    <div className="md:w-1/2 relative overflow-hidden h-[240px] md:h-auto border-b md:border-b-0 md:border-l border-black/5 order-1 md:order-2">
                      <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-black/40 via-black/10 to-transparent opacity-60" />
                      <div className="absolute bottom-6 right-6 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        <span className="rounded-full bg-white/90 backdrop-blur-md border border-white/50 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-800 shadow-sm">✓ {card.detail}</span>
                      </div>
                    </div>
                  </article>
                );
              }
              
              if (card.layout === "vertical") {
                return (
                  <article key={idx} className={`${card.span} group relative overflow-hidden rounded-[24px] border border-white/60 bg-[#faf9f6]/95 backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#eab308]/40 hover:shadow-2xl min-h-[380px] flex flex-col`}>
                    <div className="p-8 lg:p-10 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-8">
                        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/5 bg-white shadow-sm text-zinc-700 transition-all duration-500 group-hover:border-[#eab308]/30 group-hover:text-[#d97706]">
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d97706] mb-1">{card.category}</p>
                          <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">{card.number}</p>
                        </div>
                      </div>
                      
                      <h3 className="mb-3 font-display text-3xl tracking-tight text-zinc-900">{card.title}</h3>
                      <p className="mb-6 text-sm leading-relaxed text-zinc-600">{card.description}</p>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between border-t border-black/5">
                        <Link href="/create-event" className="font-mono text-[9px] uppercase tracking-[0.15em] text-zinc-500 transition-colors group-hover:text-[#d97706]">Explore Stays</Link>
                        <span className="opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded bg-[#fef9c3] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.1em] text-[#d97706] border border-[#eab308]/20">{card.detail}</span>
                      </div>
                    </div>
                    
                    <div className="h-[180px] relative overflow-hidden border-t border-black/5">
                      <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                  </article>
                );
              }
              
              if (card.layout === "compact") {
                return (
                  <article key={idx} className={`${card.span} group relative overflow-hidden rounded-[24px] border border-white/60 bg-[#faf9f6]/95 backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#eab308]/40 hover:shadow-2xl min-h-[300px] flex flex-col`}>
                    <div className="p-8 flex-1 flex flex-col z-10 relative bg-gradient-to-b from-[#faf9f6] via-[#faf9f6]/90 to-transparent">
                      <div className="flex items-center gap-3 mb-6">
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-400">{card.number}</p>
                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d97706] font-medium">{card.category}</p>
                      </div>
                      
                      <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-black/5 text-zinc-700 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:text-[#d97706]">
                        <Icon className="h-4 w-4" />
                      </div>
                      
                      <h3 className="mb-3 font-display text-2xl tracking-tight text-zinc-900">{card.title}</h3>
                      <p className="text-xs leading-relaxed text-zinc-600">{card.description}</p>
                    </div>
                    
                    <div className="absolute inset-0 top-1/3 overflow-hidden rounded-b-[24px]">
                      <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                      
                      <div className="absolute bottom-6 left-6 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                        <Link href="/create-event" className="font-mono text-[9px] uppercase tracking-[0.15em] text-white">Explore <ArrowUpRight className="inline h-3 w-3" /></Link>
                      </div>
                    </div>
                  </article>
                );
              }
              
              // footer layout
              return (
                <article key={idx} className={`${card.span} group relative overflow-hidden rounded-[24px] border border-white/60 bg-[#faf9f6]/95 backdrop-blur-xl shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#eab308]/40 hover:shadow-2xl min-h-[300px] flex items-center p-8 lg:p-12 mt-2`}>
                  <div className="absolute inset-0 right-1/2 overflow-hidden hidden md:block">
                     <img src={card.image} alt={card.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#faf9f6]/80 to-[#faf9f6]/100" />
                  </div>
                  
                  <div className="relative z-10 w-full md:w-1/2 md:ml-auto md:pl-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d97706] font-medium">{card.category}</p>
                      <div className="h-px w-8 bg-black/10" />
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">{card.number}</p>
                    </div>
                    
                    <h3 className="mb-4 font-display text-4xl tracking-tight text-zinc-900">{card.title}</h3>
                    <p className="mb-8 text-sm leading-relaxed text-zinc-600">{card.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-5">
                      <Link href="/create-event" className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-6 py-3 text-[10px] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-[#d97706] hover:shadow-lg hover:-translate-y-0.5">
                        {card.detail} <ArrowUpRight className="h-3 w-3" />
                      </Link>
                      <div className="flex items-center gap-2 text-zinc-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                        <Icon className="h-3.5 w-3.5 text-[#d97706]" />
                        <span className="font-mono text-[9px] uppercase tracking-[0.1em]">Event assistance</span>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Trust Strip */}
          <div className="mt-16 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/60 bg-[#faf9f6]/95 p-6 backdrop-blur-xl shadow-sm md:px-10 md:py-8 lg:flex-nowrap">
              
              <div className="flex w-full items-center gap-4 lg:w-auto">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-black/5 text-[#d97706]">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg tracking-tight text-zinc-900">Secure & Reliable</p>
                  <p className="text-xs text-zinc-500">Bank-level payment security</p>
                </div>
              </div>
              
              <div className="hidden h-10 w-px bg-black/5 lg:block" />
              
              <div className="flex w-full items-center gap-4 lg:w-auto">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-black/5 text-[#d97706]">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg tracking-tight text-zinc-900">Group Experts</p>
                  <p className="text-xs text-zinc-500">Dedicated event coordinators</p>
                </div>
              </div>
              
              <div className="hidden h-10 w-px bg-black/5 lg:block" />
              
              <div className="flex w-full items-center gap-4 lg:w-auto">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-black/5 text-[#d97706]">
                  <Award className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg tracking-tight text-zinc-900">Best Price Guarantee</p>
                  <p className="text-xs text-zinc-500">Negotiated wholesale rates</p>
                </div>
              </div>
              
              <div className="hidden h-10 w-px bg-black/5 lg:block" />
              
              <div className="flex w-full items-center gap-4 lg:w-auto">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm border border-black/5 text-[#d97706]">
                  <Globe className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg tracking-tight text-zinc-900">Global Reach</p>
                  <p className="text-xs text-zinc-500">50+ Worldwide destinations</p>
                </div>
              </div>
              
            </div>
          </div>
          
          {/* Closing Statement */}
          <div className="mt-24 mb-16 text-center">
             <h2 className="font-display text-5xl md:text-6xl tracking-tight text-zinc-900">Everything handled.<br/><span className="text-zinc-400 italic">Nothing overlooked.</span></h2>
             <p className="mt-6 text-zinc-600 max-w-xl mx-auto">From the moment your guests receive their invite until they arrive safely back home, EventStay ensures a flawless, high-end travel experience.</p>
             <div className="mt-10 flex items-center justify-center gap-4">
                <Link href="/create-event" className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 px-8 py-4 text-[11px] font-medium uppercase tracking-[0.15em] text-white transition-all hover:bg-[#d97706] hover:shadow-xl hover:-translate-y-1">Start Planning Now <ArrowUpRight className="h-4 w-4" /></Link>
             </div>
          </div>

        </div>
      </section>

      <div className="sticky bottom-0 z-40 border-t border-black/5 bg-white/95 px-6 py-4 backdrop-blur-xl md:px-12 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <div className="mx-auto flex max-w-[1400px] flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p className="font-display text-xl md:text-2xl text-zinc-900">Your event deserves one place for every stay.</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/create-event" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#d97706] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-white hover:bg-zinc-900 transition-colors">Create an event <ArrowUpRight className="h-4 w-4" /></Link>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 bg-zinc-50 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600 hover:bg-white hover:border-black/20 transition-colors">Back to top</button>
          </div>
        </div>
      </div>

      <div aria-live="polite" className={`pointer-events-none fixed bottom-24 right-5 z-50 w-[min(360px,calc(100vw-40px))] transition-all duration-500 ${isUpdateVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
        <div className="rounded-2xl border border-black/5 bg-white/95 p-4 shadow-2xl backdrop-blur-xl">
          <div className="flex gap-3">
            <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${activeUpdate.tone === "inventory" ? "bg-amber-300" : "bg-[#d97706]"} shadow-[0_0_10px_currentColor]`} />
            <div>
              <p className="text-sm font-medium text-zinc-900">{activeUpdate.label}</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-zinc-500">{activeUpdate.detail}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
