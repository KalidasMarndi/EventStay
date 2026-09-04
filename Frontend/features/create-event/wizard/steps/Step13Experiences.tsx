"use client";

import { useWizard, Experience } from "../WizardContext";
import { Plus, Trash2, Map } from "lucide-react";

export function Step13Experiences() {
  const { state, updateState } = useWizard();

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: Math.random().toString(36).substring(7),
      name: "",
      date: state.startDate || null,
      time: "09:00",
      guests: state.capacity || 0
    };
    updateState({ experiences: [...state.experiences, newExp] });
  };

  const handleRemove = (id: string) => {
    updateState({ experiences: state.experiences.filter(e => e.id !== id) });
  };

  const handleUpdate = (id: string, field: keyof Experience, value: any) => {
    updateState({
      experiences: state.experiences.map(e => 
        e.id === id ? { ...e, [field]: value } : e
      )
    });
  };

  const formatDateForInput = (date: Date | null) => {
    if (!date) return "";
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Experiences & Activities</h2>
        <p className="text-gray-500 text-lg">Curate local tours, dining, and team building activities.</p>
      </div>

      <div className="space-y-6 max-w-4xl">
        {state.experiences.map((exp, index) => (
          <div key={exp.id} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm relative">
            <button 
              onClick={() => handleRemove(exp.id)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Map className="w-4 h-4 text-blue-600" />
              Activity {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2 lg:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Experience Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900"
                  value={exp.name}
                  onChange={(e) => handleUpdate(exp.id, "name", e.target.value)}
                  placeholder="e.g. Desert Safari & VIP Dinner"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900"
                  value={formatDateForInput(exp.date)}
                  onChange={(e) => handleUpdate(exp.id, "date", e.target.value ? new Date(e.target.value) : null)}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Time</label>
                <input
                  type="time"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900"
                  value={exp.time}
                  onChange={(e) => handleUpdate(exp.id, "time", e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Est. Guests</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900"
                  value={exp.guests || ""}
                  onChange={(e) => handleUpdate(exp.id, "guests", parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddExperience}
          className="w-full py-6 rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors flex flex-col items-center justify-center gap-2"
        >
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <Plus className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm">Add New Experience</span>
        </button>
      </div>
    </div>
  );
}
