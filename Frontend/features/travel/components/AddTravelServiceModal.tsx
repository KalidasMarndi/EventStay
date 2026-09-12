import React, { useState } from "react";
import { TravelServiceCreateInput, travelApi } from "@/services/travelApi";
import { X, Loader2 } from "lucide-react";

interface AddTravelServiceModalProps {
  eventId: string;
  onClose: () => void;
  onAdded: () => void;
}

export function AddTravelServiceModal({ eventId, onClose, onAdded }: AddTravelServiceModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TravelServiceCreateInput>({
    type: 'TRANSFER',
    name: '',
    description: '',
    status: 'ACTIVE',
    currency: 'INR',
    inclusions: [],
    images: [],
    isVisible: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await travelApi.createService(eventId, formData);
      onAdded();
    } catch (error) {
      console.error("Failed to create service", error);
      alert("Failed to create service. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#111] border-b border-white/10 p-6 flex justify-between items-center z-10">
          <h3 className="text-xl font-display text-white">Add Travel Service</h3>
          <button onClick={onClose} className="text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-white/60">Service Type</label>
              <select 
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                required
              >
                <option value="FLIGHT">Flight</option>
                <option value="AIRPORT_VIP">Airport VIP Services</option>
                <option value="TRANSFER">Ground Transfer</option>
                <option value="VISA">Visa & Documentation</option>
                <option value="EXPERIENCE">Experience & Activity</option>
                <option value="TRAVEL_SUPPORT">24/7 Travel Support</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-white/60">Service Name</label>
              <input 
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Airport VIP Arrival"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/60">Description</label>
            <textarea 
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the service details..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 min-h-[100px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm text-white/60">Provider (Optional)</label>
              <input 
                type="text"
                value={formData.provider || ''}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                placeholder="e.g. Emirates, Luxe Transfers"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-white/60">Price (Optional)</label>
              <input 
                type="number"
                value={formData.price || ''}
                onChange={(e) => setFormData({ ...formData, price: e.target.value ? Number(e.target.value) : undefined })}
                placeholder="Leave blank if included/informational"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-white/10">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3 text-white/60 hover:text-white mr-4"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-[#eca8d6] text-black px-8 py-3 rounded-full font-medium hover:bg-[#d89bc3] transition-colors disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Save Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
