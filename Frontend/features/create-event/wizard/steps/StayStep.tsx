"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Star, MapPin, Users, Coffee, Wifi, Dumbbell, Wine, Check } from "lucide-react";

// Development Mock Data for Stays
const MOCK_STAYS = [
  {
    id: "stay-01",
    name: "The Obsidian Resort & Spa",
    location: "City Center",
    rating: 4.9,
    price: "₹45,000",
    capacity: "Up to 200 guests",
    amenities: ["Spa", "Pool", "Fine Dining", "Conference Hall"],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "stay-02",
    name: "Azure Cliffside Villas",
    location: "Coastal Region",
    rating: 4.8,
    price: "₹65,000",
    capacity: "Up to 50 guests",
    amenities: ["Private Beach", "Infinity Pool", "Butler Service"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "stay-03",
    name: "Lumina Grand Hotel",
    location: "Business District",
    rating: 4.7,
    price: "₹35,000",
    capacity: "Up to 500 guests",
    amenities: ["Ballroom", "Executive Lounge", "Helipad"],
    image: "https://images.unsplash.com/photo-1551882547-ff40eb0d1b73?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "stay-04",
    name: "Serenity Eco Lodge",
    location: "Mountain Valley",
    rating: 4.9,
    price: "₹55,000",
    capacity: "Up to 80 guests",
    amenities: ["Yoga Pavilion", "Organic Farm", "Hot Springs"],
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=800&auto=format&fit=crop",
  }
];

export function StayStep() {
  const { state, updateState, nextStep } = useWizard();
  const [selectedId, setSelectedId] = useState<string>(state.stayId);

  const handleNext = () => {
    updateState({ stayId: selectedId });
    nextStep();
  };

  return (
    <WizardShell canGoNext={!!selectedId} onNext={handleNext}>
      <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
          <div>
            <h2 className="text-3xl font-serif mb-2">Premium Stays</h2>
            <p className="text-white/50 font-mono text-sm uppercase tracking-widest">
              Select accommodation for your group
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 text-right">
            <div className="text-xs text-[#eab308] border border-[#eab308]/30 bg-[#eab308]/10 px-3 py-1.5 rounded-full inline-block">
              Development Mock Data
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_STAYS.map((stay) => (
            <StayCard
              key={stay.id}
              stay={stay}
              isSelected={selectedId === stay.id}
              onSelect={() => setSelectedId(stay.id)}
            />
          ))}
        </div>

      </div>
    </WizardShell>
  );
}

function StayCard({ stay, isSelected, onSelect }: any) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative text-left overflow-hidden rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row h-auto sm:h-48",
        isSelected
          ? "border-[#eab308] bg-[#eab308]/5 shadow-[0_0_30px_rgba(234,179,8,0.1)]"
          : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
      )}
    >
      {/* Image */}
      <div className="w-full sm:w-2/5 h-48 sm:h-full relative shrink-0">
        <Image 
          src={stay.image}
          alt={stay.name}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isSelected ? "scale-105" : "group-hover:scale-110"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/80 sm:hidden" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between w-full relative z-10">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className={cn(
              "font-serif text-xl pr-4 transition-colors",
              isSelected ? "text-[#eab308]" : "text-white"
            )}>
              {stay.name}
            </h3>
            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md px-1.5 py-0.5 rounded text-xs">
              <Star className="w-3 h-3 text-[#eab308] fill-[#eab308]" />
              <span>{stay.rating}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1.5 text-white/50 text-xs mb-4">
            <MapPin className="w-3.5 h-3.5" />
            <span>{stay.location}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {stay.amenities.slice(0, 3).map((amenity: string) => (
              <span key={amenity} className="text-[10px] uppercase font-mono tracking-wider border border-white/10 bg-white/5 px-2 py-1 rounded">
                {amenity}
              </span>
            ))}
            {stay.amenities.length > 3 && (
              <span className="text-[10px] uppercase font-mono tracking-wider text-white/40 px-1 py-1">
                +{stay.amenities.length - 3}
              </span>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-end">
          <div className="flex items-center gap-1.5 text-white/40 text-xs">
            <Users className="w-3.5 h-3.5" />
            <span>{stay.capacity}</span>
          </div>
          <div className="text-right">
            <span className="text-xs text-white/40 uppercase tracking-widest block mb-0.5">Est. per night</span>
            <span className="font-mono text-white">{stay.price}</span>
          </div>
        </div>
      </div>

      {isSelected && (
        <div className="absolute top-4 right-4 z-20 w-6 h-6 rounded-full bg-[#eab308] flex items-center justify-center text-black shadow-lg animate-in zoom-in duration-300">
          <Check className="w-3 h-3" />
        </div>
      )}
    </button>
  );
}
