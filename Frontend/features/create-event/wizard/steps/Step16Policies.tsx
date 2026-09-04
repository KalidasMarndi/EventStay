"use client";

import { useWizard } from "../WizardContext";
import { Shield, FileWarning, CalendarClock } from "lucide-react";

export function Step16Policies() {
  const { state, updateState } = useWizard();

  const handleUpdate = (field: keyof typeof state.policies, value: any) => {
    updateState({
      policies: {
        ...state.policies,
        [field]: value
      }
    });
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="p-8 md:p-12 h-full flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Event Policies</h2>
        <p className="text-gray-500 text-lg">Set the rules for bookings, cancellations, and deadlines.</p>
      </div>

      <div className="space-y-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
              <CalendarClock className="w-4 h-4 text-gray-400" /> Deadlines
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Booking Deadline</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
                  value={formatDateForInput(state.policies.bookingDeadline)}
                  onChange={(e) => handleUpdate("bookingDeadline", e.target.value ? new Date(e.target.value) : null)}
                />
                <p className="text-xs text-gray-500 mt-1">Last day guests can register or book rooms.</p>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Payment Deadline</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
                  value={formatDateForInput(state.policies.paymentDeadline)}
                  onChange={(e) => handleUpdate("paymentDeadline", e.target.value ? new Date(e.target.value) : null)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
              <Shield className="w-4 h-4 text-gray-400" /> Stay Policies
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Minimum Stay Requirement</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    className="w-24 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900 font-bold text-center"
                    value={state.policies.minimumStay || 1}
                    onChange={(e) => handleUpdate("minimumStay", parseInt(e.target.value) || 1)}
                    min="1"
                  />
                  <span className="text-gray-500 font-medium">Nights</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
            <FileWarning className="w-4 h-4 text-gray-400" /> Terms & Conditions
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Cancellation Policy</label>
              <textarea
                placeholder="Specify the rules for canceling attendance or accommodation..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900 resize-none"
                value={state.policies.cancellationPolicy}
                onChange={(e) => handleUpdate("cancellationPolicy", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Refund Policy</label>
              <textarea
                placeholder="Specify how and when refunds are processed..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900 resize-none"
                value={state.policies.refundPolicy}
                onChange={(e) => handleUpdate("refundPolicy", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
