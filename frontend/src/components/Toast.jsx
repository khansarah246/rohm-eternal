import React from 'react';
import { useApp } from '../context/AppContext';

export const Toast = () => {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 animate-bounce">
      <div className="bg-charcoal-surface/95 border border-primary/40 text-on-surface px-6 py-4 rounded-md shadow-[0_10px_30px_rgba(212,175,55,0.2)] backdrop-blur-md flex items-center gap-3">
        <span className="material-symbols-outlined text-primary">diamond</span>
        <span className="font-interactive text-sm text-off-white-text tracking-wide">{toastMessage}</span>
      </div>
    </div>
  );
};
