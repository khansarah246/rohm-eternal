import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export const AccountPage = () => {
  const { navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('orders');

  const orders = [
    {
      id: "RE-891042",
      date: "2026-07-28",
      items: "Obsidian Solitaire Ring (18k Gold)",
      total: "$14,500",
      status: "Delivered via Vault Courier"
    },
    {
      id: "RE-412093",
      date: "2026-05-14",
      items: "Eclipse Pendant",
      total: "$8,200",
      status: "Insured Hand Delivery Complete"
    }
  ];

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-[100px] md:pb-24 animate-fadeIn">
      {/* Profile Header */}
      <div className="glass-panel p-8 rounded-md border border-glass-border flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary text-primary flex items-center justify-center font-display-lg text-2xl font-bold">
            E
          </div>
          <div>
            <h1 className="font-headline-sm text-2xl text-on-surface">Lady Eleanor Vane</h1>
            <p className="font-body-md text-xs text-on-surface-variant">ROHM ETERNAL Private Vault Member • Joined 2024</p>
          </div>
        </div>

        <button 
          onClick={() => navigateTo('contact')}
          className="bg-transparent border border-glass-border text-primary font-interactive text-xs py-2.5 px-6 uppercase tracking-widest hover:border-primary transition-colors"
        >
          Contact Private Concierge
        </button>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-4 border-b border-glass-border pb-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`font-interactive text-xs uppercase tracking-widest pb-2 transition-colors relative ${
            activeTab === 'orders' ? 'text-primary' : 'text-on-surface-variant hover:text-off-white-text'
          }`}
        >
          Vault Orders
          {activeTab === 'orders' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary"></span>}
        </button>

        <button
          onClick={() => setActiveTab('appointments')}
          className={`font-interactive text-xs uppercase tracking-widest pb-2 transition-colors relative ${
            activeTab === 'appointments' ? 'text-primary' : 'text-on-surface-variant hover:text-off-white-text'
          }`}
        >
          Salon Appointments
          {activeTab === 'appointments' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary"></span>}
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`font-interactive text-xs uppercase tracking-widest pb-2 transition-colors relative ${
            activeTab === 'addresses' ? 'text-primary' : 'text-on-surface-variant hover:text-off-white-text'
          }`}
        >
          Saved Vault Addresses
          {activeTab === 'addresses' && <span className="absolute bottom-0 left-0 w-full h-[1px] bg-primary"></span>}
        </button>
      </div>

      {/* Tab 1: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.map((ord) => (
            <div key={ord.id} className="glass-panel p-6 rounded-md border border-glass-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-headline-sm text-base text-primary">{ord.id}</span>
                  <span className="bg-primary/20 text-primary text-[10px] font-interactive px-2 py-0.5 rounded-sm uppercase tracking-wider">{ord.status}</span>
                </div>
                <p className="font-body-md text-xs text-on-surface mb-1">{ord.items}</p>
                <p className="font-body-md text-[11px] text-on-surface-variant">Placed on {ord.date}</p>
              </div>

              <div className="text-left md:text-right">
                <span className="font-interactive text-lg text-primary tracking-widest block">{ord.total}</span>
                <button onClick={() => navigateTo('shop')} className="font-interactive text-[11px] text-on-surface-variant hover:text-primary transition-colors">
                  View Authentication Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Appointments */}
      {activeTab === 'appointments' && (
        <div className="glass-panel p-8 rounded-md border border-glass-border text-center space-y-4 max-w-xl mx-auto">
          <span className="material-symbols-outlined text-4xl text-primary">calendar_month</span>
          <h3 className="font-headline-sm text-xl text-on-surface">Paris Salon Viewing</h3>
          <p className="font-body-md text-xs text-on-surface-variant">
            Scheduled for August 18, 2026 at 15:00 CET • 14 Place Vendôme, Paris.
          </p>
          <button onClick={() => navigateTo('contact')} className="bg-primary text-on-primary font-interactive text-xs py-3 px-6 uppercase tracking-widest">
            Reschedule Viewing
          </button>
        </div>
      )}

      {/* Tab 3: Addresses */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 rounded-md border border-glass-border space-y-2">
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest block mb-1">Primary Residence</span>
            <p className="font-body-md text-xs text-off-white-text">Lady Eleanor Vane</p>
            <p className="font-body-md text-xs text-on-surface-variant">24 Avenue Montaigne</p>
            <p className="font-body-md text-xs text-on-surface-variant">75008 Paris, France</p>
          </div>
        </div>
      )}
    </div>
  );
};
