"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type EventType = string;

export interface EventDetails {
  eventName: string;
  category: string;
  organization: string;
  description: string;
  purpose: string;
  specialRequirements: string;
}

export interface GuestsData {
  adults: number;
  children: number;
  vip: number;
  staff: number;
  roomPreference: "single" | "double" | "twin" | "";
  accessibility: string;
  dietary: string;
}

export interface DateData {
  arrival: Date | null;
  start: Date | null;
  end: Date | null;
  departure: Date | null;
  flexible: boolean;
}

export interface TravelData {
  flightSupport: boolean;
  flightDetails?: {
    departureCity: string;
    destinationAirport: string;
    departureDate: Date | null;
    returnDate: Date | null;
    travelers: number;
    cabinClass: "economy" | "premium" | "business" | "first";
    directPreferred: boolean;
    flexibleTiming: boolean;
  };
  groundTransfer: boolean;
  transferDetails?: {
    pickup: string;
    dropoff: string;
    passengers: number;
    luggage: number;
    vehicleType: string;
  };
  airportVip: boolean;
  vipDetails?: {
    serviceLevel: string;
  };
}

export interface WizardState {
  currentStep: number;
  eventType: EventType;
  eventDetails: EventDetails;
  guests: GuestsData;
  destinationId: string;
  dates: DateData;
  stayId: string;
  travel: TravelData;
  documents: { id: string; name: string; type: string; status: string }[];
  services: string[];
}

interface WizardContextType {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetWizard: () => void;
}

const defaultState: WizardState = {
  currentStep: 1,
  eventType: "",
  eventDetails: {
    eventName: "",
    category: "",
    organization: "",
    description: "",
    purpose: "",
    specialRequirements: "",
  },
  guests: {
    adults: 0,
    children: 0,
    vip: 0,
    staff: 0,
    roomPreference: "",
    accessibility: "",
    dietary: "",
  },
  destinationId: "",
  dates: {
    arrival: null,
    start: null,
    end: null,
    departure: null,
    flexible: false,
  },
  stayId: "",
  travel: {
    flightSupport: false,
    groundTransfer: false,
    airportVip: false,
  },
  documents: [],
  services: [],
};

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const STORAGE_KEY = "eventstay_wizard_state";

export function WizardProvider({ children, initialType }: { children: ReactNode; initialType?: string }) {
  const [state, setState] = useState<WizardState>(() => {
    // Try to load from session storage (only on client)
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          // Restore Date objects
          if (parsed.dates) {
             parsed.dates.arrival = parsed.dates.arrival ? new Date(parsed.dates.arrival) : null;
             parsed.dates.start = parsed.dates.start ? new Date(parsed.dates.start) : null;
             parsed.dates.end = parsed.dates.end ? new Date(parsed.dates.end) : null;
             parsed.dates.departure = parsed.dates.departure ? new Date(parsed.dates.departure) : null;
          }
          if (parsed.travel?.flightDetails) {
             parsed.travel.flightDetails.departureDate = parsed.travel.flightDetails.departureDate ? new Date(parsed.travel.flightDetails.departureDate) : null;
             parsed.travel.flightDetails.returnDate = parsed.travel.flightDetails.returnDate ? new Date(parsed.travel.flightDetails.returnDate) : null;
          }
          return { ...defaultState, ...parsed, ...(initialType && !parsed.eventType ? { eventType: initialType } : {}) };
        } catch (e) {
          console.error("Failed to parse stored wizard state", e);
        }
      }
    }
    return { ...defaultState, ...(initialType ? { eventType: initialType } : {}) };
  });

  // Save to session storage whenever state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const updateState = (updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 12) }));
  };

  const prevStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.max(prev.currentStep - 1, 1) }));
  };

  const goToStep = (step: number) => {
    setState((prev) => ({ ...prev, currentStep: step }));
  };

  const resetWizard = () => {
    setState(defaultState);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <WizardContext.Provider value={{ state, updateState, nextStep, prevStep, goToStep, resetWizard }}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (context === undefined) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
