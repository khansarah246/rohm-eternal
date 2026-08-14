# ROHM ETERNAL — High Jewelry Salon & Dynamic E-Commerce CMS

A full-stack, dynamic luxury jewelry e-commerce web application and Content Management System (CMS) featuring a **"Cinematic Dark Luxury"** aesthetic, glassmorphic UI, Express.js backend REST API, and Firebase Firestore integration.

## 💎 Architecture Overview

- **Frontend**: React 18, Vite, Tailwind CSS, Material Symbols, Playfair Display & Montserrat typography.
- **Backend**: Node.js, Express.js REST API with Admin authentication (`/api/admin/*`) and public data endpoints (`/api/*`).
- **Database**: Firebase Firestore with Admin SDK integration (featuring local memory fallback mode for local development).
- **Admin Dashboard**: Full CRUD & CMS system accessible at `/admin` for managing Products, Categories, Collections, Hero Banners, Homepage Sections, FAQ, Testimonials, Navigation, Footer, About story, Policies, Media, and Client Inquiries.

---

## 📁 Repository Structure

```
rohm_eternal/
├── frontend/             # React + Vite Frontend Application & Admin Dashboard
│   ├── src/
│   │   ├── admin/        # CMS Admin Dashboard & Authentication Components
│   │   ├── components/   # Reusable Storefront Components (Header, Footer, ProductCard, etc.)
│   │   ├── context/      # React Context (Cart, Wishlist, Navigation state)
│   │   └── pages/        # Storefront Pages (Home, Shop, ProductDetails, About, Contact, etc.)
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
├── backend/              # Node.js + Express REST API Server
│   ├── data/             # Master seed datasets & catalog schemas
│   ├── firebase.js       # Firebase Admin SDK Initialization
│   ├── server.js         # Express REST API Server & Admin Routes
│   └── package.json
├── .gitignore            # Git exclusion definitions for secrets & build outputs
├── .env.example          # Environment variable template
└── README.md
```

---

## 🚀 Quick Start & Installation

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm start
```
- Express API server runs at: `http://localhost:5000`

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
- Storefront runs at: `http://localhost:3000`
- Admin Dashboard available at: `http://localhost:3000/admin` (Default Credentials: `admin` / `admin123`)

---

## 🛡️ Security & Credentials Policy

Secret credentials (`serviceaccountkey.json`, `.env`, private keys) are intentionally excluded from version control via `.gitignore`. Store local credentials safely on your development machine.
