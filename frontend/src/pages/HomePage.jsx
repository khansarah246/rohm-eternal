import React from 'react';
import { useApp } from '../context/AppContext';

export const HomePage = () => {
  const { navigateTo } = useApp();

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCleWc-9nJ8j9ofw_kfhlVwv-NGbuMfG9KOx6iLoC2w_AIqIczPHlhYpDwfph3gU3cNFCQKmhycj53qZDgjjKb0fAPh-gyezRoy3A_dYsdo4tsNAGCIxxY7e5alyjg4mZFhK8HXcMd-Jfr7P8B-wqW7P_INPrgiRz_rbMDJVqHEmIrLwS_sGn2DQ6joQZaR3TCqFHIEJ95UvPr29f2DEPGZAPEV5Y-tlEUUEBbnMTmTh_sw7Q3-dGWS')`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background"></div>
        </div>

        <div className="relative z-10 text-center px-margin-mobile flex flex-col items-center gap-8 max-w-4xl mx-auto">
          <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-primary tracking-widest leading-none drop-shadow-2xl">
            ETERNAL RADIANCE
          </h1>
          <p className="font-body-lg text-body-lg text-off-white-text/90 max-w-2xl font-light">
            Discover the new collection. A symphony of light, shadow, and immaculate craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-4 w-full sm:w-auto">
            <button 
              onClick={() => navigateTo('shop')}
              className="bg-primary text-on-primary font-interactive text-interactive px-8 py-4 uppercase tracking-widest hover:scale-[1.02] transition-transform duration-300 shadow-[0_10px_30px_rgba(212,175,55,0.25)]"
            >
              Explore Collection
            </button>
            <button 
              onClick={() => navigateTo('about')}
              className="bg-transparent border border-primary-container text-off-white-text font-interactive text-interactive px-8 py-4 uppercase tracking-widest hover:bg-primary-container/10 hover:scale-[1.02] transition-all duration-300"
            >
              The Maison
            </button>
          </div>
        </div>
      </section>

      {/* Featured Collections Section */}
      <section className="py-[120px] px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="flex flex-col items-center mb-16">
          <h2 className="font-headline-md text-headline-md text-primary mb-4">Featured Collections</h2>
          <div className="w-12 h-[1px] bg-primary"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
          {/* Card 1 */}
          <div 
            onClick={() => navigateTo('shop')}
            className="group relative overflow-hidden h-[550px] bg-charcoal-surface cursor-pointer rounded-sm border border-glass-border"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAoC5XjWsTuneb5J2xudMAtC_C5cPB3jgypqFpu6GIAdzzX8Bg2CyN6sFTfPtpCnh7-RmFnLB5HaoHh6IHZLJNhtv8Oqwo5Zad4Yv8U5RVHgiviTIqpvyYauLaJ7GsbmJGbmQyh2H_82i476_QH0m8xfHciCirq96a7MS4wPTzsUu3GPvqLUBjrExZe3wbg2zpunMHvHgg16dGTWRXJtaS_PcZlXE8zkGFELn34SM3UPYq_bfF2hIdz')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">The Solstice Series</h3>
              <div className="flex items-center text-off-white-text font-interactive text-interactive opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                <span>Discover</span>
                <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div 
            onClick={() => navigateTo('shop')}
            className="group relative overflow-hidden h-[550px] bg-charcoal-surface cursor-pointer rounded-sm border border-glass-border"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA581LNHELEQsJItoBMur2ozez64_oU6MmIV1r-hfPzsaaPWLD4kMszthhYyw1B7kjEQSXQ5ta79REPxwy4EcwrCK-93bxCHhBZFWOWNpmGdUm4VuG5Kt-KV9UD5jGRymCzWxruVurx6jogRncCOueruhVde5JFJWCl4I2NS2WCTiYdfA41aI_7seP0q32JPRkMBX0TtQumbcVL_hQU0CqXK31LqJ7NX_rXaPRcrXDeCzewywswQDwi')`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="font-headline-sm text-headline-sm text-primary mb-2">Heritage Timepieces</h3>
              <div className="flex items-center text-off-white-text font-interactive text-interactive opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                <span>Discover</span>
                <span className="material-symbols-outlined ml-2 text-sm">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Banner Section */}
      <section className="py-24 bg-surface-container-lowest border-y border-glass-border">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">diamond</span>
            <h3 className="font-headline-sm text-lg text-on-surface mb-2">Ethical Diamonds</h3>
            <p className="font-body-md text-xs text-on-surface-variant">100% Conflict-free GIA & IGI certified gemstones crafted in solid recycled metals.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">verified</span>
            <h3 className="font-headline-sm text-lg text-on-surface mb-2">Master Goldsmiths</h3>
            <p className="font-body-md text-xs text-on-surface-variant">Hand-sculpted in Paris and Geneva by heritage artisans with over 40 years experience.</p>
          </div>
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-4xl text-primary mb-4">lock</span>
            <h3 className="font-headline-sm text-lg text-on-surface mb-2">Vault Courier Shipping</h3>
            <p className="font-body-md text-xs text-on-surface-variant">Complimentary armored courier delivery with biometric hand-off authentication.</p>
          </div>
        </div>
      </section>
    </div>
  );
};
