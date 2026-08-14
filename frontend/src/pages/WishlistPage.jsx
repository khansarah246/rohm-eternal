import React from 'react';
import { useApp } from '../context/AppContext';
import { productsData } from '../../../backend/data/products.js';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage = () => {
  const { wishlist, navigateTo } = useApp();

  const wishlistedProducts = productsData.filter(p => wishlist.includes(p.id));

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-[100px] md:pb-24 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
        <div>
          <h1 className="font-display-lg-mobile md:font-display-lg text-on-surface mb-2">Saved Wishlist</h1>
          <p className="font-body-lg text-on-surface-variant text-sm md:text-base">
            Your private selection of saved high jewelry creations.
          </p>
        </div>

        <button 
          onClick={() => navigateTo('shop')}
          className="glass-panel text-off-white-text hover:text-primary font-interactive text-xs py-3 px-6 uppercase tracking-widest transition-colors"
        >
          Explore Collection
        </button>
      </div>

      {wishlistedProducts.length === 0 ? (
        <div className="glass-panel p-16 text-center rounded-md border border-glass-border space-y-4 max-w-xl mx-auto">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant/40">favorite_border</span>
          <h2 className="font-headline-sm text-2xl text-on-surface">Your Wishlist is Empty</h2>
          <p className="font-body-md text-sm text-on-surface-variant">Tap the heart icon on any high jewelry item to save it for later.</p>
          <button
            onClick={() => navigateTo('shop')}
            className="bg-primary text-on-primary font-interactive text-xs py-3.5 px-8 uppercase tracking-widest mt-4 inline-block"
          >
            Browse High Jewelry
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-gutter gap-y-16">
          {wishlistedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
