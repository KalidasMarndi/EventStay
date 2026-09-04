"use client";

import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { Plane, FileCheck, Car, Briefcase, HeartHandshake, ShieldCheck } from "lucide-react";
import { travelServicesData } from "@/data/services";

const icons = [
  <Plane className="w-8 h-8 text-[#eab308]" />,
  <FileCheck className="w-8 h-8 text-[#eab308]" />,
  <Car className="w-8 h-8 text-[#eab308]" />,
  <Briefcase className="w-8 h-8 text-[#eab308]" />,
  <HeartHandshake className="w-8 h-8 text-[#eab308]" />,
  <ShieldCheck className="w-8 h-8 text-[#eab308]" />
];

const mappedServices = travelServicesData.map((s, idx) => ({
  title: s.name,
  description: s.fullDescription,
  icon: icons[idx % icons.length]
}));

export function TravelSupportSection({ limit }: { limit?: number }) {
  const displayServices = limit ? mappedServices.slice(0, limit) : mappedServices;

  return (
    <section className="relative w-full py-24 lg:py-32 bg-[#050505] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-4 text-sm font-mono text-[#eab308] mb-6 uppercase tracking-widest">
            <span className="w-12 h-px bg-[#eab308]/50" />
            Concierge & Support
            <span className="w-12 h-px bg-[#eab308]/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display text-white mb-6">
            Travel without the friction.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Our global support network handles the heavy lifting, ensuring your group travels safely and comfortably. We sweat the details so you don't have to.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {displayServices.map((service, i) => (
            <AnimatedSection key={service.title} direction="up" delay={i * 0.1}>
              <div className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#eab308]/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden h-full">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 scale-150 -translate-y-10 translate-x-10 pointer-events-none">
                  {service.icon}
                </div>
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#eab308]/10 transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-display text-white mb-4 group-hover:text-[#eab308] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {limit && (
          <AnimatedSection direction="up" delay={0.4} className="mt-16 text-center">
            <a 
              href="/travel-support" 
              className="inline-flex items-center gap-3 px-8 h-12 rounded-full border border-white/20 text-sm font-mono uppercase tracking-widest text-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              View Full Support Capabilities
            </a>
          </AnimatedSection>
        )}
      </div>
    </section>
  );
}
