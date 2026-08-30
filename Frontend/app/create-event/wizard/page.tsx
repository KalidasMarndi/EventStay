"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { WizardProvider, useWizard } from "@/features/create-event/wizard/WizardContext";
import { WizardShell } from "@/features/create-event/wizard/components/WizardShell";

// Step components (to be implemented)
import { EventTypeStep } from "@/features/create-event/wizard/steps/EventTypeStep";
import { EventDetailsStep } from "@/features/create-event/wizard/steps/EventDetailsStep";
import { GuestsStep } from "@/features/create-event/wizard/steps/GuestsStep";
import { DestinationStep } from "@/features/create-event/wizard/steps/DestinationStep";
import { DatesStep } from "@/features/create-event/wizard/steps/DatesStep";
import { StayStep } from "@/features/create-event/wizard/steps/StayStep";
import { TravelStep } from "@/features/create-event/wizard/steps/TravelStep";
import { DocumentsStep } from "@/features/create-event/wizard/steps/DocumentsStep";
import { ServicesStep } from "@/features/create-event/wizard/steps/ServicesStep";
import { ReviewStep } from "@/features/create-event/wizard/steps/ReviewStep";
import { PaymentStep } from "@/features/create-event/wizard/steps/PaymentStep";
import { ConfirmationStep } from "@/features/create-event/wizard/steps/ConfirmationStep";

function WizardRouter() {
  const { state } = useWizard();

  switch (state.currentStep) {
    case 1:
      return <EventTypeStep />;
    case 2:
      return <EventDetailsStep />;
    case 3:
      return <GuestsStep />;
    case 4:
      return <DestinationStep />;
    case 5:
      return <DatesStep />;
    case 6:
      return <StayStep />;
    case 7:
      return <TravelStep />;
    case 8:
      return <DocumentsStep />;
    case 9:
      return <ServicesStep />;
    case 10:
      return <ReviewStep />;
    case 11:
      return <PaymentStep />;
    case 12:
      return <ConfirmationStep />;
    default:
      return <EventTypeStep />;
  }
}

function WizardContent() {
  const searchParams = useSearchParams();
  const initialType = searchParams.get("type") || undefined;

  return (
    <WizardProvider initialType={initialType}>
      <WizardRouter />
    </WizardProvider>
  );
}

export default function WizardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-[#eab308]">Loading...</div>}>
      <WizardContent />
    </Suspense>
  );
}
