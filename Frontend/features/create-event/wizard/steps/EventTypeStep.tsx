"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

// Using existing event types data structure from CreateEventHero
const EVENT_TYPES = [
  {
    id: "wedding-events",
    title: "Wedding Events",
    description: "Destination weddings and luxury celebrations",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "corporate-events",
    title: "Corporate Events",
    description: "Conferences, summits, and executive offsites",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "group-adventures",
    title: "Group Adventures",
    description: "Curated travel experiences for large groups",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "luxury-experiences",
    title: "Luxury Experiences",
    description: "Exclusive access and VIP travel planning",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "family-reunions",
    title: "Family Reunions",
    description: "Multi-generational stays and private estates",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=1200&auto=format&fit=crop",
  },
];

export function EventTypeStep() {
  const { state, updateState } = useWizard();

  const handleSelect = (id: string) => {
    updateState({ eventType: id });
  };

  return (
    <WizardShell canGoNext={!!state.eventType}>
      <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-3xl font-serif mb-2">What kind of event are you planning?</h2>
        <p className="text-white/50 font-mono text-sm uppercase tracking-widest mb-12">
          Select an event category to continue
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENT_TYPES.map((type) => {
            const isSelected = state.eventType === type.id;
            return (
              <button
                key={type.id}
                onClick={() => handleSelect(type.id)}
                className={cn(
                  "relative group text-left overflow-hidden rounded-xl border transition-all duration-300",
                  isSelected
                    ? "border-[#eab308] bg-[#eab308]/5 shadow-[0_0_30px_rgba(234,179,8,0.15)]"
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                )}
              >
                <div className="aspect-[4/3] w-full relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors z-10" />
                  <Image
                    src={type.image}
                    alt={type.title}
                    fill
                    className={cn(
                      "object-cover transition-transform duration-700",
                      isSelected ? "scale-105" : "group-hover:scale-110"
                    )}
                  />
                  {isSelected && (
                    <div className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-[#eab308] flex items-center justify-center text-black shadow-lg animate-in zoom-in duration-300">
                      <Check className="w-5 h-5" />
                    </div>
                  )}
                </div>
                <div className="p-6 relative z-20">
                  <h3 className={cn(
                    "font-serif text-2xl mb-2 transition-colors",
                    isSelected ? "text-[#eab308]" : "text-white"
                  )}>
                    {type.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </WizardShell>
  );
}
