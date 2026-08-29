import { TravelSupportSection } from "@/features/travel-support/components/TravelSupportSection";
import { Footer } from "@/components/Footer/Footer";
import { CtaSection } from "@/features/create-event/components/CtaSection";
import "./TravelSupport.css";

export function TravelSupport() {
  return (
    <main className="relative overflow-x-hidden min-h-screen font-inter bg-[#050505] pt-[120px]">
      <TravelSupportSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
