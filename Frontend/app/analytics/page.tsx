import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { BarChart3, TrendingUp, Users, Calendar } from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    { label: "Total Revenue", value: "₹2.4Cr", icon: <TrendingUp className="w-5 h-5 text-[#eca8d6]" /> },
    { label: "Active Events", value: "24", icon: <Calendar className="w-5 h-5 text-[#eca8d6]" /> },
    { label: "Total Guests", value: "3,842", icon: <Users className="w-5 h-5 text-[#eca8d6]" /> },
    { label: "Conversion Rate", value: "76%", icon: <BarChart3 className="w-5 h-5 text-[#eca8d6]" /> }
  ];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-inter">
      <Navbar />
      
      <main className="pt-[120px] pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <AnimatedSection direction="up" className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display mb-6 text-[#eca8d6]">
              Analytics
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Global overview of platform performance, revenue, and guest engagement.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} direction="up" delay={i * 0.1}>
                <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 flex items-center gap-6">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    {stat.icon}
                  </div>
                  <div>
                    <div className="text-white/50 text-xs uppercase tracking-wider mb-1">{stat.label}</div>
                    <div className="text-3xl font-light text-white">{stat.value}</div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection direction="up" delay={0.4}>
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-display mb-2">Detailed Charts Coming Soon</h3>
                <p className="text-white/50 text-sm max-w-md mx-auto">
                  Interactive reporting, occupancy trends, and payment timelines will be available in the next release.
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
