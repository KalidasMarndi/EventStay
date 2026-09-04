"use client";

import { useWizard } from "../WizardContext";

export function Step19InternalNotes() {
  const { state, updateState } = useWizard();

  return (
    <div className="p-8 md:p-12 h-full flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Internal Notes</h2>
        <p className="text-gray-500 text-lg">Add any operational or planning notes. These are hidden from guests.</p>
      </div>

      <div className="space-y-6 max-w-3xl">
        <textarea
          placeholder="e.g. VIP handling instructions, supplier negotiations, finance notes..."
          rows={12}
          className="w-full px-6 py-5 rounded-2xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900 resize-none text-base"
          value={state.internalNotes}
          onChange={(e) => updateState({ internalNotes: e.target.value })}
        />
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-orange-500">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          Strictly Internal Use Only
        </div>
      </div>
    </div>
  );
}
