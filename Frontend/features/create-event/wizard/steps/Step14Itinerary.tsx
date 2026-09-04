"use client";

import { useWizard, ItineraryDay, Activity } from "../WizardContext";
import { Plus, Trash2, Calendar, Clock, MapPin } from "lucide-react";

export function Step14Itinerary() {
  const { state, updateState } = useWizard();

  const handleAddDay = () => {
    const newDay: ItineraryDay = {
      id: Math.random().toString(36).substring(7),
      dayNumber: state.itinerary.length + 1,
      date: null,
      title: "",
      activities: []
    };
    updateState({ itinerary: [...state.itinerary, newDay] });
  };

  const handleAddActivity = (dayId: string) => {
    const newActivity: Activity = {
      id: Math.random().toString(36).substring(7),
      time: "09:00",
      name: "",
      location: "",
      description: ""
    };
    
    updateState({
      itinerary: state.itinerary.map(day => 
        day.id === dayId ? { ...day, activities: [...day.activities, newActivity] } : day
      )
    });
  };

  const handleUpdateDay = (dayId: string, field: keyof ItineraryDay, value: any) => {
    updateState({
      itinerary: state.itinerary.map(day => 
        day.id === dayId ? { ...day, [field]: value } : day
      )
    });
  };

  const handleUpdateActivity = (dayId: string, activityId: string, field: keyof Activity, value: any) => {
    updateState({
      itinerary: state.itinerary.map(day => {
        if (day.id === dayId) {
          return {
            ...day,
            activities: day.activities.map(act => 
              act.id === activityId ? { ...act, [field]: value } : act
            )
          };
        }
        return day;
      })
    });
  };

  return (
    <div className="p-8 md:p-12 h-full flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Event Schedule</h2>
        <p className="text-gray-500 text-lg">Build a day-by-day itinerary for your attendees.</p>
      </div>

      <div className="space-y-8 max-w-4xl">
        {state.itinerary.map((day, index) => (
          <div key={day.id} className="border border-gray-200 rounded-2xl bg-white shadow-sm overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                  D{day.dayNumber}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Day Theme (e.g. Arrivals & Welcome)"
                    className="bg-transparent border-none focus:ring-0 text-sm font-bold text-gray-900 placeholder:text-gray-400 p-0 outline-none w-[300px]"
                    value={day.title}
                    onChange={(e) => handleUpdateDay(day.id, "title", e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                <input
                  type="date"
                  className="bg-transparent border-none focus:ring-0 text-sm outline-none text-gray-700"
                  value={day.date ? day.date.toISOString().split('T')[0] : ""}
                  onChange={(e) => handleUpdateDay(day.id, "date", e.target.value ? new Date(e.target.value) : null)}
                />
              </div>
            </div>

            <div className="p-6 space-y-4">
              {day.activities.map((act) => (
                <div key={act.id} className="flex gap-4 items-start group">
                  <div className="w-20 pt-2 flex items-center gap-2 text-gray-500 flex-shrink-0">
                    <Clock className="w-3 h-3" />
                    <input
                      type="time"
                      className="bg-transparent border-none text-xs outline-none focus:ring-0 p-0 w-full"
                      value={act.time}
                      onChange={(e) => handleUpdateActivity(day.id, act.id, "time", e.target.value)}
                    />
                  </div>
                  <div className="flex-1 bg-gray-50 border border-gray-100 rounded-xl p-4 transition-colors group-hover:border-blue-200">
                    <input
                      type="text"
                      placeholder="Activity Title"
                      className="w-full bg-transparent border-none text-sm font-bold text-gray-900 outline-none p-0 focus:ring-0 mb-2"
                      value={act.name}
                      onChange={(e) => handleUpdateActivity(day.id, act.id, "name", e.target.value)}
                    />
                    <div className="flex items-center gap-2 text-gray-500 text-xs">
                      <MapPin className="w-3 h-3" />
                      <input
                        type="text"
                        placeholder="Location"
                        className="bg-transparent border-none outline-none focus:ring-0 p-0 w-full"
                        value={act.location}
                        onChange={(e) => handleUpdateActivity(day.id, act.id, "location", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() => handleAddActivity(day.id)}
                className="ml-24 mt-4 text-xs font-bold uppercase tracking-wider text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Add Activity
              </button>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddDay}
          className="w-full py-6 rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors flex flex-col items-center justify-center gap-2"
        >
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <Plus className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm">Add Itinerary Day</span>
        </button>
      </div>
    </div>
  );
}
