"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

const navLinks = [
  { index: "01", label: "Home",     href: "/"             },
  { index: "02", label: "Product",    href: "/product"        },
  { index: "03", label: "Dashboard", href: "/dashboard"     },
  { index: "04", label: "Event Microsite",    href: "/event-microsite"        },
  { index: "05", label: "Create an Event",  href: "/create-event"      },
  { index: "06", label: "Travel Support", href: "/travel-support"      },
  { index: "07", label: "Destination",  href: "/destinations" },
];

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(new Date());

    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <time
      aria-live="polite"
      aria-label="Current time"
      className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white/70 font-figtree"
    >
      LOCAL {time}
    </time>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileNavRef = useRef<HTMLDivElement>(null);
  
  const { isLoaded, isSignedIn } = useAuth();

  // Close mobile menu on route-like anchor navigation
  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <header
      className="absolute top-0 left-0 right-0 z-10 font-figtree"
      role="banner"
    >
      {/* ── Desktop / Tablet Navbar ───────────────────────── */}
      <div className="max-w-[1340px] mx-auto px-[15px] py-9 max-[1199px]:py-[30px] max-[1199px]:px-[18px] max-[809px]:py-6 max-[809px]:px-[18px]">
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between"
        >
          {/* Left: nav links (hidden on mobile) */}
          <div className="flex items-center gap-8 max-[1199px]:gap-4 max-[809px]:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.index}
                href={link.href}
                className="nav-link-underline flex items-center gap-1.5 text-white group"
              >
                <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase text-white/50 group-hover:text-white/80 transition-colors duration-200">
                  {link.index}
                </span>
                <span className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase">
                  / {link.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Right: email + clock (hidden on mobile, replaced by hamburger) */}
          <div className="hidden max-[809px]:flex items-center gap-4">
            {isLoaded && isSignedIn ? (
              <UserButton />
            ) : isLoaded && !isSignedIn ? (
              <SignInButton mode="modal">
                <button className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white/70">Sign In</button>
              </SignInButton>
            ) : null}
            {/* Mobile hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              className="text-white p-1"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-6 max-[809px]:hidden">
            <a
              href="mailto:hello@eventstay.com"
              className="nav-link-underline text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white/70 hover:text-white transition-colors duration-200"
            >
              hello@eventstay.com
            </a>
            <LiveClock />
            {isLoaded && isSignedIn ? (
              <UserButton />
            ) : isLoaded && !isSignedIn ? (
              <SignInButton mode="modal">
                <button className="nav-link-underline text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-[#eca8d6] hover:text-white transition-colors duration-200">
                  Sign In
                </button>
              </SignInButton>
            ) : null}
          </div>

          {/* Mobile: show hamburger on the right side too */}
          <div className="flex max-[809px]:hidden" aria-hidden="true" />
        </nav>
      </div>

      {/* Mobile hamburger row (separate bar for clean layout) */}
      <div className="hidden max-[809px]:flex absolute top-6 right-[18px] gap-4 items-center">
        {isLoaded && isSignedIn ? (
          <UserButton />
        ) : isLoaded && !isSignedIn ? (
          <SignInButton mode="modal">
            <button className="text-xs leading-4 tracking-[-0.12px] font-medium uppercase text-white/70">Sign In</button>
          </SignInButton>
        ) : null}
        <button
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
          className="text-white p-1"
        >
          {isMobileMenuOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* ── Mobile slide-down panel ──────────────────────── */}
      <div
        ref={mobileNavRef}
        className="hidden max-[809px]:block overflow-hidden"
        style={{
          display: "grid",
          gridTemplateRows: isMobileMenuOpen ? "1fr" : "0fr",
          transition: `grid-template-rows 420ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="overflow-hidden">
          <nav
            aria-label="Mobile navigation"
            className="bg-black/90 backdrop-blur-xl px-[18px] py-8 flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <Link
                key={link.index}
                href={link.href}
                onClick={closeMobile}
                className="flex items-baseline gap-2 text-white"
              >
                <span className="text-[8px] leading-3 tracking-[-0.08px] font-medium uppercase text-white/40">
                  {link.index}
                </span>
                <span className="text-[28px] leading-8 tracking-[-0.84px] font-medium uppercase">
                  / {link.label}
                </span>
              </Link>
            ))}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="mailto:hello@eventstay.com"
                className="text-xs text-white/60 uppercase tracking-wider"
              >
                hello@eventstay.com
              </a>
              <LiveClock />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
