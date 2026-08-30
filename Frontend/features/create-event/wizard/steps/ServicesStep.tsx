"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Check, Plus, Crown, FileText, Car, Hotel, Headphones, CalendarDays, Plane } from "lucide-react";

const SERVICES = [
  { id: "airport-vip", title: "Airport VIP Services", desc: "Fast-track, lounge access & tarmac transfers", icon: Crown },
  { id: "visa", title: "Visa & Documentation", desc: "Dedicated concierge for global group visas", icon: FileText },
  { id: "transfers", title: "Ground Transfers", desc: "Fleet of luxury SUVs and executive coaches", icon: Car },
  { id: "stays", title: "Premium Stays", desc: "Exclusive buyouts and presidential suites", icon: Hotel },
  { id: "support", title: "24/7 Travel Support", desc: "Dedicated on-call agent during your event", icon: Headphones },
  { id: "experiences", title: "Events & Experiences", desc: "Curated local activities and dining", icon: CalendarDays },
  { id: "flights", title: "Flight Coordination", desc: "Group booking and private charter management", icon: Plane },
];

export function ServicesStep() {
  const { state, updateState, nextStep } = useWizard();
  const [selectedServices, setSelectedServices] = useState<string[]>(state.services);

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    updateState({ services: selectedServices });
    nextStep();
  };

  return (
    <WizardShell onNext={handleNext}>
      <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif mb-2">Enhance Your Event</h2>
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest">
            Select premium add-ons for a seamless experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SERVICES.map(service => {
            const isSelected = selectedServices.includes(service.id);
            const Icon = service.icon;
            
            return (
              <button
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={cn(
                  "group relative p-6 text-left overflow-hidden rounded-2xl border transition-all duration-300 min-h-[220px] flex flex-col justify-between",
                  isSelected
                    ? "border-[#eab308] bg-[#eab308]/5 shadow-[0_0_30px_rgba(234,179,8,0.1)]"
                    : "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10"
                )}
              >
                <div className="relative z-10">
                  <div className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-all duration-500",
                    isSelected ? "bg-[#eab308] text-black" : "bg-black text-white/50 group-hover:scale-110 group-hover:text-white"
                  )}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  <h3 className={cn(
                    "font-serif text-xl mb-2 transition-colors",
                    isSelected ? "text-[#eab308]" : "text-white"
                  )}>
                    {service.title}
                  </h3>
                  
                  <p className="text-white/50 text-sm leading-relaxed max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    {service.desc}
                  </p>
                </div>

                <div className="relative z-10 mt-6 flex items-center justify-between">
                  <div className={cn(
                    "text-xs font-mono uppercase tracking-widest transition-colors",
                    isSelected ? "text-[#eab308]" : "text-white/30 group-hover:text-white"
                  )}>
                    {isSelected ? "Added" : "Add Service"}
                  </div>
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                    isSelected ? "bg-[#eab308] text-black" : "border border-white/20 text-white/30 group-hover:border-white group-hover:text-white"
                  )}>
                    {isSelected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </div>

                {/* Subtle background glow when hovered */}
                <div className={cn(
                  "absolute inset-0 bg-gradient-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                  isSelected && "to-[#eab308]/10"
                )} />
              </button>
            );
          })}
        </div>

      </div>
    </WizardShell>
  );
}
