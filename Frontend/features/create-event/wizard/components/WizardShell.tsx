"use client";

import { useWizard } from "../WizardContext";
import { X, ArrowLeft, ArrowRight, Check } from "lucide-react";
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

const stepsList = [
  { group: "Setup", items: [
    { id: 1, label: "Event Type" },
    { id: 2, label: "Event Basics" },
    { id: 3, label: "Event Details" },
    { id: 4, label: "Organizer Details" }
  ]},
  { group: "Logistics", items: [
    { id: 5, label: "Guests" },
    { id: 6, label: "Destination" },
    { id: 7, label: "Event Dates" },
    { id: 8, label: "Venue" }
  ]},
  { group: "Travel & Stay", items: [
    { id: 9, label: "Accommodation" },
    { id: 10, label: "Travel Requirements" },
    { id: 11, label: "Transfers" },
    { id: 12, label: "Visa & Docs" }
  ]},
  { group: "Experience", items: [
    { id: 13, label: "Experiences" },
    { id: 14, label: "Itinerary" }
  ]},
  { group: "Commercial", items: [
    { id: 15, label: "Budget" },
    { id: 16, label: "Policies" },
    { id: 17, label: "Branding" },
    { id: 18, label: "Guest Experience" },
    { id: 19, label: "Internal Notes" }
  ]},
  { group: "Finalize", items: [
    { id: 20, label: "Review & Submit" }
  ]}
];

export function WizardShell({ 
  children, 
  canGoNext = true, 
  onNext, 
  nextLabel = "CONTINUE",
  isProcessing = false
}: WizardShellProps) {
  const { state, nextStep, prevStep, goToStep } = useWizard();
  const router = useRouter();

  const handleNext = () => {
    if (!canGoNext || isProcessing) return;
    if (onNext) {
      onNext();
    } else {
      nextStep();
    }
  };

  const handleSaveAndExit = () => {
    // Save is handled by session storage automatically. Go to dashboard.
    router.push("/dashboard");
  };

  const isFirstStep = state.currentStep === 1;
  const isFinalStep = state.currentStep === 20;

  // Calculate global progress
  const totalSteps = 20;
  const progressPercent = Math.round((state.currentStep / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#0F172A] font-inter flex flex-col">
      {/* Top Header */}
      <header className="w-full bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-display font-bold tracking-tight text-[#0F172A]">
              Event<span className="text-blue-600 italic">Stay</span>
            </Link>
            <div className="hidden md:flex items-center gap-3">
              <div className="h-4 w-px bg-gray-300" />
              <span className="text-sm font-medium text-gray-500">Event Setup</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium border border-blue-100">
                Draft
              </span>
            </div>
          </div>
          
          <button 
            onClick={handleSaveAndExit}
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <span>Save & Exit</span>
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-[1600px] w-full mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-[240px_1fr_300px] xl:grid-cols-[280px_1fr_320px] gap-8">
        
        {/* Left Stepper (Hidden on small screens) */}
        <aside className="hidden lg:block space-y-8 h-[calc(100vh-8rem)] sticky top-24 overflow-y-auto pr-4 pb-12 custom-scrollbar">
          <div className="mb-6">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
              <div className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="text-xs font-medium text-gray-500 text-right">{progressPercent}%</div>
          </div>

          <nav className="space-y-6">
            {stepsList.map((group) => (
              <div key={group.group}>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                  {group.group}
                </h4>
                <div className="space-y-1">
                  {group.items.map((item) => {
                    const isCompleted = state.currentStep > item.id;
                    const isActive = state.currentStep === item.id;
                    const isFuture = state.currentStep < item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => goToStep(item.id)}
                        disabled={isFuture}
                        className={cn(
                          "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition-colors",
                          isActive ? "bg-blue-50 text-blue-700 font-medium" : 
                          isCompleted ? "text-gray-600 hover:bg-gray-100 cursor-pointer" : 
                          "text-gray-400 cursor-not-allowed"
                        )}
                      >
                        <div className={cn(
                          "w-5 h-5 rounded-full flex items-center justify-center border text-[10px]",
                          isActive ? "border-blue-600 bg-blue-600 text-white" :
                          isCompleted ? "border-green-500 bg-green-50 text-green-600" :
                          "border-gray-300 text-gray-400"
                        )}>
                          {isCompleted ? <Check className="w-3 h-3" /> : item.id}
                        </div>
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* Center Content */}
        <main className="flex flex-col min-h-full pb-24">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 flex-1 overflow-hidden">
            {children}
          </div>
        </main>

        {/* Right Summary (Hidden on small screens) */}
        <aside className="hidden lg:block">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-100 pb-4 mb-4">
              Event Summary
            </h3>
            
            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Event</p>
                <p className="text-sm font-medium text-gray-900">{state.title || "Untitled Event"}</p>
                <p className="text-xs text-gray-500">{state.category || "No type selected"}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Destination</p>
                <p className="text-sm font-medium text-gray-900">{state.city || "Not selected"}</p>
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Dates</p>
                <p className="text-sm font-medium text-gray-900">
                  {state.startDate ? state.startDate.toLocaleDateString() : "TBD"}
                  {" — "}
                  {state.endDate ? state.endDate.toLocaleDateString() : "TBD"}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Guests</p>
                  <p className="text-sm font-medium text-gray-900">{state.capacity || 0}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Rooms</p>
                  <p className="text-sm font-medium text-gray-900">
                    {state.accommodations.reduce((acc, curr) => acc + (curr.roomsRequired || 0), 0)}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Est. Budget</p>
                <p className="text-lg font-bold text-gray-900">
                  {state.budgetConfig.currency} {state.budgetConfig.allocatedBudget.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
        <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
          <button
            onClick={isFirstStep ? handleSaveAndExit : prevStep}
            className="group flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{isFirstStep ? "Cancel" : "Back"}</span>
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleSaveAndExit}
              className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors hidden md:block px-4 py-2"
            >
              Save Draft
            </button>
            <button
              onClick={handleNext}
              disabled={!canGoNext || isProcessing}
              className={cn(
                "group flex items-center gap-2 text-sm font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-sm",
                canGoNext && !isProcessing
                  ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-md"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              )}
            >
              <span>{isProcessing ? "Processing..." : nextLabel}</span>
              {!isProcessing && !isFinalStep && <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
            </button>
          </div>
        </div>
      </div>
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 4px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
}
