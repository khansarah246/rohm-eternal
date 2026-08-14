import React, { useState } from 'react';
import { useAdminAuth } from './AdminAuthContext';
import { useApp } from '../context/AppContext';

export const AdminLayout = ({ activeSection, setActiveSection, children }) => {
  const { adminUser, logout } = useAdminAuth();
  const { navigateTo } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'Overview', icon: 'dashboard' },
    { id: 'products', label: 'Products Catalog', icon: 'diamond' },
    { id: 'categories', label: 'Categories', icon: 'category' },
    { id: 'collections', label: 'Collections', icon: 'collections' },
    { id: 'hero', label: 'Hero Banner', icon: 'view_carousel' },
    { id: 'homepage', label: 'Homepage Layout', icon: 'web' },
    { id: 'faq', label: 'FAQ Advisory', icon: 'quiz' },
    { id: 'testimonials', label: 'Testimonials', icon: 'rate_review' },
    { id: 'navigation', label: 'Header Navigation', icon: 'menu' },
    { id: 'footer', label: 'Footer Content', icon: 'bottom_sheets' },
    { id: 'about', label: 'Maison / About', icon: 'auto_stories' },
    { id: 'policies', label: 'Public Policies', icon: 'gavel' },
    { id: 'orders', label: 'Vault Orders', icon: 'receipt_long' },
    { id: 'inquiries', label: 'Concierge Messages', icon: 'mail' },
    { id: 'settings', label: 'Site Settings', icon: 'settings' },
    { id: 'media', label: 'Media Library', icon: 'photo_library' },
  ];

  return (
    <div className="min-h-screen bg-background text-on-surface flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-charcoal-surface border-r border-glass-border flex flex-col justify-between shrink-0">
        <div>
          {/* Admin Header */}
          <div className="p-6 border-b border-glass-border flex items-center justify-between">
            <div>
              <h2 className="font-display-lg text-lg text-primary uppercase tracking-widest">ROHM ETERNAL</h2>
              <span className="font-label-caps text-[10px] text-on-surface-variant block">CMS & Atelier Control</span>
            </div>
            <button 
              onClick={() => navigateTo('home')} 
              className="text-on-surface-variant hover:text-primary transition-colors p-1"
              title="View Public Storefront"
            >
              <span className="material-symbols-outlined text-lg">open_in_new</span>
            </button>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-sm font-interactive text-xs transition-colors text-left ${
                  activeSection === item.id
                    ? 'bg-primary text-on-primary font-bold shadow-md'
                    : 'text-on-surface-variant hover:text-off-white-text hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-sm">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* User Info & Logout */}
        <div className="p-4 border-t border-glass-border bg-surface-container-lowest flex items-center justify-between">
          <div className="text-xs font-interactive">
            <p className="text-off-white-text font-semibold">{adminUser?.name || 'Administrator'}</p>
            <p className="text-on-surface-variant text-[10px]">{adminUser?.role || 'Master Goldsmith'}</p>
          </div>
          <button
            onClick={logout}
            className="text-on-surface-variant hover:text-error transition-colors p-2"
            title="Sign Out Admin"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8">
        {children}
      </main>
    </div>
  );
};
