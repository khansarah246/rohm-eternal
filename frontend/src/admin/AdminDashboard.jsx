import React, { useState, useEffect } from 'react';
import { useAdminAuth } from './AdminAuthContext';

export const AdminDashboard = ({ setActiveSection }) => {
  const { authHeaders } = useAdminAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch('/api/admin/stats', { headers: authHeaders })
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h1 className="font-display-lg text-3xl text-on-surface mb-2">Atelier Dashboard</h1>
        <p className="font-body-md text-sm text-on-surface-variant">Live metrics, catalog stats, and high jewelry concierge activity.</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-panel p-6 rounded-md border border-glass-border space-y-2">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest block">Total Products</span>
          <span className="font-display-lg text-4xl text-off-white-text">{stats?.totalProducts ?? 6}</span>
          <span className="font-body-md text-xs text-on-surface-variant block">{stats?.publishedProducts ?? 6} Published</span>
        </div>

        <div className="glass-panel p-6 rounded-md border border-glass-border space-y-2">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest block">Categories & Collections</span>
          <span className="font-display-lg text-4xl text-off-white-text">{(stats?.totalCategories ?? 5) + (stats?.totalCollections ?? 4)}</span>
          <span className="font-body-md text-xs text-on-surface-variant block">Master Jewelry Lines</span>
        </div>

        <div className="glass-panel p-6 rounded-md border border-glass-border space-y-2">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest block">Vault Orders</span>
          <span className="font-display-lg text-4xl text-off-white-text">{stats?.totalOrders ?? 2}</span>
          <span className="font-body-md text-xs text-on-surface-variant block">Insured Deliveries</span>
        </div>

        <div className="glass-panel p-6 rounded-md border border-glass-border space-y-2">
          <span className="font-label-caps text-xs text-primary uppercase tracking-widest block">Concierge Messages</span>
          <span className="font-display-lg text-4xl text-primary">{stats?.totalInquiries ?? 1}</span>
          <span className="font-body-md text-xs text-on-surface-variant block">{stats?.unreadInquiries ?? 1} Pending Inquiry</span>
        </div>
      </div>

      {/* Quick Actions Bar */}
      <div className="glass-panel p-8 rounded-md border border-glass-border space-y-4">
        <h2 className="font-headline-sm text-xl text-primary">Quick Management Actions</h2>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setActiveSection('products')}
            className="bg-primary text-on-primary font-interactive text-xs py-3 px-6 uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => setActiveSection('categories')}
            className="glass-panel text-off-white-text font-interactive text-xs py-3 px-6 uppercase tracking-widest hover:border-primary transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">category</span>
            <span>Manage Categories</span>
          </button>

          <button
            onClick={() => setActiveSection('hero')}
            className="glass-panel text-off-white-text font-interactive text-xs py-3 px-6 uppercase tracking-widest hover:border-primary transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">view_carousel</span>
            <span>Edit Hero Slides</span>
          </button>

          <button
            onClick={() => setActiveSection('orders')}
            className="glass-panel text-off-white-text font-interactive text-xs py-3 px-6 uppercase tracking-widest hover:border-primary transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">receipt_long</span>
            <span>Review Orders</span>
          </button>
        </div>
      </div>
    </div>
  );
};
