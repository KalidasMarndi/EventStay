import React from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

export function DashboardEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center animate-in fade-in zoom-in duration-500">
      <h2 className="text-4xl md:text-5xl font-display text-white mb-6">
        Your Event Journey Starts Here
      </h2>
      <p className="text-lg text-white/60 max-w-lg mx-auto mb-10 leading-relaxed">
        Create your first event and begin managing stays, guests, and travel in one centralized operational command center.
      </p>
      <Link 
        href="/create-event"
        className="px-8 py-4 rounded-full text-black font-medium text-lg uppercase tracking-wider transition-opacity hover:opacity-90 flex items-center gap-2"
        style={{ backgroundColor: "#eca8d6" }}
      >
        <Plus className="w-5 h-5" />
        Create an Event
      </Link>
    </div>
  );
}
