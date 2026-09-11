'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { travelServicesMosaic, TravelServiceMosaic, SlideDirection } from '@/data/travelServicesMosaic';

function DiamondCard({ 
  service, 
  desktopPosition, 
  isMobile 
}: { 
  service: TravelServiceMosaic; 
  desktopPosition: string; 
  isMobile: boolean; 
}) {
  const [isRevealed, setIsRevealed] = useState(false);
  const Icon = service.icon;

  const getSlideClass = (direction: SlideDirection, active: boolean) => {
    if (!active) return 'translate-x-0 translate-y-0';
    switch (direction) {
      case 'up': return '-translate-y-[105%]';
      case 'down': return 'translate-y-[105%]';
      case 'left': return '-translate-x-[105%]';
      case 'right': return 'translate-x-[105%]';
      case 'diagonal-left': return '-translate-x-[105%] -translate-y-[105%]';
      case 'diagonal-right': return 'translate-x-[105%] translate-y-[105%]';
      default: return 'translate-y-[105%]';
    }
  };

  const handleInteraction = () => {
    if (isMobile) {
      setIsRevealed(!isRevealed);
    }
  };

  const contentSize = service.size === 'large' ? 'w-[360px] h-[360px]' : service.size === 'small' ? 'w-[200px] h-[200px]' : 'w-[280px] h-[280px]';
  const scale = service.size === 'large' ? 'scale-110' : service.size === 'small' ? 'scale-90' : 'scale-100';

  if (isMobile) {
    // Mobile View: Normal stacked cards (no diamonds to save space, or keep them rounded squares)
    return (
      <div 
        onClick={handleInteraction}
        className="relative w-full rounded-[32px] overflow-hidden bg-white shadow-sm border border-zinc-100 min-h-[300px] cursor-pointer group"
      >
        {/* Reveal Layer (Back) */}
        <div className="absolute inset-0 z-0 bg-zinc-900 text-white">
          <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
             <span className="text-[10px] text-amber-400 font-mono tracking-widest uppercase mb-2">{service.category}</span>
             <h4 className="font-display text-2xl mb-3">{service.title}</h4>
             <p className="text-sm text-white/80 mb-6 leading-relaxed">{service.extendedDescription}</p>
             <Link href={service.href} className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.1em] text-white hover:text-amber-400 transition-colors">
               {service.action} <ArrowUpRight className="w-4 h-4" />
             </Link>
          </div>
        </div>

        {/* Front Layer */}
        <div className={`absolute inset-0 z-10 bg-white p-8 flex flex-col justify-center items-center text-center transition-transform duration-700 ease-[0.25,0.1,0.25,1] ${isRevealed ? getSlideClass(service.revealDirection, true) : 'translate-x-0 translate-y-0'}`}>
           <div className="w-16 h-16 rounded-2xl bg-[#faf9f6] border border-zinc-100 flex items-center justify-center mb-6 text-amber-600 shadow-sm">
              <Icon className="w-8 h-8" />
           </div>
           <h3 className="font-display text-2xl text-zinc-900 mb-3">{service.title}</h3>
           <p className="text-sm text-zinc-500 mb-6 max-w-[200px] leading-relaxed">{service.shortDescription}</p>
           <span className="text-[10px] font-mono tracking-widest uppercase text-zinc-400">Tap to explore</span>
        </div>
      </div>
    );
  }

  // Desktop View: Diamond Mosaic
  return (
    <div 
      className={`absolute ${desktopPosition} ${scale} z-10 hover:z-50 group`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
    >
      <div className={`relative ${contentSize} rotate-45 overflow-hidden rounded-[40px] shadow-sm hover:shadow-2xl transition-shadow duration-500 bg-white border border-white/60`}>
        {/* Anti-rotate container for contents */}
        <div className="absolute inset-0 -rotate-45 scale-[1.42] flex items-center justify-center pointer-events-none">
          
          {/* Base Reveal Layer (Back) */}
          <div className="absolute inset-0 bg-zinc-900 text-white flex items-center justify-center p-12 text-center pointer-events-auto">
            <img src={service.image} alt={service.title} className={`absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ${isRevealed ? 'scale-110 opacity-50' : 'scale-100 opacity-0'}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80" />
            <div className={`relative z-10 transition-all duration-700 delay-100 ${isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
               <span className="text-[9px] text-amber-400 font-mono tracking-widest uppercase mb-3 block">{service.category}</span>
               <h4 className="font-display text-2xl mb-4">{service.title}</h4>
               <p className="text-xs text-white/80 mb-6 leading-relaxed max-w-[200px] mx-auto">{service.extendedDescription}</p>
               <Link href={service.href} className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.1em] text-white hover:text-amber-400 transition-colors">
                 {service.action} <ArrowUpRight className="w-3 h-3" />
               </Link>
            </div>
          </div>

          {/* Sliding Front Layer */}
          <div className={`absolute inset-0 bg-white border border-zinc-100/50 flex flex-col justify-center items-center text-center p-12 transition-transform duration-700 ease-[0.25,0.1,0.25,1] pointer-events-auto ${getSlideClass(service.revealDirection, isRevealed)}`}>
            <div className="w-16 h-16 rounded-2xl bg-[#faf9f6] border border-zinc-100 flex items-center justify-center mb-6 text-amber-600 shadow-sm transition-transform duration-500 group-hover:scale-110">
                <Icon className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl text-zinc-900 mb-3">{service.title}</h3>
            <p className="text-xs text-zinc-500 max-w-[180px] leading-relaxed mx-auto">{service.shortDescription}</p>
            <div className="mt-8 flex gap-1">
              <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
              <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
              <span className="w-1 h-1 rounded-full bg-zinc-200"></span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export function TravelServicesMosaicSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Hardcoded absolute positions to create the editorial collage look on large screens
  // Positions are percentages relative to the 1200x900 container
  const desktopPositions = [
    "top-[5%] left-[2%]",        // flight-support (medium)
    "top-[15%] left-[32%]",      // visa (medium)
    "top-[2%] left-[62%]",       // airport-vip (large)
    "top-[35%] left-[75%]",      // ground-transfers (medium)
    "top-[55%] left-[5%]",       // premium-stays (large)
    "top-[60%] left-[38%]",      // 24-7-support (medium)
    "top-[65%] left-[68%]",      // events (medium)
    "top-[38%] left-[20%]",      // event-inventory (medium, center-ish)
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white py-24 lg:py-32 border-t border-black/5">
      
      {/* ─── LIVE BACKGROUND VIDEO ─── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[60s] ease-linear scale-100 hover:scale-105 motion-reduce:transition-none"
        >
           <source src="/Videos/135145-761273495.mp4" type="video/mp4" />
        </video>
        
        {/* Soft Light Overlay -> Blur -> Translucent White Wash */}
        <div className="absolute inset-0 bg-transparent" />
        
        {/* Gradients to blend top/bottom seamlessly into the page */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-transparent to-white/90" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-tr from-amber-50/10 to-transparent" />
        
        {/* Subtle geometric lines */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] border border-amber-600/5 rounded-[100px] rotate-45"></div>
        <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] border border-amber-600/5 rounded-[80px] rotate-45"></div>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center max-w-3xl mx-auto">
          <span className="mb-4 inline-flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-amber-600 font-medium">
            PREMIUM TRAVEL SERVICES
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-7xl tracking-tight text-zinc-900 drop-shadow-sm leading-[1.05] mb-6">
            Everything You Need, <br />
            <span className="text-zinc-400 italic">We've Got You Covered</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-xl mx-auto">
            End-to-end travel solutions designed for groups, events, and unforgettable journeys. Hover over any service to explore our capabilities.
          </p>
        </div>

        {/* Mosaic / Grid */}
        <div className="relative w-full mx-auto max-w-[1200px]">
          {isMobile ? (
            <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
              {travelServicesMosaic.map((service, idx) => (
                <DiamondCard 
                  key={service.id} 
                  service={service} 
                  desktopPosition="" 
                  isMobile={true} 
                />
              ))}
            </div>
          ) : (
            <div className="relative w-full h-[1000px]">
              {travelServicesMosaic.map((service, idx) => (
                <DiamondCard 
                  key={service.id} 
                  service={service} 
                  desktopPosition={desktopPositions[idx]} 
                  isMobile={false} 
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
