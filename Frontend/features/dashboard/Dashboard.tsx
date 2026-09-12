"use client";

import React, { useState, useEffect } from "react";
import { DashboardMetrics } from "@/features/dashboard/components/DashboardMetrics";
import { DashboardEvents } from "@/features/dashboard/components/DashboardEvents";
import { DashboardActivityAndAlerts } from "@/features/dashboard/components/DashboardActivityAndAlerts";
import { DashboardEmptyState } from "@/features/dashboard/components/DashboardEmptyState";
import { dashboardApi, DashboardOverviewResponse } from "@/services/dashboardApi";
import { Loader2 } from "lucide-react";

export function Dashboard() {
  const [data, setData] = useState<DashboardOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);
      try {
        const response = await dashboardApi.getOverview(selectedEventId || undefined);
        setData(response);
      } catch (error) {
        console.error("Failed to load dashboard data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, [selectedEventId]);

  return (
    <div className="relative overflow-x-clip min-h-screen pt-[120px] font-inter pb-20">
      {/* Fixed Background Video */}
      <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
        <video
          src="/Videos/135145-761273495.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-[1340px] mx-auto px-[15px]">
        {loading && !data ? (
          <div className="flex items-center justify-center min-h-[50vh]">
            <Loader2 className="w-10 h-10 animate-spin text-white/50" />
          </div>
        ) : data?.isEmpty && !selectedEventId ? (
          <DashboardEmptyState />
        ) : data ? (
          <>
            {/* Header & Filter */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
              <div>
                <h1 className="text-4xl md:text-5xl font-display text-white mb-2">Operations Command</h1>
                <p className="text-white/60 text-lg">Manage your events, inventory, and guests.</p>
              </div>
              <div className="w-full md:w-64">
                <label className="block text-xs uppercase tracking-widest text-white/40 mb-2">Scope</label>
                <select 
                  value={selectedEventId}
                  onChange={(e) => setSelectedEventId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30 cursor-pointer appearance-none"
                >
                  <option value="" className="bg-neutral-900">All Events</option>
                  {data.events.map(e => (
                    <option key={e.id} value={e.id} className="bg-neutral-900">{e.title}</option>
                  ))}
                </select>
              </div>
            </div>

            <DashboardMetrics summary={data.summary} />
            <DashboardActivityAndAlerts activity={data.activity} alerts={data.alerts} />
            <DashboardEvents events={data.events} />
          </>
        ) : (
          <div className="text-center py-20 text-white/60">Failed to load dashboard</div>
        )}
      </div>
    </div>
  );
}
