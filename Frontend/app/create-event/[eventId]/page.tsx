import { eventsData } from "@/data/events";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default async function EventOverviewPage({ params }: { params: Promise<{ eventId: string }> }) {
  const { eventId } = await params;
  const event = eventsData.find((e) => e.id === eventId);
  
  if (!event) notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Metrics */}
      <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
          <div className="text-sm uppercase tracking-wider text-white/50 mb-4">Total Guests</div>
          <div className="text-5xl font-light text-white">{event.totalGuests}</div>
        </div>
        
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
          <div className="text-sm uppercase tracking-wider text-white/50 mb-4">Rooms Booked / Allocated</div>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-light text-[#eca8d6]">{event.roomsBooked}</span>
            <span className="text-xl text-white/40">/ {event.roomsAllocated}</span>
          </div>
          <div className="mt-4 w-full bg-white/10 rounded-full h-1">
            <div 
              className="bg-[#eca8d6] h-1 rounded-full" 
              style={{ width: `${(event.roomsBooked / event.roomsAllocated) * 100}%` }}
            />
          </div>
        </div>
        
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
          <div className="text-sm uppercase tracking-wider text-white/50 mb-4">Payments Received</div>
          <div className="text-4xl font-light text-white">₹42.8L</div>
          <div className="mt-2 text-sm text-green-400">78% Complete</div>
        </div>
        
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
          <div className="text-sm uppercase tracking-wider text-white/50 mb-4">Pending Payments</div>
          <div className="text-4xl font-light text-white/60">₹11.6L</div>
          <div className="mt-2 text-sm text-yellow-400">Requires follow-up</div>
        </div>
      </div>
      
      {/* Right Column - Status & Actions */}
      <div className="flex flex-col gap-6">
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-display mb-6">Microsite Status</h3>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="text-lg text-white">LIVE</span>
          </div>
          <p className="text-sm text-white/50 mb-8">
            Guests can actively view details and book their stay packages.
          </p>
          <Link 
            href={`/event/${event.slug}`} 
            className="w-full flex items-center justify-center gap-2 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm uppercase tracking-wider transition-colors"
          >
            View Guest Experience <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8">
          <h3 className="text-xl font-display mb-4">Booking Deadline</h3>
          <div className="text-2xl font-light text-white mb-2">
            {event.bookingDeadline ? new Date(event.bookingDeadline).toLocaleDateString() : 'N/A'}
          </div>
          <p className="text-sm text-white/50">
            Unbooked allocations will be released after this date.
          </p>
        </div>
      </div>
    </div>
  );
}
