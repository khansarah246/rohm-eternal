import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';

export const FaqPage = () => {
  const { navigateTo } = useApp();
  const [categories, setCategories] = useState([]);
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    fetch('/api/faq')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => {
        // Fallback default
        setCategories([
          {
            category: "Authentication & Craftsmanship",
            faqs: [
              { q: "Are ROHM ETERNAL diamonds ethically sourced?", a: "Every diamond in our atelier undergoes strict Conflict-Free certification following the Kimberley Process, handcrafted exclusively in 18k recycled gold and platinum." },
              { q: "Do items come with GIA certifications?", a: "All solitaires over 0.50 carats are accompanied by individual GIA or IGI digital & physical certificates detailing cut, clarity, color, and carat weight." }
            ]
          },
          {
            category: "Insured Shipping & Returns",
            faqs: [
              { q: "How is high jewelry shipped securely?", a: "All orders ship via armored courier (Brink's / FedEx Priority Overnight Vault Service) fully insured from our vault to your door, requiring biometric signature upon delivery." },
              { q: "What is your return policy?", a: "We accept complimentary returns and size adjustments within 30 days of delivery in pristine, unworn condition with original security seals intact." }
            ]
          }
        ]);
      });
  }, []);

  const toggleItem = (catIdx, faqIdx) => {
    const key = `${catIdx}-${faqIdx}`;
    setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-[100px] md:pb-24 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-label-caps text-xs text-primary uppercase tracking-widest block mb-2">Client Advisory</span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-4">Frequently Asked Questions</h1>
        <p className="font-body-md text-sm text-on-surface-variant">
          Everything you need to know regarding authentication, bespoke commissions, vault shipping, and high jewelry care.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-12">
        {categories.map((catObj, cIdx) => (
          <div key={cIdx} className="space-y-4">
            <h2 className="font-headline-sm text-xl text-primary border-b border-glass-border pb-2">{catObj.category}</h2>
            
            <div className="space-y-3">
              {catObj.faqs.map((faq, fIdx) => {
                const isOpen = openItems[`${cIdx}-${fIdx}`];
                return (
                  <div key={fIdx} className="border border-glass-border rounded-sm overflow-hidden bg-charcoal-surface/50">
                    <button
                      onClick={() => toggleItem(cIdx, fIdx)}
                      className="w-full p-5 text-left flex justify-between items-center font-headline-sm text-base text-on-surface hover:text-primary transition-colors"
                    >
                      <span>{faq.q}</span>
                      <span className="material-symbols-outlined text-primary text-xl">
                        {isOpen ? 'remove' : 'add'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 bg-background border-t border-glass-border/40 font-body-md text-xs text-on-surface-variant leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        <div className="glass-panel p-8 rounded-md text-center border border-primary/30 mt-12">
          <h3 className="font-headline-sm text-lg text-on-surface mb-2">Have an Unanswered Question?</h3>
          <p className="font-body-md text-xs text-on-surface-variant mb-6">Our Senior Concierge specialists are available 24/7 for private consultation.</p>
          <button 
            onClick={() => navigateTo('contact')}
            className="bg-primary text-on-primary font-interactive text-xs py-3 px-6 uppercase tracking-widest"
          >
            Contact Concierge
          </button>
        </div>
      </div>
    </div>
  );
};
