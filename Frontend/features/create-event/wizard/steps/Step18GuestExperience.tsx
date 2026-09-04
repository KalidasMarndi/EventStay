"use client";

import { useWizard } from "../WizardContext";

export function Step18GuestExperience() {
  const { state, updateState } = useWizard();

  const handleUpdate = (field: keyof typeof state.guestExperience, value: boolean) => {
    updateState({
      guestExperience: {
        ...state.guestExperience,
        [field]: value
      }
    });
  };

  const toggles = [
    { id: "showItinerary", title: "Show Itinerary", desc: "Guests can view the day-by-day schedule." },
    { id: "showHotels", title: "Show Accommodation", desc: "Guests can view and select from hotel blocks." },
    { id: "showTransfers", title: "Show Transfers", desc: "Guests can request airport transfers." },
    { id: "allowBooking", title: "Allow Online Booking", desc: "Enable the registration and booking flow." },
    { id: "showFaqs", title: "Show FAQs", desc: "Display standard event FAQs." },
  ];

  return (
    <div className="p-8 md:p-12 h-full flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Guest Experience</h2>
        <p className="text-gray-500 text-lg">Control what features are visible on the guest microsite.</p>
      </div>

      <div className="space-y-6 max-w-3xl">
        {toggles.map((toggle) => (
          <div key={toggle.id} className="flex items-center justify-between p-6 rounded-2xl border border-gray-200 bg-white">
            <div>
              <h3 className="text-sm font-bold text-gray-900 mb-1">{toggle.title}</h3>
              <p className="text-xs text-gray-500">{toggle.desc}</p>
            </div>
            
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={state.guestExperience[toggle.id as keyof typeof state.guestExperience]}
                onChange={(e) => handleUpdate(toggle.id as keyof typeof state.guestExperience, e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
