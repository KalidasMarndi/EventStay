import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { eventsData } from "@/data/events";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EventDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = eventsData.find((e) => e.id === eventId);
  
  if (!event) {
    notFound();
  }

  const tabs = [
    { label: "Overview", href: `/create-event/${eventId}` },
    { label: "Inventory", href: `/create-event/${eventId}/inventory` },
    { label: "Bookings", href: `/create-event/${eventId}/bookings` },
    { label: "Guests", href: `/create-event/${eventId}/guests` },
    { label: "Payments", href: `/create-event/${eventId}/payments` },
    { label: "Microsite", href: `/create-event/${eventId}/microsite` },
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-inter flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-[120px] pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs uppercase tracking-wider text-white/50">{event.type}</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="text-xs uppercase tracking-wider text-white/50">{event.destination}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-display mb-8 text-white">
              {event.name}
            </h1>
            
            {/* Tabs */}
            <div className="flex overflow-x-auto border-b border-white/10 pb-px hide-scrollbar">
              {tabs.map((tab) => (
                <Link 
                  key={tab.label}
                  href={tab.href}
                  className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white/60 hover:text-white border-b-2 border-transparent hover:border-[#eca8d6]/50 whitespace-nowrap transition-colors"
                >
                  {tab.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Content */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
