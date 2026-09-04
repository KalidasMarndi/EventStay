"use client";

import { useWizard } from "../WizardContext";
import { Calculator, DollarSign, Wallet } from "lucide-react";

export function Step15Budget() {
  const { state, updateState } = useWizard();

  const handleUpdate = (field: keyof typeof state.budgetConfig, value: any) => {
    updateState({
      budgetConfig: {
        ...state.budgetConfig,
        [field]: value
      }
    });
  };

  const handlePricePerHead = (value: number) => {
    updateState({ pricePerHead: value });
  };

  // Rough estimation logic based on existing data
  const stayCost = state.accommodations.reduce((acc, curr) => acc + (curr.roomsRequired * (curr.rate || 0)), 0) * (state.startDate && state.endDate ? Math.ceil(Math.abs(state.endDate.getTime() - state.startDate.getTime()) / (1000 * 60 * 60 * 24)) : 1);
  const totalEstimated = stayCost + (state.capacity * state.pricePerHead);
  
  return (
    <div className="p-8 md:p-12 h-full flex flex-col">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Budget & Commercials</h2>
          <p className="text-gray-500 text-lg">Set financial estimates and per-head pricing for this event.</p>
        </div>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4 min-w-[200px] text-center">
          <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Estimated Total</p>
          <p className="text-4xl font-display font-bold text-green-900">
            {state.budgetConfig.currency} {totalEstimated.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
            <Wallet className="w-4 h-4 text-gray-400" /> Allocated Budget
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Currency</label>
              <select
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none text-sm bg-white"
                value={state.budgetConfig.currency}
                onChange={(e) => handleUpdate("currency", e.target.value)}
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="AED">AED</option>
                <option value="INR">INR (₹)</option>
                <option value="SGD">SGD ($)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Total Allocated Budget</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-bold">{state.budgetConfig.currency}</span>
                </div>
                <input
                  type="number"
                  placeholder="e.g. 50000"
                  className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900 text-lg font-bold"
                  value={state.budgetConfig.allocatedBudget || ""}
                  onChange={(e) => handleUpdate("allocatedBudget", parseFloat(e.target.value) || 0)}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-200 pb-2 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-gray-400" /> Per Head Costs
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Package Price Per Head</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 font-bold">{state.budgetConfig.currency}</span>
                </div>
                <input
                  type="number"
                  placeholder="e.g. 1500"
                  className="w-full pl-14 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all text-gray-900 text-lg font-bold"
                  value={state.pricePerHead || ""}
                  onChange={(e) => handlePricePerHead(parseFloat(e.target.value) || 0)}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">This amount will be tracked per attendee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
