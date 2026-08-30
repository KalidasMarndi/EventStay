"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { Minus, Plus, Users, Crown, Baby, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function GuestsStep() {
  const { state, updateState, nextStep } = useWizard();
  const [guests, setGuests] = useState(state.guests);

  const totalGuests = guests.adults + guests.children + guests.vip + guests.staff;
  const isValid = totalGuests > 0 && guests.roomPreference !== "";

  // Sync to local state when moving between steps
  useEffect(() => {
    setGuests(state.guests);
  }, [state.guests]);

  const updateCounter = (key: keyof typeof guests, increment: number) => {
    if (typeof guests[key] === "number") {
      const current = guests[key] as number;
      const newValue = Math.max(0, current + increment);
      setGuests({ ...guests, [key]: newValue });
    }
  };

  const setPreference = (pref: string) => {
    setGuests({ ...guests, roomPreference: pref as any });
  };

  const handleNext = () => {
    updateState({ guests });
    nextStep();
  };

  // Generate dots for visualizer (max 100 to avoid performance issues)
  const renderDots = () => {
    const displayCount = Math.min(totalGuests, 100);
    const dots = [];
    
    // VIPs (Gold)
    for (let i = 0; i < guests.vip && dots.length < 100; i++) {
      dots.push(<div key={`vip-${i}`} className="w-2.5 h-2.5 rounded-full bg-[#eab308] shadow-[0_0_8px_rgba(234,179,8,0.5)] animate-in zoom-in duration-300" />);
    }
    // Staff (Blue)
    for (let i = 0; i < guests.staff && dots.length < 100; i++) {
      dots.push(<div key={`staff-${i}`} className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] animate-in zoom-in duration-300 delay-75" />);
    }
    // Adults (White)
    for (let i = 0; i < guests.adults && dots.length < 100; i++) {
      dots.push(<div key={`adult-${i}`} className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.3)] animate-in zoom-in duration-300 delay-150" />);
    }
    // Children (Gray)
    for (let i = 0; i < guests.children && dots.length < 100; i++) {
      dots.push(<div key={`child-${i}`} className="w-2.5 h-2.5 rounded-full bg-white/30 animate-in zoom-in duration-300 delay-200" />);
    }

    return dots;
  };

  return (
    <WizardShell canGoNext={isValid} onNext={handleNext}>
      <div className="max-w-5xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col lg:flex-row gap-12 lg:gap-24">
        
        {/* Left Column: Counters */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl font-serif mb-2">Who's Coming?</h2>
            <p className="text-white/50 font-mono text-sm uppercase tracking-widest mb-8">
              Tell us about your group
            </p>
          </div>

          <div className="space-y-4">
            <Counter 
              icon={<Users className="w-5 h-5 text-white/50" />}
              label="Adults" 
              value={guests.adults} 
              onChange={(v) => updateCounter("adults", v)} 
            />
            <Counter 
              icon={<Baby className="w-5 h-5 text-white/50" />}
              label="Children" 
              subtext="Under 12 years"
              value={guests.children} 
              onChange={(v) => updateCounter("children", v)} 
            />
            <Counter 
              icon={<Crown className="w-5 h-5 text-[#eab308]" />}
              label="VIP Guests" 
              subtext="Requires special handling"
              value={guests.vip} 
              onChange={(v) => updateCounter("vip", v)} 
            />
            <Counter 
              icon={<Briefcase className="w-5 h-5 text-blue-500" />}
              label="Staff / Organizers" 
              value={guests.staff} 
              onChange={(v) => updateCounter("staff", v)} 
            />
          </div>
        </div>

        {/* Right Column: Visualization & Details */}
        <div className="flex-1 space-y-12">
          
          {/* Visualizer */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden">
            <div className="text-[80px] font-display text-white/10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
              {totalGuests}
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-4xl font-serif mb-1">{totalGuests}</div>
              <div className="text-xs font-mono uppercase tracking-widest text-white/50 mb-8">Total Guests</div>
              
              <div className="flex flex-wrap justify-center gap-1.5 max-w-[280px]">
                {totalGuests === 0 ? (
                  <span className="text-sm text-white/20 italic">Add guests to see group size</span>
                ) : (
                  renderDots()
                )}
                {totalGuests > 100 && (
                  <span className="text-xs text-white/50 flex items-center ml-2">+ {totalGuests - 100} more</span>
                )}
              </div>
            </div>
          </div>

          {/* Room Preferences */}
          <div>
            <h3 className="text-sm font-mono text-white/70 uppercase tracking-wider mb-4">Room Preference</h3>
            <div className="grid grid-cols-3 gap-4">
              <RoomToggle 
                label="Single" 
                selected={guests.roomPreference === "single"} 
                onClick={() => setPreference("single")} 
              />
              <RoomToggle 
                label="Double" 
                selected={guests.roomPreference === "double"} 
                onClick={() => setPreference("double")} 
              />
              <RoomToggle 
                label="Twin" 
                selected={guests.roomPreference === "twin"} 
                onClick={() => setPreference("twin")} 
              />
            </div>
          </div>
          
          {/* Optional Notes */}
          <div>
            <h3 className="text-sm font-mono text-white/70 uppercase tracking-wider mb-4">Special Requests (Optional)</h3>
            <textarea 
              value={guests.dietary}
              onChange={(e) => setGuests({ ...guests, dietary: e.target.value })}
              placeholder="Any dietary or accessibility requirements?"
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#eab308] focus:ring-1 focus:ring-[#eab308] transition-all resize-none text-sm"
            />
          </div>

        </div>
      </div>
    </WizardShell>
  );
}

function Counter({ icon, label, subtext, value, onChange }: {
  icon: React.ReactNode;
  label: string;
  subtext?: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/5 hover:border-white/10 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <div className="font-serif text-lg">{label}</div>
          {subtext && <div className="text-xs text-white/40">{subtext}</div>}
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={() => onChange(-1)}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white hover:bg-white/10 transition-all disabled:opacity-30 disabled:pointer-events-none"
          disabled={value === 0}
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-mono text-lg">{value}</span>
        <button 
          onClick={() => onChange(1)}
          className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-[#eab308] hover:border-[#eab308] hover:bg-[#eab308]/10 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

function RoomToggle({ label, selected, onClick }: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-3 rounded-lg border text-sm font-mono uppercase tracking-wider transition-all",
        selected 
          ? "border-[#eab308] bg-[#eab308]/10 text-[#eab308]" 
          : "border-white/10 bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
      )}
    >
      {label}
    </button>
  );
}
