import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';

export const ShopPage = () => {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory } = useApp();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const categories = ['All', 'Rings', 'Necklaces', 'Timepieces', 'Earrings', 'Bracelets'];

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load products from API:", err);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.metal.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-[100px] md:pb-24 animate-fadeIn">
      {/* Page Header & Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-2 tracking-wide">The Collection</h1>
          <p className="font-body-lg text-on-surface-variant max-w-2xl text-sm md:text-base">
            Discover our masterfully crafted pieces, where cinematic darkness meets the brilliance of eternal light.
          </p>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <button 
            onClick={() => setIsFilterDrawerOpen(!isFilterDrawerOpen)}
            className={`glass-panel flex-1 md:flex-none flex items-center justify-center gap-2 py-3 px-6 rounded-sm text-off-white-text hover:text-primary transition-colors active:scale-[0.98] ${
              isFilterDrawerOpen ? 'border-primary text-primary' : ''
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span className="font-label-caps tracking-widest text-xs uppercase">Filter</span>
          </button>

          <div className="relative flex-1 md:w-72 glass-panel rounded-sm flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px]">search</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search collection..."
              className="w-full bg-transparent border-none text-off-white-text font-interactive text-xs pl-12 pr-4 py-3 focus:ring-1 focus:ring-primary/50 focus:outline-none placeholder:text-on-surface-variant/50"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="pr-3 text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs & Expandable Filters */}
      <div className="flex flex-wrap items-center gap-3 mb-10 pb-4 border-b border-glass-border">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`font-interactive text-xs px-5 py-2.5 uppercase tracking-widest rounded-sm transition-all ${
              selectedCategory === cat
                ? 'bg-primary text-on-primary font-semibold shadow-[0_4px_20px_rgba(212,175,55,0.2)]'
                : 'glass-panel text-on-surface-variant hover:text-off-white-text hover:border-primary/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <p className="font-body-md text-sm text-on-surface-variant mt-4">Curating high jewelry catalog...</p>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 glass-panel rounded-md">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/40 mb-3">search_off</span>
          <h3 className="font-headline-sm text-xl text-on-surface mb-2">No High Jewelry Found</h3>
          <p className="font-body-md text-sm text-on-surface-variant mb-6">No pieces match your selected filter or search term.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="bg-primary text-on-primary font-interactive text-xs py-3 px-6 uppercase tracking-widest"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-gutter gap-y-16">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
