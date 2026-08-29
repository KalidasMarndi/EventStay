"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Bookmark, MapPin } from "lucide-react";
import { motion, AnimatePresence, MotionConfig, useMotionValue, useAnimationFrame } from "framer-motion";
import { destinations as rawDestinations } from "@/features/home/data/destinations";

/* Map centralized data to the shape this carousel expects */
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

export function PremiumDestinationsSection() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // We initialize heroInstanceId with a default so the first render has a valid layoutId
  const [heroInstanceId, setHeroInstanceId] = useState<string>(`${destinations[0].id}-0`);

  // Marquee translation state
  const x = useMotionValue(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Continuous marquee animation
  useAnimationFrame((time, delta) => {
    if (isAnimating || isMobile) return; // Pause during FLIP or if native scroll on mobile
    if (!contentRef.current) return;
    
    // speed: ~45px per second
    const moveBy = (45 * delta) / 1000;
    let newX = x.get() - moveBy;
    
    const singleSetWidth = contentRef.current.scrollWidth / 2;
    
    // Wrap seamlessly
    if (singleSetWidth > 0 && newX <= -singleSetWidth) {
      newX += singleSetWidth;
    }
    
    x.set(newX);
  });

  const handleCardActivate = useCallback(
    (id: string, instanceId: string) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setHeroInstanceId(instanceId);
      
      const index = destinations.findIndex((d) => d.id === id);
      if (index !== -1 && index !== activeIndex) {
        setActiveIndex(index);
      } else {
        // If they click the already active card (edge case), just unpause
        setIsAnimating(false);
      }
    },
    [activeIndex, isAnimating]
  );

  // Helper to find which instance of a destination is currently most visible on screen
  const getVisibleInstanceId = useCallback((destId: string) => {
    const el0 = document.getElementById(`card-${destId}-0`);
    const el1 = document.getElementById(`card-${destId}-1`);
    
    if (el0 && el1) {
      const rect0 = el0.getBoundingClientRect();
      const rect1 = el1.getBoundingClientRect();
      
      // If one is clearly within the viewport, pick it
      if (rect0.right > 0 && rect0.left < window.innerWidth) return `${destId}-0`;
      if (rect1.right > 0 && rect1.left < window.innerWidth) return `${destId}-1`;
      
      // Fallback
      return rect0.left > rect1.left ? `${destId}-0` : `${destId}-1`;
    }
    return `${destId}-0`;
  }, []);

  const handleNext = () => {
    if (isAnimating) return;
    const nextIndex = (activeIndex + 1) % destinations.length;
    const nextDest = destinations[nextIndex];
    handleCardActivate(nextDest.id, getVisibleInstanceId(nextDest.id));
  };

  const handlePrev = () => {
    if (isAnimating) return;
    const prevIndex = (activeIndex - 1 + destinations.length) % destinations.length;
    const prevDest = destinations[prevIndex];
    handleCardActivate(prevDest.id, getVisibleInstanceId(prevDest.id));
  };

  const handleExplore = useCallback(
    (dest: Dest) => {
      router.push(`/destinations/${dest.id}`);
    },
    [router]
  );

  const handleAnimationComplete = () => {
    // Slight delay before resuming marquee ensures settling feels natural
    setTimeout(() => {
      setIsAnimating(false);
    }, 400);
  };

  // Derive the carousel order
  const orderedDestinations = [
    destinations[activeIndex],
    ...destinations.slice(activeIndex + 1),
    ...destinations.slice(0, activeIndex),
  ];

  const activeDest = orderedDestinations[0];
  const carouselDests = orderedDestinations.slice(1);
  
  // Duplicate for infinite marquee
  const allCarouselCards = [
    ...carouselDests.map(d => ({ ...d, instanceId: `${d.id}-0` })),
    ...carouselDests.map(d => ({ ...d, instanceId: `${d.id}-1` }))
  ];

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
    <MotionConfig transition={{ duration: 0.85, ease: [0.32, 0.72, 0, 1] }}>
      <section className="relative w-full md:h-[80vh] min-h-[600px] flex flex-col md:flex-row bg-[#050505] overflow-hidden text-white border-t border-white/10">
        
        {/* ─── LEFT HERO ─── */}
        <div className="relative w-full md:w-[45%] h-[60vh] md:h-full z-10 flex flex-col justify-end p-8 md:p-16 lg:p-20 overflow-hidden shrink-0">
          
          <motion.div
            key={`hero-bg-${activeDest.id}`}
            layoutId={`card-${heroInstanceId}`}
            className="absolute inset-0 -z-10 origin-center"
            style={{ borderRadius: 0 }}
            initial={{ y: 60 }}
            animate={{ y: 0 }}
            onAnimationComplete={handleAnimationComplete}
          >
            <motion.img
              layoutId={`image-${heroInstanceId}`}
              src={activeDest.heroImage}
              alt={activeDest.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 md:bg-gradient-to-r md:from-black/90 md:via-black/50 md:to-transparent" />
          </motion.div>

          {/* TEXT OVERLAY */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`hero-text-${activeDest.id}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-10 flex flex-col items-start"
            >
              <span className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-[0.2em] text-[#eab308] uppercase mb-4">
                <span className="w-8 h-px bg-[#eab308]" />
                {activeDest.country}
              </span>

              <h2 className="text-5xl md:text-6xl lg:text-7xl xl:text-[84px] font-display uppercase leading-[0.85] tracking-tight mb-6">
                {formatTitle(activeDest.title)}
              </h2>

              <p className="text-white/70 max-w-sm mb-10 text-sm md:text-base leading-relaxed line-clamp-3">
                {activeDest.description}
              </p>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="w-12 h-12 rounded-full bg-[#eab308] flex items-center justify-center text-black hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                  aria-label="Save destination"
                >
                  <Bookmark className="w-5 h-5 fill-current" />
                </button>
                <button
                  type="button"
                  onClick={() => handleExplore(activeDest)}
                  className="h-12 px-8 rounded-full border border-white/20 text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
                >
                  Discover Location
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ─── RIGHT CAROUSEL ─── */}
        <div className="relative w-full md:w-[55%] h-[50vh] md:h-full bg-[#0a0a0a] flex items-center overflow-hidden md:pl-10">
          
          {/* Fade masks */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0a0a0a] to-transparent z-20 pointer-events-none" />
          <div className="hidden md:block absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0a] to-transparent z-20 pointer-events-none" />

          {/* Carousel */}
          <div className="flex items-center w-full h-full py-10 px-6 md:px-0 overflow-visible">
            <motion.div
              ref={contentRef}
              style={{ x: isMobile ? 0 : x }}
              className={`flex gap-4 md:gap-6 w-max ${isMobile ? "overflow-x-auto snap-x snap-mandatory [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" : ""}`}
            >
              {allCarouselCards.map((dest, i) => (
                <DestinationCard
                  key={`carousel-card-${dest.instanceId}`}
                  dest={dest}
                  instanceId={dest.instanceId}
                  isMobile={isMobile}
                  onActivate={handleCardActivate}
                  onExplore={handleExplore}
                />
              ))}
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 z-30 flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="w-11 h-11 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black hover:border-white hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="Previous destination"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-200 hover:-translate-x-0.5" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 rounded-full border border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center hover:bg-white hover:text-black hover:border-white hover:scale-110 active:scale-95 transition-all duration-300"
              aria-label="Next destination"
            >
              <ArrowRight className="w-4 h-4 transition-transform duration-200 hover:translate-x-0.5" />
            </button>
          </div>

          {/* Counter */}
          <div className="hidden md:flex absolute bottom-10 right-32 items-baseline gap-1 z-30">
            <span className="font-display text-5xl text-white tabular-nums transition-all duration-500">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-white/30 text-lg font-mono mx-1">/</span>
            <span className="text-white/30 text-lg font-mono">
              {String(destinations.length).padStart(2, "0")}
            </span>
            <div className="absolute -bottom-3 left-0 right-0 h-px bg-white/10 overflow-hidden">
              <div
                className="h-full bg-[#eab308] transition-all duration-700 ease-out"
                style={{ width: `${((activeIndex + 1) / destinations.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   DESTINATION CARD — for the Right Carousel
   ═══════════════════════════════════════════════════════════════════════════ */
function DestinationCard({
  dest,
  instanceId,
  isMobile,
  onActivate,
  onExplore,
}: {
  dest: Dest;
  instanceId: string;
  isMobile: boolean;
  onActivate: (destId: string, instanceId: string) => void;
  onExplore: (dest: Dest) => void;
}) {
  return (
    <motion.article
      id={`card-${instanceId}`}
      layoutId={`card-${instanceId}`}
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      style={{ borderRadius: 24 }}
      className={`
        relative overflow-hidden bg-[#111] shrink-0 cursor-pointer group
        ${isMobile ? "w-[280px] h-[380px] snap-center" : "w-[300px] lg:w-[320px] h-[450px] lg:h-[500px]"}
        hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#eab308]/10
        transition-all duration-500 ease-out z-10
      `}
      onClick={() => onActivate(dest.id, instanceId)}
      role="button"
      tabIndex={0}
      aria-label={`${dest.title}, ${dest.country}`}
    >
      {/* Image with subtle zoom on hover */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ borderRadius: 24 }}>
        <motion.img
          layoutId={`image-${instanceId}`}
          src={dest.image}
          alt={dest.title}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-[1.05] group-hover:brightness-110"
          loading="lazy"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/5 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Category badge */}
      <div className="absolute top-5 left-5 opacity-80 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-widest text-white/80">
          {dest.category}
        </span>
      </div>

      {/* Rating badge */}
      <div className="absolute top-5 right-5 opacity-80 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500 delay-75">
        <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-[#eab308]/20 backdrop-blur-md border border-[#eab308]/30 text-[10px] font-mono text-[#eab308]">
          ★ {dest.rating}
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col justify-end">
        <div className="flex items-center gap-1.5 mb-2 opacity-70 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-400 ease-out">
          <MapPin className="w-3 h-3 text-[#eab308]" />
          <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase">
            {dest.country}
          </span>
        </div>

        <h3 className="font-display text-white leading-[1.05] uppercase text-2xl group-hover:-translate-y-1 transition-all duration-500 ease-out">
          {dest.title}
        </h3>

        <div className="h-px bg-gradient-to-r from-[#eab308] to-transparent mt-3 mb-3 w-0 group-hover:w-full opacity-0 group-hover:opacity-100 transition-all duration-600 ease-out origin-left" />

        <p className="text-xs leading-relaxed text-white/60 overflow-hidden max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2 transition-all duration-500 ease-out">
          {dest.description}
        </p>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onExplore(dest);
          }}
          className="mt-4 inline-flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#eab308] opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out"
        >
          Explore destination
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.article>
  );
}
