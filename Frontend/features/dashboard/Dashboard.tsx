import { HowItWorksSection } from "@/features/dashboard/components/HowItWorksSection";
import { DashboardMetrics } from "@/features/dashboard/components/DashboardMetrics";
import "./Dashboard.css";

export function Dashboard() {
  return (
    <div className="relative overflow-x-clip min-h-screen pt-[120px] font-inter">
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

      <div className="relative z-10">
        <DashboardMetrics />
        <HowItWorksSection />
      </div>
    </div>
  );
}
