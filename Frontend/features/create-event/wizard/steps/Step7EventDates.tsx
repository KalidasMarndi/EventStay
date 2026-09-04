"use client";

import { useWizard } from "../WizardContext";
import { Calendar } from "lucide-react";

export function Step7EventDates() {
  const { state, updateState } = useWizard();

  const handleDateChange = (field: 'startDate' | 'endDate' | 'arrival' | 'departure', value: string) => {
    const date = value ? new Date(value) : null;
    
    if (field === 'startDate' || field === 'endDate') {
      updateState({ [field]: date });
    } else {
      updateState({
        dateConfig: {
          ...state.dateConfig,
          [field]: date
        }
      });
    }
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  const calculateDuration = (start: Date | null, end: Date | null) => {
    if (!start || !end) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const eventDuration = calculateDuration(state.startDate, state.endDate);
  const stayDuration = calculateDuration(state.dateConfig.arrival, state.dateConfig.departure);

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Event Dates</h2>
        <p className="text-gray-500 text-lg">When is the main event taking place, and when are guests traveling?</p>
      </div>

      <div className="space-y-12 max-w-3xl">
        {/* Core Event Dates */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-6">Main Event Dates</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Event Start Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
                  value={formatDateForInput(state.startDate)}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Event End Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
                  value={formatDateForInput(state.endDate)}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  min={formatDateForInput(state.startDate) || undefined}
                />
              </div>
            </div>
          </div>

          {eventDuration > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-sm font-medium">
              Event Duration: <span className="font-bold">{eventDuration} Days</span>
            </div>
          )}
        </div>

        {/* Travel Window */}
        <div>
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 mb-6">Guest Travel Window <span className="text-gray-400 font-normal normal-case">(Optional)</span></h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Guest Arrival
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
                  value={formatDateForInput(state.dateConfig.arrival)}
                  onChange={(e) => handleDateChange('arrival', e.target.value)}
                />
              </div>
              <p className="text-xs text-gray-500">When do the majority of guests arrive?</p>
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-900 uppercase tracking-wide">
                Guest Departure
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Calendar className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900"
                  value={formatDateForInput(state.dateConfig.departure)}
                  onChange={(e) => handleDateChange('departure', e.target.value)}
                  min={formatDateForInput(state.dateConfig.arrival) || undefined}
                />
              </div>
              <p className="text-xs text-gray-500">When do guests fly back?</p>
            </div>
          </div>

          {stayDuration > 0 && (
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 text-green-700 text-sm font-medium">
              Required Stay: <span className="font-bold">{stayDuration - 1} Nights</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
