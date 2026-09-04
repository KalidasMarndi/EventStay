"use client";

import { useWizard } from "../WizardContext";
import { cn } from "@/lib/utils";
import { Search, MapPin } from "lucide-react";
import { useState } from "react";

const popularDestinations = [
  { id: "dubai", name: "Dubai", country: "UAE", img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop" },
  { id: "goa", name: "Goa", country: "India", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
  { id: "singapore", name: "Singapore", country: "Singapore", img: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=600&auto=format&fit=crop" },
  { id: "bali", name: "Bali", country: "Indonesia", img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=600&auto=format&fit=crop" },
  { id: "bangkok", name: "Bangkok", country: "Thailand", img: "https://images.unsplash.com/photo-1508009603885-247a505b3941?q=80&w=600&auto=format&fit=crop" },
  { id: "paris", name: "Paris", country: "France", img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop" },
];

export function Step6Destination() {
  const { state, updateState } = useWizard();
  const [search, setSearch] = useState("");

  const filtered = popularDestinations.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.country.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 md:p-12 flex flex-col h-full">
      <div className="mb-8">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Destination</h2>
        <p className="text-gray-500 text-lg">Where will your event take place?</p>
      </div>

      <div className="relative mb-8 max-w-xl">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for a city or country..."
          className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((dest) => {
          const isSelected = state.city === dest.name;
          return (
            <button
              key={dest.id}
              onClick={() => updateState({ city: dest.name })}
              className={cn(
                "group relative overflow-hidden rounded-2xl text-left transition-all duration-300 aspect-[4/3]",
                isSelected ? "ring-4 ring-blue-600 ring-offset-2" : "hover:-translate-y-1 hover:shadow-lg"
              )}
            >
              <img 
                src={dest.img} 
                alt={dest.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-blue-400" />
                  {dest.name}
                </h3>
                <p className="text-sm text-white/70 ml-6">{dest.country}</p>
              </div>

              {isSelected && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      {filtered.length === 0 && (
        <div className="flex-1 flex items-center justify-center flex-col text-center">
          <MapPin className="w-12 h-12 text-gray-300 mb-4" />
          <p className="text-gray-500">No destinations found matching "{search}".</p>
          <button 
            onClick={() => updateState({ city: search })}
            className="mt-4 text-blue-600 font-medium hover:underline"
          >
            Use "{search}" as a custom destination
          </button>
        </div>
      )}
    </div>
  );
}
