import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AdminAuthProvider, useAdminAuth } from './admin/AdminAuthContext';

// Components
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileNav } from './components/MobileNav';
import { CartDrawer } from './components/CartDrawer';
import { Toast } from './components/Toast';

// Public Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ShoppingCartPage } from './pages/ShoppingCartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AccountPage } from './pages/AccountPage';
import { WishlistPage } from './pages/WishlistPage';

// Admin Components
import { AdminLogin } from './admin/AdminLogin';
import { AdminLayout } from './admin/AdminLayout';
import { AdminDashboard } from './admin/AdminDashboard';
import { AdminProducts } from './admin/AdminProducts';
import { AdminCategories } from './admin/AdminCategories';
import { AdminCollections } from './admin/AdminCollections';
import { AdminHero } from './admin/AdminHero';
import { AdminOrders } from './admin/AdminOrders';
import { AdminInquiries } from './admin/AdminInquiries';
import { AdminGenericCMS } from './admin/AdminGenericCMS';

const PageRenderer = () => {
  const { currentPage } = useApp();

  switch (currentPage) {
    case 'home':
      return <HomePage />;
    case 'shop':
      return <ShopPage />;
    case 'product_details':
      return <ProductDetailsPage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    case 'faq':
      return <FaqPage />;
    case 'cart':
      return <ShoppingCartPage />;
    case 'checkout':
      return <CheckoutPage />;
    case 'account':
      return <AccountPage />;
    case 'wishlist':
      return <WishlistPage />;
    default:
      return <HomePage />;
  }
};

const AdminSectionRenderer = ({ activeSection, setActiveSection }) => {
  switch (activeSection) {
    case 'dashboard':
      return <AdminDashboard setActiveSection={setActiveSection} />;
    case 'products':
      return <AdminProducts />;
    case 'categories':
      return <AdminCategories />;
    case 'collections':
      return <AdminCollections />;
    case 'hero':
      return <AdminHero />;
    case 'orders':
      return <AdminOrders />;
    case 'inquiries':
      return <AdminInquiries />;
    case 'settings':
      return <AdminGenericCMS type="settings" title="Site Settings" subtitle="Configure brand name, tagline, and contact info" />;
    case 'faq':
      return <AdminGenericCMS type="faq" title="FAQ Advisory" subtitle="Manage client FAQ content" />;
    case 'testimonials':
      return <AdminGenericCMS type="testimonials" title="Testimonials" subtitle="Manage customer reviews" />;
    case 'navigation':
      return <AdminGenericCMS type="navigation" title="Header Navigation" subtitle="Manage header navigation items" />;
    case 'footer':
      return <AdminGenericCMS type="footer" title="Footer Content" subtitle="Manage footer links and copyright" />;
    case 'about':
      return <AdminGenericCMS type="about" title="Maison & About Content" subtitle="Manage brand history & manifesto" />;
    case 'policies':
      return <AdminGenericCMS type="policies" title="Public Policies" subtitle="Manage shipping, return, and warranty policies" />;
    case 'media':
      return <AdminGenericCMS type="media" title="Media Library" subtitle="Manage store images" />;
    default:
      return <AdminDashboard setActiveSection={setActiveSection} />;
  }
};

function MainApp() {
  const { adminToken } = useAdminAuth();
  const [isAdminView, setIsAdminView] = useState(() => window.location.pathname.startsWith('/admin'));
  const [activeAdminSection, setActiveAdminSection] = useState('dashboard');

  useEffect(() => {
    const handlePopState = () => {
      setIsAdminView(window.location.pathname.startsWith('/admin'));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (isAdminView) {
    if (!adminToken) {
      return <AdminLogin onLoginSuccess={() => setIsAdminView(true)} />;
    }
    return (
      <AdminLayout activeSection={activeAdminSection} setActiveSection={setActiveAdminSection}>
        <AdminSectionRenderer activeSection={activeAdminSection} setActiveSection={setActiveAdminSection} />
      </AdminLayout>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-surface">
      <Header />
      <main className="flex-1">
        <PageRenderer />
      </main>

      {/* Secret Admin Access Button in Footer Corner */}
      <div className="fixed bottom-3 right-3 z-40">
        <button
          onClick={() => {
            window.history.pushState({}, '', '/admin');
            setIsAdminView(true);
          }}
          className="bg-charcoal-surface/80 text-primary border border-glass-border text-[10px] font-interactive px-3 py-1.5 rounded-sm hover:border-primary transition-colors opacity-60 hover:opacity-100"
          title="Open Admin Dashboard"
        >
          ⚙️ Admin CMS
        </button>
      </div>

      <Footer />
      <MobileNav />
      <CartDrawer />
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AppProvider>
        <MainApp />
      </AppProvider>
    </AdminAuthProvider>
  );
}
