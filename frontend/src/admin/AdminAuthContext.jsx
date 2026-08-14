import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(() => localStorage.getItem('rohm_admin_token') || '');
  const [adminUser, setAdminUser] = useState(() => {
    const saved = localStorage.getItem('rohm_admin_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username, password) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setAdminToken(data.token);
        setAdminUser(data.user);
        localStorage.setItem('rohm_admin_token', data.token);
        localStorage.setItem('rohm_admin_user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, error: data.error || 'Login failed' };
    } catch (err) {
      return { success: false, error: 'Network error connecting to backend API' };
    }
  };

  const logout = () => {
    setAdminToken('');
    setAdminUser(null);
    localStorage.removeItem('rohm_admin_token');
    localStorage.removeItem('rohm_admin_user');
  };

  const authHeaders = {
    'Content-Type': 'application/json',
    'x-admin-token': adminToken
  };

  return (
    <AdminAuthContext.Provider value={{ adminToken, adminUser, login, logout, authHeaders }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
