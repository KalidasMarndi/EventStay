"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Bookmark,
  MapPin,
  ArrowRight,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Plane,
  FileCheck,
  FileText,
  Crown,
  Car,
  Building,
  Headphones,
  CalendarDays,
  ShieldCheck,
  Users,
  Globe,
  BadgeCheck,
} from "lucide-react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import { destinations as rawDestinations } from "@/features/home/data/destinations";

const destinations = rawDestinations.map((d) => ({
  id: d.id,
  country: d.country,
  title: d.name.toUpperCase(),
  tagline: d.tagline,
  category: d.category,
  description: d.description,
  image: d.image,
  heroImage: d.heroImage || d.image,
  rating: d.rating,
}));

type Dest = (typeof destinations)[number];

/* ═══════════════════════════════════════════════════════════════════
   TRAVEL SERVICES DATA
   ═══════════════════════════════════════════════════════════════════ */
const travelServices = [
  {
    icon: Plane,
    label: "Charter & Commercial",
    title: "Flight Support",
    description: "Group flight bookings, private charters, and seamless arrival coordination.",
    action: "Request Quote",
    colSpan: 1,
    rowSpan: 1,
    variant: "standard" as const,
    href: "/travel-support/flights",
  },
  {
    icon: FileText,
    label: "Compliance",
    title: "Visa & Documentation",
    description: "Hassle-free visa processing and travel document checks for international groups.",
    action: "Check Req",
    colSpan: 1,
    rowSpan: 1,
    variant: "compact" as const,
    href: "/travel-support/visa",
  },
  {
    icon: Crown,
    label: "Fast-Track",
    title: "Airport VIP Services",
    description: "Meet and greet, priority immigration, and exclusive lounge access globally.",
    action: "Learn More",
    colSpan: 2,      // wide card
    rowSpan: 1,
    variant: "hero" as const,
    href: "/travel-support/airport-vip",
  },
  {
    icon: Car,
    label: "Logistics",
    title: "Ground Transfers",
    description: "Executive sedans, group coaches, and seamless hotel-to-venue logistics.",
    action: "Book Now",
    colSpan: 1,
    rowSpan: 1,
    variant: "standard" as const,
    href: "/travel-support/transfers",
  },
  {
    icon: Building,
    label: "Accommodation",
    title: "Premium Stays",
    description: "Handpicked hotels and resorts for comfort, convenience, and unforgettable stays.",
    action: "View Stays",
    colSpan: 1,
    rowSpan: 1,
    variant: "standard" as const,
    href: "/travel-support/stays",
  },
  {
    icon: Headphones,
    label: "Assistance",
    title: "24/7 Travel Support",
    description: "Round-the-clock assistance for you and your group, anytime, anywhere.",
    action: "Get Support",
    colSpan: 2,      // wide card
    rowSpan: 1,
    variant: "hero" as const,
    href: "/travel-support/assistance",
  },
  {
    icon: CalendarDays,
    label: "Experiences",
    title: "Events & Experiences",
    description: "Curated activities, gala dinners, and local experiences tailored for your group.",
    action: "Explore",
    colSpan: 1,
    rowSpan: 1,
    variant: "compact" as const,
    href: "/destinations",
  },
];

const trustItems = [
  { icon: ShieldCheck, title: "Secure & Reliable", desc: "Your safety and privacy are our top priority." },
  { icon: Users, title: "Group Travel Experts", desc: "Specialized in managing groups of all sizes." },
  { icon: BadgeCheck, title: "Best Price Guarantee", desc: "Premium experiences at the best possible value." },
  { icon: Globe, title: "Global Reach", desc: "Destinations and partners across the world." },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN SECTION
   ═══════════════════════════════════════════════════════════════════ */
export function PremiumDestinationsSection() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  const [activeDest, setActiveDest] = useState<Dest>(destinations[0]);
  const [activeIndex, setActiveIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Marquee settings
  const speed = 35;
  const xRef = useRef(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useAnimationFrame((time, delta) => {
    if (isMobile) return;
    if (!contentRef.current) return;

    const moveBy = (speed * delta) / 1000;
    xRef.current -= moveBy;

    const singleSetWidth = contentRef.current.scrollWidth / 2;

    if (singleSetWidth > 0 && Math.abs(xRef.current) >= singleSetWidth) {
      xRef.current += singleSetWidth;
    }

    contentRef.current.style.transform = `translateX(${xRef.current}px)`;

    const logicalCardWidth = 308;
    const triggerOffset = Math.abs(xRef.current) + 120;
    const activeIdx = Math.floor((triggerOffset % singleSetWidth) / logicalCardWidth);
    const safeIdx = Math.max(0, Math.min(destinations.length - 1, activeIdx));

    if (destinations[safeIdx].id !== activeDest.id) {
      setActiveDest(destinations[safeIdx]);
      setActiveIndex(safeIdx);
    }
  });

  const handleExplore = useCallback(
    (dest: Dest) => {
      router.push(`/destinations/${dest.id}`);
    },
    [router]
  );

  /* ─── Manual Prev / Next ─── */
  const goTo = useCallback(
    (idx: number) => {
      const safeIdx = ((idx % destinations.length) + destinations.length) % destinations.length;
      setActiveDest(destinations[safeIdx]);
      setActiveIndex(safeIdx);
    },
    []
  );
  const handlePrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const handleNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  const allCarouselCards = [...destinations, ...destinations];

  const formatTitle = (title: string) => {
    const words = title.split(" ");
    if (words.length > 1) {
      return (
        <>
          {words[0]}
          <br />
          {words.slice(1).join(" ")}
        </>
      );
    }
    return title;
  };

  return (
    <>
      <section className="relative w-full bg-[#030712] overflow-hidden text-white">

        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeDest.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <img
              src={activeDest.heroImage}
              alt={activeDest.title}
              className="w-full h-full object-cover opacity-60"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#030712]/90 via-[#030712]/50 to-transparent" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#030712]/80 via-transparent to-[#030712]/30" />

        <div className="absolute top-0 left-1/4 w-[50%] h-[400px] bg-blue-500/8 blur-[120px] rounded-full mix-blend-screen z-0 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 w-[30%] h-[300px] bg-[#eab308]/5 blur-[120px] rounded-full mix-blend-screen z-0 pointer-events-none" />

        <div className="relative z-10 w-full flex flex-col md:flex-row pb-40 md:pb-56 min-h-[800px] md:min-h-[90vh]">

          <div className="relative w-full md:w-[42%] h-[50vh] md:h-full flex flex-col justify-center p-8 md:p-16 lg:pl-20 shrink-0 mt-10 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={`text-${activeDest.id}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <span className="flex items-center gap-3 text-xs font-mono tracking-[0.2em] text-[#eab308] uppercase mb-5 drop-shadow-md">
                  <span className="w-8 h-px bg-[#eab308]" />
                  {activeDest.country}
                </span>

                <h2 className="text-6xl md:text-7xl lg:text-[84px] xl:text-[96px] font-display uppercase leading-[0.85] tracking-tight mb-8 drop-shadow-2xl">
                  {formatTitle(activeDest.title)}
                </h2>

                <p className="text-white/80 max-w-sm mb-12 text-sm md:text-base leading-relaxed line-clamp-4 drop-shadow-lg">
                  {activeDest.description}
                </p>

                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    className="w-14 h-14 rounded-full bg-[#eab308] flex items-center justify-center text-black hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(234,179,8,0.3)]"
                    aria-label="Save destination"
                  >
                    <Bookmark className="w-6 h-6 fill-current" />
                  </button>
                  <Link
                    href={`/destinations/${activeDest.id}`}
                    className="flex items-center h-14 px-8 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300 backdrop-blur-sm bg-white/5"
                  >
                    Explore Destinations
                    <ArrowRight className="inline-block w-4 h-4 ml-3" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center gap-4 mt-14">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black hover:border-white hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="Previous destination"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-baseline gap-1.5">
                <span className="font-display text-4xl text-white tabular-nums">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-white/30 text-base font-mono mx-1">/</span>
                <span className="text-white/30 text-base font-mono">
                  {String(destinations.length).padStart(2, "0")}
                </span>
              </div>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black hover:border-white hover:scale-110 active:scale-95 transition-all duration-300"
                aria-label="Next destination"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative w-full md:w-[58%] h-[50vh] md:h-full flex items-center overflow-hidden">

            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#030712]/60 to-transparent z-20 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#030712]/80 to-transparent z-20 pointer-events-none" />

            <div className="flex items-center w-full h-full py-20 px-6 md:px-0 overflow-visible">
              <div
                ref={contentRef}
                className={`flex items-center gap-8 w-max ${isMobile ? "overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" : ""}`}
              >
                {allCarouselCards.map((dest, i) => {
                  const isActive = activeDest.id === dest.id;
                  return (
                    <DestinationCard
                      key={`${dest.id}-${i}`}
                      dest={dest}
                      isActive={isActive}
                      isMobile={isMobile}
                      onExplore={handleExplore}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none">
          <div className="absolute bottom-48 left-1/2 -translate-x-1/2 w-[70%] h-[200px] bg-blue-900/15 blur-[140px] rounded-full" />
          <div className="absolute bottom-56 left-1/3 w-[40%] h-[120px] bg-[#eab308]/5 blur-[100px] rounded-full" />
          <div className="h-64 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent" />
        </div>
      </section>


    </>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   DESTINATION CARD
   ═══════════════════════════════════════════════════════════════════ */
function DestinationCard({
  dest,
  isActive,
  isMobile,
  onExplore,
}: {
  dest: Dest;
  isActive: boolean;
  isMobile: boolean;
  onExplore: (dest: Dest) => void;
}) {
  return (
    <article
      className={`
        relative overflow-hidden shrink-0 group rounded-[24px]
        transition-all duration-700 ease-[0.25,0.1,0.25,1] border
        ${isMobile
          ? "w-[280px] h-[400px] snap-center scale-100 opacity-100 border-white/15 z-10 bg-black/20 backdrop-blur-sm"
          : (isActive
             ? "w-[260px] h-[380px] scale-[1.35] z-50 border-[#eab308]/60 shadow-[0_0_40px_rgba(234,179,8,0.2)] opacity-100 bg-black/10 backdrop-blur-sm"
             : "w-[260px] h-[380px] scale-100 z-10 border-white/10 opacity-60 hover:opacity-100 hover:border-white/25 bg-black/10 backdrop-blur-sm")
        }
      `}
    >
      <div className="absolute inset-0 overflow-hidden rounded-[24px]">
        <img
          src={dest.image}
          alt={dest.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-[2s] ease-[0.25,0.1,0.25,1] group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Glass gradient — lighter for more transparency */}
      <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-90' : 'opacity-70 group-hover:opacity-90'} bg-gradient-to-t from-black/80 via-black/20 to-transparent`} />

      {/* Category badge */}
      <div className="absolute top-5 left-5">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[8px] font-mono uppercase tracking-widest text-white/90">
          {dest.category}
        </span>
      </div>

      {/* Rating badge */}
      {dest.rating && (
        <div className="absolute top-5 right-5">
          <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#eab308]/20 backdrop-blur-md border border-[#eab308]/30 text-[9px] font-mono text-[#eab308]">
            ★ {dest.rating}
          </span>
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 flex flex-col justify-end p-5">
        <div className="flex items-center gap-2 mb-1.5">
          <MapPin className="w-3 h-3 text-[#eab308]" />
          <span className="text-[9px] font-mono tracking-widest text-white/80 uppercase">
            {dest.country}
          </span>
        </div>

        <h3 className={`font-display text-white leading-[1.05] uppercase transition-all duration-700 ${isActive ? 'text-2xl mb-1' : 'text-xl'}`}>
          {dest.title}
        </h3>

        {/* ─── HOVER REVEAL ─── */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[0.25,0.1,0.25,1]">
          <div className="overflow-hidden">
            <div className="pt-3">
              <div className="h-px w-full bg-gradient-to-r from-[#eab308]/60 to-transparent mb-3" />
              <p className="text-[11px] leading-relaxed text-white/60 line-clamp-3 mb-3">
                {dest.description}
              </p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onExplore(dest);
                }}
                className="inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#eab308] hover:text-white transition-colors duration-300"
                aria-label={`Explore ${dest.title}`}
              >
                Explore
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
