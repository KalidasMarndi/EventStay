import { AnimatedSection } from "@/components/shared/AnimatedSection";

const features = [
  {
    title: "Group Travel Planners",
    description: "Manage group-specific hotel inventory, block protected room allotments, and handle guest bookings efficiently."
  },
  {
    title: "Destination Weddings",
    description: "Create branded event microsites, coordinate guest arrivals, and curate custom travel experiences for guests."
  },
  {
    title: "MICE & Corporate Retreats",
    description: "Track inventory consumption in real-time, handle large-scale payments, and maintain full operational visibility."
  }
];

export function EventStayOverviewSection() {
  return (
    <section className="relative w-full py-24 lg:py-32 bg-black border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        <AnimatedSection direction="up" className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-4 text-sm font-mono text-[#eca8d6] mb-6 uppercase tracking-widest">
            <span className="w-12 h-px bg-[#eca8d6]/50" />
            The EventStay Platform
            <span className="w-12 h-px bg-[#eca8d6]/50" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-display text-white mb-6">
            A unified solution for <br /> global event travel.
          </h2>
          <p className="text-lg text-white/60 leading-relaxed">
            Built for travel agencies, DMCs, corporate teams, and destination wedding planners. EventStay connects negotiated inventory directly with guest booking experiences.
          </p>
        </AnimatedSection>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} direction="up" delay={i * 0.1}>
              <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#eca8d6]/30 transition-all duration-500 h-full">
                <h3 className="text-2xl font-display text-white mb-4 text-[#eca8d6]">
                  {feature.title}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
