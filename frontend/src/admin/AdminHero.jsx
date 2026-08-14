import React, { useState, useEffect } from 'react';
import { useAdminAuth } from './AdminAuthContext';

export const AdminHero = () => {
  const { authHeaders } = useAdminAuth();
  const [slides, setSlides] = useState([]);
  const [title, setTitle] = useState('ETERNAL RADIANCE');
  const [subtitle, setSubtitle] = useState('Discover the new collection.');
  const [description, setDescription] = useState('A symphony of light, shadow, and immaculate craftsmanship.');
  const [image, setImage] = useState('');
  const [buttonText, setButtonText] = useState('Explore Collection');

  const loadSlides = () => {
    fetch('/api/admin/hero', { headers: authHeaders })
      .then(res => res.json())
      .then(data => setSlides(Array.isArray(data) ? data : data.slides || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadSlides();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    const item = { title, subtitle, description, image, buttonText, buttonLink: '/shop', status: 'published' };
    try {
      await fetch('/api/admin/hero', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(item)
      });
      loadSlides();
    } catch(e){}
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/admin/hero/${id}`, { method: 'DELETE', headers: authHeaders });
      loadSlides();
    } catch(e){}
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="font-display-lg text-2xl text-on-surface">Hero Banner Slider Management</h1>
        <p className="font-body-md text-xs text-on-surface-variant">Manage the main homepage editorial banner slides.</p>
      </div>

      <form onSubmit={handleAdd} className="glass-panel p-6 rounded-md border border-glass-border space-y-4 font-interactive text-xs">
        <h3 className="font-headline-sm text-lg text-primary">Create Hero Slide</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Title (e.g. ETERNAL RADIANCE)" required value={title} onChange={e => setTitle(e.target.value)} className="bg-background border border-glass-border p-3 rounded-sm text-off-white-text focus:border-primary focus:outline-none" />
          <input type="text" placeholder="Subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="bg-background border border-glass-border p-3 rounded-sm text-off-white-text focus:border-primary focus:outline-none" />
        </div>
        <input type="url" placeholder="Hero Image URL" required value={image} onChange={e => setImage(e.target.value)} className="w-full bg-background border border-glass-border p-3 rounded-sm text-off-white-text focus:border-primary focus:outline-none" />
        <textarea placeholder="Description" rows="2" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-background border border-glass-border p-3 rounded-sm text-off-white-text focus:border-primary focus:outline-none"></textarea>
        <button type="submit" className="bg-primary text-on-primary font-bold py-3 px-6 uppercase tracking-widest">Publish Slide</button>
      </form>

      <div className="space-y-4">
        {slides.map((s) => (
          <div key={s.id} className="glass-panel p-6 rounded-md border border-glass-border flex flex-col md:flex-row gap-6 items-center">
            {s.image && <img src={s.image} alt={s.title} className="w-32 h-24 object-cover rounded-sm border border-glass-border bg-background" />}
            <div className="flex-1">
              <h4 className="font-headline-sm text-xl text-primary">{s.title}</h4>
              <p className="font-body-md text-xs text-off-white-text">{s.subtitle}</p>
              <p className="font-body-md text-xs text-on-surface-variant">{s.description}</p>
            </div>
            <button onClick={() => handleDelete(s.id)} className="text-error hover:underline text-xs">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};
