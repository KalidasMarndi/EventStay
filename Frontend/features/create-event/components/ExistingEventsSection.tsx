import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { eventsData } from "@/data/events";
import Link from "next/link";
import { Calendar, MapPin, Users } from "lucide-react";

export function ExistingEventsSection() {
  return (
    <section className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-20 border-t border-white/10">
      <AnimatedSection direction="up" className="mb-12">
        <h3 className="font-display text-4xl mb-4">Your Events</h3>
        <p className="text-white/60">
          Manage your upcoming groups, MICE, and destination weddings.
        </p>
      </AnimatedSection>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsData.map((event, i) => (
          <AnimatedSection key={event.id} direction="up" delay={i * 0.1}>
            <Link href={`/create-event/${event.id}`}>
              <div className="group border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] rounded-3xl p-8 h-full flex flex-col transition-all duration-300 hover:border-[#eca8d6]/30">
                <div className="flex justify-between items-start mb-6">
                  <span className="px-3 py-1 bg-white/5 text-xs uppercase tracking-wider text-white/60 rounded-full border border-white/10">
                    {event.type}
                  </span>
                  <span className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full border ${
                    event.status === 'Booking Open' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 
                    event.status === 'Upcoming' ? 'border-[#eca8d6]/30 text-[#eca8d6] bg-[#eca8d6]/10' : 
                    'border-white/20 text-white/50'
                  }`}>
                    {event.status}
                  </span>
                </div>
                
                <h3 className="text-2xl font-display mb-4 group-hover:text-[#eca8d6] transition-colors">{event.name}</h3>
                
                <div className="space-y-3 mt-auto pt-6 border-t border-white/10 text-sm text-white/60">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-white/40" />
                    <span>{event.destination}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-white/40" />
                    <span>{new Date(event.startDate).toLocaleDateString()} – {new Date(event.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-white/40" />
                    <span>{event.totalGuests} Guests · {event.roomsAllocated} Rooms</span>
                  </div>
                </div>
              </div>
            </Link>
          </AnimatedSection>
        ))}
      </div>
    </section>
  );
}
