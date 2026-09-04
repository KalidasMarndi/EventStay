import React from 'react';
import type { InventoryStats } from '@/services/inventoryApi';

export function InventoryOverview({ stats }: { stats: InventoryStats }) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8">
      <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-display text-gray-900">Inventory Overview</h2>
          <p className="text-sm text-gray-500 mt-1">Real-time capacity and utilization across all properties</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-sm font-medium text-green-700">Live</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-gray-100">
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Allocated</span>
          <span className="text-3xl font-display text-gray-900">{stats.totalAllocation}</span>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Booked</span>
          <span className="text-3xl font-display text-blue-600">{stats.booked}</span>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Held</span>
          <span className="text-3xl font-display text-amber-500">{stats.held}</span>
        </div>
        <div className="p-6 md:p-8 flex flex-col justify-center">
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Available</span>
          <span className="text-3xl font-display text-emerald-600">{stats.available}</span>
        </div>
      </div>

      <div className="px-6 md:px-8 pb-8">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-gray-700">Utilization</span>
          <span className="text-lg font-bold text-gray-900">{stats.utilization}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden flex">
          <div 
            className="bg-blue-600 h-full transition-all duration-500" 
            style={{ width: `${stats.totalAllocation > 0 ? (stats.booked / stats.totalAllocation) * 100 : 0}%` }}
          />
          <div 
            className="bg-amber-400 h-full transition-all duration-500" 
            style={{ width: `${stats.totalAllocation > 0 ? (stats.held / stats.totalAllocation) * 100 : 0}%` }}
          />
        </div>
      </div>
    </div>
  );
}
