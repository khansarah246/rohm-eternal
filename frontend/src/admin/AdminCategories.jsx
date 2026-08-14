import React, { useState, useEffect } from 'react';
import { useAdminAuth } from './AdminAuthContext';

export const AdminCategories = () => {
  const { authHeaders } = useAdminAuth();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');

  const loadCategories = () => {
    fetch('/api/admin/categories', { headers: authHeaders })
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : data.categories || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name) return;
    const cat = { id: slug || name.toLowerCase().replace(/\s+/g, '-'), name, slug: slug || name.toLowerCase().replace(/\s+/g, '-'), description, status: 'published' };
    try {
      await fetch('/api/admin/categories', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(cat)
      });
      setName(''); setSlug(''); setDescription('');
      loadCategories();
    } catch(e){}
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete category?")) return;
    try {
      await fetch(`/api/admin/categories/${id}`, { method: 'DELETE', headers: authHeaders });
      loadCategories();
    } catch(e){}
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div>
        <h1 className="font-display-lg text-2xl text-on-surface">Categories Management</h1>
        <p className="font-body-md text-xs text-on-surface-variant">Manage luxury product categories (*Rings, Necklaces, Timepieces, Earrings, Bracelets*).</p>
      </div>

      <form onSubmit={handleAdd} className="glass-panel p-6 rounded-md border border-glass-border space-y-4 font-interactive text-xs">
        <h3 className="font-headline-sm text-lg text-primary">Add New Category</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Category Name (e.g. Rings)" required value={name} onChange={e => setName(e.target.value)} className="bg-background border border-glass-border p-3 rounded-sm text-off-white-text focus:border-primary focus:outline-none" />
          <input type="text" placeholder="Slug (e.g. rings)" value={slug} onChange={e => setSlug(e.target.value)} className="bg-background border border-glass-border p-3 rounded-sm text-off-white-text focus:border-primary focus:outline-none" />
        </div>
        <input type="text" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-background border border-glass-border p-3 rounded-sm text-off-white-text focus:border-primary focus:outline-none" />
        <button type="submit" className="bg-primary text-on-primary font-bold py-3 px-6 uppercase tracking-widest">Create Category</button>
      </form>

      <div className="glass-panel rounded-md border border-glass-border overflow-hidden">
        <table className="w-full text-left font-interactive text-xs">
          <thead className="bg-surface-container border-b border-glass-border text-primary uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Slug</th>
              <th className="p-4">Description</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass-border">
            {categories.map((c) => (
              <tr key={c.id}>
                <td className="p-4 font-bold text-off-white-text">{c.name}</td>
                <td className="p-4 text-on-surface-variant">{c.slug}</td>
                <td className="p-4 text-on-surface-variant text-[11px]">{c.description}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDelete(c.id)} className="text-error hover:underline text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
