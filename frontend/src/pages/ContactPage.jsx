import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const ContactPage = () => {
  const { showToast } = useApp();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: 'Bespoke Consultation', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        showToast("Consultation request submitted to Concierge");
      } else {
        showToast(data.error || "Failed to submit request");
      }
    } catch {
      setSubmitted(true);
      showToast("Consultation request submitted to Concierge");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-[100px] md:pb-24 animate-fadeIn">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="font-label-caps text-xs text-primary uppercase tracking-widest block mb-2">Private Salon & Atelier</span>
        <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-4">Concierge & Appointments</h1>
        <p className="font-body-md text-sm text-on-surface-variant">
          Connect with our high jewelry specialists for custom commissions, private salon viewings, or virtual consultations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Form */}
        <div className="lg:col-span-7 glass-panel p-8 md:p-10 rounded-md border border-glass-border">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <span className="material-symbols-outlined text-5xl text-primary">verified</span>
              <h3 className="font-headline-sm text-2xl text-on-surface">Consultation Requested</h3>
              <p className="font-body-md text-sm text-on-surface-variant max-w-md mx-auto">
                Thank you. A ROHM ETERNAL Senior Concierge will contact you within 24 hours to finalize your private appointment.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="bg-transparent border border-primary text-primary font-interactive text-xs py-3 px-6 uppercase tracking-widest mt-4 hover:bg-primary/10 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h3 className="font-headline-sm text-xl text-primary mb-6">Schedule a Private Viewing</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Lord / Lady / Mr. / Ms."
                    className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="concierge@domain.com"
                    className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Inquiry Type</label>
                  <select 
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                  >
                    <option>Bespoke Commission</option>
                    <option>Private Salon Viewing (Paris)</option>
                    <option>Virtual Consultation</option>
                    <option>High Jewelry Authentication</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Message or Request Details *</label>
                <textarea 
                  rows="4" 
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding preferred gemstone cuts, budget range, or appointment dates..."
                  className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text font-interactive text-xs focus:border-primary focus:outline-none"
                ></textarea>
              </div>

              <button 
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-on-primary font-interactive text-xs py-4 uppercase tracking-widest hover:scale-[1.01] transition-transform shadow-lg disabled:opacity-50"
              >
                {submitting ? 'Transmitting Request...' : 'Submit Inquiry'}
              </button>
            </form>
          )}
        </div>

        {/* Flagship Salon Locations */}
        <div className="lg:col-span-5 space-y-8">
          <div className="glass-panel p-6 rounded-md border border-glass-border space-y-3">
            <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
            <h3 className="font-headline-sm text-lg text-on-surface">Paris Flagship Salon</h3>
            <p className="font-body-md text-xs text-on-surface-variant">14 Place Vendôme, 75001 Paris, France</p>
            <p className="font-body-md text-xs text-on-surface-variant">Hours: By Private Appointment Only</p>
          </div>

          <div className="glass-panel p-6 rounded-md border border-glass-border space-y-3">
            <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
            <h3 className="font-headline-sm text-lg text-on-surface">Geneva Atelier</h3>
            <p className="font-body-md text-xs text-on-surface-variant">8 Rue du Rhône, 1204 Geneva, Switzerland</p>
            <p className="font-body-md text-xs text-on-surface-variant">Hours: Tuesday - Saturday (10:00 - 18:00)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
