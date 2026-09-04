"use client";

import { useWizard } from "../WizardContext";
import { Building2, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const venueTypes = [
  "Hotel Ballroom",
  "Convention Center",
  "Resort",
  "Beach Venue",
  "Private Estate",
  "Exhibition Center",
  "Conference Center",
  "Other"
];

export function Step8Venue() {
  const { state, updateState } = useWizard();

  const handleUpdate = (field: keyof typeof state.venueConfig, value: string | number) => {
    updateState({
      venueConfig: {
        ...state.venueConfig,
        [field]: value
      }
    });
  };

  return (
    <div className="p-8 md:p-12 h-full flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Venue</h2>
        <p className="text-gray-500 text-lg">Where will the main event activities take place?</p>
      </div>

      <div className="space-y-8 max-w-3xl">
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Venue Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Building2 className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="e.g. Grand Dubai Convention Center"
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
              value={state.venueConfig.name}
              onChange={(e) => handleUpdate("name", e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Venue Type
          </label>
          <div className="flex flex-wrap gap-3">
            {venueTypes.map((type) => (
              <button
                key={type}
                onClick={() => handleUpdate("type", type)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors border",
                  state.venueConfig.type === type
                    ? "bg-blue-50 border-blue-600 text-blue-700"
                    : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
              Address / Location
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Full address"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
                value={state.venueConfig.address}
                onChange={(e) => handleUpdate("address", e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
              Capacity Limit
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                placeholder="Max pax"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
                value={state.venueConfig.capacity || ""}
                onChange={(e) => handleUpdate("capacity", parseInt(e.target.value) || 0)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
