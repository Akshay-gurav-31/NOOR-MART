# NOOR MART | Premium Digital Atelier

A high-end, full-stack e-commerce platform designed for luxury fashion. Built with a focus on editorial aesthetics, a seamless Single-Page Experience, and a professional-grade codebase. 

![Noor Mart Cover](https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2000)

## 🌙 Concept: "The Silent Curator"
NOOR MART is designed on the philosophy that luxury is found in minimalist excellence. The UI treats the digital screen as a gallery space, utilizing intentional asymmetry, glassmorphism, and high-contrast typography to create a bespoke shopping experience.

---

## 🛠 Tech Stack

### Frontend
- **React + Vite**: For a lightning-fast developer experience and production performance.
- **Tailwind CSS v4**: Utilizing the latest CSS-first configuration and high-performance engine.
- **Framer Motion**: Powering the smooth, spring-based animations and layout transitions.
- **Lucide React**: For crisp, minimalist iconography.

### Backend & Database
- **Node.js + Express**: A scalable REST API architecture.
- **Supabase (PostgreSQL)**: Managed database with built-in Authentication and robust Row-Level Security (RLS).
- **Concurrently**: Single-command startup for the local full-stack environment.

---

## ✨ Features
- **Editorial Single-Page UI**: A highly optimized scrolling journey that integrates Collections, Gallery, and Home into one fluid experience.
- **Pro-Level Authentication**: Secure email login and a dedicated, premium Member Profile dashboard.
- **Persistent Cart**: Shopping bags are synced directly to Supabase, meaning items stay in your bag across devices.
- **Intelligent Scroll Memory**: The site remembers exactly where you were when you refresh, preventing jarring jumps.
- **Custom Toast System**: Beautiful, animated notifications that replace ugly browser alerts.
- **Glassmorphic Cart Sidebar**: A smooth, slide-out sidebar for a tactile shopping experience.

---

## 🚀 Deployment Guide (Vercel + Supabase)

You can easily deploy this entire stack for free.

### 1. Frontend (Vercel)
The React app is 100% ready for Vercel.
1. Push your code to GitHub.
2. Go to [Vercel](https://vercel.com) and import the repository.
3. Set the Framework Preset to **Vite**.
4. Set the Root Directory to `frontend`.
5. Add your Environment Variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_API_URL`).
6. Click **Deploy**.

### 2. Backend (Railway or Render)
While Vercel *can* run Express, it's highly recommended to use **Railway.app** or **Render.com** for standard Node.js Express backends.
1. Create a new Web Service on Railway/Render.
2. Point it to your GitHub repository and set the Root Directory to `backend`.
3. Add your Supabase keys to the Environment Variables.
4. Deploy! (Update your Frontend's `VITE_API_URL` to point to this new backend URL).

### 3. Database (Supabase)
1. Run the `docs/noor_mart_master.sql` script in your Supabase SQL Editor to instantly set up all tables, security policies, and premium seed products.
2. **Important:** Add your deployed Frontend URL to your Supabase project's **Authentication -> URL Configuration** (Site URL and Redirect URLs) so logins work in production.

---

## 💻 Local Setup

Run the following commands in the root directory:
```bash
# Install all dependencies (root, backend, and frontend)
npm run install-all

# Start the full-stack app (Backend + Frontend)
npm run dev
```

---

## 🎨 Design System
- **Primary Elements**: Obsidian Black & Crisp White
- **Typography**: Editorial layout with wide tracking (`0.3em`)
- **Effect**: Premium Backdrop Blur (Glassmorphism)

---
*Crafted with tactile excellence for the modern connoisseur.*
