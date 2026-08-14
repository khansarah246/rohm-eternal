import React, { useState, useEffect } from 'react';
import { useAdminAuth } from './AdminAuthContext';

export const AdminGenericCMS = ({ type, title, subtitle }) => {
  const { authHeaders } = useAdminAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const endpointMap = {
    faq: '/api/faq',
    testimonials: '/api/testimonials',
    navigation: '/api/navigation',
    footer: '/api/footer',
    about: '/api/about',
    policies: '/api/policies',
    settings: '/api/site-settings',
    media: '/api/admin/media'
  };

  const loadData = () => {
    const url = endpointMap[type] || '/api/site-settings';
    fetch(url, { headers: authHeaders })
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [type]);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/admin/site-settings', {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify(data.settings || data)
      });
      if (res.ok) {
        setMessage('Settings saved successfully!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch(e){}
  };

  if (loading) return <div className="text-on-surface-variant">Loading CMS data...</div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="font-display-lg text-2xl text-on-surface">{title}</h1>
        <p className="font-body-md text-xs text-on-surface-variant">{subtitle}</p>
      </div>

      {message && <div className="bg-primary/20 border border-primary text-primary p-3 rounded-sm text-xs font-interactive">{message}</div>}

      {type === 'settings' && (
        <form onSubmit={handleSaveSettings} className="glass-panel p-6 rounded-md border border-glass-border space-y-4 font-interactive text-xs max-w-2xl">
          <div>
            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Brand Name</label>
            <input type="text" value={data?.settings?.brandName || 'ROHM ETERNAL'} onChange={e => setData({ ...data, settings: { ...data.settings, brandName: e.target.value } })} className="w-full bg-background border border-glass-border p-3 text-off-white-text focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Tagline</label>
            <input type="text" value={data?.settings?.tagline || 'Obsidian & Gold Eternal High Jewelry'} onChange={e => setData({ ...data, settings: { ...data.settings, tagline: e.target.value } })} className="w-full bg-background border border-glass-border p-3 text-off-white-text focus:border-primary focus:outline-none" />
          </div>
          <div>
            <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Support Email</label>
            <input type="email" value={data?.settings?.supportEmail || 'concierge@rohm-eternal.com'} onChange={e => setData({ ...data, settings: { ...data.settings, supportEmail: e.target.value } })} className="w-full bg-background border border-glass-border p-3 text-off-white-text focus:border-primary focus:outline-none" />
          </div>
          <button type="submit" className="bg-primary text-on-primary font-bold py-3 px-8 uppercase tracking-widest">Save Site Settings</button>
        </form>
      )}

      {type !== 'settings' && (
        <div className="glass-panel p-6 rounded-md border border-glass-border space-y-4">
          <h3 className="font-headline-sm text-lg text-primary">Content Data JSON View & Management</h3>
          <pre className="bg-background p-4 rounded-sm text-off-white-text font-mono text-xs overflow-x-auto max-h-96 border border-glass-border">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
