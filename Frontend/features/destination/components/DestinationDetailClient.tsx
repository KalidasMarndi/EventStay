"use client";

import { type Destination } from "@/features/home/data/destinations";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Users, Clock, Star } from "lucide-react";

export function DestinationDetailClient({ destination: dest }: { destination: Destination }) {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-inter">
      {/* ── Back button ── */}
      <div className="fixed left-5 top-5 z-50 md:left-8 md:top-8">
        <Link
          href="/destinations"
          className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-xl transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          All Destinations
        </Link>
      </div>

      {/* ── Hero ── */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden">
        <img
          src={dest.heroImage}
          alt={dest.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/30 to-black/10" />

        <div className="relative z-10 h-full flex flex-col justify-end max-w-[1400px] mx-auto px-6 lg:px-12 pb-16">
          {/* Badges */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-mono uppercase tracking-widest text-white/80">
              {dest.category}
            </span>
            <span className="px-2.5 py-1.5 rounded-full bg-[#eab308]/20 backdrop-blur-md border border-[#eab308]/30 text-[10px] font-mono text-[#eab308]">
              <Star className="w-3 h-3 inline -mt-0.5" /> {dest.rating}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-4 h-4 text-[#eab308]" />
            <span className="text-sm font-mono uppercase tracking-widest text-white/60">
              {dest.country} · {dest.location}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-6xl md:text-8xl lg:text-[120px] uppercase leading-[0.85] tracking-tight mb-6">
            {dest.name}
          </h1>

          <p className="text-white/50 text-lg italic max-w-xl">{dest.tagline}</p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-16">
          {/* Left: Description */}
          <div>
            <span className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-widest text-white/40 mb-6">
              <span className="w-8 h-px bg-white/20" />
              About this destination
            </span>
            <p className="text-xl leading-relaxed text-white/80 mb-12">{dest.description}</p>

            {/* Activities */}
            <h3 className="font-display text-3xl mb-6">Things to experience</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {dest.activities.map((activity) => (
                <div
                  key={activity}
                  className="flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] transition-colors duration-300"
                >
                  <span className="w-2 h-2 rounded-full bg-[#eab308]" />
                  <span className="text-sm text-white/80">{activity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Quick facts */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8">
              <h3 className="font-display text-2xl mb-6">Quick Facts</h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <Calendar className="w-5 h-5 text-[#eab308]" />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-white/40">Best Time</p>
                    <p className="text-sm text-white/80">{dest.bestTime}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Users className="w-5 h-5 text-[#eab308]" />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-white/40">Group Size</p>
                    <p className="text-sm text-white/80">{dest.groupSize}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-[#eab308]" />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-white/40">Duration</p>
                    <p className="text-sm text-white/80">{dest.duration}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-[#eab308]" />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-white/40">Ideal For</p>
                    <p className="text-sm text-white/80">{dest.idealFor}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="rounded-3xl border border-[#eab308]/20 bg-[#eab308]/5 p-8">
              <h3 className="font-display text-2xl mb-3">Plan your group stay</h3>
              <p className="text-sm text-white/60 mb-6">
                Create a private event page, hold rooms, and let your guests book seamlessly.
              </p>
              <Link
                href="/create-event"
                className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[#eab308] text-xs font-mono uppercase tracking-widest text-black hover:bg-white transition-colors duration-300"
              >
                Create an Event
              </Link>
            </div>
          </div>
        </div>

        {/* Gallery */}
        {dest.gallery.length > 0 && (
          <div className="mt-20">
            <h3 className="font-display text-3xl mb-8">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {dest.gallery.map((img, i) => (
                <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden">
                  <img
                    src={img}
                    alt={`${dest.name} gallery ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
