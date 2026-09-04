"use client";

import { useWizard } from "../WizardContext";
import { Users, Crown, Briefcase, GraduationCap, Minus, Plus } from "lucide-react";
import { useEffect } from "react";

export function Step5Guests() {
  const { state, updateState } = useWizard();

  const handleUpdate = (field: keyof typeof state.guestConfig, value: number) => {
    // Ensure value is non-negative
    const safeValue = Math.max(0, value);
    updateState({
      guestConfig: {
        ...state.guestConfig,
        [field]: safeValue
      }
    });
  };

  // Auto-calculate total capacity
  useEffect(() => {
    const { adults, children, infants, staff, speakers, organizers, companions } = state.guestConfig;
    const total = adults + children + infants + staff + speakers + organizers + companions;
    if (total !== state.capacity) {
      updateState({ capacity: total });
    }
  }, [state.guestConfig, state.capacity, updateState]);

  const GuestCounter = ({ icon: Icon, title, desc, field, value }: { icon: any, title: string, desc: string, field: keyof typeof state.guestConfig, value: number }) => (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-2xl bg-white hover:border-blue-300 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900">{title}</h4>
          <p className="text-xs text-gray-500">{desc}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button 
          onClick={() => handleUpdate(field, value - 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors"
          disabled={value <= 0}
        >
          <Minus className="w-3 h-3" />
        </button>
        <span className="w-8 text-center font-bold text-gray-900">{value}</span>
        <button 
          onClick={() => handleUpdate(field, value + 1)}
          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:border-blue-600 hover:text-blue-600 transition-colors"
        >
          <Plus className="w-3 h-3" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Guest Profile</h2>
          <p className="text-gray-500 text-lg">Who is attending your event?</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 min-w-[200px] text-center">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Total Attendees</p>
          <p className="text-4xl font-display font-bold text-blue-900">{state.capacity}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">Primary Attendees</h3>
          <GuestCounter icon={Users} title="Adults" desc="Standard attendees (12+ yrs)" field="adults" value={state.guestConfig.adults} />
          <GuestCounter icon={Crown} title="VIP Guests" desc="Executives, VVIPs, special status" field="vip" value={state.guestConfig.vip} />
          <GuestCounter icon={Users} title="Companions" desc="Spouses or +1s" field="companions" value={state.guestConfig.companions} />
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">Crew & Operations</h3>
          <GuestCounter icon={Briefcase} title="Staff & Crew" desc="Event organizers, media, crew" field="staff" value={state.guestConfig.staff} />
          <GuestCounter icon={GraduationCap} title="Speakers" desc="Keynotes, panelists" field="speakers" value={state.guestConfig.speakers} />
        </div>
      </div>
    </div>
  );
}
