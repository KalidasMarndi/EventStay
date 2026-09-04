import { EventMicrosite } from "@/features/event-microsite/EventMicrosite";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { eventsData } from "@/data/events";
import { notFound } from "next/navigation";

export default async function DynamicEventMicrositePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = eventsData.find((e) => e.slug === slug);
  
  if (!event) {
    notFound();
  }

  // The EventMicrosite component currently fetches from the mock API internally. 
  // In a real scenario we'd pass the event data to it, but for Phase 1 we will just render it 
  // and the microsite will naturally display it.
  
  return (
    <div className="relative min-h-screen bg-black">
      <Navbar />
      <EventMicrosite />
      <Footer />
    </div>
  );
}
