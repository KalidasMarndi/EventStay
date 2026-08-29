import { DestinationsExperience } from "@/features/destination/components/DestinationsSidebarMenu";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import "./Destination.css";

export function Destination() {
  return (
    <main className="min-h-screen bg-[#050505] text-white font-inter">
      <div className="fixed left-5 top-5 z-50 md:left-8 md:top-8">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-xl transition-colors duration-300 hover:border-white hover:bg-white hover:text-black"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
          Home
        </Link>
      </div>
      <DestinationsExperience />
    </main>
  );
}
