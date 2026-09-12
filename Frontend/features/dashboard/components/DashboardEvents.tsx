import React from "react";
import { DashboardEvent } from "@/services/dashboardApi";
import { ArrowRight, AlertTriangle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

interface DashboardEventsProps {
  events: DashboardEvent[];
}

export function DashboardEvents({ events }: DashboardEventsProps) {
  if (events.length === 0) return null;

  return (
    <section className="mb-12">
      <h3 className="text-2xl font-display text-white mb-6">Your Events</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div key={event.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col h-full hover:bg-white/10 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-block px-2 py-1 bg-white/10 rounded-md text-[10px] uppercase tracking-widest text-white/60 mb-2">
                  {event.status}
                </span>
                <h4 className="text-xl font-display text-white line-clamp-1">{event.title}</h4>
                <p className="text-white/50 text-sm mt-1">{event.city}</p>
              </div>
              {event.health === 'HEALTHY' ? (
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              ) : event.health === 'NEEDS_ATTENTION' ? (
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-red-400" />
              )}
            </div>

            <div className="flex-1"></div>

            <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/40 uppercase tracking-widest">
                {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
              <Link 
                href={`/dashboard/events/${event.slug}`} 
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
