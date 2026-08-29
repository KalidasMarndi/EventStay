import { HeroSection } from "@/features/home/components/HeroSection";
import { Footer } from "@/components/Footer/Footer";
import { PremiumDestinationsSection } from "@/features/home/components/PremiumDestinationsSection";
import { TravelSupportSection } from "@/features/travel-support/components/TravelSupportSection";
import "./Home.css";

export function Home() {
  return (
    <div className="relative overflow-x-clip bg-[#050505]">
      <HeroSection />
      <PremiumDestinationsSection />
      <TravelSupportSection limit={3} />
      <Footer />
    </div>
  );
}
