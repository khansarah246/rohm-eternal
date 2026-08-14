import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('obsidian-solitaire');
  const [cart, setCart] = useState([
    {
      id: "obsidian-solitaire",
      name: "Obsidian Solitaire",
      category: "Rings",
      price: 14500,
      metal: "18k Yellow Gold",
      stone: "2.5ct Cushion Cut Diamond",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBebTi1dSRGimcRLzfxzitS_uiKcPRbhG8x3kTwHxboKgSL4s_iPSnMrVs6b63NZmU2ongB-CcZJ8In2kPpHS7m1kpU0YaqaSJUq5Q5tAGvg9tBXqm4woKhysAGdsSTZzzPbHDv7pCCFs-5fG1I0FZRAOlh4RrmY6jtC9RfDjBiGFQLCmeniahB93-bvrYoYxVuMv93ogFpjU1wfL7EWtBciG_1ZR-CH5WNg3fd15NsYuXD8dr5Edi6",
      quantity: 1,
      size: "6.5"
    }
  ]);
  const [wishlist, setWishlist] = useState(['eclipse-pendant', 'heritage-timepiece']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const navigateTo = (page, productId = null) => {
    setCurrentPage(page);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, quantity = 1, size = '7') => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity, size }];
    });
    showToast(`Added ${product.name} to Shopping Bag`);
  };

  const removeFromCart = (id, size) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
  };

  const updateCartQuantity = (id, size, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id && item.size === size) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleWishlist = (productId, productName = 'Item') => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast(`Removed from Wishlist`);
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved ${productName} to Wishlist`);
        return [...prev, productId];
      }
    });
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        navigateTo,
        selectedProductId,
        setSelectedProductId,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        cartCount,
        cartSubtotal,
        wishlist,
        toggleWishlist,
        isCartOpen,
        setIsCartOpen,
        toastMessage,
        showToast,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
