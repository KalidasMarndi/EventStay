"use client";

import { useWizard } from "../WizardContext";
import { User, Building, Mail, Phone, MapPin } from "lucide-react";

export function Step4OrganizerDetails() {
  const { state, updateState } = useWizard();

  const handleUpdate = (field: keyof typeof state.organizer, value: string) => {
    updateState({
      organizer: {
        ...state.organizer,
        [field]: value
      }
    });
  };

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Organizer Details</h2>
        <p className="text-gray-500 text-lg">Who is the primary contact for this event?</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl">
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">Primary Contact</h3>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Full Name *"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                value={state.organizer.name}
                onChange={(e) => handleUpdate("name", e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Email Address *"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                value={state.organizer.email}
                onChange={(e) => handleUpdate("email", e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                value={state.organizer.phone}
                onChange={(e) => handleUpdate("phone", e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2">Organization</h3>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Building className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Company / Organization Name"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                value={state.organizer.company}
                onChange={(e) => handleUpdate("company", e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Billing Contact Name"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                value={state.organizer.billingContact}
                onChange={(e) => handleUpdate("billingContact", e.target.value)}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Billing Email"
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
                value={state.organizer.billingEmail}
                onChange={(e) => handleUpdate("billingEmail", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
