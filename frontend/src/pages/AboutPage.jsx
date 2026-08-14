import React from 'react';
import { useApp } from '../context/AppContext';

export const AboutPage = () => {
  const { navigateTo } = useApp();

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-[100px] md:pb-24 animate-fadeIn space-y-24">
      {/* Hero Story Banner */}
      <div className="text-center max-w-3xl mx-auto flex flex-col items-center">
        <span className="font-label-caps text-xs text-primary uppercase tracking-widest mb-3">Est. 1924 • Paris & Geneva</span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-6 leading-tight">The Maison ROHM ETERNAL</h1>
        <div className="w-16 h-[1px] bg-primary mb-6"></div>
        <p className="font-body-lg text-on-surface-variant font-light leading-relaxed">
          For over a century, ROHM ETERNAL has stood at the intersection of dark architectural minimalism and the unyielding brilliance of rare gemstones.
        </p>
      </div>

      {/* Grid Story 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-glass-border shadow-2xl">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAoC5XjWsTuneb5J2xudMAtC_C5cPB3jgypqFpu6GIAdzzX8Bg2CyN6sFTfPtpCnh7-RmFnLB5HaoHh6IHZLJNhtv8Oqwo5Zad4Yv8U5RVHgiviTIqpvyYauLaJ7GsbmJGbmQyh2H_82i476_QH0m8xfHciCirq96a7MS4wPTzsUu3GPvqLUBjrExZe3wbg2zpunMHvHgg16dGTWRXJtaS_PcZlXE8zkGFELn34SM3UPYq_bfF2hIdz" 
            alt="Master Goldsmith at Work" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="font-headline-md text-2xl md:text-3xl text-primary">Craftsmanship & Stealth Luxury</h2>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            We believe that true luxury does not shout; it resonates quietly. Every solitaire diamond and gold link is individually forged, hand-carved, and calibrated by master jewelers who pass down secrets across generations.
          </p>
          <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
            Using recycled 18k gold and conflict-free diamonds certified by international gemological authorities, our creations are built to endure for eternity.
          </p>
        </div>
      </div>

      {/* Manifesto Callout */}
      <div className="glass-panel p-12 rounded-md text-center max-w-4xl mx-auto space-y-6 border border-primary/30 gold-glow">
        <h3 className="font-headline-sm text-2xl text-primary">"Light is born only from the profoundness of shadow."</h3>
        <p className="font-body-md text-xs text-on-surface-variant uppercase tracking-[0.2em]">ROHM ETERNAL Atelier Manifesto</p>
        <button 
          onClick={() => navigateTo('shop')}
          className="bg-primary text-on-primary font-interactive text-xs py-3.5 px-8 uppercase tracking-widest hover:scale-[1.02] transition-transform mt-4"
        >
          Discover The Collection
        </button>
      </div>
    </div>
  );
};
