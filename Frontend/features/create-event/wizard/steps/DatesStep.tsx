"use client";

import { useWizard } from "../WizardContext";
import { WizardShell } from "../components/WizardShell";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, differenceInDays } from "date-fns";
import { Calendar as CalendarIcon, Clock, Check, PlaneTakeoff, PlaneLanding, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export function DatesStep() {
  const { state, updateState, nextStep } = useWizard();
  const { dates } = state;

  const setDate = (field: keyof typeof dates, value: Date | null | boolean) => {
    updateState({ dates: { ...dates, [field]: value } });
  };

  const duration = dates.start && dates.end ? differenceInDays(dates.end, dates.start) : 0;
  const isValid = dates.start !== null && dates.end !== null;

  return (
    <WizardShell canGoNext={isValid} onNext={nextStep}>
      <div className="max-w-4xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-700 flex flex-col lg:flex-row gap-12">
        
        {/* Left Column: Form */}
        <div className="flex-1 space-y-8">
          <div>
            <h2 className="text-3xl font-serif mb-2">When is it happening?</h2>
            <p className="text-white/50 font-mono text-sm uppercase tracking-widest">
              Set the timeline for your event
            </p>
          </div>

          <div className="space-y-6">
            <DatePicker 
              label="Event Start" 
              date={dates.start} 
              onSelect={(d) => setDate("start", d)} 
              icon={<MapPin className="w-4 h-4 text-[#eab308]" />}
            />
            <DatePicker 
              label="Event End" 
              date={dates.end} 
              onSelect={(d) => setDate("end", d)} 
              icon={<Check className="w-4 h-4 text-[#eab308]" />}
            />
            
            <div className="h-px bg-white/10 w-full my-8" />

            <div className="space-y-2 mb-6">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white/70">Travel Days (Optional)</h3>
              <p className="text-xs text-white/40">If guests are arriving before or leaving after the event dates.</p>
            </div>

            <DatePicker 
              label="Arrival" 
              date={dates.arrival} 
              onSelect={(d) => setDate("arrival", d)} 
              icon={<PlaneLanding className="w-4 h-4 text-blue-400" />}
            />
            <DatePicker 
              label="Departure" 
              date={dates.departure} 
              onSelect={(d) => setDate("departure", d)} 
              icon={<PlaneTakeoff className="w-4 h-4 text-blue-400" />}
            />
          </div>

          <button 
            onClick={() => setDate("flexible", !dates.flexible)}
            className="flex items-center gap-3 mt-8 hover:opacity-80 transition-opacity"
          >
            <div className={cn(
              "w-5 h-5 rounded flex items-center justify-center border transition-colors",
              dates.flexible ? "bg-[#eab308] border-[#eab308] text-black" : "border-white/20 bg-white/5"
            )}>
              {dates.flexible && <Check className="w-3.5 h-3.5" />}
            </div>
            <span className="text-sm text-white/70">My dates are flexible</span>
          </button>
        </div>

        {/* Right Column: Visualization */}
        <div className="flex-1 lg:max-w-sm">
          <div className="sticky top-24 bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center min-h-[320px]">
            <Clock className="w-12 h-12 text-[#eab308] mb-6 opacity-80" />
            
            {dates.start && dates.end ? (
              <div className="text-center animate-in zoom-in duration-300">
                <div className="text-[60px] font-display text-white leading-none mb-2">
                  {duration}
                </div>
                <div className="text-sm font-mono uppercase tracking-widest text-[#eab308] mb-8">
                  Days
                </div>
                
                <div className="flex flex-col gap-2 text-sm text-white/60">
                  <div className="flex justify-between gap-8">
                    <span>From</span>
                    <span className="text-white">{format(dates.start, "MMM d, yyyy")}</span>
                  </div>
                  <div className="flex justify-between gap-8">
                    <span>To</span>
                    <span className="text-white">{format(dates.end, "MMM d, yyyy")}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-white/30 text-sm italic">
                Select your event dates to see the duration.
              </div>
            )}
          </div>
        </div>

      </div>
    </WizardShell>
  );
}

function DatePicker({ label, date, onSelect, icon }: {
  label: string;
  date: Date | null;
  onSelect: (d: Date | null) => void;
  icon?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-mono text-white/70 uppercase tracking-wider">{label}</label>
      <Popover>
        <PopoverTrigger asChild>
          <button
            className={cn(
              "w-full flex items-center justify-between bg-white/5 border rounded-lg px-4 py-3 text-sm transition-colors",
              date ? "border-[#eab308]/50 text-white" : "border-white/10 text-white/40 hover:bg-white/10"
            )}
          >
            <div className="flex items-center gap-3">
              {icon || <CalendarIcon className="w-4 h-4" />}
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-[#111] border-white/10" align="start">
          <Calendar
            mode="single"
            selected={date || undefined}
            onSelect={(day) => onSelect(day || null)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
