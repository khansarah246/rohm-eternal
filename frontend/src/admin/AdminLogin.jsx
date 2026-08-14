import React, { useState } from 'react';
import { useAdminAuth } from './AdminAuthContext';

export const AdminLogin = ({ onLoginSuccess }) => {
  const { login } = useAdminAuth();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await login(username, password);
    setLoading(false);
    if (res.success) {
      if (onLoginSuccess) onLoginSuccess();
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface flex items-center justify-center p-6 animate-fadeIn">
      <div className="w-full max-w-md glass-panel p-8 md:p-10 rounded-md border border-primary/30 gold-glow space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-primary/20 text-primary border border-primary/40 flex items-center justify-center mx-auto mb-2">
            <span className="material-symbols-outlined text-2xl">admin_panel_settings</span>
          </div>
          <h1 className="font-display-lg text-headline-sm text-primary uppercase tracking-widest">ROHM ETERNAL</h1>
          <p className="font-label-caps text-xs text-on-surface-variant uppercase tracking-widest">Atelier Management System</p>
        </div>

        {error && (
          <div className="bg-error-container/40 border border-error/50 text-error p-3 rounded-sm text-xs font-interactive text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 font-interactive text-xs">
          <div>
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Admin Username</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text focus:border-primary focus:outline-none"
            />
          </div>

          <div>
            <label className="font-label-caps text-[11px] text-on-surface-variant uppercase tracking-widest block mb-2">Security Key / Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-glass-border rounded-sm px-4 py-3 text-off-white-text focus:border-primary focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-on-primary font-interactive text-xs py-3.5 uppercase tracking-widest hover:scale-[1.01] transition-transform shadow-lg disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Authorize Atelier Access'}
          </button>
        </form>

        <p className="font-body-md text-[11px] text-center text-on-surface-variant/60 pt-2">
          Protected by Firebase Security Rules & ROHM ETERNAL Admin Policy.
        </p>
      </div>
    </div>
  );
};
