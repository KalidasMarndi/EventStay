"use client";

import { useWizard } from "../WizardContext";
import { Plane, Train, MapPin } from "lucide-react";

export function Step10Travel() {
  const { state, updateState } = useWizard();

  const handleUpdate = (field: keyof typeof state.travel, value: any) => {
    updateState({
      travel: {
        ...state.travel,
        [field]: value
      }
    });
  };

  return (
    <div className="p-8 md:p-12 h-full flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Travel Requirements</h2>
        <p className="text-gray-500 text-lg">Do your guests require flight support or travel arrangements?</p>
      </div>

      <div className="space-y-10 max-w-3xl">
        <div className="flex items-start gap-4 p-6 rounded-2xl border transition-colors border-gray-200 hover:border-blue-300">
          <div className="flex h-6 items-center">
            <input
              id="flight-support"
              type="checkbox"
              className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
              checked={state.travel.flightSupport}
              onChange={(e) => handleUpdate("flightSupport", e.target.checked)}
            />
          </div>
          <div className="flex-1">
            <label htmlFor="flight-support" className="font-bold text-gray-900 block mb-1">Require Flight / Train Ticketing Support</label>
            <p className="text-sm text-gray-500">EventStay will manage commercial or charter flight bookings for your attendees.</p>
            
            {state.travel.flightSupport && (
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Arrival Airport</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Plane className="h-4 w-4 text-gray-400 rotate-90" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. DXB"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm"
                      value={state.travel.arrivalAirport}
                      onChange={(e) => handleUpdate("arrivalAirport", e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Departure Airport</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Plane className="h-4 w-4 text-gray-400 -rotate-45" />
                    </div>
                    <input
                      type="text"
                      placeholder="e.g. DXB"
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm"
                      value={state.travel.departureAirport}
                      onChange={(e) => handleUpdate("departureAirport", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
