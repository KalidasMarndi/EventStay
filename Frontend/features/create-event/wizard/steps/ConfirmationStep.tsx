"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { destinations } from "@/features/home/data/destinations";
import { format } from "date-fns";
import { Check, Calendar, MapPin, Users, Download, ArrowRight, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";

export function ConfirmationStep() {
  const { state, resetWizard } = useWizard();
  
  const dest = destinations.find(d => d.id === state.destinationId);
  const totalGuests = state.guests.adults + state.guests.children + state.guests.vip + state.guests.staff;

  useEffect(() => {
    // Clear storage on unmount to reset the wizard for next time
    return () => {
      // We don't call resetWizard() here because it would break the UI before unmount.
      // But we can clear the sessionStorage directly.
      if (typeof window !== "undefined") {
        sessionStorage.removeItem("eventstay_wizard_state");
      }
    };
  }, []);

  // Generate a mock booking ID
  const bookingId = `EVT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

  return (
    <WizardShell canGoNext={false}>
      <div className="max-w-3xl mx-auto w-full animate-in fade-in zoom-in-95 duration-1000 text-center relative z-10">
        
        <div className="w-24 h-24 rounded-full bg-[#eab308] flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(234,179,8,0.4)]">
          <Check className="w-12 h-12 text-black" />
        </div>

        <h1 className="text-sm font-mono uppercase tracking-widest text-[#eab308] mb-4">
          Booking Confirmed
        </h1>
        
        <h2 className="text-5xl md:text-7xl font-serif mb-12">
          Your Event is <span className="italic text-white/70">Secured</span>
        </h2>

        {/* Cinematic Event Summary Card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/20 aspect-[16/9] md:aspect-[21/9] mb-12 group">
          {dest && (
            <>
              <Image src={dest.heroImage} alt={dest.name} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
            </>
          )}
          
          <div className="absolute inset-0 p-8 flex flex-col justify-end text-left">
            <h3 className="text-3xl md:text-4xl font-serif text-white mb-2">{state.eventDetails.eventName || "Your Event"}</h3>
            
            <div className="flex flex-wrap gap-6 text-sm text-white/80">
              {dest && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#eab308]" />
                  <span>{dest.name}, {dest.country}</span>
                </div>
              )}
              {state.dates.start && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#eab308]" />
                  <span>{format(state.dates.start, "MMM d")} — {state.dates.end ? format(state.dates.end, "MMM d, yyyy") : ""}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#eab308]" />
                <span>{totalGuests} Guests</span>
              </div>
            </div>
          </div>

          <div className="absolute top-6 right-6 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 font-mono text-sm tracking-widest text-[#eab308]">
            #{bookingId}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <Link 
            href="/dashboard"
            className="w-full md:w-auto inline-flex items-center justify-center gap-3 h-14 px-10 rounded-full bg-white text-black font-mono text-sm uppercase tracking-widest hover:bg-[#eab308] transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Go to Dashboard
          </Link>
          
          <button className="w-full md:w-auto inline-flex items-center justify-center gap-3 h-14 px-10 rounded-full border border-white/20 bg-white/5 text-white font-mono text-sm uppercase tracking-widest hover:bg-white/10 hover:border-white/40 transition-colors">
            <Download className="w-4 h-4" />
            Download Receipt
          </button>
        </div>

      </div>
      
      {/* Background radial */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#eab308]/10 via-[#0a0a0a]/80 to-[#0a0a0a]" />
    </WizardShell>
  );
}
