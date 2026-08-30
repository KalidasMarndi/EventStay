"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const EVENT_CATEGORIES = [
  "WEDDING",
  "CORPORATE",
  "RETREAT",
  "PARTY",
  "CONFERENCE",
  "OTHER"
] as const;

const detailsSchema = z.object({
  eventName: z.string().min(3, "Event name must be at least 3 characters").max(100),
  category: z.enum(EVENT_CATEGORIES),
  organization: z.string().min(2, "Organization name is required"),
  description: z.string().min(10, "Please provide a brief description").max(500),
  purpose: z.string().min(5, "Purpose is required"),
  specialRequirements: z.string().optional(),
});

type DetailsFormValues = z.infer<typeof detailsSchema>;

export function EventDetailsStep() {
  const { state, updateState, nextStep } = useWizard();

  const form = useForm<DetailsFormValues>({
    resolver: zodResolver(detailsSchema),
    defaultValues: {
      eventName: state.eventDetails.eventName,
      category: (state.eventDetails.category as any) || undefined,
      organization: state.eventDetails.organization,
      description: state.eventDetails.description,
      purpose: state.eventDetails.purpose,
      specialRequirements: state.eventDetails.specialRequirements,
    },
  });

  const { register, handleSubmit, formState: { errors, isValid }, watch } = form;
  const descriptionValue = watch("description");

  const onSubmit = (data: DetailsFormValues) => {
    updateState({ 
      eventDetails: { 
        ...data, 
        specialRequirements: data.specialRequirements || "" 
      } as any
    });
    nextStep();
  };

  return (
    <WizardShell 
      canGoNext={isValid} 
      onNext={handleSubmit(onSubmit)}
    >
      <div className="max-w-2xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <h2 className="text-3xl font-serif mb-2">Event Details</h2>
        <p className="text-white/50 font-mono text-sm uppercase tracking-widest mb-12">
          Tell us about your upcoming event
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Event Name */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider">Event Name</label>
              <input 
                {...register("eventName")}
                placeholder="e.g. Annual Tech Summit 2026"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#eab308] focus:ring-1 focus:ring-[#eab308] transition-all"
              />
              {errors.eventName && <p className="text-red-400 text-xs">{errors.eventName.message}</p>}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider">Category</label>
              <select 
                {...register("category")}
                className="w-full bg-[#111] border border-white/10 rounded-lg px-4 py-3 text-white appearance-none focus:outline-none focus:border-[#eab308] focus:ring-1 focus:ring-[#eab308] transition-all"
              >
                <option value="" disabled>Select a category</option>
                {EVENT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat.replace(/_/g, " ")}</option>
                ))}
              </select>
              {errors.category && <p className="text-red-400 text-xs">{errors.category.message}</p>}
            </div>
          </div>

          {/* Organization */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-white/70 uppercase tracking-wider">Organization / Group Name</label>
            <input 
              {...register("organization")}
              placeholder="e.g. Acme Corp"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#eab308] focus:ring-1 focus:ring-[#eab308] transition-all"
            />
            {errors.organization && <p className="text-red-400 text-xs">{errors.organization.message}</p>}
          </div>

          {/* Purpose */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-white/70 uppercase tracking-wider">Purpose of Event</label>
            <input 
              {...register("purpose")}
              placeholder="e.g. Q3 Leadership Retreat & Strategy Planning"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#eab308] focus:ring-1 focus:ring-[#eab308] transition-all"
            />
            {errors.purpose && <p className="text-red-400 text-xs">{errors.purpose.message}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <label className="text-xs font-mono text-white/70 uppercase tracking-wider">Event Description</label>
              <span className="text-xs text-white/30">{descriptionValue?.length || 0}/500</span>
            </div>
            <textarea 
              {...register("description")}
              placeholder="Briefly describe the vision for your event..."
              rows={4}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#eab308] focus:ring-1 focus:ring-[#eab308] transition-all resize-none"
            />
            {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
          </div>

          {/* Special Requirements */}
          <div className="space-y-2">
            <label className="text-xs font-mono text-white/70 uppercase tracking-wider">Special Requirements (Optional)</label>
            <textarea 
              {...register("specialRequirements")}
              placeholder="Any specific needs we should know about early on?"
              rows={2}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-[#eab308] focus:ring-1 focus:ring-[#eab308] transition-all resize-none"
            />
          </div>
        </form>
      </div>
    </WizardShell>
  );
}
