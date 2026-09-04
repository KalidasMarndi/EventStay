import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { hotelsData } from "@/data/hotels";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export function DestinationStaysSection({ location }: { location: string }) {
  // Try to match the exact location string or country
  const stays = hotelsData.filter(h => 
    h.location.toLowerCase().includes(location.toLowerCase()) || 
    location.toLowerCase().includes(h.location.toLowerCase())
  );

  if (stays.length === 0) return null;

  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 border-t border-white/10 mt-12">
      <AnimatedSection direction="up" className="mb-12">
        <h3 className="font-display text-4xl mb-4">Available Accommodations</h3>
        <p className="text-white/60">
          Exclusive negotiated rates, real-time inventory management, and block allotments in {location}.
        </p>
      </AnimatedSection>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stays.map((hotel, i) => (
          <AnimatedSection key={hotel.id} direction="up" delay={i * 0.1}>
            <div className="group border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] rounded-3xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_0_40px_rgba(236,168,214,0.1)]">
              {/* Mock Image Header */}
              <div className="h-48 bg-[#111] relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,#0a0a0a)] z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(236,168,214,0.2),transparent_60%)]" />
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <span className="px-2 py-1 bg-black/60 backdrop-blur text-[10px] uppercase tracking-wider rounded border border-white/10">
                    {hotel.roomType}
                  </span>
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-1 flex flex-col">
                <div className="flex items-center gap-2 text-white/50 text-xs font-mono uppercase tracking-widest mb-3">
                  <MapPin className="w-3 h-3" />
                  {hotel.location}
                </div>
                <h3 className="text-2xl font-display mb-2 group-hover:text-[#eca8d6] transition-colors">{hotel.name}</h3>
                <div className="text-[#eca8d6] font-medium mb-6">₹{hotel.negotiatedRate} <span className="text-white/40 text-sm font-normal">/ night</span></div>
                
                <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-white/10 text-sm">
                  <div>
                    <div className="text-white/50 mb-1 text-xs uppercase tracking-wider">Allocated</div>
                    <div className="text-xl font-light text-white">{hotel.allocation}</div>
                  </div>
                  <div>
                    <div className="text-white/50 mb-1 text-xs uppercase tracking-wider">Available</div>
                    <div className="text-xl font-light text-green-400">{hotel.available}</div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <div className="text-xs uppercase tracking-wider text-white/40 mb-3">Inclusions</div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {hotel.inclusions.map(inc => (
                      <span key={inc} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-md text-white/70">
                        {inc}
                      </span>
                    ))}
                  </div>
                  <Link href="/create-event" className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-[#eca8d6] hover:text-black border border-white/10 rounded-full text-sm uppercase tracking-wider transition-colors">
                    Plan Event Here <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
