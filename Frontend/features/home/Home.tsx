import { HeroSection } from "@/features/home/components/HeroSection";
import { Footer } from "@/components/Footer/Footer";
import { PremiumDestinationsSection } from "@/features/home/components/PremiumDestinationsSection";
import { EventStayOverviewSection } from "@/features/home/components/EventStayOverviewSection";
import "./Home.css";

export function Home() {
  return (
    <div className="relative overflow-x-clip bg-[#050505]">
      <HeroSection />
      <EventStayOverviewSection />
      <PremiumDestinationsSection />
      <Footer />
    </div>
  );
}
