import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { productsData } from '../../../backend/data/products.js';

export const ProductDetailsPage = () => {
  const { selectedProductId, addToCart, wishlist, toggleWishlist, navigateTo } = useApp();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('6.5');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState('details');

  useEffect(() => {
    fetch(`/api/products/${selectedProductId}`)
      .then(res => res.json())
      .then(data => setProduct(data))
      .catch(() => {
        const found = productsData.find(p => p.id === selectedProductId) || productsData[0];
        setProduct(found);
      });
  }, [selectedProductId]);

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const sizes = ['5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0'];

  return (
    <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-28 pb-[100px] md:pb-24 animate-fadeIn">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 font-interactive text-xs text-on-surface-variant mb-8 uppercase tracking-widest">
        <button onClick={() => navigateTo('home')} className="hover:text-primary transition-colors">Home</button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-primary transition-colors">Collection</button>
        <span>/</span>
        <span className="text-primary">{product.name}</span>
      </div>

      {/* Main Product Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Image Showcase */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-[4/5] w-full bg-charcoal-surface rounded-sm overflow-hidden border border-glass-border shadow-2xl">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => toggleWishlist(product.id, product.name)}
              className={`absolute top-6 right-6 p-3 rounded-full bg-charcoal-surface/70 backdrop-blur-md transition-all ${
                isWishlisted ? 'text-primary scale-110' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span className="material-symbols-outlined text-2xl" style={isWishlisted ? { fontVariationSettings: "'FILL' 1" } : {}}>
                favorite
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Details & Actions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div>
            <span className="font-label-caps text-xs text-primary uppercase tracking-widest block mb-2">{product.category}</span>
            <h1 className="font-headline-md text-3xl md:text-4xl text-on-surface mb-3 tracking-wide">{product.name}</h1>
            <p className="font-body-lg text-sm text-on-surface-variant font-light mb-4">{product.description}</p>
            <span className="font-interactive text-2xl text-primary tracking-widest block">${product.price.toLocaleString()}</span>
          </div>

          <div className="h-[1px] bg-glass-border w-full"></div>

          {/* Metal & Stone Specs */}
          <div className="space-y-3 font-body-md text-xs">
            <div className="flex justify-between py-1">
              <span className="text-on-surface-variant">Precious Metal:</span>
              <span className="text-off-white-text font-medium">{product.metal}</span>
            </div>
            {product.stone && (
              <div className="flex justify-between py-1">
                <span className="text-on-surface-variant">Gemstone Specification:</span>
                <span className="text-off-white-text font-medium">{product.stone}</span>
              </div>
            )}
          </div>

          {/* Ring Size Selector */}
          {product.category === 'Rings' && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="font-label-caps text-xs text-on-surface uppercase tracking-widest">Select Ring Size (US)</span>
                <button onClick={() => navigateTo('contact')} className="font-interactive text-[11px] text-primary hover:underline">Sizing Guide</button>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2.5 font-interactive text-xs rounded-sm border transition-all ${
                      selectedSize === s
                        ? 'bg-primary text-on-primary font-bold border-primary shadow-[0_0_15px_rgba(212,175,55,0.3)]'
                        : 'border-glass-border text-on-surface-variant hover:border-primary/50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA Buttons */}
          <div className="flex gap-4 pt-2">
            <div className="flex items-center border border-glass-border rounded-sm bg-charcoal-surface px-3">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-on-surface-variant hover:text-primary py-3 px-2 font-bold">-</button>
              <span className="font-interactive text-sm px-4 text-off-white-text">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-on-surface-variant hover:text-primary py-3 px-2 font-bold">+</button>
            </div>

            <button
              onClick={() => addToCart(product, quantity, selectedSize)}
              className="flex-1 bg-primary text-on-primary font-interactive text-xs py-4 uppercase tracking-widest hover:scale-[1.01] transition-transform shadow-[0_10px_30px_rgba(212,175,55,0.25)] flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-base">shopping_bag</span>
              <span>Add to Shopping Bag</span>
            </button>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-4 pt-6">
            {/* Accordion 1: Details */}
            <div className="border border-glass-border rounded-sm overflow-hidden">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'details' ? '' : 'details')}
                className="w-full p-4 flex justify-between items-center text-left bg-charcoal-surface/60 font-interactive text-xs uppercase tracking-widest text-on-surface"
              >
                <span>Craftsmanship & Specs</span>
                <span className="material-symbols-outlined text-primary">
                  {activeAccordion === 'details' ? 'remove' : 'add'}
                </span>
              </button>
              {activeAccordion === 'details' && (
                <div className="p-4 bg-background border-t border-glass-border space-y-2 font-body-md text-xs text-on-surface-variant">
                  {product.details ? (
                    product.details.map((d, i) => <p key={i}>• {d}</p>)
                  ) : (
                    <p>• Handcrafted in Paris atelier with full GIA / IGI certification and hallmark stamping.</p>
                  )}
                </div>
              )}
            </div>

            {/* Accordion 2: Shipping */}
            <div className="border border-glass-border rounded-sm overflow-hidden">
              <button
                onClick={() => setActiveAccordion(activeAccordion === 'shipping' ? '' : 'shipping')}
                className="w-full p-4 flex justify-between items-center text-left bg-charcoal-surface/60 font-interactive text-xs uppercase tracking-widest text-on-surface"
              >
                <span>Insured Armored Shipping</span>
                <span className="material-symbols-outlined text-primary">
                  {activeAccordion === 'shipping' ? 'remove' : 'add'}
                </span>
              </button>
              {activeAccordion === 'shipping' && (
                <div className="p-4 bg-background border-t border-glass-border font-body-md text-xs text-on-surface-variant space-y-2">
                  <p>• Complimentary Overnight Armored Vault Express courier delivery.</p>
                  <p>• Biometric hand-off signature required upon arrival.</p>
                  <p>• 30-day complimentary return & sizing adjustments.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
