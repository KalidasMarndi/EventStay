"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { destinations, getCategories, Destination } from "@/features/home/data/destinations";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Search, MapPin, Star, Sun, Info, Calendar } from "lucide-react";

export function DestinationStep() {
  const { state, updateState, nextStep } = useWizard();
  const [selectedId, setSelectedId] = useState<string>(state.destinationId);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", ...getCategories()];

  const filteredDestinations = destinations.filter(d => {
    const matchesCategory = activeCategory === "All" || d.category === activeCategory;
    const matchesSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const selectedDestination = destinations.find(d => d.id === selectedId);

  const handleNext = () => {
    updateState({ destinationId: selectedId });
    nextStep();
  };

  return (
    <WizardShell canGoNext={!!selectedId} onNext={handleNext}>
      <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col xl:flex-row gap-8">
        
        {/* Main Content: Grid & Filters */}
        <div className="flex-1 flex flex-col">
          <div className="mb-8">
            <h2 className="text-3xl font-serif mb-2">Where to?</h2>
            <p className="text-white/50 font-mono text-sm uppercase tracking-widest">
              Select your ideal destination
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.slice(0, 6).map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-xs font-mono uppercase tracking-wider transition-all",
                    activeCategory === cat 
                      ? "bg-white text-black" 
                      : "bg-white/5 text-white/60 hover:bg-white/10"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#eab308] transition-colors"
              />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-12 overflow-y-auto pr-2 custom-scrollbar max-h-[60vh]">
            {filteredDestinations.map((dest) => (
              <DestinationCard 
                key={dest.id} 
                destination={dest} 
                isSelected={selectedId === dest.id}
                onSelect={() => setSelectedId(dest.id)}
              />
            ))}
            {filteredDestinations.length === 0 && (
              <div className="col-span-full py-12 text-center text-white/40 font-mono text-sm uppercase">
                No destinations found matching your criteria
              </div>
            )}
          </div>
        </div>

        {/* Side Panel: Selected Details */}
        {selectedDestination && (
          <div className="w-full xl:w-[380px] shrink-0 animate-in slide-in-from-right-8 duration-500">
            <div className="sticky top-24 bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
              <div className="aspect-[4/3] relative">
                <Image 
                  src={selectedDestination.image} 
                  alt={selectedDestination.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <h3 className="text-2xl font-serif text-white">{selectedDestination.name}</h3>
                  <div className="flex items-center gap-1.5 text-white/70 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{selectedDestination.country}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-[#eab308] fill-[#eab308]" />
                  <span className="text-xs font-mono text-white font-bold">{selectedDestination.rating}</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2">Ideal For</h4>
                  <p className="text-sm">{selectedDestination.idealFor}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-1 flex items-center gap-1.5"><Calendar className="w-3 h-3"/> Duration</h4>
                    <p className="text-sm text-white/80">{selectedDestination.duration}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-1 flex items-center gap-1.5"><Sun className="w-3 h-3"/> Best Time</h4>
                    <p className="text-sm text-white/80">{selectedDestination.bestTime}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-2 flex items-center gap-1.5"><Info className="w-3 h-3"/> Overview</h4>
                  <p className="text-sm text-white/60 leading-relaxed line-clamp-4">
                    {selectedDestination.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-white/40 mb-3">Key Activities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestination.activities.slice(0,3).map(act => (
                      <span key={act} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] text-white/70">
                        {act}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </WizardShell>
  );
}

function DestinationCard({ destination, isSelected, onSelect }: { destination: Destination, isSelected: boolean, onSelect: () => void }) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        "group relative text-left overflow-hidden rounded-xl border transition-all duration-300",
        isSelected
          ? "border-[#eab308] shadow-[0_0_20px_rgba(234,179,8,0.15)]"
          : "border-white/10 hover:border-white/30"
      )}
    >
      <div className="aspect-[4/3] relative">
        <Image 
          src={destination.image}
          alt={destination.name}
          fill
          className={cn(
            "object-cover transition-transform duration-700",
            isSelected ? "scale-105" : "group-hover:scale-110"
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10" />
        {isSelected && (
          <div className="absolute inset-0 ring-2 ring-[#eab308] inset-ring rounded-xl z-10" />
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 w-full p-4 z-20">
        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#eab308] block mb-1">
              {destination.category}
            </span>
            <h3 className="font-serif text-lg text-white leading-none mb-1">{destination.name}</h3>
            <div className="flex items-center gap-1 text-white/50 text-xs">
              <MapPin className="w-3 h-3" />
              {destination.country}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
