"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WizardProvider, useWizard } from "@/features/create-event/wizard/WizardContext";
import { WizardShell } from "@/features/create-event/wizard/components/WizardShell";

// Step components
import { Step1EventType } from "@/features/create-event/wizard/steps/Step1EventType";
import { Step2EventBasics } from "@/features/create-event/wizard/steps/Step2EventBasics";
import { Step3EventDetails } from "@/features/create-event/wizard/steps/Step3EventDetails";
import { Step4OrganizerDetails } from "@/features/create-event/wizard/steps/Step4OrganizerDetails";
import { Step5Guests } from "@/features/create-event/wizard/steps/Step5Guests";
import { Step6Destination } from "@/features/create-event/wizard/steps/Step6Destination";
import { Step7EventDates } from "@/features/create-event/wizard/steps/Step7EventDates";
import { Step8Venue } from "@/features/create-event/wizard/steps/Step8Venue";
import { Step9Accommodation } from "@/features/create-event/wizard/steps/Step9Accommodation";
import { Step10Travel } from "@/features/create-event/wizard/steps/Step10Travel";
import { Step11Transfers } from "@/features/create-event/wizard/steps/Step11Transfers";
import { Step12VisaDocs } from "@/features/create-event/wizard/steps/Step12VisaDocs";
import { Step13Experiences } from "@/features/create-event/wizard/steps/Step13Experiences";
import { Step14Itinerary } from "@/features/create-event/wizard/steps/Step14Itinerary";
import { Step15Budget } from "@/features/create-event/wizard/steps/Step15Budget";
import { Step16Policies } from "@/features/create-event/wizard/steps/Step16Policies";
import { Step17Branding } from "@/features/create-event/wizard/steps/Step17Branding";
import { Step18GuestExperience } from "@/features/create-event/wizard/steps/Step18GuestExperience";
import { Step19InternalNotes } from "@/features/create-event/wizard/steps/Step19InternalNotes";
import { Step20Review } from "@/features/create-event/wizard/steps/Step20Review";

function WizardRouter() {
  const { state } = useWizard();

  switch (state.currentStep) {
    case 1: return <Step1EventType />;
    case 2: return <Step2EventBasics />;
    case 3: return <Step3EventDetails />;
    case 4: return <Step4OrganizerDetails />;
    case 5: return <Step5Guests />;
    case 6: return <Step6Destination />;
    case 7: return <Step7EventDates />;
    case 8: return <Step8Venue />;
    case 9: return <Step9Accommodation />;
    case 10: return <Step10Travel />;
    case 11: return <Step11Transfers />;
    case 12: return <Step12VisaDocs />;
    case 13: return <Step13Experiences />;
    case 14: return <Step14Itinerary />;
    case 15: return <Step15Budget />;
    case 16: return <Step16Policies />;
    case 17: return <Step17Branding />;
    case 18: return <Step18GuestExperience />;
    case 19: return <Step19InternalNotes />;
    case 20: return <Step20Review />;
    default: return <Step1EventType />;
  }
}

function WizardContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || undefined;

  return (
    <WizardProvider initialType={initialType}>
      <WizardShell>
        <WizardRouter />
      </WizardShell>
    </WizardProvider>
  );
}

export default function WizardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center text-blue-600">Loading...</div>}>
      <WizardContent />
    </Suspense>
  );
}
