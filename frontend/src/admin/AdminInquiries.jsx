import React, { useState, useEffect } from 'react';
import { useAdminAuth } from './AdminAuthContext';

export const AdminInquiries = () => {
  const { authHeaders } = useAdminAuth();
  const [inquiries, setInquiries] = useState([]);

  const loadInquiries = () => {
    fetch('/api/admin/inquiries', { headers: authHeaders })
      .then(res => res.json())
      .then(data => setInquiries(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await fetch(`/api/admin/inquiries/${id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ status: 'read' })
      });
      loadInquiries();
    } catch(e){}
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="font-display-lg text-2xl text-on-surface">Concierge Inquiries & Salon Appointments</h1>
        <p className="font-body-md text-xs text-on-surface-variant">Review client consultations and private salon viewing requests.</p>
      </div>

      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="glass-panel p-8 text-center text-on-surface-variant rounded-md">No concierge messages received yet.</div>
        ) : (
          inquiries.map((inq) => (
            <div key={inq.id} className="glass-panel p-6 rounded-md border border-glass-border space-y-3">
              <div className="flex justify-between items-center border-b border-glass-border pb-2">
                <h3 className="font-headline-sm text-base text-primary">{inq.name} ({inq.email})</h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm ${inq.status === 'unread' ? 'bg-error-container text-error' : 'bg-primary/20 text-primary'}`}>
                  {inq.status}
                </span>
              </div>
              <p className="font-interactive text-xs text-off-white-text font-bold">Type: {inq.subject} {inq.phone && `• Tel: ${inq.phone}`}</p>
              <p className="font-body-md text-xs text-on-surface-variant bg-background p-3 rounded-sm">{inq.message}</p>
              {inq.status === 'unread' && (
                <button onClick={() => handleMarkRead(inq.id)} className="bg-primary text-on-primary font-interactive text-[11px] py-1.5 px-4 uppercase tracking-wider">
                  Mark as Processed
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
