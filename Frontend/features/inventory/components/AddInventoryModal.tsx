'use client';

import React, { useState } from 'react';
import { inventoryApi } from '@/services/inventoryApi';

interface AddInventoryModalProps {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  stays: any[]; // List of available hotels/stays to choose from
}

export function AddInventoryModal({ eventId, isOpen, onClose, onSuccess, stays }: AddInventoryModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    stayId: '',
    name: '',
    price: '',
    currency: 'USD',
    availableRooms: '',
    bookingDeadline: '',
    minimumStay: '1',
    cancellationPolicy: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await inventoryApi.create({
        eventId,
        stayId: formData.stayId,
        name: formData.name,
        price: Number(formData.price),
        currency: formData.currency,
        availableRooms: Number(formData.availableRooms),
        bookingDeadline: formData.bookingDeadline || undefined,
        minimumStay: Number(formData.minimumStay),
        cancellationPolicy: formData.cancellationPolicy,
      });
      onSuccess();
    } catch (error) {
      console.error('Failed to add inventory:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h2 className="text-xl font-display text-gray-900">Add Inventory</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Property Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Select Property</label>
              <select 
                required
                className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border"
                value={formData.stayId}
                onChange={e => setFormData({...formData, stayId: e.target.value})}
              >
                <option value="">Select a hotel...</option>
                {stays.map(stay => (
                  <option key={stay.id} value={stay.id}>{stay.name} - {stay.city}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Room Type</label>
              <input 
                type="text" 
                required
                placeholder="e.g. Deluxe Ocean View"
                className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Commercials & Allocation</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Allocation</label>
                <input 
                  type="number" 
                  required min="1"
                  className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border"
                  value={formData.availableRooms}
                  onChange={e => setFormData({...formData, availableRooms: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stay (Nights)</label>
                <input 
                  type="number" 
                  min="1" required
                  className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border"
                  value={formData.minimumStay}
                  onChange={e => setFormData({...formData, minimumStay: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Negotiated Rate</label>
                <input 
                  type="number" 
                  required min="0" step="0.01"
                  className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border"
                  value={formData.price}
                  onChange={e => setFormData({...formData, price: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                <select 
                  className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border"
                  value={formData.currency}
                  onChange={e => setFormData({...formData, currency: e.target.value})}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="INR">INR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <h3 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Policies</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Booking Deadline</label>
              <input 
                type="date" 
                className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border"
                value={formData.bookingDeadline}
                onChange={e => setFormData({...formData, bookingDeadline: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cancellation Policy</label>
              <textarea 
                rows={2}
                placeholder="e.g. Non-refundable within 14 days of event."
                className="w-full rounded-xl border-gray-200 bg-white px-4 py-3 text-sm focus:border-blue-500 focus:ring-blue-500 outline-none border"
                value={formData.cancellationPolicy}
                onChange={e => setFormData({...formData, cancellationPolicy: e.target.value})}
              />
            </div>
          </div>
        </form>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-2.5 rounded-full text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Inventory'}
          </button>
        </div>
      </div>
    </div>
  );
}
