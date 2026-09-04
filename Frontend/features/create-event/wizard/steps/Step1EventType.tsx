"use client";

import { useWizard, EventCategory } from "../WizardContext";
import { Building2, Sparkles, Presentation, Plane, Users, Music, Landmark, Trophy, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const eventTypes: { id: EventCategory; title: string; desc: string; icon: any }[] = [
  { id: "CORPORATE", title: "Corporate Summit", desc: "Bring leadership teams together for a structured multi-day event.", icon: Building2 },
  { id: "WEDDING", title: "Destination Wedding", desc: "Coordinate accommodation, travel, transfers and guest experiences.", icon: Sparkles },
  { id: "INCENTIVE", title: "Incentive Trip", desc: "Create a premium group travel experience for high-performing teams.", icon: Plane },
  { id: "MICE", title: "MICE", desc: "Manage meetings, incentives, conferences and exhibitions.", icon: Users },
  { id: "CONFERENCE", title: "Conference", desc: "Large scale professional gatherings with multiple tracks.", icon: Presentation },
  { id: "CULTURAL", title: "Cultural Event", desc: "Festivals, art exhibitions, and cultural exchanges.", icon: Landmark },
  { id: "MUSIC", title: "Music & Entertainment", desc: "Concerts, tours, and entertainment events.", icon: Music },
  { id: "SPORTS", title: "Sports Event", desc: "Tournaments, matches, and sporting competitions.", icon: Trophy },
  { id: "OTHER", title: "Other", desc: "Private celebrations, group tours, and custom events.", icon: HelpCircle },
];

export function Step1EventType() {
  const { state, updateState } = useWizard();

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">What kind of event are you planning?</h2>
        <p className="text-gray-500 text-lg">Select the primary category that best describes your event.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {eventTypes.map((type) => {
          const isSelected = state.category === type.id;
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => updateState({ category: type.id })}
              className={cn(
                "group relative p-6 rounded-2xl border text-left transition-all duration-300",
                isSelected 
                  ? "border-blue-600 bg-blue-50 shadow-[0_0_0_1px_rgba(37,99,235,1)]" 
                  : "border-gray-200 bg-white hover:border-blue-300 hover:shadow-md"
              )}
            >
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors",
                isSelected ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
              )}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{type.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{type.desc}</p>
              
              {isSelected && (
                <div className="absolute top-6 right-6 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
