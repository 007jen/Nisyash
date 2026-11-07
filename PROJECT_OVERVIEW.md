# Nisyash Project Overview

## 1. Project Summary

Nisyash is a corporate and personalized gifting catalog with:

- Public marketing and product pages
- Category and product search
- Quote/cart workflow
- Contact and chatbot lead capture
- Clerk-based administrator authentication
- Product, category, lead, and quote administration
- PostgreSQL persistence
- Cloudinary image storage
- Resend email notifications

The repository contains two applications:

- Frontend: React 18, TypeScript, Vite, Tailwind CSS
- Backend: Express 5, TypeScript, Prisma 7, PostgreSQL
- Authentication: Clerk
- Deployment: Vite frontend intended for Vercel, with a separate API server

## 2. Main Request Flow

```text
Browser
  -> React Router page
  -> Fetch API using VITE_API_BASE_URL
  -> Express route
  -> Prisma
  -> PostgreSQL

Administrator:
Browser -> Clerk session -> Bearer token -> Express requireAuth -> ADMIN_EMAIL verification

Submission:
Contact/chatbot/quote -> API validation -> sanitization -> PostgreSQL -> Resend email
```

## 3. Frontend Entry Points

### `src/main.tsx`

Initializes the React application and Clerk authentication.

Important configuration:

- Requires `VITE_CLERK_PUBLISHABLE_KEY`
- Configures the Clerk dark/gold theme
- Mounts the application inside React `StrictMode`

### `src/app/App.tsx`

Defines the complete route structure.

Routes include:

- `/` — chatbot gateway and landing page
- `/home`
- `/about`
- `/products`
- `/categories/:categoryId`
- `/products/:productId`
- `/quote`
- `/contact`
- `/admin`
- Unknown routes return the not-found page

The gateway stores a 24-hour unlock timestamp in `localStorage`. Admin Clerk users bypass this gateway.

### `src/app/context/QuoteContext.tsx`

Provides global quote-cart state.

Responsibilities:

- Adds/removes products
- Updates quantities
- Persists the cart in browser storage
- Emits toast notifications

Storage key: `nishyash_quote_cart`

## 4. Application Pages

| Page | Responsibility |
|---|---|
| `src/app/pages/LandingPage.tsx` | Entry gateway and onboarding experience |
| `src/app/pages/HomePage.tsx` | Main marketing homepage |
| `src/app/pages/AboutPage.tsx` | Company information |
| `src/app/pages/ProductsPage.tsx` | Complete API-backed product collection |
| `src/app/pages/CategoryPage.tsx` | Products belonging to one category |
| `src/app/pages/ProductPage.tsx` | Product details, related products, WhatsApp contact |
| `src/app/pages/QuotePage.tsx` | Quote submission from persisted quote cart |
| `src/app/pages/ContactPage.tsx` | Contact form and contact information |
| `src/app/pages/AdminPage.tsx` | Protected catalog and lead management dashboard |
| `src/app/pages/NotFoundPage.tsx` | Unknown-route page |

Several pages still define local interfaces instead of importing shared API models. This is common in the current codebase and can lead to frontend/backend type drift.

## 5. Shared Components

### `src/app/components/Header.tsx`

Handles navigation, mobile menu, category loading, product search, authentication controls, and admin navigation.

### `src/app/components/Footer.tsx`

Displays address, business contact information, navigation, and social links.

### `src/app/components/ChatBot.tsx`

Provides a guided lead-generation conversation.

After completion, it:

1. Unlocks the site gateway
2. Redirects to `/home`
3. Stores the unlock timestamp
4. Sends the collected lead to `/api/leads`

### `src/app/components/SEO.tsx`

Updates document title, description, and keywords for individual pages.

## 6. Static Product Data

`src/app/data/products.ts` contains fallback/demo categories, products, and testimonials.

The main product pages now primarily use database data. This file appears to be legacy or fallback content; it can become inconsistent if database and static records are changed independently.

## 7. UI Library

The `src/app/components/ui/` directory contains a standard Radix/shadcn-style component library:

- Accordion, dialogs, drawers, and sheets
- Buttons, inputs, cards, and labels
- Menus, tabs, tables, and tooltips
- Toast integration, charts, sliders, and forms
- Utility hooks and Tailwind class merging

These are reusable presentation primitives. They should not contain business or API logic.

## 8. Backend Entry Point

`server/src/index.ts` contains almost all API functionality.

### Infrastructure

- Express 5 application
- Helmet security headers
- Strictly configured CORS origins
- Rate limiting
- JSON request limits
- PostgreSQL connection through `pg`
- Prisma through `@prisma/adapter-pg`

### Authentication

Protected routes:

- Read the Clerk Bearer token
- Verify it using Clerk
- Extract its email
- Compare it against `ADMIN_EMAIL`

Protected resources include leads, quotes, categories, and products.

### Public API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/api/leads` | Submit a contact/chatbot lead |
| `POST` | `/api/quotes` | Submit a quote request |
| `GET` | `/api/categories` | List categories and their products |
| `GET` | `/api/products` | List products |
| `GET` | `/api/products/:id/related` | List related products |
| `GET` | `/api/search?q=` | Search products |

### Protected API

| Method | Endpoint |
|---|---|
| `POST/PATCH/DELETE` | `/api/admin/categories/...` |
| `POST/PATCH/DELETE` | `/api/admin/products/...` |
| `GET` | `/api/admin/leads` |
| `GET` | `/api/admin/quotes` |

## 9. Database

`server/prisma/schema.prisma` defines:

- `Lead`
- `Category`
- `Product`
- `QuoteRequest`
- `QuoteItem`

Relationships:

```text
Category 1 ──── N Product
QuoteRequest 1 ──── N QuoteItem
```

`QuoteItem` snapshots the requested product name while storing its product ID. This protects historical quote records from later product-name changes.

## 10. External Integrations

### `server/src/utils/cloudinary.ts`

Stores uploaded product images in the `nishyash_products` Cloudinary folder.

Images are resized to a maximum 1000 x 1000 limit.

### `server/src/utils/mailer.ts`

Uses Resend to email administrators when leads or quotes are created.

### Clerk

Used for administrator login and frontend session state.

### PostgreSQL

Stores the operational catalog, contact leads, and quote requests.

## 11. Configuration and Deployment

- `package.json` — frontend dependencies and scripts
- `vite.config.ts` — React/Tailwind build configuration
- `vercel.json` — SPA routing rewrites
- `.env.example` — frontend environment template
- `server/.env.example` — backend environment template
- `server/package.json` — API dependencies and scripts
- `guidelines/Guidelines.md` — project design guidance

## 12. Important Senior-Engineer Observations

1. The gateway is browser-side access control, not server security. It is suitable for UX, but must not protect sensitive operations.
2. Backend admin operations are correctly protected and verify Clerk tokens plus allowlisted emails.
3. Frontend route/admin checks should be treated as UX guardrails because API authorization is the actual boundary.
4. `VITE_API_BASE_URL` should have a fallback or centralized API configuration. Some pages depend on it being present.
5. `AdminPage.tsx` is large and mixes data fetching, forms, validation, CRUD actions, and rendering. Splitting it into hooks/components would reduce maintenance risk.
6. The quote page/cart still contains significant conditional or commented-out functionality.
7. Both the static product catalog and database product catalog coexist. Long-term ownership of catalog data should be clear.
8. There are many generated UI primitives but relatively little domain logic reuse in the application pages.
9. Frontend has no automated test suite in its current package configuration.
10. The frontend production bundle is approximately 609 KB and triggers a Vite chunk-size warning. Route or vendor chunk splitting would improve initial load time.

## 13. Verification

Both applications build successfully:

- Frontend: `npm run build` — passed
- Backend: `cd server && npm run build` — passed

Only the frontend Vite bundle-size warning remains.
