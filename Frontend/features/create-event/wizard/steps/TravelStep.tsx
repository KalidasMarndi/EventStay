"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plane, Car, Crown, Check, ChevronDown, Calendar as CalendarIcon, Users } from "lucide-react";

export function TravelStep() {
  const { state, updateState, nextStep } = useWizard();
  const [travel, setTravel] = useState(state.travel);

  const toggleService = (service: keyof typeof travel) => {
    if (typeof travel[service] === 'boolean') {
      setTravel({ ...travel, [service]: !travel[service] });
    }
  };

  const handleNext = () => {
    updateState({ travel });
    nextStep();
  };

  return (
    <WizardShell onNext={handleNext}>
      <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="mb-10">
          <h2 className="text-3xl font-serif mb-2">Travel Logistics</h2>
          <p className="text-white/50 font-mono text-sm uppercase tracking-widest">
            Select the travel services you require
          </p>
        </div>

        <div className="space-y-6">
          
          {/* Flight Support */}
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300">
            <button 
              onClick={() => toggleService("flightSupport")}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                  travel.flightSupport ? "bg-[#eab308] text-black" : "bg-white/10 text-white/50"
                )}>
                  <Plane className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-1 text-white">Flight Support</h3>
                  <p className="text-sm text-white/50">Group bookings, private charters, and itinerary management</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                  travel.flightSupport ? "border-[#eab308] bg-[#eab308] text-black" : "border-white/20 text-transparent"
                )}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <ChevronDown className={cn("w-5 h-5 text-white/30 transition-transform duration-300", travel.flightSupport ? "rotate-180" : "")} />
              </div>
            </button>
            
            {travel.flightSupport && (
              <div className="p-6 pt-0 border-t border-white/5 animate-in slide-in-from-top-2 duration-300 bg-black/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50 tracking-wider">Departure City</label>
                    <input 
                      type="text" 
                      placeholder="e.g. New York (JFK)" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#eab308] focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-mono uppercase text-white/50 tracking-wider">Cabin Class</label>
                    <select className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-sm focus:border-[#eab308] focus:outline-none transition-colors appearance-none">
                      <option>Economy</option>
                      <option>Premium Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                    </select>
                  </div>
                  <div className="col-span-1 md:col-span-2 text-xs text-white/40 italic">
                    * Travel concierges will contact you to finalize group flight manifests.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ground Transfer */}
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300">
            <button 
              onClick={() => toggleService("groundTransfer")}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                  travel.groundTransfer ? "bg-[#eab308] text-black" : "bg-white/10 text-white/50"
                )}>
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-1 text-white">Ground Transfer</h3>
                  <p className="text-sm text-white/50">Airport pickups, executive cars, and group coaches</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                  travel.groundTransfer ? "border-[#eab308] bg-[#eab308] text-black" : "border-white/20 text-transparent"
                )}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <ChevronDown className={cn("w-5 h-5 text-white/30 transition-transform duration-300", travel.groundTransfer ? "rotate-180" : "")} />
              </div>
            </button>
            
            {travel.groundTransfer && (
              <div className="p-6 pt-0 border-t border-white/5 animate-in slide-in-from-top-2 duration-300 bg-black/20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {["Executive Sedan", "Premium SUV", "Luxury Van", "Group Coach"].map(type => (
                    <div key={type} className="border border-white/10 bg-white/5 rounded-xl p-4 text-center hover:border-white/30 cursor-pointer transition-colors">
                      <Car className="w-6 h-6 mx-auto mb-3 text-white/60" />
                      <div className="text-xs font-mono uppercase tracking-wider text-white/80">{type}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Airport VIP */}
          <div className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all duration-300">
            <button 
              onClick={() => toggleService("airportVip")}
              className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-colors text-left"
            >
              <div className="flex items-center gap-6">
                <div className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                  travel.airportVip ? "bg-[#eab308] text-black" : "bg-white/10 text-white/50"
                )}>
                  <Crown className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-xl mb-1 text-white">Airport VIP</h3>
                  <p className="text-sm text-white/50">Fast-track security, lounge access, and meet & greet</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                  travel.airportVip ? "border-[#eab308] bg-[#eab308] text-black" : "border-white/20 text-transparent"
                )}>
                  <Check className="w-3.5 h-3.5" />
                </div>
                <ChevronDown className={cn("w-5 h-5 text-white/30 transition-transform duration-300", travel.airportVip ? "rotate-180" : "")} />
              </div>
            </button>
            
            {travel.airportVip && (
              <div className="p-6 pt-0 border-t border-white/5 animate-in slide-in-from-top-2 duration-300 bg-black/20">
                <div className="mt-6 flex flex-col sm:flex-row gap-4">
                  <label className="flex-1 border border-white/10 bg-white/5 rounded-xl p-4 cursor-pointer hover:border-[#eab308]/50 transition-colors relative">
                    <input type="radio" name="vip-level" className="absolute top-4 right-4 accent-[#eab308]" defaultChecked />
                    <div className="font-serif text-lg mb-1">Standard VIP</div>
                    <div className="text-xs text-white/50">Fast-track & Lounge Access</div>
                  </label>
                  <label className="flex-1 border border-white/10 bg-[#eab308]/5 rounded-xl p-4 cursor-pointer hover:border-[#eab308] transition-colors relative">
                    <input type="radio" name="vip-level" className="absolute top-4 right-4 accent-[#eab308]" />
                    <div className="font-serif text-lg mb-1 text-[#eab308]">Elite Tarmac</div>
                    <div className="text-xs text-white/50">Tarmac transfer & Private suite</div>
                  </label>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </WizardShell>
  );
}
