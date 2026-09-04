"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type EventCategory = 
  | "WEDDING" | "CORPORATE" | "CONFERENCE" | "MICE" 
  | "INCENTIVE" | "CULTURAL" | "MUSIC" | "SPORTS" | "OTHER" | "";

export interface Accommodation {
  id: string;
  hotelName: string;
  roomType: string;
  roomsRequired: number;
  guestsPerRoom: number;
  checkIn: Date | null;
  checkOut: Date | null;
  rate: number;
  currency: string;
  mealPlan: string;
}

export interface Activity {
  id: string;
  time: string;
  name: string;
  location: string;
  description: string;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: Date | null;
  title: string;
  activities: Activity[];
}

export interface Experience {
  id: string;
  name: string;
  date: Date | null;
  guests: number;
  time: string;
}

export interface WizardState {
  currentStep: number;
  
  // Backend Persisted Fields (CreateEventDto)
  title: string;
  description: string;
  category: EventCategory;
  city: string;
  venueId: string;
  startDate: Date | null;
  endDate: Date | null;
  capacity: number;
  pricePerHead: number;
  featuredImage: string;
  status: string; 
  tags: string[];

  // Frontend State Placeholders
  organizer: {
    name: string;
    email: string;
    phone: string;
    company: string;
    billingContact: string;
    billingEmail: string;
  };
  eventDetails: {
    objective: string;
    tagline: string;
    internalRef: string;
    poNumber: string;
  };
  guestConfig: {
    vip: number;
    adults: number;
    children: number;
    infants: number;
    staff: number;
    speakers: number;
    organizers: number;
    companions: number;
    nationalities: string;
    specialRequirements: string;
  };
  dateConfig: {
    arrival: Date | null;
    departure: Date | null;
  };
  venueConfig: {
    name: string;
    type: string;
    address: string;
    city: string;
    country: string;
    capacity: number;
  };
  accommodations: Accommodation[];
  travel: {
    flightSupport: boolean;
    transfers: boolean;
    arrivalAirport: string;
    departureAirport: string;
    vipTransfers: string;
  };
  airportTransfers: string[];
  visa: {
    visaAssistance: boolean;
    passportVerification: boolean;
    invitationLetters: boolean;
    travelInsurance: boolean;
  };
  experiences: Experience[];
  itinerary: ItineraryDay[];
  budgetConfig: {
    currency: string;
    allocatedBudget: number;
    estimatedCostPerGuest: number;
  };
  policies: {
    bookingDeadline: Date | null;
    paymentDeadline: Date | null;
    cancellationPolicy: string;
    refundPolicy: string;
    minimumStay: number;
  };
  branding: {
    primaryColor: string;
    secondaryColor: string;
    welcomeMessage: string;
  };
  guestExperience: {
    showItinerary: boolean;
    showHotels: boolean;
    showTransfers: boolean;
    allowBooking: boolean;
    showFaqs: boolean;
  };
  internalNotes: string;
}

const defaultState: WizardState = {
  currentStep: 1,
  
  title: "",
  description: "",
  category: "",
  city: "",
  venueId: "",
  startDate: null,
  endDate: null,
  capacity: 0,
  pricePerHead: 0,
  featuredImage: "",
  status: "DRAFT",
  tags: [],

  organizer: {
    name: "", email: "", phone: "", company: "", billingContact: "", billingEmail: ""
  },
  eventDetails: {
    objective: "", tagline: "", internalRef: "", poNumber: ""
  },
  guestConfig: {
    vip: 0, adults: 0, children: 0, infants: 0, staff: 0, speakers: 0, organizers: 0, companions: 0, nationalities: "", specialRequirements: ""
  },
  dateConfig: {
    arrival: null, departure: null
  },
  venueConfig: {
    name: "", type: "", address: "", city: "", country: "", capacity: 0
  },
  accommodations: [],
  travel: {
    flightSupport: false, transfers: false, arrivalAirport: "", departureAirport: "", vipTransfers: ""
  },
  airportTransfers: [],
  visa: {
    visaAssistance: false, passportVerification: false, invitationLetters: false, travelInsurance: false
  },
  experiences: [],
  itinerary: [],
  budgetConfig: {
    currency: "USD", allocatedBudget: 0, estimatedCostPerGuest: 0
  },
  policies: {
    bookingDeadline: null, paymentDeadline: null, cancellationPolicy: "", refundPolicy: "", minimumStay: 1
  },
  branding: {
    primaryColor: "#0F172A", secondaryColor: "#F8FAFC", welcomeMessage: ""
  },
  guestExperience: {
    showItinerary: true, showHotels: true, showTransfers: false, allowBooking: true, showFaqs: true
  },
  internalNotes: ""
};

interface WizardContextType {
  state: WizardState;
  updateState: (updates: Partial<WizardState>) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetWizard: () => void;
}

const WizardContext = createContext<WizardContextType | undefined>(undefined);

const STORAGE_KEY = "eventstay_wizard_v2";

export function WizardProvider({ children, initialType }: { children: ReactNode; initialType?: string }) {
  const [state, setState] = useState<WizardState>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          
          // Rehydrate Dates
          if (parsed.startDate) parsed.startDate = new Date(parsed.startDate);
          if (parsed.endDate) parsed.endDate = new Date(parsed.endDate);
          if (parsed.dateConfig?.arrival) parsed.dateConfig.arrival = new Date(parsed.dateConfig.arrival);
          if (parsed.dateConfig?.departure) parsed.dateConfig.departure = new Date(parsed.dateConfig.departure);
          if (parsed.policies?.bookingDeadline) parsed.policies.bookingDeadline = new Date(parsed.policies.bookingDeadline);
          if (parsed.policies?.paymentDeadline) parsed.policies.paymentDeadline = new Date(parsed.policies.paymentDeadline);
          
          if (parsed.accommodations) {
            parsed.accommodations = parsed.accommodations.map((a: any) => ({
              ...a,
              checkIn: a.checkIn ? new Date(a.checkIn) : null,
              checkOut: a.checkOut ? new Date(a.checkOut) : null,
            }));
          }
          if (parsed.experiences) {
            parsed.experiences = parsed.experiences.map((e: any) => ({
              ...e,
              date: e.date ? new Date(e.date) : null,
            }));
          }
          if (parsed.itinerary) {
            parsed.itinerary = parsed.itinerary.map((d: any) => ({
              ...d,
              date: d.date ? new Date(d.date) : null,
            }));
          }

          return { ...defaultState, ...parsed, ...(initialType && !parsed.category ? { category: initialType as EventCategory } : {}) };
        } catch (e) {
          console.error("Failed to parse stored wizard state", e);
        }
      }
    }
    return { ...defaultState, ...(initialType ? { category: initialType as EventCategory } : {}) };
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const updateState = (updates: Partial<WizardState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const nextStep = () => {
    setState((prev) => ({ ...prev, currentStep: Math.min(prev.currentStep + 1, 21) }));
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
