import React, { useState } from 'react';
import type { InventoryItem } from '@/services/inventoryApi';
import { inventoryApi } from '@/services/inventoryApi';
import { HoldCountdown } from './HoldCountdown';

export function InventoryTable({ items }: { items: InventoryItem[] }) {
  const [holdingIds, setHoldingIds] = useState<Record<string, boolean>>({});
  const [activeHolds, setActiveHolds] = useState<Record<string, { holdId: string; expiresAt: number }>>({});
  const [expiredHolds, setExpiredHolds] = useState<Record<string, boolean>>({});

  const handleHold = async (item: InventoryItem) => {
    try {
      setHoldingIds(prev => ({ ...prev, [item.id]: true }));
      const res = await inventoryApi.holdInventory(item.id, 1, 'admin-session');
      setActiveHolds(prev => ({ ...prev, [item.id]: { holdId: res.holdId, expiresAt: res.expiresAt } }));
      setExpiredHolds(prev => ({ ...prev, [item.id]: false }));
    } catch (err) {
      alert('Unable to secure inventory. Please try again.');
      console.error(err);
    } finally {
      setHoldingIds(prev => ({ ...prev, [item.id]: false }));
    }
  };

  const handleRelease = async (itemId: string, holdId: string) => {
    try {
      setHoldingIds(prev => ({ ...prev, [itemId]: true }));
      await inventoryApi.releaseHold(holdId);
      const newActive = { ...activeHolds };
      delete newActive[itemId];
      setActiveHolds(newActive);
      setExpiredHolds(prev => ({ ...prev, [itemId]: false }));
    } catch (err) {
      console.error(err);
    } finally {
      setHoldingIds(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleExpire = (itemId: string) => {
    const newActive = { ...activeHolds };
    delete newActive[itemId];
    setActiveHolds(newActive);
    setExpiredHolds(prev => ({ ...prev, [itemId]: true }));
  };

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
              <th className="p-6">Inventory</th>
              <th className="p-6 text-right">Total</th>
              <th className="p-6 text-right">Booked</th>
              <th className="p-6 text-right">Held</th>
              <th className="p-6 text-right">Available</th>
              <th className="p-6">Status</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {items.map((item) => {
              const activeHold = activeHolds[item.id];
              const isExpired = expiredHolds[item.id];
              const isHolding = holdingIds[item.id];
              
              const localHeldOffset = activeHold ? 1 : 0;
              const displayedHeld = item.heldRooms + localHeldOffset;
              const available = Math.max(0, item.availableRooms - item.bookedRooms - displayedHeld);
              
              let statusText = item.status;
              let statusClass = 'bg-gray-100 text-gray-800';
              
              if (activeHold) {
                statusText = 'HELD BY YOU';
                statusClass = 'bg-amber-100 text-amber-800 border border-amber-200';
              } else if (isExpired) {
                statusText = 'EXPIRED';
                statusClass = 'bg-red-50 text-red-600 border border-red-200';
              } else if (available === 0) {
                statusText = 'UNAVAILABLE';
                statusClass = 'bg-red-100 text-red-800';
              } else if (available <= 10) {
                statusText = 'LOW AVAILABILITY';
                statusClass = 'bg-amber-100 text-amber-800';
              } else {
                statusText = 'AVAILABLE';
                statusClass = 'bg-green-100 text-green-800';
              }
              
              return (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-6">
                    <div className="font-medium text-gray-900">{item.name}</div>
                    <div className="text-sm text-gray-500 mt-1">Event: {item.stay?.name || 'Unknown Property'}</div>
                  </td>
                  <td className="p-6 text-right font-medium text-gray-900">
                    {item.availableRooms}
                  </td>
                  <td className="p-6 text-right font-medium text-blue-600">
                    {item.bookedRooms}
                  </td>
                  <td className="p-6 text-right font-medium text-amber-500">
                    {displayedHeld}
                  </td>
                  <td className="p-6 text-right font-medium text-emerald-600">
                    {available}
                  </td>
                  <td className="p-6">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${statusClass}`}>
                      {statusText}
                    </span>
                  </td>
                  <td className="p-6 text-right space-y-2">
                    {activeHold ? (
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-amber-600 font-medium flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Inventory Held
                        </span>
                        <HoldCountdown 
                          expiresAt={activeHold.expiresAt} 
                          onExpire={() => handleExpire(item.id)} 
                        />
                        <button
                          onClick={() => handleRelease(item.id, activeHold.holdId)}
                          disabled={isHolding}
                          className="text-xs text-gray-500 hover:text-gray-700 underline underline-offset-2 transition-colors disabled:opacity-50"
                        >
                          {isHolding ? 'Releasing...' : 'Release Hold'}
                        </button>
                      </div>
                    ) : isExpired ? (
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-red-500 font-medium">Hold Expired</span>
                        <button
                          onClick={() => handleHold(item)}
                          disabled={isHolding || available === 0}
                          className="text-xs px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                          {isHolding ? 'Securing inventory...' : 'Select Again'}
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleHold(item)}
                        disabled={isHolding || available === 0}
                        className="text-sm px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50 font-medium shadow-sm"
                      >
                        {isHolding ? 'Securing...' : 'Hold Inventory'}
                      </button>
                    )}
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
