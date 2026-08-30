"use client";

import { useWizard } from "../WizardContext";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const STEPS = [
  "Event",
  "Details",
  "Guests",
  "Destination",
  "Dates",
  "Stay",
  "Travel",
  "Docs",
  "Services",
  "Review",
  "Payment",
];

export function WizardProgress() {
  const { state } = useWizard();
  const current = state.currentStep;
  // Step 12 is Confirmation, we hide progress bar or just cap at 11

  // Mobile compact progress
  const renderMobileProgress = () => {
    const totalSteps = STEPS.length;
    const currentStepName = STEPS[current - 1] || "Confirmation";
    
    return (
      <div className="md:hidden flex flex-col gap-2 w-full mb-6">
        <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-white/50">
          <span>Step {current} of {totalSteps}</span>
          <span className="text-[#eab308]">{currentStepName}</span>
        </div>
        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#eab308] transition-all duration-500 ease-in-out"
            style={{ width: `${(current / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    );
  };

  // Desktop horizontal stepper
  const renderDesktopProgress = () => {
    return (
      <div className="hidden md:flex items-center justify-between w-full mb-12 relative">
        {/* Connecting Line */}
        <div className="absolute top-4 left-0 w-full h-[1px] bg-white/10 -z-10" />
        <div 
          className="absolute top-4 left-0 h-[1px] bg-[#eab308] transition-all duration-500 ease-in-out -z-10" 
          style={{ width: `${((current - 1) / (STEPS.length - 1)) * 100}%` }}
        />

        {STEPS.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = current > stepNum;
          const isCurrent = current === stepNum;
          
          return (
            <div key={step} className="flex flex-col items-center gap-3 relative z-10">
              <div 
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono transition-all duration-300",
                  isCompleted ? "bg-[#eab308] text-black" : 
                  isCurrent ? "bg-black border border-[#eab308] text-[#eab308] shadow-[0_0_15px_rgba(234,179,8,0.3)]" : 
                  "bg-black border border-white/20 text-white/30"
                )}
              >
                {isCompleted ? <Check className="w-4 h-4" /> : stepNum.toString().padStart(2, "0")}
              </div>
              <span 
                className={cn(
                  "text-[10px] font-mono uppercase tracking-widest absolute top-10 whitespace-nowrap transition-colors duration-300",
                  isCurrent || isCompleted ? "text-white/80" : "text-white/30"
                )}
              >
                {step}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      {current <= STEPS.length && (
        <div className="w-full">
          {renderMobileProgress()}
          {renderDesktopProgress()}
        </div>
      )}
    </>
  );
}
