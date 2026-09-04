import { CreateEventHero } from "@/features/create-event/components/CreateEventHero";
import { ExistingEventsSection } from "@/features/create-event/components/ExistingEventsSection";
import { IntegrationsSection } from "@/features/create-event/components/IntegrationsSection";
import { SecuritySection } from "@/features/create-event/components/SecuritySection";
import { CtaSection } from "@/features/create-event/components/CtaSection";
import { Footer } from "@/components/Footer/Footer";
import "./CreateEvent.css";

export function CreateEvent() {
  return (
    <main className="relative overflow-x-hidden min-h-screen font-inter bg-[#050505]">
      <CreateEventHero />
      <ExistingEventsSection />
      <IntegrationsSection />
      <SecuritySection />
      <CtaSection />
      <Footer />
    </main>
  );
}
