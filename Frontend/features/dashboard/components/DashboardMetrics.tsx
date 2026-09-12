import React from "react";
import { DashboardSummary } from "@/services/dashboardApi";

interface DashboardMetricsProps {
  summary: DashboardSummary;
}

export function DashboardMetrics({ summary }: DashboardMetricsProps) {
  const metrics = [
    { label: "Total Events", value: summary.totalEvents.toString() },
    { label: "Active Events", value: summary.activeEvents.toString() },
    { label: "Total Bookings", value: summary.totalBookings.toString() },
    { label: "Confirmed Bookings", value: summary.confirmedBookings.toString() },
    { label: "Total Guests", value: summary.totalGuests.toString() },
    { label: "Payments Received", value: `₹${summary.paymentsReceived.toLocaleString('en-IN')}` },
    { label: "Payments Pending", value: `₹${summary.paymentsPending.toLocaleString('en-IN')}` },
  ];

  return (
    <section className="mb-12 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors">
            <div className="text-sm text-white/50 mb-2 uppercase tracking-wider">{metric.label}</div>
            <div className="text-3xl font-display text-white mb-2">{metric.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
