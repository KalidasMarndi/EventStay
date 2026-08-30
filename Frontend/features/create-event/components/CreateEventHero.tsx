"use client";

import { useRef } from "react";
import { ArrowRight, Sparkles, Building2, Palmtree, GlassWater, Users } from "lucide-react";
import { AnimatedSection } from "@/components/shared/AnimatedSection";

import Link from "next/link";

const eventTypes = [
  {
    id: "wedding-events",
    title: "Wedding Events",
    description: "Curate a magical destination wedding experience for you and your guests.",
    icon: <Sparkles className="w-6 h-6 text-[#eab308]" />,
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "corporate-events",
    title: "Corporate Events",
    description: "Streamline offsites, retreats, and global conferences with premium tools.",
    icon: <Building2 className="w-6 h-6 text-[#eab308]" />,
    image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "group-adventures",
    title: "Group Adventures",
    description: "Plan epic multi-destination trips and adventurous getaways effortlessly.",
    icon: <Palmtree className="w-6 h-6 text-[#eab308]" />,
    image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "luxury-experiences",
    title: "Luxury Experiences",
    description: "Private villas, exclusive resorts, and VIP concierge services for elite groups.",
    icon: <GlassWater className="w-6 h-6 text-[#eab308]" />,
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "family-reunions",
    title: "Family Reunions",
    description: "Bring the whole family together with spacious accommodations and shared activities.",
    icon: <Users className="w-6 h-6 text-[#eab308]" />,
    image: "https://images.unsplash.com/photo-1529156069898-49953eb1b5ce?q=80&w=800&auto=format&fit=crop",
  }
];

export function CreateEventHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-[#050505] pt-24 pb-32">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2000&auto=format&fit=crop"
          alt="Create an event background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#050505]/60 to-[#050505]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <AnimatedSection direction="up" delay={0.1}>
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="inline-flex items-center gap-4 text-sm font-mono text-[#eab308] uppercase tracking-widest mb-6">
              <span className="w-12 h-px bg-[#eab308]/50" />
              Plan with Purpose
              <span className="w-12 h-px bg-[#eab308]/50" />
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-display text-white leading-[0.9] tracking-tight mb-8 uppercase">
              Create <span className="text-white/50 text-6xl md:text-8xl lg:text-[110px] italic">unforgettable</span>
              <br />
              experiences.
            </h1>
            <p className="text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto mb-10">
              Whether you're organizing a 300-person destination wedding or an intimate executive retreat, EventStay provides the tools, inventory, and insights to bring your vision to life.
            </p>
            <Link href="/create-event/wizard" className="inline-flex items-center gap-3 h-14 px-10 rounded-full bg-[#eab308] text-sm font-mono uppercase tracking-widest text-black hover:bg-white transition-all duration-300 hover:scale-105">
              Start Planning Now
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimatedSection>

        {/* Event Types Carousel */}
        <AnimatedSection direction="up" delay={0.3}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {eventTypes.map((type, i) => (
              <div 
                key={type.title} 
                className="group relative overflow-hidden rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#eab308]/50 transition-all duration-500 hover:-translate-y-2 aspect-[3/4]"
              >
                <div className="absolute inset-0 -z-10">
                  <img 
                    src={type.image} 
                    alt={type.title} 
                    className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                </div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                    {type.icon}
                  </div>
                  <h3 className="text-2xl font-display text-white mb-2">{type.title}</h3>
                  <p className="text-sm text-white/60 leading-relaxed line-clamp-3">
                    {type.description}
                  </p>
                  
                  <Link href={`/create-event/wizard?type=${type.id}`} className="mt-6 flex items-center text-xs font-mono uppercase tracking-widest text-[#eab308] opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore Setup <ArrowRight className="w-3.5 h-3.5 ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
