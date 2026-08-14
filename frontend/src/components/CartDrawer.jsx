import React from 'react';
import { useApp } from '../context/AppContext';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cart, removeFromCart, updateCartQuantity, cartSubtotal, navigateTo } = useApp();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-charcoal-surface border-l border-glass-border shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-glass-border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary">shopping_bag</span>
              <h2 className="font-headline-sm text-lg text-primary uppercase tracking-wider">Your Shopping Bag</h2>
            </div>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-on-surface-variant hover:text-primary transition-colors p-2"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center gap-4">
                <span className="material-symbols-outlined text-4xl text-on-surface-variant/40">diamond</span>
                <p className="font-body-md text-on-surface-variant">Your shopping bag is empty.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('shop');
                  }}
                  className="bg-primary text-on-primary font-interactive text-xs py-3 px-6 uppercase tracking-widest mt-2 hover:scale-[1.02] transition-transform"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={`${item.id}-${item.size}`} className="glass-panel p-4 rounded-sm flex gap-4 items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-sm bg-background" />
                  <div className="flex-1">
                    <h3 className="font-headline-sm text-sm text-on-surface">{item.name}</h3>
                    <p className="font-body-md text-xs text-on-surface-variant mb-2">{item.metal} {item.size && `• Size ${item.size}`}</p>
                    <span className="font-interactive text-sm text-primary tracking-wider">${item.price.toLocaleString()}</span>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-glass-border rounded-sm bg-background">
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.size, -1)}
                          className="px-2 py-1 text-on-surface-variant hover:text-primary"
                        >
                          -
                        </button>
                        <span className="px-3 font-interactive text-xs">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, item.size, 1)}
                          className="px-2 py-1 text-on-surface-variant hover:text-primary"
                        >
                          +
                        </button>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-on-surface-variant hover:text-error text-xs ml-auto transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-glass-border bg-surface-container-lowest space-y-4">
              <div className="flex justify-between items-center text-sm font-body-md">
                <span className="text-on-surface-variant">Subtotal</span>
                <span className="font-interactive text-lg text-primary tracking-widest">${cartSubtotal.toLocaleString()}</span>
              </div>
              <p className="font-body-md text-[11px] text-on-surface-variant/60">Complimentary armored courier shipping & insured delivery.</p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('cart');
                  }}
                  className="bg-transparent border border-glass-border text-off-white-text font-interactive text-xs py-3 uppercase tracking-widest hover:border-primary hover:text-primary transition-colors text-center"
                >
                  View Cart
                </button>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigateTo('checkout');
                  }}
                  className="bg-primary text-on-primary font-interactive text-xs py-3 uppercase tracking-widest hover:scale-[1.02] transition-transform text-center"
                >
                  Vault Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
