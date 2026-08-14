import React, { useState, useEffect } from 'react';
import { useAdminAuth } from './AdminAuthContext';

export const AdminOrders = () => {
  const { authHeaders } = useAdminAuth();
  const [orders, setOrders] = useState([]);

  const loadOrders = () => {
    fetch('/api/admin/orders', { headers: authHeaders })
      .then(res => res.json())
      .then(data => setOrders(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await fetch(`/api/admin/orders/${id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ status })
      });
      loadOrders();
    } catch(e){}
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="font-display-lg text-2xl text-on-surface">Vault Orders Management</h1>
        <p className="font-body-md text-xs text-on-surface-variant">Review high jewelry orders, delivery addresses, and update courier shipping statuses.</p>
      </div>

      <div className="glass-panel rounded-md border border-glass-border overflow-hidden">
        <table className="w-full text-left font-interactive text-xs">
          <thead className="bg-surface-container border-b border-glass-border text-primary uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4">Order Ref</th>
              <th className="p-4">Client Email</th>
              <th className="p-4">Total</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Update</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass-border">
            {orders.length === 0 ? (
              <tr><td colSpan="6" className="p-8 text-center text-on-surface-variant">No orders recorded.</td></tr>
            ) : (
              orders.map((o) => (
                <tr key={o.id || o.orderNumber}>
                  <td className="p-4 font-bold text-primary">{o.orderNumber || o.id}</td>
                  <td className="p-4 text-off-white-text">{o.userEmail}</td>
                  <td className="p-4 font-bold text-primary">${o.totalAmount?.toLocaleString()}</td>
                  <td className="p-4 text-on-surface-variant text-[11px]">{o.placedAt?.substring(0, 10)}</td>
                  <td className="p-4 uppercase text-[10px] font-bold text-primary">{o.status}</td>
                  <td className="p-4 text-right space-x-2">
                    <button onClick={() => handleUpdateStatus(o.id || o.orderNumber, 'shipped')} className="text-primary hover:underline text-[11px]">Mark Shipped</button>
                    <button onClick={() => handleUpdateStatus(o.id || o.orderNumber, 'delivered')} className="text-on-surface-variant hover:underline text-[11px]">Mark Delivered</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
