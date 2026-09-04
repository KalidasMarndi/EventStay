"use client";

import { useWizard } from "../WizardContext";

export function Step2EventBasics() {
  const { state, updateState } = useWizard();

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Event Basics</h2>
        <p className="text-gray-500 text-lg">Let's start with the fundamental details of your event.</p>
      </div>

      <div className="space-y-8 max-w-2xl">
        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Event Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Global Leadership Summit 2026"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none text-gray-900 placeholder:text-gray-400"
            value={state.title}
            onChange={(e) => updateState({ title: e.target.value })}
            maxLength={100}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>The official public name of the event</span>
            <span>{state.title.length}/100</span>
          </div>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Briefly describe the event, its purpose, and what attendees can expect..."
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition-all outline-none text-gray-900 placeholder:text-gray-400 resize-none"
            value={state.description}
            onChange={(e) => updateState({ description: e.target.value })}
            maxLength={1000}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>This may be visible on the event microsite</span>
            <span>{state.description.length}/1000</span>
          </div>
        </div>
      </div>
    </div>
  );
}
