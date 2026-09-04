"use client";

import { useWizard } from "../WizardContext";
import { useState } from "react";
import { eventsApi } from "@/services/events";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function Step20Review() {
  const { state, goToStep, resetWizard } = useWizard();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string, slug: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      // In a real app, token would be fetched from auth context
      const token = "dummy-token"; 
      
      const payload = {
        title: state.title || "Untitled Event",
        description: state.description || "No description provided.",
        category: state.category || "OTHER",
        city: state.city || "TBD",
        venueId: state.venueId || "dummy-venue-id",
        startDate: state.startDate ? state.startDate.toISOString() : new Date().toISOString(),
        endDate: state.endDate ? state.endDate.toISOString() : new Date().toISOString(),
        capacity: state.capacity || 0,
        pricePerHead: state.pricePerHead || 0,
        featuredImage: state.featuredImage || undefined,
        status: "DRAFT" as any,
        tags: state.tags || [],
      };

      const response = await eventsApi.create(payload, token);
      
      if (response && response.id) {
        setSuccessData({ id: response.id, slug: response.slug });
      } else {
        throw new Error("Invalid response from server");
      }
    } catch (err: any) {
      console.error("Submission failed", err);
      setError(err.message || "Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    return (
      <div className="p-8 md:p-12 h-full flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-display font-bold text-gray-900">Event Created!</h2>
          <p className="text-gray-500">Your event has been successfully created and saved as a draft.</p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-left space-y-2">
            <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Event Reference</p>
            <p className="font-mono text-gray-900">{successData.id}</p>
          </div>

          <div className="pt-6 space-y-3">
            <button 
              onClick={() => {
                resetWizard();
                router.push(`/create-event/${successData.id}`);
              }}
              className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors"
            >
              Go to Event Dashboard
            </button>
            <Link 
              href="/"
              onClick={() => resetWizard()}
              className="block w-full py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-bold hover:bg-gray-50 transition-colors"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 md:p-12 h-full flex flex-col">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold text-gray-900 mb-3">Review & Submit</h2>
        <p className="text-gray-500 text-lg">Review your event details before final creation.</p>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-600">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      <div className="space-y-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-gray-200 rounded-2xl bg-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Basics</h3>
              <button onClick={() => goToStep(2)} className="text-xs text-blue-600 hover:underline">Edit</button>
            </div>
            <p className="font-bold text-gray-900">{state.title || "Untitled"}</p>
            <p className="text-sm text-gray-500">{state.category || "No category"}</p>
          </div>

          <div className="p-6 border border-gray-200 rounded-2xl bg-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Logistics</h3>
              <button onClick={() => goToStep(6)} className="text-xs text-blue-600 hover:underline">Edit</button>
            </div>
            <p className="font-bold text-gray-900">{state.city || "No destination"}</p>
            <p className="text-sm text-gray-500">
              {state.startDate?.toLocaleDateString()} - {state.endDate?.toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-500 mt-2">{state.capacity} Guests</p>
          </div>

          <div className="p-6 border border-gray-200 rounded-2xl bg-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Accommodations</h3>
              <button onClick={() => goToStep(9)} className="text-xs text-blue-600 hover:underline">Edit</button>
            </div>
            <p className="font-bold text-gray-900">{state.accommodations.length} Hotel Blocks</p>
            <p className="text-sm text-gray-500">
              {state.accommodations.reduce((acc, curr) => acc + (curr.roomsRequired || 0), 0)} Total Rooms
            </p>
          </div>

          <div className="p-6 border border-gray-200 rounded-2xl bg-white">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Commercials</h3>
              <button onClick={() => goToStep(15)} className="text-xs text-blue-600 hover:underline">Edit</button>
            </div>
            <p className="font-bold text-gray-900">Est. Total</p>
            <p className="text-sm text-gray-500">
              {state.budgetConfig.currency} {state.budgetConfig.allocatedBudget.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 px-10 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Event...
              </>
            ) : (
              "Create Event"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
