import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const Header = () => {
  const { currentPage, navigateTo, cartCount, wishlist, setIsCartOpen } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Collection' },
    { id: 'about', label: 'Maison' },
    { id: 'contact', label: 'Concierge' },
    { id: 'faq', label: 'FAQ' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-charcoal-surface/80 backdrop-blur-xl border-b border-glass-border shadow-[0_4px_30px_rgba(212,175,55,0.05)] transition-all duration-300">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20 max-w-container-max mx-auto">
        {/* Menu Toggle / Mobile Drawer Icon */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-off-white-text hover:text-primary transition-colors duration-300 active:scale-95 flex items-center justify-center p-2"
          aria-label="Toggle navigation menu"
        >
          <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
        </button>

        {/* Desktop Links Left */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.slice(0, 3).map((link) => (
            <button
              key={link.id}
              onClick={() => navigateTo(link.id)}
              className={`font-interactive text-xs uppercase tracking-[0.2em] transition-colors relative py-1 ${
                currentPage === link.id ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
              {currentPage === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary"></span>
              )}
            </button>
          ))}
        </nav>

        {/* Brand Logo Header */}
        <button 
          onClick={() => navigateTo('home')}
          className="font-display-lg text-headline-md tracking-widest text-primary uppercase text-center cursor-pointer hover:opacity-90 transition-opacity"
        >
          ROHM ETERNAL
        </button>

        {/* Desktop Links Right + Action Buttons */}
        <div className="flex items-center gap-4 md:gap-6">
          <nav className="hidden lg:flex items-center gap-8 mr-4">
            {navLinks.slice(3).map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className={`font-interactive text-xs uppercase tracking-[0.2em] transition-colors relative py-1 ${
                  currentPage === link.id ? 'text-primary' : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
                {currentPage === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Wishlist Icon */}
          <button
            onClick={() => navigateTo('wishlist')}
            className="relative text-off-white-text hover:text-primary transition-colors duration-300 p-2 hidden sm:block"
            title="View Wishlist"
          >
            <span className="material-symbols-outlined">favorite</span>
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-on-primary font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Account Icon */}
          <button
            onClick={() => navigateTo('account')}
            className="text-off-white-text hover:text-primary transition-colors duration-300 p-2 hidden sm:block"
            title="My Account"
          >
            <span className="material-symbols-outlined">person</span>
          </button>

          {/* Shopping Bag Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-off-white-text hover:text-primary transition-colors duration-300 active:scale-95 flex items-center justify-center p-2"
            title="Open Shopping Bag"
          >
            <span className="material-symbols-outlined">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 bg-primary text-on-primary font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Slideout Overlay Navigation Menu */}
      {isMenuOpen && (
        <div className="bg-surface-container-lowest/95 backdrop-blur-2xl border-b border-glass-border py-8 px-margin-mobile md:px-margin-desktop shadow-2xl animate-fadeIn">
          <div className="max-w-container-max mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <h4 className="font-label-caps text-xs tracking-widest text-primary uppercase mb-2">Explore Atelier</h4>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    navigateTo(link.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left font-headline-sm text-lg transition-colors ${
                    currentPage === link.id ? 'text-primary' : 'text-on-surface hover:text-primary'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-4">
              <h4 className="font-label-caps text-xs tracking-widest text-primary uppercase mb-2">Client Services</h4>
              <button onClick={() => { navigateTo('cart'); setIsMenuOpen(false); }} className="text-left font-body-md text-on-surface-variant hover:text-primary transition-colors">
                Shopping Bag ({cartCount})
              </button>
              <button onClick={() => { navigateTo('wishlist'); setIsMenuOpen(false); }} className="text-left font-body-md text-on-surface-variant hover:text-primary transition-colors">
                Wishlist ({wishlist.length})
              </button>
              <button onClick={() => { navigateTo('account'); setIsMenuOpen(false); }} className="text-left font-body-md text-on-surface-variant hover:text-primary transition-colors">
                Private Account
              </button>
              <button onClick={() => { navigateTo('checkout'); setIsMenuOpen(false); }} className="text-left font-body-md text-on-surface-variant hover:text-primary transition-colors">
                Vault Checkout
              </button>
            </div>

            <div className="glass-panel p-6 rounded-md flex flex-col justify-between">
              <div>
                <h4 className="font-headline-sm text-base text-primary mb-2">Bespoke Concierge</h4>
                <p className="font-body-md text-xs text-on-surface-variant mb-4">
                  Schedule a private video appointment or visit our high jewelry salon.
                </p>
              </div>
              <button 
                onClick={() => { navigateTo('contact'); setIsMenuOpen(false); }}
                className="bg-primary text-on-primary font-interactive text-xs py-3 px-6 uppercase tracking-widest hover:scale-[1.02] transition-transform text-center"
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
