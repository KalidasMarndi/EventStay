"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowDown, Search } from "lucide-react";
import { destinations, type Destination } from "@/features/home/data/destinations";

export function DestinationsExperience() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Auto-scroll logic for columns
  const useAutoScroll = (direction: "up" | "down", speed: number = 0.5) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const exactScroll = useRef<number | null>(null);

    useEffect(() => {
      let animationId: number;
      
      const scroll = () => {
        if (ref.current) {
          const el = ref.current;
          
          if (isHovered) {
            exactScroll.current = el.scrollTop;
          } 
          else {
            if (exactScroll.current === null) {
              exactScroll.current = el.scrollTop;
            }

            if (direction === "up") {
              exactScroll.current += speed;
              if (exactScroll.current >= el.scrollHeight / 2) {
                exactScroll.current -= el.scrollHeight / 2;
              }
            } else {
              exactScroll.current -= speed;
              if (exactScroll.current <= 0) {
                exactScroll.current += el.scrollHeight / 2;
              }
            }
            el.scrollTop = exactScroll.current;
          }
        }
        animationId = requestAnimationFrame(scroll);
      };
      
      if (direction === "down" && ref.current && ref.current.scrollTop === 0) {
        ref.current.scrollTop = ref.current.scrollHeight / 2;
        exactScroll.current = ref.current.scrollTop;
      }

      animationId = requestAnimationFrame(scroll);
      return () => cancelAnimationFrame(animationId);
    }, [direction, speed, isHovered]);

    return { 
      ref, 
      onMouseEnter: () => setIsHovered(true), 
      onMouseLeave: () => setIsHovered(false),
      onTouchStart: () => setIsHovered(true),
      onTouchEnd: () => setIsHovered(false)
    };
  };

  const scrollProps1 = useAutoScroll("up", 0.6);
  const scrollProps2 = useAutoScroll("down", 0.6);
  const scrollProps3 = useAutoScroll("up", 0.7);

  const [cardsRevealed, setCardsRevealed] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Scroll-reveal for cards section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsRevealed(true);
        }
      },
      { threshold: 0.15 }
    );
    if (cardsRef.current) observer.observe(cardsRef.current);
    return () => observer.disconnect();
  }, []);

  const openDetail = (id: string) => {
    router.push(`/destinations/${id}`);
  };

  const scrollToCards = () => {
    cardsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const col1 = filteredDestinations.filter((_, i) => i % 3 === 0);
  const col2 = filteredDestinations.filter((_, i) => i % 3 === 1);
  const col3 = filteredDestinations.filter((_, i) => i % 3 === 2);

  return (
    <div className="font-figtree bg-black text-white min-h-screen relative">
      {/* ════════════════════════════════════════════════════════════════════
          FIXED BACKGROUND
          ════════════════════════════════════════════════════════════════════ */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <video
          src="/Videos/HotelLobby.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-60"
        />
        {/* Gradients to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90" />
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          HERO SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden z-10">

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-16 text-center">
          <span className="inline-block text-[11px] font-mono uppercase tracking-[0.3em] text-white/50 mb-8">
            Explore EventStay Destinations
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display text-white leading-[1.05] tracking-tight mb-8">
            Destinations made
            <br />
            for shared stories.
          </h1>

          <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-14">
            From timeless wedding destinations to high-energy conference hubs,
            EventStay brings every group journey together.
          </p>

          <button
            onClick={scrollToCards}
            className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-wider text-black bg-white hover:bg-orange-400 hover:text-white transition-colors duration-300 px-10 py-4 rounded-full group"
          >
            Explore Destinations
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">
            Scroll
          </span>
          <ArrowDown className="w-4 h-4 text-white/40" />
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════════
          DESTINATION CARDS SECTION
          ════════════════════════════════════════════════════════════════════ */}
      <section
        ref={cardsRef}
        className="relative z-10 py-24 md:py-32 px-6 md:px-16 lg:px-24"
      >
        {/* Section header */}
        <div className="max-w-7xl mx-auto mb-16">
          <span className="block text-[11px] font-mono uppercase tracking-[0.3em] text-orange-400/80 mb-4">
            {String(destinations.length).padStart(2, "0")} Curated Destinations
          </span>
          <h2 className="text-3xl md:text-5xl font-display text-white leading-tight mb-4">
            Where will your story begin?
          </h2>
          <p className="text-base text-white/50 max-w-xl">
            Click any destination to explore its full story, key details, and
            start planning your group journey.
          </p>
          <div className="mt-8 relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input 
              type="text"
              placeholder="Search destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder:text-white/40 focus:outline-none focus:border-orange-400 transition-colors"
            />
          </div>
        </div>

        {/* Infinite Scrolling Masonry Grid with Manual Scroll Support */}
        <div 
          className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8 h-[85vh] min-h-[900px] overflow-hidden"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)",
            maskImage: "linear-gradient(to bottom, transparent, black 5%, black 95%, transparent)"
          }}
        >
          {/* Column 1 */}
          <div 
            {...scrollProps1}
            className="flex flex-col gap-6 lg:gap-8 overflow-y-auto hide-scrollbar"
          >
            {[...col1, ...col1, ...col1, ...col1].map((dest, i) => (
              <DestinationCard key={`c1-${dest.id}-${i}`} dest={dest} index={destinations.findIndex(d => d.id === dest.id)} openDetail={openDetail} cardsRevealed={cardsRevealed} />
            ))}
          </div>

          {/* Column 2 */}
          <div 
            {...scrollProps2}
            className="hidden md:flex flex-col gap-6 lg:gap-8 overflow-y-auto hide-scrollbar" 
          >
            {[...col2, ...col2, ...col2, ...col2].map((dest, i) => (
              <DestinationCard key={`c2-${dest.id}-${i}`} dest={dest} index={destinations.findIndex(d => d.id === dest.id)} openDetail={openDetail} cardsRevealed={cardsRevealed} />
            ))}
          </div>

          {/* Column 3 */}
          <div 
            {...scrollProps3}
            className="hidden xl:flex flex-col gap-6 lg:gap-8 overflow-y-auto hide-scrollbar"
          >
            {[...col3, ...col3, ...col3, ...col3].map((dest, i) => (
              <DestinationCard key={`c3-${dest.id}-${i}`} dest={dest} index={destinations.findIndex(d => d.id === dest.id)} openDetail={openDetail} cardsRevealed={cardsRevealed} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Keyframe animations & Hide Scrollbar ──────────────────────── */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

// Extracted Card Component
function DestinationCard({ dest, index, openDetail, cardsRevealed }: { dest: Destination, index: number, openDetail: (id: string) => void, cardsRevealed: boolean }) {
  const i = index;
  return (
    <div
      onClick={() => openDetail(dest.id)}
      className="break-inside-avoid group relative rounded-[2rem] p-4 cursor-pointer bg-white/[0.05] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 backdrop-blur-xl transition-all duration-500 shadow-xl shadow-black/20"
      style={{
        opacity: cardsRevealed ? 1 : 0,
        transform: cardsRevealed ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
        transition: `all 700ms cubic-bezier(0.16, 1, 0.3, 1) ${i * 100}ms`,
      }}
      role="button"
      tabIndex={0}
      aria-label={`View ${dest.name} details`}
    >
      <div className={`relative w-full rounded-2xl overflow-hidden mb-5 ${i % 3 === 0 ? 'aspect-[4/3]' : i % 3 === 1 ? 'aspect-[3/4]' : 'aspect-square'}`}>
        <img
          src={dest.image}
          alt={dest.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black bg-white rounded-full shadow-lg">
            {i % 2 === 0 ? '⭐ Prime Pick' : '🔥 Popular'}
          </span>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 cursor-pointer hover:bg-white/40 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
        </div>
      </div>
      <div className="px-2 pb-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-display text-white group-hover:text-orange-300 transition-colors duration-300">{dest.name}</h3>
          <span className="text-sm font-bold text-white/50">{dest.country}</span>
        </div>
        <p className="text-sm text-white/50 leading-relaxed mb-6 line-clamp-2">{dest.tagline}</p>
        <div className="flex flex-wrap items-center justify-between gap-y-2 text-[10px] sm:text-xs font-mono text-white/70 border-t border-white/10 pt-4 pb-6">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="opacity-60">Cap:</span>
            <span className="text-white">{dest.groupSize}</span>
          </div>
          <div className="hidden sm:block w-px h-3 bg-white/20" />
          <div className="flex items-center gap-1 sm:gap-1.5">
            <span className="opacity-60">Dur:</span>
            <span className="text-white">{dest.duration}</span>
          </div>
        </div>
        <button className="w-full py-3.5 rounded-xl bg-white/5 hover:bg-white text-white hover:text-black border border-white/10 hover:border-white text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2">
          Explore Detail
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
