"use client";

import { useWizard, Accommodation } from "../WizardContext";
import { BedDouble, Plus, Trash2, Hotel } from "lucide-react";

export function Step9Accommodation() {
  const { state, updateState } = useWizard();

  const handleAddAccommodation = () => {
    const newAcc: Accommodation = {
      id: Math.random().toString(36).substring(7),
      hotelName: "",
      roomType: "Standard",
      roomsRequired: 0,
      guestsPerRoom: 2,
      checkIn: state.startDate || null,
      checkOut: state.endDate || null,
      rate: 0,
      currency: "USD",
      mealPlan: "Bed & Breakfast"
    };
    updateState({ accommodations: [...state.accommodations, newAcc] });
  };

  const handleRemoveAccommodation = (id: string) => {
    updateState({ accommodations: state.accommodations.filter(a => a.id !== id) });
  };

  const handleUpdate = (id: string, field: keyof Accommodation, value: any) => {
    updateState({
      accommodations: state.accommodations.map(a => 
        a.id === id ? { ...a, [field]: value } : a
      )
    });
  };

  const totalRooms = state.accommodations.reduce((acc, curr) => acc + (curr.roomsRequired || 0), 0);

  return (
    <div className="p-8 md:p-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Accommodations</h2>
          <p className="text-gray-500 text-lg">Define hotel blocks and room requirements.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 min-w-[200px] text-center">
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Total Rooms Required</p>
          <p className="text-4xl font-display font-bold text-blue-900">{totalRooms}</p>
        </div>
      </div>

      <div className="space-y-6">
        {state.accommodations.map((acc, index) => (
          <div key={acc.id} className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm relative">
            <button 
              onClick={() => handleRemoveAccommodation(acc.id)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>

            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6 flex items-center gap-2">
              <Hotel className="w-4 h-4 text-blue-600" />
              Stay Block {index + 1}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2 lg:col-span-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Hotel / Resort Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900"
                  value={acc.hotelName}
                  onChange={(e) => handleUpdate(acc.id, "hotelName", e.target.value)}
                  placeholder="e.g. Grand Marina"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Room Type</label>
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900 bg-white"
                  value={acc.roomType}
                  onChange={(e) => handleUpdate(acc.id, "roomType", e.target.value)}
                >
                  <option>Standard</option>
                  <option>Deluxe</option>
                  <option>Executive</option>
                  <option>Suite</option>
                  <option>Villa</option>
                  <option>Twin</option>
                  <option>Double</option>
                  <option>Single</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Rooms Needed</label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900"
                  value={acc.roomsRequired || ""}
                  onChange={(e) => handleUpdate(acc.id, "roomsRequired", parseInt(e.target.value) || 0)}
                  min="0"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Meal Plan</label>
                <select
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900 bg-white"
                  value={acc.mealPlan}
                  onChange={(e) => handleUpdate(acc.id, "mealPlan", e.target.value)}
                >
                  <option>Room Only</option>
                  <option>Bed & Breakfast</option>
                  <option>Half Board</option>
                  <option>Full Board</option>
                  <option>All Inclusive</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Est. Rate per night</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 text-sm">$</span>
                  <input
                    type="number"
                    className="w-full pl-8 pr-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm text-gray-900"
                    value={acc.rate || ""}
                    onChange={(e) => handleUpdate(acc.id, "rate", parseFloat(e.target.value) || 0)}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}

        <button
          onClick={handleAddAccommodation}
          className="w-full py-6 rounded-2xl border-2 border-dashed border-gray-300 text-gray-500 hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 transition-colors flex flex-col items-center justify-center gap-2"
        >
          <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
            <Plus className="w-5 h-5" />
          </div>
          <span className="font-bold text-sm">Add Stay Requirement</span>
        </button>
      </div>
    </div>
  );
}
