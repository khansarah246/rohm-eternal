import React from 'react';
import { useApp } from '../context/AppContext';

export const MobileNav = () => {
  const { currentPage, navigateTo, cartCount, wishlist, setIsCartOpen } = useApp();

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center py-3 px-4 bg-charcoal-surface/90 backdrop-blur-2xl border-t border-glass-border shadow-[0_-4px_20px_rgba(0,0,0,0.5)] z-50 rounded-t-xl md:hidden">
      <button 
        onClick={() => navigateTo('home')}
        className={`flex flex-col items-center justify-center transition-all ${
          currentPage === 'home' ? 'text-primary font-bold scale-105' : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined mb-1" style={currentPage === 'home' ? { fontVariationSettings: "'FILL' 1" } : {}}>home</span>
        <span className="font-label-caps text-[10px]">Home</span>
      </button>

      <button 
        onClick={() => navigateTo('shop')}
        className={`flex flex-col items-center justify-center transition-all ${
          currentPage === 'shop' ? 'text-primary font-bold scale-105' : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined mb-1" style={currentPage === 'shop' ? { fontVariationSettings: "'FILL' 1" } : {}}>diamond</span>
        <span className="font-label-caps text-[10px]">Shop</span>
      </button>

      <button 
        onClick={() => navigateTo('wishlist')}
        className={`flex flex-col items-center justify-center relative transition-all ${
          currentPage === 'wishlist' ? 'text-primary font-bold scale-105' : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined mb-1" style={currentPage === 'wishlist' ? { fontVariationSettings: "'FILL' 1" } : {}}>favorite</span>
        <span className="font-label-caps text-[10px]">Wishlist</span>
        {wishlist.length > 0 && (
          <span className="absolute -top-1 right-2 bg-primary text-on-primary text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </button>

      <button 
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center justify-center relative text-on-surface-variant hover:text-primary active:scale-90 transition-all"
      >
        <span className="material-symbols-outlined mb-1">shopping_bag</span>
        <span className="font-label-caps text-[10px]">Bag</span>
        {cartCount > 0 && (
          <span className="absolute -top-1 right-1 bg-primary text-on-primary text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <button 
        onClick={() => navigateTo('account')}
        className={`flex flex-col items-center justify-center transition-all ${
          currentPage === 'account' ? 'text-primary font-bold scale-105' : 'text-on-surface-variant hover:text-primary'
        }`}
      >
        <span className="material-symbols-outlined mb-1" style={currentPage === 'account' ? { fontVariationSettings: "'FILL' 1" } : {}}>person</span>
        <span className="font-label-caps text-[10px]">Account</span>
      </button>
    </nav>
  );
};
