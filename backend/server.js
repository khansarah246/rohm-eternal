import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { db, isFirebaseInitialized } from './firebase.js';
import { seedData } from './data/seedData.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_SECRET_TOKEN = process.env.ADMIN_SECRET_TOKEN || "rohm-eternal-secret-token-2026";

app.use(cors());
app.use(express.json());

// Memory Fallback Store
let memoryStore = {
  products: [...seedData.products],
  categories: [...seedData.categories],
  collections: [...seedData.collections],
  heroSlides: [...seedData.heroSlides],
  homepageSections: [...seedData.homepageSections],
  faq: [...seedData.faq],
  testimonials: [...seedData.testimonials],
  siteSettings: { ...seedData.siteSettings },
  navigation: [...seedData.navigation],
  footer: { ...seedData.footer },
  about: { ...seedData.about },
  policies: [...seedData.policies],
  media: [],
  orders: [],
  inquiries: []
};

// Firestore Seeding Logic
async function seedFirestoreIfEmpty() {
  if (!isFirebaseInitialized || !db) return;
  try {
    const productsSnap = await db.collection('products').get();
    if (productsSnap.empty) {
      console.log('🌱 Seeding Firestore initial catalog data...');
      
      const batch = db.batch();
      
      // Products
      seedData.products.forEach(p => {
        const ref = db.collection('products').doc(p.id);
        batch.set(ref, p);
      });
      
      // Categories
      seedData.categories.forEach(c => {
        const ref = db.collection('categories').doc(c.id);
        batch.set(ref, c);
      });

      // Collections
      seedData.collections.forEach(col => {
        const ref = db.collection('collections').doc(col.id);
        batch.set(ref, col);
      });

      // Hero
      seedData.heroSlides.forEach(h => {
        const ref = db.collection('heroSlides').doc(h.id);
        batch.set(ref, h);
      });

      // Settings
      batch.set(db.collection('siteSettings').doc('main'), seedData.siteSettings);
      batch.set(db.collection('about').doc('main'), seedData.about);
      batch.set(db.collection('footer').doc('main'), seedData.footer);

      await batch.commit();
      console.log('✅ Firestore populated with ROHM ETERNAL master data!');
    }
  } catch (err) {
    console.warn('⚠️ Firestore seed notice:', err.message);
  }
}

seedFirestoreIfEmpty();

// Admin Auth Middleware
const adminAuth = (req, res, next) => {
  const token = req.headers['x-admin-token'] || req.headers['authorization']?.replace('Bearer ', '');
  if (token === ADMIN_SECRET_TOKEN || token === 'admin-authenticated-token') {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized admin access' });
};

// ==========================================
// PUBLIC API ENDPOINTS
// ==========================================

// Root API Overview
app.get('/', (req, res) => {
  res.json({
    name: "ROHM ETERNAL API",
    version: "1.0.0",
    status: "running",
    environment: process.env.NODE_ENV || "development",
    database: {
      type: "Firebase Firestore",
      status: isFirebaseInitialized ? "connected" : "memory-fallback"
    },
    frontend: "http://localhost:3000/",
    endpoints: {
      health: "GET /api/health",
      products: "GET /api/products",
      collections: "GET /api/collections",
      categories: "GET /api/categories",
      hero: "GET /api/hero",
      homepage: "GET /api/homepage",
      faq: "GET /api/faq",
      testimonials: "GET /api/testimonials",
      siteSettings: "GET /api/site-settings",
      navigation: "GET /api/navigation",
      footer: "GET /api/footer",
      about: "GET /api/about",
      policies: "GET /api/policies",
      adminAuth: "POST /api/admin/login"
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    service: "rohm-eternal-backend",
    database: isFirebaseInitialized ? "connected" : "memory-fallback"
  });
});

// GET /api/products
app.get('/api/products', async (req, res) => {
  try {
    const { category, search, featured } = req.query;

    if (isFirebaseInitialized) {
      try {
        const snapshot = await db.collection('products').get();
        if (!snapshot.empty) {
          let products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          products = products.filter(p => p.status !== 'unpublished');
          if (category && category !== 'All') {
            products = products.filter(p => p.category.toLowerCase() === category.toLowerCase());
          }
          if (featured === 'true') {
            products = products.filter(p => p.isFeatured);
          }
          if (search) {
            const q = search.toLowerCase();
            products = products.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
          }
          return res.json(products);
        }
      } catch (err) {
        console.warn('Firestore products notice:', err.message);
      }
    }

    let result = memoryStore.products.filter(p => p.status !== 'unpublished');
    if (category && category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (featured === 'true') {
      result = result.filter(p => p.isFeatured);
    }
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve products' });
  }
});

// GET /api/products/:id
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (isFirebaseInitialized) {
      try {
        const doc = await db.collection('products').doc(id).get();
        if (doc.exists) {
          return res.json({ id: doc.id, ...doc.data() });
        }
      } catch (err) {}
    }
    const product = memoryStore.products.find(p => p.id === id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving product' });
  }
});

// GET /api/categories
app.get('/api/categories', async (req, res) => {
  try {
    if (isFirebaseInitialized) {
      try {
        const snapshot = await db.collection('categories').get();
        if (!snapshot.empty) {
          const categories = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          return res.json({ success: true, count: categories.length, categories });
        }
      } catch (err) {}
    }
    res.json({ success: true, count: memoryStore.categories.length, categories: memoryStore.categories });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve categories' });
  }
});

// GET /api/collections
app.get('/api/collections', async (req, res) => {
  try {
    if (isFirebaseInitialized) {
      try {
        const snapshot = await db.collection('collections').get();
        if (!snapshot.empty) {
          const collections = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          return res.json({ success: true, count: collections.length, collections });
        }
      } catch (err) {}
    }
    res.json({ success: true, count: memoryStore.collections.length, collections: memoryStore.collections });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve collections' });
  }
});

// GET /api/hero
app.get('/api/hero', async (req, res) => {
  try {
    if (isFirebaseInitialized) {
      try {
        const snapshot = await db.collection('heroSlides').get();
        if (!snapshot.empty) {
          const slides = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
          return res.json({ success: true, slides });
        }
      } catch (err) {}
    }
    res.json({ success: true, slides: memoryStore.heroSlides });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve hero slides' });
  }
});

// GET /api/homepage
app.get('/api/homepage', (req, res) => {
  res.json({ success: true, sections: memoryStore.homepageSections });
});

// GET /api/faq
app.get('/api/faq', (req, res) => {
  res.json(memoryStore.faq);
});

// GET /api/testimonials
app.get('/api/testimonials', (req, res) => {
  res.json({ success: true, testimonials: memoryStore.testimonials });
});

// GET /api/site-settings
app.get('/api/site-settings', async (req, res) => {
  try {
    if (isFirebaseInitialized) {
      try {
        const doc = await db.collection('siteSettings').doc('main').get();
        if (doc.exists) {
          return res.json({ success: true, settings: doc.data() });
        }
      } catch (err) {}
    }
    res.json({ success: true, settings: memoryStore.siteSettings });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to retrieve settings' });
  }
});

// GET /api/navigation
app.get('/api/navigation', (req, res) => {
  res.json({ success: true, links: memoryStore.navigation });
});

// GET /api/footer
app.get('/api/footer', (req, res) => {
  res.json({ success: true, footer: memoryStore.footer });
});

// GET /api/about
app.get('/api/about', (req, res) => {
  res.json({ success: true, about: memoryStore.about });
});

// GET /api/policies
app.get('/api/policies', (req, res) => {
  res.json({ success: true, policies: memoryStore.policies });
});

// POST /api/contact
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const inquiry = {
      name, email, phone: phone || '', subject: subject || 'Concierge Inquiry',
      message, status: 'unread', createdAt: new Date().toISOString()
    };

    if (isFirebaseInitialized) {
      try {
        const ref = await db.collection('inquiries').add(inquiry);
        return res.status(201).json({ success: true, id: ref.id, message: 'Consultation request received.' });
      } catch (err) {}
    }

    inquiry.id = 'inq_' + Date.now();
    memoryStore.inquiries.push(inquiry);
    res.status(201).json({ success: true, id: inquiry.id, message: 'Consultation request received.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit inquiry' });
  }
});

// POST /api/orders
app.post('/api/orders', async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod, totalAmount, userEmail } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart items cannot be empty' });
    }

    const orderNumber = 'RE-' + Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderNumber,
      userEmail: userEmail || 'guest@rohm-eternal.com',
      items, shippingAddress, paymentMethod: paymentMethod || 'Vault Gold Express',
      totalAmount, status: 'confirmed', placedAt: new Date().toISOString()
    };

    if (isFirebaseInitialized) {
      try {
        const ref = await db.collection('orders').add(orderData);
        return res.status(201).json({ success: true, orderNumber, id: ref.id, order: orderData });
      } catch (err) {}
    }

    orderData.id = 'ord_' + Date.now();
    memoryStore.orders.push(orderData);
    res.status(201).json({ success: true, orderNumber, id: orderData.id, order: orderData });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process order' });
  }
});

// ==========================================
// ADMIN AUTHENTICATION & REST MANAGEMENT APIs
// ==========================================

// Admin Login POST /api/admin/login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if ((username === 'admin' && password === 'admin123') || (username === 'admin' && password === 'rohm2026')) {
    return res.json({
      success: true,
      token: ADMIN_SECRET_TOKEN,
      user: { name: "Master Goldsmith Admin", role: "Super Administrator" }
    });
  }
  res.status(401).json({ success: false, error: 'Invalid admin credentials' });
});

// Admin Me GET /api/admin/me
app.get('/api/admin/me', adminAuth, (req, res) => {
  res.json({ success: true, user: { name: "Master Goldsmith Admin", role: "Super Administrator" } });
});

// Admin Dashboard Summary Metrics GET /api/admin/stats
app.get('/api/admin/stats', adminAuth, async (req, res) => {
  res.json({
    totalProducts: memoryStore.products.length,
    publishedProducts: memoryStore.products.filter(p => p.status === 'published').length,
    totalCategories: memoryStore.categories.length,
    totalCollections: memoryStore.collections.length,
    totalOrders: memoryStore.orders.length,
    totalInquiries: memoryStore.inquiries.length,
    unreadInquiries: memoryStore.inquiries.filter(i => i.status === 'unread').length
  });
});

// Products CRUD
app.get('/api/admin/products', adminAuth, (req, res) => {
  res.json(memoryStore.products);
});

app.post('/api/admin/products', adminAuth, async (req, res) => {
  const newP = { id: req.body.id || 'prod_' + Date.now(), createdAt: new Date().toISOString(), status: 'published', ...req.body };
  if (isFirebaseInitialized) {
    try { await db.collection('products').doc(newP.id).set(newP); } catch(e){}
  }
  memoryStore.products.unshift(newP);
  res.status(201).json({ success: true, product: newP });
});

app.put('/api/admin/products/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  const idx = memoryStore.products.findIndex(p => p.id === id);
  if (idx !== -1) {
    memoryStore.products[idx] = { ...memoryStore.products[idx], ...req.body, updatedAt: new Date().toISOString() };
    if (isFirebaseInitialized) {
      try { await db.collection('products').doc(id).set(memoryStore.products[idx], { merge: true }); } catch(e){}
    }
    return res.json({ success: true, product: memoryStore.products[idx] });
  }
  res.status(404).json({ error: 'Product not found' });
});

app.delete('/api/admin/products/:id', adminAuth, async (req, res) => {
  const { id } = req.params;
  memoryStore.products = memoryStore.products.filter(p => p.id !== id);
  if (isFirebaseInitialized) {
    try { await db.collection('products').doc(id).delete(); } catch(e){}
  }
  res.json({ success: true, message: 'Product deleted' });
});

// Categories CRUD
app.get('/api/admin/categories', adminAuth, (req, res) => res.json(memoryStore.categories));
app.post('/api/admin/categories', adminAuth, (req, res) => {
  const item = { id: req.body.id || 'cat_' + Date.now(), ...req.body };
  memoryStore.categories.push(item);
  res.status(201).json({ success: true, category: item });
});
app.put('/api/admin/categories/:id', adminAuth, (req, res) => {
  const idx = memoryStore.categories.findIndex(c => c.id === req.params.id);
  if (idx !== -1) {
    memoryStore.categories[idx] = { ...memoryStore.categories[idx], ...req.body };
    return res.json({ success: true, category: memoryStore.categories[idx] });
  }
  res.status(404).json({ error: 'Not found' });
});
app.delete('/api/admin/categories/:id', adminAuth, (req, res) => {
  memoryStore.categories = memoryStore.categories.filter(c => c.id !== req.params.id);
  res.json({ success: true });
});

// Collections CRUD
app.get('/api/admin/collections', adminAuth, (req, res) => res.json(memoryStore.collections));
app.post('/api/admin/collections', adminAuth, (req, res) => {
  const item = { id: req.body.id || 'col_' + Date.now(), ...req.body };
  memoryStore.collections.push(item);
  res.status(201).json({ success: true, collection: item });
});
app.put('/api/admin/collections/:id', adminAuth, (req, res) => {
  const idx = memoryStore.collections.findIndex(c => c.id === req.params.id);
  if (idx !== -1) {
    memoryStore.collections[idx] = { ...memoryStore.collections[idx], ...req.body };
    return res.json({ success: true, collection: memoryStore.collections[idx] });
  }
  res.status(404).json({ error: 'Not found' });
});
app.delete('/api/admin/collections/:id', adminAuth, (req, res) => {
  memoryStore.collections = memoryStore.collections.filter(c => c.id !== req.params.id);
  res.json({ success: true });
});

// Hero CRUD
app.get('/api/admin/hero', adminAuth, (req, res) => res.json(memoryStore.heroSlides));
app.post('/api/admin/hero', adminAuth, (req, res) => {
  const item = { id: 'hero_' + Date.now(), ...req.body };
  memoryStore.heroSlides.push(item);
  res.status(201).json({ success: true, slide: item });
});
app.put('/api/admin/hero/:id', adminAuth, (req, res) => {
  const idx = memoryStore.heroSlides.findIndex(h => h.id === req.params.id);
  if (idx !== -1) {
    memoryStore.heroSlides[idx] = { ...memoryStore.heroSlides[idx], ...req.body };
    return res.json({ success: true, slide: memoryStore.heroSlides[idx] });
  }
  res.status(404).json({ error: 'Not found' });
});
app.delete('/api/admin/hero/:id', adminAuth, (req, res) => {
  memoryStore.heroSlides = memoryStore.heroSlides.filter(h => h.id !== req.params.id);
  res.json({ success: true });
});

// Orders & Inquiries Admin APIs
app.get('/api/admin/orders', adminAuth, (req, res) => res.json(memoryStore.orders));
app.put('/api/admin/orders/:id', adminAuth, (req, res) => {
  const idx = memoryStore.orders.findIndex(o => o.id === req.params.id || o.orderNumber === req.params.id);
  if (idx !== -1) {
    memoryStore.orders[idx].status = req.body.status || memoryStore.orders[idx].status;
    return res.json({ success: true, order: memoryStore.orders[idx] });
  }
  res.status(404).json({ error: 'Order not found' });
});

app.get('/api/admin/inquiries', adminAuth, (req, res) => res.json(memoryStore.inquiries));
app.put('/api/admin/inquiries/:id', adminAuth, (req, res) => {
  const idx = memoryStore.inquiries.findIndex(i => i.id === req.params.id);
  if (idx !== -1) {
    memoryStore.inquiries[idx].status = req.body.status || 'read';
    return res.json({ success: true, inquiry: memoryStore.inquiries[idx] });
  }
  res.status(404).json({ error: 'Inquiry not found' });
});

// Media Library Admin APIs
app.get('/api/admin/media', adminAuth, (req, res) => res.json(memoryStore.media));
app.post('/api/admin/media', adminAuth, (req, res) => {
  const item = { id: 'img_' + Date.now(), url: req.body.url, name: req.body.name || 'Jewelry Asset', uploadedAt: new Date().toISOString() };
  memoryStore.media.push(item);
  res.status(201).json({ success: true, media: item });
});

// Site Settings Admin API
app.put('/api/admin/site-settings', adminAuth, (req, res) => {
  memoryStore.siteSettings = { ...memoryStore.siteSettings, ...req.body };
  res.json({ success: true, settings: memoryStore.siteSettings });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✨ ROHM ETERNAL Express API server running on http://0.0.0.0:${PORT}`);
});
