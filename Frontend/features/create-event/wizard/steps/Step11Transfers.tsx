"use client";

import { useWizard } from "../WizardContext";
import { Car, Star, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

const transferTypes = [
  { id: "meet_greet", title: "Airport Meet & Greet", desc: "Welcome guests at arrivals with branded signage.", icon: Navigation },
  { id: "group_coach", title: "Group Coaches", desc: "Large buses for mass arrivals.", icon: Car },
  { id: "private_sedan", title: "Executive Sedan", desc: "Private transfers for standard guests.", icon: Car },
  { id: "luxury_van", title: "Luxury Van", desc: "Premium transport for small groups.", icon: Car },
  { id: "vip_chauffeur", title: "VIP Chauffeur", desc: "Dedicated drivers for executives.", icon: Star },
  { id: "fast_track", title: "Fast Track Immigration", desc: "Expedited airport clearance.", icon: Navigation },
];

export function Step11Transfers() {
  const { state, updateState } = useWizard();

  const toggleTransfer = (id: string) => {
    if (state.airportTransfers.includes(id)) {
      updateState({ airportTransfers: state.airportTransfers.filter(t => t !== id) });
    } else {
      updateState({ airportTransfers: [...state.airportTransfers, id] });
    }
  };

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Transfers & Logistics</h2>
        <p className="text-gray-500 text-lg">Select the transportation services required for your attendees.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl">
        {transferTypes.map((type) => {
          const isSelected = state.airportTransfers.includes(type.id);
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => toggleTransfer(type.id)}
              className={cn(
                "group relative p-5 rounded-2xl border text-left transition-all duration-300",
                isSelected 
                  ? "border-blue-600 bg-blue-50 shadow-[0_0_0_1px_rgba(37,99,235,1)]" 
                  : "border-gray-200 bg-white hover:border-blue-300"
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                )}>
                  <Icon className="w-5 h-5" />
                </div>
                
                <div className={cn(
                  "w-5 h-5 rounded-md border flex items-center justify-center transition-colors",
                  isSelected ? "bg-blue-600 border-blue-600 text-white" : "border-gray-300"
                )}>
                  {isSelected && (
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
              
              <h3 className="text-sm font-bold text-gray-900 mb-1">{type.title}</h3>
              <p className="text-xs text-gray-500">{type.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
