"use client";

import { useEffect, useRef, useState } from "react";
import { DashboardShowcase } from "./DashboardShowcase";

const steps = [
  {
    number: "01",
    title: "Create",
    subtitle: "event",
    description: "Set up a private event, add negotiated hotel inventory, and define room rates and packages.",
    code: `const event = new EventStay({
  name: "Anjali & Rohan's Goa Wedding",
  dates: "14-17 February",
  guests: 120,
  hotel: "Taj Exotica"
})`,
  },
  {
    number: "02",
    title: "Publish",
    subtitle: "microsite",
    description: "Launch a beautifully branded event page where guests can explore options and book their stay.",
    code: `await event.publish({
  url: "anjali-rohan-goa",
  deadline: "30 Jan",
  packages: ['Sea View Room', 'Villa']
})`,
  },
  {
    number: "03",
    title: "Track",
    subtitle: "bookings",
    description: "Watch live bookings roll in. Manage inventory, view guest lists, and track payments from your dashboard.",
    code: `event.dashboard({
  metrics: ['Rooms Booked', 'Pending Payments'],
  alerts: true
})
// 33 rooms booked today`,
  },
];

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeStep]);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 text-white"
    >
      <div className="absolute inset-0 w-full h-full -z-10 overflow-hidden">
        <div className="sticky top-0 w-full h-screen">
          <video
            src="/Videos/135145-761273495.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-white/[0.02] blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header — titre */}
        <div className="relative mb-12 lg:mb-24">
          <div className="overflow-hidden">
            <div className={`transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
              <span className="inline-flex items-center gap-3 text-sm font-mono text-white/40 mb-8">
                <span className="w-12 h-px bg-white/20" />
                Workflow
              </span>
            </div>
            
            <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.85] transition-all duration-1000 delay-100 ${
              isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
            }`}>
              <span className="block">Create</span>
              <span className="block text-white/30">Publish</span>
              <span className="block text-white/10">&amp; Track.</span>
            </h2>
          </div>
        </div>

        {/* Horizontal Steps Layout */}
        <div className="grid lg:grid-cols-3 gap-4">
          {steps.map((step, index) => (
            <button
              key={step.number}
              type="button"
              onClick={() => setActiveStep(index)}
              className={`relative text-left p-8 lg:p-12 border transition-all duration-500 ${
                activeStep === index 
                  ? "bg-[#000000] border-white/60" 
                  : "bg-[#000000] border-white/25 hover:border-white/50"
              }`}
            >
              {/* Step number with animated line */}
              <div className="flex items-center gap-4 mb-8">
                <span className={`text-4xl font-display transition-colors duration-300 ${
                  activeStep === index ? "text-[#eca8d6]" : "text-white/20"
                }`}>
                  {step.number}
                </span>
                <div className="flex-1 h-px bg-white/10 overflow-hidden">
                  {activeStep === index && (
                    <div className="h-full bg-[#eca8d6]/50 animate-progress" />
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl lg:text-4xl font-display mb-2">
                {step.title}
              </h3>
              <span className="text-xl text-white/40 font-display block mb-6">
                {step.subtitle}
              </span>

              {/* Description */}
              <p className={`text-white/60 leading-relaxed transition-opacity duration-300 ${
                activeStep === index ? "opacity-100" : "opacity-60"
              }`}>
                {step.description}
              </p>

              {/* Active indicator */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-[#eca8d6] transition-transform duration-500 origin-left ${
                activeStep === index ? "scale-x-100" : "scale-x-0"
              }`} />
            </button>
          ))}
        </div>

        <DashboardShowcase />
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-progress {
          animation: progress 6s linear forwards;
        }
      `}</style>
    </section>
  );
}
