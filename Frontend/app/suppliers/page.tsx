import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { AnimatedSection } from "@/components/shared/AnimatedSection";
import { suppliersData } from "@/data/suppliers";
import { Building2, Plane, Bus, CreditCard, Camera, Map } from "lucide-react";

export default function SuppliersPage() {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Hotel': return <Building2 className="w-5 h-5" />;
      case 'Airline': return <Plane className="w-5 h-5" />;
      case 'Transport': return <Bus className="w-5 h-5" />;
      case 'Visa': return <CreditCard className="w-5 h-5" />;
      case 'Experience': return <Camera className="w-5 h-5" />;
      case 'Venue': return <Map className="w-5 h-5" />;
      default: return <Building2 className="w-5 h-5" />;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-inter">
      <Navbar />
      
      <main className="pt-[120px] pb-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <AnimatedSection direction="up" className="mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display mb-6 text-[#eca8d6]">
              Global Suppliers
            </h1>
            <p className="text-lg text-white/60 max-w-2xl">
              Manage your network of hotels, transport providers, airlines, and local experience curators.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliersData.map((supplier, i) => (
              <AnimatedSection key={supplier.id} direction="up" delay={i * 0.1}>
                <div className="group border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] rounded-3xl p-8 h-full flex flex-col transition-all duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#eca8d6]">
                      {getIcon(supplier.category)}
                    </div>
                    <span className={`px-3 py-1 text-xs uppercase tracking-wider rounded-full border ${
                      supplier.status === 'Active' ? 'border-green-500/30 text-green-400 bg-green-500/10' : 'border-white/20 text-white/50'
                    }`}>
                      {supplier.status}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-display mb-2">{supplier.name}</h3>
                  <div className="text-white/50 text-sm mb-6">{supplier.location}</div>
                  
                  <div className="mt-auto space-y-3 pt-6 border-t border-white/10 text-sm text-white/70">
                    <div className="flex items-center justify-between">
                      <span className="text-white/40 uppercase tracking-wider text-xs">Category</span>
                      <span>{supplier.category}</span>
                    </div>
                    {supplier.details && (
                      <div className="flex items-center justify-between">
                        <span className="text-white/40 uppercase tracking-wider text-xs">Details</span>
                        <span>{supplier.details}</span>
                      </div>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
