"use client";

import React, { useEffect, useState } from "react";
import type { Event } from "@/types/api-types";
import { ArrowRight, MapPin, Calendar, Users, Hotel, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { GuestBookingWidget } from "./components/GuestBookingWidget";

interface DynamicEventMicrositeProps {
  event: Event & { micrositeConfig?: any; stayPackages?: any[] };
}

export function DynamicEventMicrosite({ event }: DynamicEventMicrositeProps) {
  const config = event.micrositeConfig || {
    primaryColor: '#eca8d6',
    welcomeHeadline: 'Welcome to our event',
    welcomeMessage: 'We are excited to host you.',
    heroImage: '',
    enableSchedule: true,
    enableStays: true,
    enableTravel: false,
    enableVenue: true,
    enableContact: true
  };

  const primaryColor = config.primaryColor || '#eca8d6';

  const [isVisible, setIsVisible] = useState(false);
  const [selectedStayPackage, setSelectedStayPackage] = useState<any | null>(null);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div 
      className="relative min-h-screen bg-black font-inter overflow-hidden"
      style={{ '--brand-color': primaryColor } as React.CSSProperties}
    >
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${primaryColor}, transparent 70%)`
          }}
        />
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay" />
      </div>

      <div className="relative z-10 pt-[120px] pb-32">
        {/* HERO SECTION */}
        <section className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-32">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
              <span className="text-sm font-mono uppercase tracking-[0.2em] text-white/60">
                {event.category.replace('_', ' ')}
              </span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-[100px] font-display leading-[0.9] tracking-tight mb-8">
              {config.welcomeHeadline}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed mb-12">
              {config.welcomeMessage}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 border border-white/10 bg-white/[0.02] backdrop-blur-md rounded-2xl">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Destination</div>
                <div className="text-lg flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.city}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Dates</div>
                <div className="text-lg flex items-center gap-2"><Calendar className="w-4 h-4" /> {formatDate(event.startDate)}</div>
              </div>
              {config.enableVenue && event.venue && (
                <div className="col-span-2 md:col-span-2 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Venue</div>
                  <div className="text-lg">{event.venue.name}</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* HERO IMAGE (Optional) */}
        {config.heroImage && (
          <section className="w-full h-[60vh] md:h-[80vh] relative mb-32">
            <img 
              src={config.heroImage} 
              alt="Event Hero" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          </section>
        )}

        {/* STAYS SECTION */}
        {config.enableStays && event.stayPackages && event.stayPackages.length > 0 && (
          <section className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-32">
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4 block">Accommodation</span>
                <h2 className="text-4xl md:text-6xl font-display">Official Stay Packages</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {event.stayPackages.map((pkg) => (
                <div key={pkg.id} className="group relative border border-white/10 bg-white/[0.02] p-8 hover:bg-white/[0.05] transition-colors rounded-2xl overflow-hidden">
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to bottom right, ${primaryColor}, transparent)` }}
                  />
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                      <Hotel className="w-6 h-6 text-white/40" />
                      <span className="text-xs font-mono uppercase tracking-wider text-white/40 border border-white/10 px-3 py-1 rounded-full">
                        {pkg.capacity} Guests
                      </span>
                    </div>
                    <h3 className="text-2xl font-display mb-2">{pkg.name}</h3>
                    <p className="text-sm text-white/50 mb-8 min-h-[40px]">{pkg.description || 'Premium stay at the official venue.'}</p>
                    
                    <div className="flex items-center justify-between border-t border-white/10 pt-6">
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">Price</div>
                        <div className="text-xl" style={{ color: primaryColor }}>${pkg.price}</div>
                      </div>
                      <button 
                        onClick={() => setSelectedStayPackage(pkg)}
                        className="px-6 py-3 rounded-full text-xs font-medium uppercase tracking-wider transition-colors text-black"
                        style={{ backgroundColor: primaryColor }}
                      >
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* VENUE SECTION */}
        {config.enableVenue && event.venue && (
          <section className="max-w-[1400px] mx-auto px-6 lg:px-12 mb-32">
            <div className="border border-white/10 bg-white/[0.02] rounded-3xl p-8 md:p-16 flex flex-col md:flex-row gap-12">
              <div className="flex-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-4 block">The Venue</span>
                <h2 className="text-4xl md:text-5xl font-display mb-6">{event.venue.name}</h2>
                <p className="text-white/60 mb-8 max-w-md">{event.venue.description || 'Experience our world-class venue tailored for this event.'}</p>
                <div className="flex items-center gap-2 text-sm text-white/40">
                  <MapPin className="w-4 h-4" />
                  {event.venue.address}, {event.venue.city}, {event.venue.country}
                </div>
              </div>
              {event.venue.images && event.venue.images.length > 0 && (
                <div className="flex-1 rounded-2xl overflow-hidden min-h-[300px]">
                  <img src={event.venue.images[0]} alt="Venue" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </section>
        )}
      </div>

      {selectedStayPackage && (
        <GuestBookingWidget 
          event={event} 
          stayPackage={selectedStayPackage} 
          primaryColor={primaryColor} 
          onClose={() => setSelectedStayPackage(null)} 
        />
      )}
    </div>
  );
}
