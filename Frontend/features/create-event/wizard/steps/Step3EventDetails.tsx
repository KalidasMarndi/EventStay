"use client";

import { useWizard } from "../WizardContext";

export function Step3EventDetails() {
  const { state, updateState } = useWizard();

  const handleUpdate = (field: keyof typeof state.eventDetails, value: string) => {
    updateState({
      eventDetails: {
        ...state.eventDetails,
        [field]: value
      }
    });
  };

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Event Details</h2>
        <p className="text-gray-500 text-lg">Additional information for internal tracking and display.</p>
      </div>

      <div className="space-y-8 max-w-2xl">
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Event Tagline <span className="text-gray-400 font-normal lowercase">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Innovate. Inspire. Ignite."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none text-gray-900 placeholder:text-gray-400"
            value={state.eventDetails.tagline}
            onChange={(e) => handleUpdate("tagline", e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">A short, catchy phrase representing your event</p>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Event Objective / Purpose
          </label>
          <textarea
            placeholder="What is the primary goal of this event?"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none text-gray-900 placeholder:text-gray-400 resize-none"
            value={state.eventDetails.objective}
            onChange={(e) => handleUpdate("objective", e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
              Internal Reference ID
            </label>
            <input
              type="text"
              placeholder="e.g. EVT-2026-A"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none text-gray-900 placeholder:text-gray-400"
              value={state.eventDetails.internalRef}
              onChange={(e) => handleUpdate("internalRef", e.target.value)}
            />
          </div>

          <div className="space-y-3">
            <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
              Purchase Order (PO) Number
            </label>
            <input
              type="text"
              placeholder="e.g. PO-89241"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none text-gray-900 placeholder:text-gray-400"
              value={state.eventDetails.poNumber}
              onChange={(e) => handleUpdate("poNumber", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
