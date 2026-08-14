import React, { useState, useEffect } from 'react';
import { useAdminAuth } from './AdminAuthContext';

export const AdminCollections = () => {
  const { authHeaders } = useAdminAuth();
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const loadCollections = () => {
    fetch('/api/admin/collections', { headers: authHeaders })
      .then(res => res.json())
      .then(data => setCollections(Array.isArray(data) ? data : data.collections || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadCollections();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name) return;
    const col = { id: name.toLowerCase().replace(/\s+/g, '-'), name, slug: name.toLowerCase().replace(/\s+/g, '-'), description, image, status: 'published' };
    try {
      await fetch('/api/admin/collections', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(col)
      });
      setName(''); setDescription(''); setImage('');
      loadCollections();
    } catch(e){}
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete collection?")) return;
    try {
      await fetch(`/api/admin/collections/${id}`, { method: 'DELETE', headers: authHeaders });
      loadCollections();
    } catch(e){}
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="font-display-lg text-2xl text-on-surface">Collections Management</h1>
        <p className="font-body-md text-xs text-on-surface-variant">Manage luxury featured collections (*The Solstice Series, Heritage Timepieces, High Jewelry Salon*).</p>
      </div>

      <form onSubmit={handleAdd} className="glass-panel p-6 rounded-md border border-glass-border space-y-4 font-interactive text-xs">
        <h3 className="font-headline-sm text-lg text-primary">Add New Collection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Collection Name" required value={name} onChange={e => setName(e.target.value)} className="bg-background border border-glass-border p-3 rounded-sm text-off-white-text focus:border-primary focus:outline-none" />
          <input type="url" placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} className="bg-background border border-glass-border p-3 rounded-sm text-off-white-text focus:border-primary focus:outline-none" />
        </div>
        <textarea placeholder="Collection Description" rows="2" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-background border border-glass-border p-3 rounded-sm text-off-white-text focus:border-primary focus:outline-none"></textarea>
        <button type="submit" className="bg-primary text-on-primary font-bold py-3 px-6 uppercase tracking-widest">Create Collection</button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {collections.map((c) => (
          <div key={c.id} className="glass-panel p-5 rounded-md border border-glass-border flex gap-4 items-center">
            {c.image && <img src={c.image} alt={c.name} className="w-20 h-20 object-cover rounded-sm border border-glass-border" />}
            <div className="flex-1">
              <h4 className="font-headline-sm text-base text-primary">{c.name}</h4>
              <p className="font-body-md text-xs text-on-surface-variant line-clamp-2">{c.description}</p>
              <button onClick={() => handleDelete(c.id)} className="text-error hover:underline text-xs mt-2 inline-block">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
