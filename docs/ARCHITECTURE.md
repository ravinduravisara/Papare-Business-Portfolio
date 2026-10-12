# 🏛️ Architecture Documentation: ThePapare Events

## 1. High-Level System Architecture

ThePapare Events is built as an enterprise-grade full-stack MERN monorepo using TypeScript across all layers. The application adheres to a decoupled architecture where the public-facing React Router SSR frontend, the Express REST API backend, and shared domain models operate with high cohesion and loose coupling.

```
                               ┌────────────────────────────────┐
                               │       Internet / Visitors      │
                               └───────────────┬────────────────┘
                                               │
                                               ▼ HTTPS (Port 443)
                               ┌────────────────────────────────┐
                               │          Nginx Proxy           │
                               └───────┬────────────────┬───────┘
                                       │                │
            Routes /api/* to API       │                │ All other routes to SSR Web
                                       ▼                ▼
                       ┌──────────────────────┐  ┌──────────────────────┐
                       │  Node.js / Express   │  │ React Router v7 SSR  │
                       │   REST API Backend   │  │   Frontend Service   │
                       │     (Port 5000)      │  │     (Port 3000)      │
                       └───────────┬──────────┘  └───────────┬──────────┘
                                   │                         │
                                   │ Internal API / SSR Fetch│
                                   ├─────────────────────────┘
                                   │
               ┌───────────────────┴───────────────────┐
               │                                       │
               ▼                                       ▼
    ┌──────────────────────┐               ┌──────────────────────┐
    │    MongoDB Atlas     │               │  Cloudinary / Media  │
    │  (Documents & Data)  │               │     Asset Store      │
    └──────────────────────┘               └──────────────────────┘
```

---

## 2. Monorepo Organization

The project uses npm workspaces to manage three first-class packages:

```
papare/
├── client/              # React Router Framework (SSR mode) frontend application
│   ├── app/             # Application routes, components, hooks, styles, and libraries
│   │   ├── components/  # Atomic, common, layout, home, service, project, studio, & admin components
│   │   ├── hooks/       # TanStack Query & custom hooks (useProjects, useServices, useAuth)
│   │   ├── lib/         # API client and SEO helpers
│   │   └── routes/      # All public and admin route pages
│   ├── public/          # Static assets (favicons, robots.txt, sitemap.xml, branding)
│   ├── vite.config.ts   # Vite configuration with React Router plugin
│   └── tailwind.config  # Design tokens (colors, typography clamp, Space Grotesk)
├── server/              # Express.js REST API backend
│   ├── src/
│   │   ├── config/      # Environment validation, MongoDB connection, Cloudinary config
│   │   ├── controllers/ # HTTP controller handlers
│   │   ├── middleware/  # Rate limiting, auth, Zod validation, error handling
│   │   ├── models/      # Mongoose schemas (Projects, Services, Clients, Inquiries, etc.)
│   │   ├── routes/      # API endpoints under /api/v1
│   │   ├── seeds/       # Idempotent content seeder with initial business content
│   │   └── services/    # Email dispatch (Nodemailer) and media storage (Cloudinary)
├── packages/shared/     # Universal TypeScript models and Zod schemas
│   ├── src/types.ts     # DTOs (ProjectDTO, ServiceDTO, InquiryDTO, ClientDTO, etc.)
│   └── src/schemas.ts   # Zod validation schemas for forms and API requests
├── infrastructure/      # Deployment configs (Nginx, Dockerfiles, PM2 ecosystem)
└── docs/                # Architecture, API specifications, and deployment guides
```

---

## 3. Frontend Architecture

- **React Router Framework Mode**: Server-side rendering (SSR) enabled for immediate search engine visibility, canonical URLs, and Open Graph previews.
- **Styling & Design System**: Tailwind CSS extended with custom agency design tokens:
  - Primary Dark: `#0B0B0F`
  - Secondary Dark: `#17171D`
  - Vibrant Accent: `#E63946`
  - Typography: Space Grotesk (display headings), Sora (subheadings), Inter (body text).
- **Motion & Interactions**: Motion for React (`framer-motion`) and GSAP for cinematic entrance sequences, scroll reveals, and interactive project hover transitions.
- **State Management**: TanStack Query for server state caching and optimistic updates, Zustand for client session tracking.
- **Form Management**: React Hook Form coupled with Zod schemas for accessible, type-safe client-side validation.

---

## 4. Backend Architecture

- **Express REST API**: Clean route-controller-service separation mounted under `/api/v1`.
- **Database Layer**: MongoDB with Mongoose ODM models incorporating unique indexes on slugs, display order sorting, and automated timestamps.
- **Authentication**: Stateful session-based authentication using `express-session`, `connect-mongo`, and `bcryptjs` for secure password hashing.
- **Security & Reliability**:
  - `helmet` headers for security.
  - Granular `express-rate-limit` (general API, strict authentication, and inquiry submissions).
  - CORS with credentials support.
  - Centralized error handling and safe logging without leaking stack traces.

