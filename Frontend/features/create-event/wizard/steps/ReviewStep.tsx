"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { format, differenceInDays } from "date-fns";
import { destinations } from "@/features/home/data/destinations";
import { Edit2, MapPin, Calendar, Users, Hotel, Plane, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function ReviewStep() {
  const { state, goToStep, nextStep } = useWizard();

  const dest = destinations.find(d => d.id === state.destinationId);
  const totalGuests = state.guests.adults + state.guests.children + state.guests.vip + state.guests.staff;
  const duration = state.dates.start && state.dates.end ? differenceInDays(state.dates.end, state.dates.start) : 0;

  // Mock Pricing
  const basePrice = 250000;
  const stayPrice = state.stayId ? 150000 : 0;
  const travelPrice = (state.travel.flightSupport ? 80000 : 0) + (state.travel.groundTransfer ? 20000 : 0);
  const servicesPrice = state.services.length * 15000;
  const subtotal = basePrice + stayPrice + travelPrice + servicesPrice;
  const taxes = subtotal * 0.18;
  const total = subtotal + taxes;

  const formatPrice = (p: number) => `₹${p.toLocaleString('en-IN')}`;

  return (
    <WizardShell onNext={nextStep} nextLabel="CONTINUE TO PAYMENT">
      <div className="max-w-6xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col lg:flex-row gap-12">
        
        {/* Left: Summary Sections */}
        <div className="flex-1 space-y-12">
          
          <div>
            <h2 className="text-3xl font-serif mb-2">Review Your Event</h2>
            <p className="text-white/50 font-mono text-sm uppercase tracking-widest">
              Please verify all details before payment
            </p>
          </div>

          <div className="space-y-6">
            
            <ReviewSection title="Event Details" icon={CheckCircle2} onEdit={() => goToStep(2)}>
              <div className="font-serif text-2xl mb-1 text-white">{state.eventDetails.eventName || "Untitled Event"}</div>
              <div className="text-sm text-[#eab308] uppercase font-mono tracking-widest">{state.eventType.replace(/-/g, ' ')}</div>
              <p className="text-white/50 text-sm mt-4 leading-relaxed max-w-xl">
                {state.eventDetails.description || "No description provided."}
              </p>
            </ReviewSection>

            <ReviewSection title="Destination" icon={MapPin} onEdit={() => goToStep(4)}>
              {dest ? (
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 rounded-xl overflow-hidden relative shrink-0">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="font-serif text-xl mb-1 text-white">{dest.name}</div>
                    <div className="text-white/50 text-sm">{dest.country}</div>
                  </div>
                </div>
              ) : (
                <div className="text-white/50 italic text-sm">No destination selected</div>
              )}
            </ReviewSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ReviewSection title="Dates" icon={Calendar} onEdit={() => goToStep(5)}>
                <div className="font-serif text-xl mb-1 text-white">
                  {state.dates.start ? format(state.dates.start, "MMM d") : "TBD"} — {state.dates.end ? format(state.dates.end, "MMM d, yyyy") : "TBD"}
                </div>
                <div className="text-white/50 text-sm">{duration} Nights</div>
              </ReviewSection>

              <ReviewSection title="Guests" icon={Users} onEdit={() => goToStep(3)}>
                <div className="font-serif text-xl mb-1 text-white">{totalGuests} Guests</div>
                <div className="text-white/50 text-sm">
                  {state.guests.adults} Adults · {state.guests.children} Children
                </div>
                {state.guests.roomPreference && (
                  <div className="mt-2 text-xs font-mono uppercase tracking-widest text-[#eab308]">
                    {state.guests.roomPreference} Rooms
                  </div>
                )}
              </ReviewSection>
            </div>

            <ReviewSection title="Accommodation" icon={Hotel} onEdit={() => goToStep(6)}>
              {state.stayId ? (
                <div className="font-serif text-xl text-white">Premium Resort Selected</div>
              ) : (
                <div className="text-white/50 italic text-sm">To be arranged</div>
              )}
            </ReviewSection>

            <ReviewSection title="Travel & Services" icon={Plane} onEdit={() => goToStep(7)}>
              <div className="flex flex-wrap gap-2">
                {state.travel.flightSupport && <ServiceBadge label="Flight Support" />}
                {state.travel.groundTransfer && <ServiceBadge label="Ground Transfer" />}
                {state.travel.airportVip && <ServiceBadge label="Airport VIP" />}
                {state.services.map(s => <ServiceBadge key={s} label={s.replace(/-/g, ' ')} />)}
                
                {!state.travel.flightSupport && !state.travel.groundTransfer && !state.travel.airportVip && state.services.length === 0 && (
                  <div className="text-white/50 italic text-sm">No additional services selected</div>
                )}
              </div>
            </ReviewSection>

          </div>
        </div>

        {/* Right: Price Summary */}
        <div className="w-full lg:w-[400px] shrink-0">
          <div className="sticky top-24 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
            <h3 className="font-serif text-2xl mb-8">Price Estimate</h3>
            
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between text-white/70">
                <span>Event Package</span>
                <span>{formatPrice(basePrice)}</span>
              </div>
              {stayPrice > 0 && (
                <div className="flex justify-between text-white/70">
                  <span>Accommodation</span>
                  <span>{formatPrice(stayPrice)}</span>
                </div>
              )}
              {travelPrice > 0 && (
                <div className="flex justify-between text-white/70">
                  <span>Travel Logistics</span>
                  <span>{formatPrice(travelPrice)}</span>
                </div>
              )}
              {servicesPrice > 0 && (
                <div className="flex justify-between text-white/70">
                  <span>Premium Add-ons</span>
                  <span>{formatPrice(servicesPrice)}</span>
                </div>
              )}
              <div className="flex justify-between text-white/50 pt-4 border-t border-white/10">
                <span>Taxes & Fees</span>
                <span>{formatPrice(taxes)}</span>
              </div>
            </div>

            <div className="pt-6 border-t border-white/20 flex justify-between items-end mb-8">
              <span className="text-sm font-mono uppercase tracking-widest text-white/50">Total</span>
              <span className="text-3xl font-mono text-white">{formatPrice(total)}</span>
            </div>
            
            <div className="text-xs text-white/30 italic text-center">
              This is an estimated quote. Final pricing may vary based on exact headcount and live availability.
            </div>
          </div>
        </div>

      </div>
    </WizardShell>
  );
}

function ReviewSection({ title, icon: Icon, children, onEdit }: any) {
  return (
    <div className="group border border-white/10 rounded-2xl p-6 bg-white/[0.02] hover:bg-white/5 transition-colors relative">
      <div className="flex justify-between items-start mb-6 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3 text-white/50">
          <Icon className="w-4 h-4" />
          <h3 className="font-mono text-xs uppercase tracking-widest">{title}</h3>
        </div>
        <button 
          onClick={onEdit}
          className="text-xs font-mono uppercase tracking-widest text-[#eab308] opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5"
        >
          <Edit2 className="w-3 h-3" /> Edit
        </button>
      </div>
      <div>{children}</div>
    </div>
  );
}

function ServiceBadge({ label }: { label: string }) {
  return (
    <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/70 capitalize">
      {label}
    </span>
  );
}
