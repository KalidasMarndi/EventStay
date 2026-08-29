import { InfrastructureSection } from "@/features/event-microsite/components/InfrastructureSection";
import { MetricsSection } from "@/features/event-microsite/components/MetricsSection";
import { DevelopersSection } from "@/features/event-microsite/components/DevelopersSection";
import { MicrositeGuestSection } from "@/features/event-microsite/components/MicrositeGuestSection";
import "./EventMicrosite.css";

export function EventMicrosite() {
  return (
    <div className="relative overflow-x-hidden min-h-screen pt-[120px] font-inter">
      <MicrositeGuestSection />
      <InfrastructureSection />
      <MetricsSection />
      <DevelopersSection />
    </div>
  );
}
