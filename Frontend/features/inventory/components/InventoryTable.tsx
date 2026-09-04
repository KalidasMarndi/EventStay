import React from 'react';
import type { InventoryItem } from '@/services/inventoryApi';

export function InventoryTable({ items }: { items: InventoryItem[] }) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-12 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No Inventory Yet</h3>
        <p className="text-gray-500 max-w-sm mx-auto">Add hotels, room allocations, and negotiated rates for this event to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <th className="p-6">Property & Room</th>
              <th className="p-6">Rate</th>
              <th className="p-6 text-right">Allocated</th>
              <th className="p-6 text-right">Booked</th>
              <th className="p-6 text-right">Available</th>
              <th className="p-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => {
              const available = Math.max(0, item.availableRooms - item.bookedRooms - item.heldRooms);
              
              return (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors cursor-pointer">
                  <td className="p-6">
                    <div className="font-medium text-gray-900">{item.stay?.name || 'Unknown Property'}</div>
                    <div className="text-sm text-gray-500 mt-1">{item.name}</div>
                  </td>
                  <td className="p-6">
                    <div className="font-medium text-gray-900">{item.currency} {item.price.toLocaleString()}</div>
                    <div className="text-xs text-gray-400 mt-1">per night</div>
                  </td>
                  <td className="p-6 text-right font-medium text-gray-900">
                    {item.availableRooms}
                  </td>
                  <td className="p-6 text-right font-medium text-blue-600">
                    {item.bookedRooms}
                  </td>
                  <td className="p-6 text-right font-medium text-emerald-600">
                    {available}
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
                      item.status === 'SOLD_OUT' ? 'bg-red-100 text-red-800' :
                      item.status === 'LOW_AVAILABILITY' ? 'bg-amber-100 text-amber-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
