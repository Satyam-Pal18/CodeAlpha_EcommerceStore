# CodeAlpha - E-Commerce Store (React Edition - Task 1)

[![React](https://img.shields.io/badge/Frontend-React_v18-blue.svg)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Bundler-Vite_v6-purple.svg)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Framework-Express.js-lightgrey.svg)](https://expressjs.com/)
[![SQLite](https://img.shields.io/badge/Database-SQLite3-blue.svg)](https://www.sqlite.org/)

A full-stack modern E-Commerce Store developed for **CodeAlpha Internship (Task 1)**, built with **React (Vite)** on the frontend and **Node.js + Express + SQLite** on the backend.

---

## 📁 Clean Decoupled Project Structure

```
CodeAlpha_EcommerceStore/
├── package.json              # Root package with server & client build scripts
├── .env                      # Server configuration variables
├── README.md                 # Complete task documentation
├── server/                   # Express REST API Backend
│   ├── config/
│   │   └── db.js             # SQLite database connection & schema tables
│   ├── controllers/
│   │   ├── authController.js # Registration, Login & JWT Profile controllers
│   │   ├── productController.js # Catalog, Search, Filter & Categories controllers
│   │   └── orderController.js   # Order placement & history controllers
│   ├── middleware/
│   │   ├── authMiddleware.js # JWT Auth Guard middleware
│   │   └── errorHandler.js   # Global Express error handler
│   ├── routes/
│   │   ├── authRoutes.js     # Auth API routes (/api/auth)
│   │   ├── productRoutes.js  # Product API routes (/api/products)
│   │   └── orderRoutes.js    # Order API routes (/api/orders)
│   ├── utils/
│   │   └── seedData.js       # Automatic initial product catalog seeder
│   └── server.js             # Main Express backend entry point
└── frontend/                 # React Frontend (Vite + CSS Modules/Tokens)
    ├── package.json          # React dependencies & Vite config
    ├── vite.config.js        # Vite dev server proxy (/api -> localhost:5000)
    ├── index.html            # Main HTML template
    └── src/
        ├── components/       # Modular React Components
        │   ├── Navbar.jsx    # Header with theme toggle, cart counter, auth status
        │   ├── Hero.jsx      # Landing section hero banner
        │   ├── ControlsBar.jsx # Search bar, category filter pills, sorting select
        │   ├── ProductCard.jsx # Card view with discount badges & star ratings
        │   ├── ProductGrid.jsx # Catalog grid container & loading spinner
        │   ├── CartDrawer.jsx  # Slide-over shopping cart drawer
        │   ├── AuthModal.jsx   # Login & Registration tabbed modal
        │   ├── QuickViewModal.jsx # Product specification popup
        │   ├── CheckoutModal.jsx  # Shipping details & payment form modal
        │   └── OrdersModal.jsx    # User order history status tracker
        ├── context/          # React State Providers
        │   ├── AuthContext.jsx    # JWT Auth state & login/register handlers
        │   ├── CartContext.jsx    # Cart state & localStorage sync
        │   └── ToastContext.jsx   # Floating alert notification provider
        ├── pages/
        │   └── HomePage.jsx       # Main storefront page combining components
        ├── services/
        │   └── api.js            # Client REST API fetch helper
        ├── styles/
        │   ├── main.css          # Design system CSS variables & resets
        │   └── components.css    # UI Glassmorphic styling & keyframe animations
        ├── App.jsx               # Root App wrapper with Context Providers
        └── main.jsx              # React DOM render entrypoint
```

---

## ✨ Features

- **⚡ React Component Architecture**: Modular components (`Navbar`, `Hero`, `ControlsBar`, `ProductCard`, `ProductGrid`, `CartDrawer`, `AuthModal`, `QuickViewModal`, `CheckoutModal`, `OrdersModal`).
- **🛡️ Global Context State**: Decoupled state management using `AuthContext`, `CartContext`, and `ToastContext`.
- **🔎 Dynamic Filter & Search**: Real-time keyword search, category filter pills, and sorting dropdown.
- **🛒 Persistent Cart**: Slide-over drawer with quantity controls (`+` / `-`) synced with `localStorage`.
- **🔐 JWT Auth**: Password hashing (`bcryptjs`) & JSON Web Tokens (`jsonwebtoken`).
- **📦 Order Tracking**: Complete checkout flow & user order status history.
- **🎨 Glassmorphic UI**: Custom CSS tokens with Dark/Light theme toggle.

---

## 🚀 Running the Application

### Option A: Production Full-Stack Mode (Single Port 5000)
To run both backend and static React build together:
```bash
npm start
```
Then visit `http://localhost:5000`.

### Option B: Development Mode (Vite Dev Server + Express API)
1. **Start Express Backend**:
   ```bash
   npm run dev
   ```
2. **Start React Vite Frontend** (in a separate terminal):
   ```bash
   npm run client
   ```
   Visit `http://localhost:3000` (Vite dev server proxies all `/api` requests to Express on port 5000).

---

## 🛠️ Tech Stack
- **Frontend**: React 18, Vite, Custom CSS Tokens, FontAwesome 6.
- **Backend**: Node.js, Express.js, SQLite3, JWT, Bcryptjs.
