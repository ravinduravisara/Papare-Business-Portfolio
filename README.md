# 🚀 ThePapare Events

> **Experience Beyond Events.**  
> An Integrated Events, Creative, Production & Experiential Agency in Sri Lanka.  
> **One partner. Multiple capabilities. End-to-end execution.**

---

## 🌟 Overview

**ThePapare Events** is a modern, full-stack MERN business portfolio website built with TypeScript across the entire monorepo. It features a cinematic visual design, editorial layouts, full-bleed event imagery, server-side rendering (SSR) for search engine discovery, an Express REST API backend, MongoDB persistence, and an administration console for managing portfolio projects, services, client brands, inquiries, and media uploads.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, React Router v7 Framework (SSR Mode), Tailwind CSS, Framer Motion, GSAP, Lucide React, Axios, TanStack Query, React Hook Form, Zod, Zustand |
| **Backend** | Node.js, Express.js 4/5, TypeScript, Mongoose, Zod, express-session, connect-mongo, bcryptjs, Helmet, express-rate-limit, Cloudinary, Nodemailer |
| **Shared** | Universal TypeScript types & DTOs, Zod validation schemas (`@thepapare/shared`) |
| **Infrastructure** | Nginx reverse proxy configuration, Multi-stage Dockerfiles, Docker Compose, PM2 cluster ecosystem |
| **Testing** | Vitest, Supertest |

---

## 📂 Repository Structure

```text
thepapare-events/
├── client/                     # React Router SSR frontend application
│   ├── app/
│   │   ├── components/         # Common, layout, home, service, project, studio, & admin components
│   │   ├── hooks/              # useProjects, useServices, useAuth
│   │   ├── lib/                # api.ts (client), seo.ts
│   │   ├── routes/             # All public and admin route files
│   │   ├── root.tsx            # HTML document shell, QueryClientProvider, global layout
│   │   ├── routes.ts           # Route definitions in React Router framework mode
│   │   └── app.css             # Tailwind CSS & design tokens
│   ├── public/                 # Static assets, robots.txt, sitemap.xml, branding SVGs
│   ├── vite.config.ts          # Vite configuration
│   └── tailwind.config.js      # Color system & Space Grotesk / Sora typography
├── server/                     # Express.js REST API
│   ├── src/
│   │   ├── config/             # env.ts, db.ts, cloudinary.ts
│   │   ├── controllers/        # auth, project, service, client, inquiry, media, settings
│   │   ├── middleware/         # auth, validate, rateLimiter, errorHandler
│   │   ├── models/             # Mongoose models (Project, Service, Client, Inquiry, etc.)
│   │   ├── routes/             # API routes mounted at /api/v1
│   │   ├── seeds/              # Idempotent database content seeding
│   │   ├── services/           # emailService, mediaService
│   │   ├── app.ts              # Express application setup & middleware
│   │   └── server.ts           # Server bootstrap & graceful shutdown
├── packages/
│   └── shared/                 # Universal TypeScript types and Zod validation schemas
├── infrastructure/
│   ├── nginx/thepapare.conf    # Nginx reverse proxy & SSL config
│   ├── docker/                 # web.Dockerfile and api.Dockerfile
│   └── pm2/ecosystem.config.js # PM2 process management config
├── docs/                       # ARCHITECTURE.md, API_SPECIFICATION.md, DEPLOYMENT_GUIDE.md
├── docker-compose.yml          # Container orchestration (MongoDB + API + Web)
├── .env.example                # Example environment variables
└── README.md
```

---

## ⚡ Quickstart & Local Development

### 1. Prerequisites
- Node.js v22+
- npm v10+
- MongoDB (local or Atlas URI)

### 2. Installation
```bash
git clone <repository_url>
cd thepapare-events
cp .env.example .env
npm install
```

### 3. Build Shared Package & Server
```bash
npm run build --workspace=@thepapare/shared
```

### 4. Seed Verified Business Content & Initial Admin
```bash
npm run seed
```

### 5. Start Development Servers
```bash
# Starts both Express API (port 5000) and React Router SSR (port 5173) concurrently
npm run dev

# Or run separately:
npm run dev:server
npm run dev:client
```

- **Frontend Public Site**: [http://localhost:5173](http://localhost:5173)
- **REST API Server**: [http://localhost:5000/api/v1](http://localhost:5000/api/v1)
- **Admin Console**: [http://localhost:5173/admin/login](http://localhost:5173/admin/login)
  - Default Email: `admin@thepapare.events`
  - Default Password: `AdminPapare2026!Secure` (configured in `.env`)

---

## 🧪 Testing & Verification

```bash
# Run tests across workspaces
npm run test

# Run TypeScript typechecks across workspaces
npm run typecheck

# Production build test
npm run build
```

---

## 🌐 Public Routes

- **`/`** — Cinematic Homepage (Hero, Who We Are, 6 Capabilities, Selected Work, Integrated Approach, Client Logos, ThePapare Studios, Process, CTA, Footer).
- **`/about`** — Company Overview, 6 Core Strengths, Sectors We Work With.
- **`/services`** — Capabilities Overview with interactive service cards.
- **`/services/:slug`** — Dynamic Service Detail pages (Events & Experiences, Event Production, Creative Solutions, Video Production, Social Content, Studios).
- **`/projects`** — Filterable Portfolio Grid with status indicators (Automotive Experiences, Corporate Events, Themed Events, Fan Engagement, Brand Activations).
- **`/projects/:slug`** — Dynamic Project Case Studies (Scope of Work, production gallery with lightbox, related works).
- **`/studios`** — Dedicated ThePapare Studios page with equipment and gallery lightbox.
- **`/our-approach`** — Interactive 5-stage methodology (Discover, Develop, Plan, Execute, Extend).
- **`/contact`** — Lead generation inquiry form with Zod validation, rate limiting, and MongoDB persistence.
- **`/privacy`** — Corporate Privacy Policy.

---

## 🔐 Administration Console Routes

- **`/admin/login`** — Secure authentication console.
- **`/admin/dashboard`** — Real-time overview metrics and recent inquiry activity.
- **`/admin/projects`** — Project CRUD, cover upload, feature flag toggle, publish/draft control.
- **`/admin/services`** — Capability management and description editing.
- **`/admin/clients`** — Verified brand partner logo and ordering management.
- **`/admin/inquiries`** — Lead management, filtering, detail inspection, status updates.
- **`/admin/media`** — Cloudinary asset library upload and clipboard URL copy.
- **`/admin/settings`** — Global company metadata and technical SEO defaults.

---

## 📄 License
&copy; 2026 ThePapare Events. All rights reserved.

