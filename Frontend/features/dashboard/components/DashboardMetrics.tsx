import React from "react";

const metrics = [
  { label: "Active Events", value: "24", change: "+3" },
  { label: "Total Guests", value: "3,842", change: "+12%" },
  { label: "Rooms Allocated", value: "2,480", change: "+150" },
  { label: "Rooms Booked", value: "1,874", change: "75.5%" },
  { label: "Pending Payments", value: "₹38.4L", change: "-12%" },
  { label: "Booking Conversion", value: "76%", change: "+2%" },
  { label: "Inventory Utilization", value: "75.6%", change: "+5%" },
];

export function DashboardMetrics() {
  return (
    <section className="px-[15px] py-[60px] max-w-[1340px] mx-auto text-white">
      <div className="mb-8">
        <h2 className="text-4xl font-light mb-2">Operational Metrics</h2>
        <p className="text-white/60">Overview of global platform performance</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
            <div className="text-sm text-white/50 mb-2 uppercase tracking-wider">{metric.label}</div>
            <div className="text-3xl font-light mb-2">{metric.value}</div>
            <div className="text-xs text-[#eca8d6]">{metric.change} from last month</div>
          </div>
        ))}
      </div>
    </section>
  );
}
