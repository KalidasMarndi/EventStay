import React, { useEffect, useState } from "react";
import { TravelService, travelApi } from "@/services/travelApi";
import { Plane, MapPin, FileText, CheckCircle2, ShieldAlert } from "lucide-react";

export function TravelServicesSection({ eventSlug }: { eventSlug: string }) {
  const [services, setServices] = useState<TravelService[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await travelApi.getPublicServices(eventSlug);
        setServices(data);
      } catch (error) {
        console.error("Failed to load public travel services", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [eventSlug]);

  if (loading || services.length === 0) return null;

  const getIcon = (type: string) => {
    switch(type) {
      case 'FLIGHT': return <Plane className="w-6 h-6" />;
      case 'TRANSFER': return <MapPin className="w-6 h-6" />;
      case 'VISA': return <FileText className="w-6 h-6" />;
      case 'AIRPORT_VIP': return <CheckCircle2 className="w-6 h-6" />;
      default: return <ShieldAlert className="w-6 h-6" />;
    }
  };

  return (
    <section id="travel" className="py-24 px-6 lg:px-12 bg-[#050505] text-white border-t border-white/5">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:w-2/3">
          <h2 className="text-4xl md:text-5xl font-display mb-6">Travel & Services</h2>
          <p className="text-xl text-white/60 font-light">
            Elevate your journey with our curated selection of premium travel extensions and exclusive concierge services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="group relative bg-[#111] border border-white/10 rounded-3xl overflow-hidden hover:border-white/30 transition-all duration-500 flex flex-col">
              <div className="p-8 flex-1">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500">
                  {getIcon(service.type)}
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#eca8d6] block mb-2">
                  {service.type.replace('_', ' ')}
                </span>
                <h3 className="text-2xl font-display mb-4">{service.name}</h3>
                <p className="text-white/60 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>
              
              <div className="p-8 pt-0 mt-auto border-t border-white/10 flex items-center justify-between">
                <div>
                  {service.price ? (
                    <span className="text-lg font-medium">₹{service.price.toLocaleString('en-IN')}</span>
                  ) : (
                    <span className="text-white/50 text-sm">Included / Informational</span>
                  )}
                </div>
                <button className="text-xs uppercase tracking-widest font-medium group-hover:text-[#eca8d6] transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
