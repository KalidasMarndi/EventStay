"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ── Video URLs ─────────────────────────────────────────────────────────────
const VIDEO_URLS = [
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_030107_874273ea-684a-4e90-bb96-8fdfde48d53d.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260629_032424_3c9c2a9d-807b-4482-80e6-dd6d9dfd4545.mp4",
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260627_094019_4214ea73-b963-46a4-8327-61489192de99.mp4",
];

const SLIDE_LABELS = [
  { index: "01", label: "GOA WEDDING" },
  { index: "02", label: "BALI OFFSITE"   },
  { index: "03", label: "DUBAI MICE" },
];

// ── Video background with blob preloading ──────────────────────────────────
function VideoBackground({ activeIndex }: { activeIndex: number }) {
  const [blobUrls, setBlobUrls] = useState<(string | null)[]>([null, null, null]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);

  useEffect(() => {
    let cancelled = false;

    const loadAll = async () => {
      const results = await Promise.all(
        VIDEO_URLS.map(async (url) => {
          try {
            const res = await fetch(url);
            if (!res.ok) return url; // fallback to direct URL
            const blob = await res.blob();
            return URL.createObjectURL(blob);
          } catch {
            return url; // fallback on network error
          }
        })
      );
      if (!cancelled) setBlobUrls(results);
    };

    loadAll();
    return () => {
      cancelled = true;
      // Revoke blob URLs on unmount
      setBlobUrls((prev) => {
        prev.forEach((u) => {
          if (u && u.startsWith("blob:")) URL.revokeObjectURL(u);
        });
        return [null, null, null];
      });
    };
  }, []);

  // Play the active video when refs are ready
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === activeIndex) {
        v.play().catch(() => {/* autoplay blocked gracefully */});
      }
    });
  }, [activeIndex, blobUrls]);

  return (
    <div className="absolute inset-0 z-0" aria-hidden="true">
      {VIDEO_URLS.map((fallbackUrl, i) => (
        <video
          key={i}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={blobUrls[i] ?? fallbackUrl}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-[1200ms] ease-in-out ${
            i === activeIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/10 z-[1]" />
    </div>
  );
}

// ── Availability dot ───────────────────────────────────────────────────────
function AvailabilityDot({ activeIndex }: { activeIndex: number }) {
  const isSlide1 = activeIndex === 0;
  const color = isSlide1 ? "#F598F2" : "#ffffff";
  const shadow = isSlide1
    ? "0 0 8px 2px rgba(245,152,242,0.6)"
    : "0 0 8px 2px rgba(255,255,255,0.5)";

  return (
    <div className="flex items-center gap-2.5" role="status" aria-label="Availability status">
      <span
        className="animate-dot-pulse shrink-0 rounded-full"
        style={{
          width: 7,
          height: 7,
          backgroundColor: color,
          boxShadow: shadow,
          transition: "background-color 0.6s ease, box-shadow 0.6s ease",
        }}
      />
      <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white font-figtree">
        Live Bookings Active
      </span>
    </div>
  );
}

// ── Main Hero Section ──────────────────────────────────────────────────────
export function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Intersection observer for reveal-on-scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsRevealed(true); },
      { threshold: 0.35 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Trigger reveal immediately since hero is visible on load
  useEffect(() => {
    const t = setTimeout(() => setIsRevealed(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Auto-play slider every 8.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SLIDE_LABELS.length);
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  const isSlide1 = activeIndex === 0;
  const accentColor = isSlide1 ? "#F598F2" : "#ffffff";

  return (
    <main>
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-black overflow-hidden font-figtree"
        aria-label="Hero"
      >
        {/* Navbar is rendered globally in layout.tsx */}

        {/* Videos */}
        <VideoBackground activeIndex={activeIndex} />

        {/* ── Content ────────────────────────────────────────────── */}
        <div
          className="
            relative z-[2] max-w-[1340px] mx-auto h-screen
            flex flex-col justify-end items-end
            gap-[150px] pt-[190px] px-[15px]
            max-[1199px]:pt-[160px] max-[1199px]:px-[18px]
            max-[809px]:justify-end max-[809px]:items-start
            max-[809px]:gap-[72px] max-[809px]:pt-[140px] max-[809px]:px-[18px]
          "
        >

          {/* ── Row 1: Switcher + Availability ─────────────────── */}
          <div
            className="
              w-full flex items-end justify-between
              max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-7
            "
          >
            {/* Video switcher buttons */}
            <div
              className="flex-[4] flex flex-col gap-2.5"
              role="group"
              aria-label="Video selection"
            >
              {SLIDE_LABELS.map((slide, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  aria-pressed={i === activeIndex}
                  className={`role-link w-fit flex items-center gap-2 text-white text-left transition-opacity duration-300 ${
                    i === activeIndex ? "opacity-100" : "opacity-55 hover:opacity-75"
                  }`}
                >
                  <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase text-white/60">
                    {slide.index}
                  </span>
                  <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase">
                    / {slide.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Availability indicator */}
            <div className="flex-1 flex justify-end max-[809px]:justify-start">
              <AvailabilityDot activeIndex={activeIndex} />
            </div>
          </div>

          {/* ── Row 2: Name + CTA ──────────────────────────────── */}
          <div
            className="
              w-full flex items-end gap-10 pb-[60px]
              max-[1199px]:gap-7 max-[1199px]:pb-[52px]
              max-[809px]:flex-col max-[809px]:items-start max-[809px]:gap-8 max-[809px]:pb-11
            "
          >
            {/* Giant name */}
            <div className="flex-[2]">
              <h1
                className={`
                  text-[clamp(100px,12vw,170px)] leading-[81%] tracking-[-4px] font-medium uppercase text-white
                  max-[1199px]:text-[clamp(80px,10vw,120px)] max-[1199px]:leading-[110%] max-[1199px]:tracking-[-3px]
                  max-[809px]:text-[clamp(50px,15vw,80px)] max-[809px]:leading-[110%] max-[809px]:tracking-[-2px]
                  ${isRevealed ? "animate-reveal-up" : "opacity-0 translate-y-[80px]"}
                `}
                style={{ animationFillMode: "both" }}
              >
                EventStay
                <span
                  style={{
                    color: accentColor,
                    transition: "color 0.6s ease",
                  }}
                >
                  .
                </span>
              </h1>
            </div>

            {/* Right column: description + CTA */}
            <div
              className={`
                flex-1 pl-[50px] flex flex-col gap-6
                max-[1199px]:pl-6
                max-[809px]:pl-0
                ${isRevealed ? "animate-reveal-right" : "opacity-0 translate-x-[100px]"}
              `}
              style={{ animationFillMode: "both", animationDelay: "0.08s" }}
            >
              <p
                className="
                  text-base leading-6 tracking-[-0.16px] font-medium text-white/80
                  max-[809px]:max-w-[420px]
                "
              >
                Every group trip deserves its own destination. Create private travel inventory, launch a branded event microsite, and give every guest a seamless way to book, connect, and arrive.
              </p>

              <Link
                href="/create-event"
                className="hero-cta-btn w-fit border border-white text-white text-sm leading-5 tracking-[-0.14px] font-medium px-6 py-3 lowercase"
                aria-label="Start a project"
              >
                <span>create an event</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
