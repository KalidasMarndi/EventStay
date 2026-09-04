'use client';

import React, { useEffect, useState } from 'react';
import { InventoryOverview } from '@/features/inventory/components/InventoryOverview';
import { InventoryTable } from '@/features/inventory/components/InventoryTable';
import { AddInventoryModal } from '@/features/inventory/components/AddInventoryModal';
import { inventoryApi, InventoryItem, InventoryStats } from '@/services/inventoryApi';

import { staysApi } from '@/services/stays';

export function InventoryPageClient({ eventId }: { eventId: string }) {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [stats, setStats] = useState<InventoryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [stays, setStays] = useState<any[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [inventoryData, statsData, staysRes] = await Promise.all([
        inventoryApi.getAllByEvent(eventId),
        inventoryApi.getStats(eventId),
        staysApi.list()
      ]);
      setItems(inventoryData);
      setStats(statsData);
      setStays(staysRes?.data || []);
    } catch (error) {
      console.error('Failed to load inventory', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  const handleAddSuccess = () => {
    setIsAddModalOpen(false);
    fetchData(); // Reload table and stats
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        Loading inventory workspace...
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-display text-gray-900">Event Inventory</h1>
          <p className="text-gray-500 mt-1">Manage hotel blocks, room types, and negotiated rates</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition-colors shadow-sm flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Inventory
        </button>
      </div>

      {stats && <InventoryOverview stats={stats} />}

      <InventoryTable items={items} />

      <AddInventoryModal 
        eventId={eventId} 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSuccess={handleAddSuccess}
        stays={stays}
      />
    </div>
  );
}
