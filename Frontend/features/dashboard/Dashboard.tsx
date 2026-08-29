import { HowItWorksSection } from "@/features/dashboard/components/HowItWorksSection";
import "./Dashboard.css";

export function Dashboard() {
  return (
    <div className="relative overflow-x-clip min-h-screen pt-[120px] font-inter">
      <HowItWorksSection />
    </div>
  );
}
