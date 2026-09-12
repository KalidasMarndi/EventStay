"use client";

import React, { useState, useEffect } from "react";
import { TravelService, travelApi } from "@/services/travelApi";
import { Loader2, Plus, Plane, MapPin, FileText, CheckCircle2, ShieldAlert } from "lucide-react";
import { AddTravelServiceModal } from "./AddTravelServiceModal";

export function TravelServicesManager({ eventId }: { eventId: string }) {
  const [services, setServices] = useState<TravelService[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const data = await travelApi.getEventServices(eventId);
      setServices(data);
    } catch (error) {
      console.error("Failed to load travel services", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [eventId]);

  const handleToggleVisibility = async (service: TravelService) => {
    try {
      await travelApi.updateService(service.id, { isVisible: !service.isVisible });
      setServices(services.map(s => s.id === service.id ? { ...s, isVisible: !s.isVisible } : s));
    } catch (error) {
      console.error("Failed to toggle visibility", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await travelApi.deleteService(id);
      setServices(services.filter(s => s.id !== id));
    } catch (error) {
      console.error("Failed to delete service", error);
    }
  };

  const getIcon = (type: string) => {
    switch(type) {
      case 'FLIGHT': return <Plane className="w-5 h-5" />;
      case 'TRANSFER': return <MapPin className="w-5 h-5" />;
      case 'VISA': return <FileText className="w-5 h-5" />;
      case 'AIRPORT_VIP': return <CheckCircle2 className="w-5 h-5" />;
      default: return <ShieldAlert className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-white/50" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-display mb-2">Travel Services</h2>
          <p className="text-white/60">Configure and manage travel extensions for this event.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 bg-[#eca8d6] text-black px-6 py-3 rounded-full font-medium hover:bg-[#d89bc3] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Service
        </button>
      </div>

      {services.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center text-white/60">
          No travel services configured for this event yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {services.map(service => (
            <div key={service.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    {getIcon(service.type)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-white/40 block mb-1">
                      {service.type.replace('_', ' ')}
                    </span>
                    <h3 className="text-xl font-display">{service.name}</h3>
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className={`text-[10px] uppercase tracking-widest px-2 py-1 rounded-md ${service.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-white/10 text-white/50'}`}>
                    {service.status}
                  </span>
                </div>
              </div>
              
              <p className="text-white/60 text-sm mb-6 flex-1">{service.description}</p>
              
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={service.isVisible} 
                    onChange={() => handleToggleVisibility(service)}
                    className="accent-[#eca8d6] w-4 h-4 cursor-pointer" 
                  />
                  <span className="text-sm text-white/70">Visible on Microsite</span>
                </label>
                
                <button 
                  onClick={() => handleDelete(service.id)}
                  className="text-xs text-red-400 hover:text-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {isAddModalOpen && (
        <AddTravelServiceModal 
          eventId={eventId} 
          onClose={() => setIsAddModalOpen(false)} 
          onAdded={() => {
            setIsAddModalOpen(false);
            fetchServices();
          }} 
        />
      )}
    </div>
  );
}
