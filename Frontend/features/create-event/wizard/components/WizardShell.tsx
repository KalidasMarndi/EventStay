"use client";

import { useWizard } from "../WizardContext";
import { WizardProgress } from "./WizardProgress";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface WizardShellProps {
  children: ReactNode;
  canGoNext?: boolean;
  onNext?: () => void;
  nextLabel?: string;
  isProcessing?: boolean;
}

export function WizardShell({ 
  children, 
  canGoNext = true, 
  onNext, 
  nextLabel = "CONTINUE",
  isProcessing = false
}: WizardShellProps) {
  const { state, nextStep, prevStep } = useWizard();
  const router = useRouter();

  const handleNext = () => {
    if (!canGoNext) return;
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const handleSaveAndExit = () => {
    // In a real app with backend draft saving, we would call an API here.
    // Since state is in sessionStorage, we can just navigate away.
    router.push("/");
  };

  const isFirstStep = state.currentStep === 1;
  const isFinalStep = state.currentStep >= 12;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#eab308] selection:text-black font-sans flex flex-col">
      {/* Top Header */}
      {!isFinalStep && (
        <header className="w-full border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-6 h-20 flex items-center justify-between">
            <Link href="/" className="text-2xl font-serif tracking-tight hover:opacity-80 transition-opacity">
              Event<span className="text-[#eab308] italic">Stay</span>
            </Link>
            
            <button 
              onClick={handleSaveAndExit}
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-white/50 hover:text-white transition-colors"
            >
              <span>Save & Exit</span>
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 container mx-auto px-6 py-8 md:py-12 flex flex-col max-w-5xl relative z-10">
        {!isFinalStep && (
          <div className="mb-8 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-serif mb-12 tracking-tight">
              Create Your Event
            </h1>
            <WizardProgress />
          </div>
        )}

        <div className={cn("flex-1", isFinalStep ? "flex items-center justify-center" : "")}>
          {children}
        </div>
      </main>

      {/* Bottom Navigation */}
      {!isFinalStep && (
        <div className="sticky bottom-0 w-full border-t border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl z-50 pb-safe">
          <div className="container mx-auto px-6 h-24 flex items-center justify-between max-w-5xl">
            <button
              onClick={isFirstStep ? () => router.push("/") : prevStep}
              className="group flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Back</span>
            </button>

            <button
              onClick={handleNext}
              disabled={!canGoNext || isProcessing}
              className={cn(
                "group flex items-center gap-3 text-sm font-mono uppercase tracking-widest px-8 py-4 rounded-none transition-all duration-300",
                canGoNext && !isProcessing
                  ? "bg-white text-black hover:bg-[#eab308]"
                  : "bg-white/10 text-white/30 cursor-not-allowed"
              )}
            >
              <span>{isProcessing ? "Processing..." : nextLabel}</span>
              {!isProcessing && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </div>
        </div>
      )}
      
      {/* Background elements */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-[#eab308]/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>
    </div>
  );
}
