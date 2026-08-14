import React, { useState, useEffect } from 'react';
import { useAdminAuth } from './AdminAuthContext';

export const AdminProducts = () => {
  const { authHeaders } = useAdminAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const initialFormState = {
    name: '', category: 'Rings', price: 10000, metal: '18k Yellow Gold', stone: 'Diamond',
    description: '', image: '', isFeatured: true, status: 'published', details: ['Handcrafted in Paris atelier']
  };
  const [form, setForm] = useState(initialFormState);

  const loadProducts = () => {
    fetch('/api/admin/products', { headers: authHeaders })
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setForm(initialFormState);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p) => {
    setEditingProduct(p);
    setForm({ ...p, details: p.details || ['Handcrafted in Paris atelier'] });
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const url = editingProduct ? `/api/admin/products/${editingProduct.id}` : '/api/admin/products';
    const method = editingProduct ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: authHeaders,
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setIsModalOpen(false);
        loadProducts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: 'DELETE', headers: authHeaders });
      loadProducts();
    } catch (err) {}
  };

  const handleTogglePublish = async (product) => {
    const newStatus = product.status === 'published' ? 'unpublished' : 'published';
    try {
      await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({ status: newStatus })
      });
      loadProducts();
    } catch (err) {}
  };

  const handleDuplicate = async (product) => {
    const dup = {
      ...product,
      id: 'prod_' + Date.now(),
      name: `${product.name} (Copy)`
    };
    try {
      await fetch('/api/admin/products', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(dup)
      });
      loadProducts();
    } catch (err) {}
  };

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-2xl text-on-surface">Products Catalog Management</h1>
          <p className="font-body-md text-xs text-on-surface-variant">Create, edit, publish, or remove high jewelry creations.</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-primary text-on-primary font-interactive text-xs py-3 px-6 uppercase tracking-widest hover:scale-[1.02] transition-transform flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-sm">add</span>
          <span>New Product</span>
        </button>
      </div>

      {/* Search & Filter Controls */}
      <div className="glass-panel p-4 rounded-md border border-glass-border flex items-center gap-4">
        <span className="material-symbols-outlined text-on-surface-variant">search</span>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products by name or category..."
          className="bg-transparent border-none w-full text-off-white-text font-interactive text-xs focus:outline-none placeholder:text-on-surface-variant/50"
        />
      </div>

      {/* Table */}
      <div className="glass-panel rounded-md border border-glass-border overflow-hidden">
        <table className="w-full text-left font-interactive text-xs">
          <thead className="bg-surface-container border-b border-glass-border text-primary uppercase text-[11px] tracking-wider">
            <tr>
              <th className="p-4">Item</th>
              <th className="p-4">Category</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass-border">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="hover:bg-surface-container/50 transition-colors">
                <td className="p-4 flex items-center gap-4">
                  <img src={p.image} alt={p.name} className="w-12 h-14 object-cover rounded-sm bg-background border border-glass-border" />
                  <div>
                    <h4 className="font-headline-sm text-sm text-off-white-text">{p.name}</h4>
                    <p className="text-[11px] text-on-surface-variant">{p.metal}</p>
                  </div>
                </td>
                <td className="p-4 text-on-surface-variant">{p.category}</td>
                <td className="p-4 text-primary font-bold">${p.price?.toLocaleString()}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleTogglePublish(p)}
                    className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider transition-colors ${
                      p.status === 'published' ? 'bg-primary/20 text-primary border border-primary/40' : 'bg-surface-bright text-on-surface-variant border border-glass-border'
                    }`}
                  >
                    {p.status || 'published'}
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleOpenEdit(p)} className="p-1.5 text-on-surface-variant hover:text-primary" title="Edit">
                    <span className="material-symbols-outlined text-base">edit</span>
                  </button>
                  <button onClick={() => handleDuplicate(p)} className="p-1.5 text-on-surface-variant hover:text-primary" title="Duplicate">
                    <span className="material-symbols-outlined text-base">content_copy</span>
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-on-surface-variant hover:text-error" title="Delete">
                    <span className="material-symbols-outlined text-base">delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-2xl glass-panel p-8 rounded-md border border-primary/40 max-h-[90vh] overflow-y-auto space-y-6 gold-glow">
            <div className="flex justify-between items-center border-b border-glass-border pb-4">
              <h3 className="font-headline-sm text-xl text-primary">{editingProduct ? 'Edit Product' : 'Add New High Jewelry Product'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 font-interactive text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Product Name *</label>
                  <input
                    type="text" required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-background border border-glass-border rounded-sm p-3 text-off-white-text focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full bg-background border border-glass-border rounded-sm p-3 text-off-white-text focus:border-primary focus:outline-none"
                  >
                    <option>Rings</option>
                    <option>Necklaces</option>
                    <option>Timepieces</option>
                    <option>Earrings</option>
                    <option>Bracelets</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Price (USD) *</label>
                  <input
                    type="number" required
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                    className="w-full bg-background border border-glass-border rounded-sm p-3 text-off-white-text focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Precious Metal</label>
                  <input
                    type="text"
                    value={form.metal}
                    onChange={(e) => setForm({ ...form, metal: e.target.value })}
                    className="w-full bg-background border border-glass-border rounded-sm p-3 text-off-white-text focus:border-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Gemstone</label>
                  <input
                    type="text"
                    value={form.stone}
                    onChange={(e) => setForm({ ...form, stone: e.target.value })}
                    className="w-full bg-background border border-glass-border rounded-sm p-3 text-off-white-text focus:border-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Image URL *</label>
                <input
                  type="url" required
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full bg-background border border-glass-border rounded-sm p-3 text-off-white-text focus:border-primary focus:outline-none"
                />
              </div>

              <div>
                <label className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest block mb-1">Description *</label>
                <textarea
                  rows="3" required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-background border border-glass-border rounded-sm p-3 text-off-white-text focus:border-primary focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="accent-primary"
                  />
                  <span>Mark as Featured</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={form.status === 'published'}
                    onChange={(e) => setForm({ ...form, status: e.target.checked ? 'published' : 'unpublished' })}
                    className="accent-primary"
                  />
                  <span>Published Status</span>
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-glass-border">
                <button type="button" onClick={() => setIsModalOpen(false)} className="bg-transparent border border-glass-border px-6 py-3 uppercase text-on-surface-variant">Cancel</button>
                <button type="submit" className="bg-primary text-on-primary px-8 py-3 uppercase font-bold tracking-widest">Save Product</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
