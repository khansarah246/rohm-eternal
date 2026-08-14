import React from 'react';
import { useApp } from '../context/AppContext';

export const ShoppingCartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, cartSubtotal, navigateTo } = useApp();

  const estimatedTax = cartSubtotal * 0.08;
  const grandTotal = cartSubtotal + estimatedTax;

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-[100px] md:pb-24 animate-fadeIn">
      <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-8">Shopping Bag</h1>

      {cart.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-md border border-glass-border space-y-4 max-w-xl mx-auto">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/40">shopping_bag</span>
          <h2 className="font-headline-sm text-2xl text-on-surface">Your Bag is Empty</h2>
          <p className="font-body-md text-sm text-on-surface-variant">Explore our high jewelry collection and add pieces to your bag.</p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-primary text-on-primary font-interactive text-xs py-3.5 px-8 uppercase tracking-widest mt-4 inline-block"
          >
            Explore Collection
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="glass-panel p-6 rounded-md border border-glass-border flex flex-col sm:flex-row gap-6 items-center">
                <img src={item.image} alt={item.name} className="w-28 h-32 object-cover rounded-sm bg-background border border-glass-border/40" />
                
                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="font-headline-sm text-lg text-on-surface">{item.name}</h3>
                  <p className="font-body-md text-xs text-on-surface-variant">{item.metal} {item.size && `• Size ${item.size}`}</p>
                  <span className="font-interactive text-base text-primary tracking-widest block">${item.price.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-glass-border rounded-sm bg-background">
                    <button onClick={() => updateCartQuantity(item.id, item.size, -1)} className="px-3 py-1.5 text-on-surface-variant hover:text-primary font-bold">-</button>
                    <span className="px-4 font-interactive text-xs text-off-white-text">{item.quantity}</span>
                    <button onClick={() => updateCartQuantity(item.id, item.size, 1)} className="px-3 py-1.5 text-on-surface-variant hover:text-primary font-bold">+</button>
                  </div>
                  <button onClick={() => removeFromCart(item.id, item.size)} className="text-on-surface-variant hover:text-error transition-colors">
                    <span className="material-symbols-outlined text-xl">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Summary Box */}
          <div className="lg:col-span-4 glass-panel p-8 rounded-md border border-glass-border space-y-6">
            <h2 className="font-headline-sm text-xl text-primary border-b border-glass-border pb-4">Order Summary</h2>

            <div className="space-y-3 font-body-md text-xs">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span className="text-off-white-text font-interactive">${cartSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Armored Vault Express Shipping</span>
                <span className="text-primary font-interactive uppercase text-[10px] font-bold">Complimentary</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Estimated Taxes & Duties</span>
                <span className="text-off-white-text font-interactive">${estimatedTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <div className="h-[1px] bg-glass-border w-full"></div>

            <div className="flex justify-between items-center">
              <span className="font-headline-sm text-lg text-on-surface">Total</span>
              <span className="font-interactive text-xl text-primary tracking-widest">${grandTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              className="w-full bg-primary text-on-primary font-interactive text-xs py-4 uppercase tracking-widest hover:scale-[1.01] transition-transform shadow-[0_10px_30px_rgba(212,175,55,0.25)] text-center block"
            >
              Proceed to Vault Checkout
            </button>

            <p className="font-body-md text-[11px] text-center text-on-surface-variant/60">
              Biometric signature courier & full insurance coverage included.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
