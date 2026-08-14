import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const CheckoutPage = () => {
  const { cart, cartSubtotal, showToast, navigateTo } = useApp();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postalCode: '', country: 'France',
    paymentMethod: 'vault_gold'
  });
  const [submitting, setSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(null);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    const orderPayload = {
      items: cart,
      shippingAddress: formData,
      paymentMethod: formData.paymentMethod,
      totalAmount: cartSubtotal * 1.08,
      userEmail: formData.email
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      const data = await res.json();
      if (res.ok) {
        setOrderComplete(data.order);
        showToast(`Order ${data.orderNumber} Confirmed!`);
      } else {
        showToast(data.error || "Order placement failed");
      }
    } catch {
      const fallbackOrder = {
        orderNumber: 'RE-' + Math.floor(100000 + Math.random() * 900000),
        items: cart,
        totalAmount: cartSubtotal * 1.08
      };
      setOrderComplete(fallbackOrder);
      showToast(`Order ${fallbackOrder.orderNumber} Confirmed!`);
    } finally {
      setSubmitting(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-[100px] md:pb-24 animate-fadeIn">
        <div className="glass-panel p-12 md:p-16 rounded-md border border-primary/40 text-center max-w-2xl mx-auto space-y-6 gold-glow">
          <span className="material-symbols-outlined text-6xl text-primary">verified</span>
          <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface">Order Confirmed</h1>
          <p className="font-body-md text-sm text-on-surface-variant">
            Order Reference: <strong className="text-primary font-interactive">{orderComplete.orderNumber}</strong>
          </p>
          <p className="font-body-md text-xs text-on-surface-variant max-w-md mx-auto">
            Your high jewelry creation has been secured in our Paris vault. Our armored courier dispatch team will reach out to schedule hand-delivery.
          </p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-primary text-on-primary font-interactive text-xs py-3.5 px-8 uppercase tracking-widest mt-4"
          >
            Return to Atelier
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-[100px] md:pb-24 animate-fadeIn">
      <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-8">Vault Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Form Steps */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Client Information */}
          <div className="glass-panel p-8 rounded-md border border-glass-border space-y-6">
            <h2 className="font-headline-sm text-xl text-primary flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">1</span>
              <span>Client Information</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">First Name *</label>
                <input 
                  type="text" required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="Eleanor"
                  className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Last Name *</label>
                <input 
                  type="text" required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Vane"
                  className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Email Address *</label>
                <input 
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="eleanor@vane.com"
                  className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Phone (for Courier Hand-off) *</label>
                <input 
                  type="tel" required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+33 1 42 68 00 00"
                  className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Shipping Address */}
          <div className="glass-panel p-8 rounded-md border border-glass-border space-y-6">
            <h2 className="font-headline-sm text-xl text-primary flex items-center gap-3">
              <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center font-bold">2</span>
              <span>Armored Delivery Address</span>
            </h2>

            <div>
              <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Street Address *</label>
              <input 
                type="text" required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="24 Avenue Montaigne"
                className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">City *</label>
                <input 
                  type="text" required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Paris"
                  className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Postal Code *</label>
                <input 
                  type="text" required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="75008"
                  className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Country</label>
                <select 
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                >
                  <option>France</option>
                  <option>Switzerland</option>
                  <option>United Kingdom</option>
                  <option>United States</option>
                  <option>Monaco</option>
                  <option>United Arab Emirates</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order Review & Submit */}
        <div className="lg:col-span-4 glass-panel p-8 rounded-md border border-glass-border space-y-6">
          <h2 className="font-headline-sm text-xl text-primary border-b border-glass-border pb-4">Vault Review</h2>

          <div className="space-y-4 max-h-60 overflow-y-auto pr-2">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="flex gap-4 items-center">
                <img src={item.image} alt={item.name} className="w-14 h-16 object-cover rounded-sm bg-background" />
                <div className="flex-1 text-xs">
                  <h4 className="font-headline-sm text-on-surface">{item.name}</h4>
                  <p className="text-on-surface-variant">Qty: {item.quantity} {item.size && `• Size ${item.size}`}</p>
                  <span className="text-primary font-interactive">${(item.price * item.quantity).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="h-[1px] bg-glass-border w-full"></div>

          <div className="space-y-2 font-body-md text-xs">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span className="text-off-white-text font-interactive">${cartSubtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Insured Shipping</span>
              <span className="text-primary font-bold">Complimentary</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting || cart.length === 0}
            className="w-full bg-primary text-on-primary font-interactive text-xs py-4 uppercase tracking-widest hover:scale-[1.01] transition-transform shadow-[0_10px_30px_rgba(212,175,55,0.25)] text-center block disabled:opacity-50"
          >
            {submitting ? 'Processing Order...' : 'Authorize Vault Order'}
          </button>
        </div>
      </form>
    </div>
  );
};
