import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, BedDouble, CalendarDays, CheckCircle2, ShieldCheck, Hotel, CalendarCheck } from 'lucide-react';

export function InventoryCapabilitySection() {
  return (
    <section className="relative w-full overflow-hidden bg-white pb-24 pt-24 border-t border-black/5">
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        {/* Subtle background pattern or noise if desired, kept very light */}
        <div className="h-full w-full bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <span className="mb-4 inline-flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-blue-600 font-medium">
              EVENT INVENTORY
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-zinc-900 drop-shadow-sm">
              Everything your event needs, <br/>
              <span className="text-blue-600 italic pr-1">organized in one place.</span>
            </h2>
            <p className="mt-6 text-zinc-500 text-base md:text-lg leading-relaxed max-w-xl">
              Leave spreadsheets behind. Manage hotel blocks, negotiated rates, booking rules, and real-time availability in a single, powerful workspace.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/create-event" className="inline-flex items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-xs font-medium uppercase tracking-[0.1em] text-zinc-900 hover:bg-zinc-50 transition-all shadow-sm hover:shadow">
              Manage Event Inventory <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          
          {/* Card 1: Event-Specific Inventory (Large horizontal) */}
          <article className="md:col-span-8 group relative overflow-hidden rounded-[32px] border border-zinc-100 bg-[#FAFAFA] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row min-h-[400px]">
            <div className="md:w-[55%] p-10 lg:p-12 flex flex-col justify-center z-10">
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-[10px] text-zinc-400">01</span>
                <span className="font-mono text-[10px] text-blue-600 font-medium tracking-[0.1em]">EVENT-SPECIFIC INVENTORY</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-display text-zinc-900 mb-4 tracking-tight">Dedicated inventory for every event.</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Stop managing generic availability. Create dedicated inventory allocations for each specific event, ensuring rooms are protected exclusively for your guest list.
              </p>
            </div>
            <div className="md:w-[45%] relative min-h-[250px] md:min-h-full">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80" alt="Resort" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-[#FAFAFA] via-transparent to-transparent opacity-50" />
              <div className="absolute bottom-8 right-8 rounded-2xl bg-white/90 backdrop-blur-md p-4 shadow-xl border border-white/50 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="text-[10px] font-mono text-zinc-500 mb-1">Global Summit '26</p>
                <p className="text-lg font-display text-zinc-900">180 ROOMS ALLOCATED</p>
              </div>
            </div>
          </article>

          {/* Card 2: Negotiated Rates (Square) */}
          <article className="md:col-span-4 group relative overflow-hidden rounded-[32px] border border-zinc-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 p-10 flex flex-col min-h-[400px]">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[10px] text-zinc-400">02</span>
              <span className="font-mono text-[10px] text-emerald-600 font-medium tracking-[0.1em]">NEGOTIATED RATES</span>
            </div>
            <h3 className="text-2xl font-display text-zinc-900 mb-4 tracking-tight">Store event-specific hotel rates.</h3>
            <p className="text-sm text-zinc-500 leading-relaxed flex-1">
              Lock in and display exclusive group rates. Ensure your attendees always see the negotiated price without entering promo codes.
            </p>
            
            <div className="mt-8 rounded-2xl bg-[#FAFAFA] border border-zinc-100 p-5 group-hover:-translate-y-2 transition-transform duration-500">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs text-zinc-500">Deluxe Ocean View</span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">SAVINGS</span>
              </div>
              <div className="flex items-end gap-2">
                <span className="text-3xl font-display text-zinc-900">₹18,500</span>
                <span className="text-sm text-zinc-400 line-through mb-1">₹24,000</span>
              </div>
              <span className="text-[10px] text-zinc-400">PER NIGHT</span>
            </div>
          </article>

          {/* Card 3: Real-Time Availability (Square) */}
          <article className="md:col-span-4 group relative overflow-hidden rounded-[32px] border border-zinc-100 bg-white shadow-sm hover:shadow-xl transition-all duration-500 p-10 flex flex-col min-h-[400px]">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-[10px] text-zinc-400">03</span>
              <span className="font-mono text-[10px] text-blue-600 font-medium tracking-[0.1em]">LIVE AVAILABILITY</span>
            </div>
            <h3 className="text-2xl font-display text-zinc-900 mb-4 tracking-tight">Watch blocks fill up in real time.</h3>
            
            <div className="mt-auto space-y-4 relative z-10">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Booked</p>
                  <p className="text-2xl font-display text-blue-600">124</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-zinc-500 mb-1 uppercase tracking-wider">Available</p>
                  <p className="text-2xl font-display text-zinc-900">56</p>
                </div>
              </div>
              
              <div className="w-full bg-zinc-100 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full w-[69%] group-hover:w-[75%] transition-all duration-1000"></div>
              </div>
              <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                <span>0</span>
                <span>180 ALLOCATED</span>
              </div>
            </div>
          </article>

          {/* Card 4: Booking Rules (Large Horizontal) */}
          <article className="md:col-span-8 group relative overflow-hidden rounded-[32px] border border-zinc-100 bg-[#FAFAFA] shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row min-h-[400px]">
            <div className="md:w-1/2 p-10 lg:p-12 flex flex-col justify-center order-2 md:order-1">
              <div className="mb-6 flex items-center gap-3">
                <span className="font-mono text-[10px] text-zinc-400">04</span>
                <span className="font-mono text-[10px] text-amber-600 font-medium tracking-[0.1em]">BOOKING RULES</span>
              </div>
              <h3 className="text-3xl lg:text-4xl font-display text-zinc-900 mb-4 tracking-tight">Enforce policies effortlessly.</h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-8">
                Set booking deadlines, enforce minimum stays, and establish cancellation policies. EventStay ensures guests only book within your negotiated parameters.
              </p>
              
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" /> Deadline cutoff enforcement
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" /> Minimum night stays
                </li>
                <li className="flex items-center gap-3 text-sm text-zinc-700">
                  <CheckCircle2 className="w-4 h-4 text-amber-500" /> Automated inclusions (e.g. Breakfast)
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2 relative bg-zinc-100 order-1 md:order-2 overflow-hidden">
               <img src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80" alt="Rules" className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80" />
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
               <div className="absolute bottom-8 left-8 right-8 flex gap-2">
                 <div className="bg-white/90 backdrop-blur rounded-xl p-3 flex-1 border border-white/50 shadow-sm translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                   <CalendarDays className="w-4 h-4 text-amber-600 mb-2" />
                   <p className="text-[9px] font-mono text-zinc-500">DEADLINE</p>
                   <p className="text-sm font-medium">18 Sep</p>
                 </div>
                 <div className="bg-white/90 backdrop-blur rounded-xl p-3 flex-1 border border-white/50 shadow-sm translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                   <BedDouble className="w-4 h-4 text-amber-600 mb-2" />
                   <p className="text-[9px] font-mono text-zinc-500">MIN STAY</p>
                   <p className="text-sm font-medium">2 Nights</p>
                 </div>
               </div>
            </div>
          </article>

        </div>
      </div>
    </section>
  );
}
