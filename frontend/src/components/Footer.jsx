import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer = () => {
  const { navigateTo } = useApp();

  return (
    <footer className="w-full pt-20 pb-24 md:pb-12 bg-surface-container-lowest border-t border-glass-border mt-auto">
      <div className="flex flex-col items-center gap-8 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
        <button 
          onClick={() => navigateTo('home')} 
          className="font-display-lg text-headline-sm text-primary tracking-widest uppercase hover:opacity-90 transition-opacity"
        >
          ROHM ETERNAL
        </button>
        
        <p className="font-body-md text-sm text-on-surface-variant max-w-md">
          Cinematic dark luxury & timeless craftsmanship. Handcrafted in Paris & Geneva.
        </p>

        <div className="flex flex-wrap justify-center gap-8 my-4">
          <button onClick={() => navigateTo('about')} className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors">About Maison</button>
          <button onClick={() => navigateTo('shop')} className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors">High Jewelry</button>
          <button onClick={() => navigateTo('faq')} className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors">Shipping & Returns</button>
          <button onClick={() => navigateTo('contact')} className="font-body-md text-sm text-on-surface-variant hover:text-primary transition-colors">Private Concierge</button>
        </div>

        <div className="w-12 h-[1px] bg-primary/40"></div>

        <div className="font-body-md text-xs text-on-surface-variant opacity-60">
          © 2026 ROHM ETERNAL. ALL RIGHTS RESERVED.
        </div>
      </div>
    </footer>
  );
};
