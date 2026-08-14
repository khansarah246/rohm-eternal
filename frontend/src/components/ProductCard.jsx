import React from 'react';
import { useApp } from '../context/AppContext';

export const ProductCard = ({ product }) => {
  const { navigateTo, addToCart, wishlist, toggleWishlist } = useApp();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <article className="group cursor-pointer flex flex-col h-full transition-all duration-300">
      <div className="relative aspect-[4/5] w-full bg-charcoal-surface mb-6 overflow-hidden rounded-sm border border-glass-border/40 group-hover:border-primary/40 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-500">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => navigateTo('product_details', product.id)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id, product.name);
          }}
          className={`absolute top-4 right-4 transition-all duration-300 z-10 p-2 rounded-full bg-charcoal-surface/60 backdrop-blur-md ${
            isWishlisted ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-primary'
          }`}
          title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
        >
          <span 
            className="material-symbols-outlined text-[20px]" 
            style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : {}}
          >
            favorite
          </span>
        </button>

        {/* Quick Add Overlay (Desktop) */}
        <div className="absolute inset-0 bg-background/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:flex items-center justify-center p-4 gap-3">
          <button
            onClick={() => addToCart(product)}
            className="bg-primary text-on-primary font-interactive text-xs py-3 px-6 rounded-sm tracking-widest uppercase hover:bg-primary-fixed-dim transition-transform scale-95 group-hover:scale-100 duration-300 shadow-lg"
          >
            Quick Add
          </button>
          <button
            onClick={() => navigateTo('product_details', product.id)}
            className="bg-transparent border border-glass-border text-off-white-text font-interactive text-xs py-3 px-4 rounded-sm uppercase hover:border-primary hover:text-primary transition-colors"
          >
            View
          </button>
        </div>
      </div>

      <div 
        onClick={() => navigateTo('product_details', product.id)}
        className="flex flex-col flex-grow text-center px-2"
      >
        <h3 className="font-headline-sm text-lg text-on-surface mb-1 tracking-wide group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="font-body-md text-xs text-on-surface-variant line-clamp-1 mb-3">
          {product.metal} {product.stone && `• ${product.stone}`}
        </p>

        <div className="mt-auto">
          <span className="font-interactive text-sm text-primary tracking-widest block mb-4">
            ${product.price.toLocaleString()}
          </span>

          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
            className="w-full md:hidden border border-glass-border py-2.5 font-interactive text-off-white-text uppercase tracking-widest text-[11px] hover:border-primary hover:text-primary transition-colors"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </article>
  );
};
