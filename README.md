<div align="center">

<img src="public/goonj_entertainment.png" alt="Goonj Entertainment" width="180" />

# Goonj Entertainment

### Premium Event Management & Live Entertainment Platform

[![Live Site](https://img.shields.io/badge/Live%20Site-goonjentertainment-orange?style=for-the-badge&logo=vercel)](https://goonjentertainment.com)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

</div>

---

## Overview

Goonj Entertainment is a full-featured web platform for a premium event management company based in India. The platform covers two distinct brands under one roof:

- **Goonj Entertainment** — Live music, celebrity bookings, artist management, and corporate/college events
- **Bandhan by Goonj** — Wedding planning, destination weddings, decor, catering, photography, and fashion shows

The site is built for performance with lazy-loaded routes, Instagram feed integration, a quotation cart system, and a rich media gallery.

---

## Features

**Goonj Entertainment**
- Live artist showcase with Instagram integration
- Celebrity artist booking with modal profiles
- Artist likes & comments (Supabase-powered)
- Service pages with animated hero sliders
- Quotation cart — build and export event quotes as PDF
- Partner brands section
- WhatsApp quick-connect CTA

**Bandhan by Goonj**
- Dedicated sub-brand with its own theme, nav, and routing
- Services: Destination Weddings, Corporate Events, Catering, Photography, Stage Setup, Talent & Fashion
- Decor portfolio & concept showcase
- Service enquiry forms
- Photo gallery organized by event category

**Platform-wide**
- Fully responsive, mobile-first design
- Framer Motion animations throughout
- Dark/light theme with smooth transitions
- Instagram feed with smart caching & refresh scripts
- Privacy Policy & Terms of Service pages

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 6 |
| Styling | Tailwind CSS + shadcn/ui (Radix UI) |
| Animations | Framer Motion |
| Backend | Supabase (DB + Edge Functions) |
| Data Fetching | TanStack React Query v5 |
| Forms | React Hook Form + Zod |
| PDF Export | jsPDF + html2canvas |
| Routing | React Router v6 |
| Testing | Vitest + Testing Library |

---

## Project Structure

```
src/
├── assets/              # Static images & brand assets
├── components/
│   ├── artists/         # Artist cards, modals, celebrity profiles
│   ├── bandhan/         # All Bandhan sub-brand components
│   │   ├── home/        # Hero, intro, testimonials, partners
│   │   ├── services/    # Decor portfolio, photography, enquiry forms
│   │   └── data/        # Services data & image configs
│   ├── layout/          # MainNav, BandhanNav, CategoryNav, Footer
│   ├── quotation/       # Quotation cart, preview modal, PDF export
│   ├── sections/        # Homepage sections (hero, services, Instagram, etc.)
│   └── ui/              # shadcn/ui component library
├── context/             # QuotationCartContext
├── data/                # Quotation & artist data
├── lib/                 # Supabase client, Instagram prefetch, utilities
├── pages/
│   ├── bandhan/         # Bandhan sub-brand pages & service routes
│   ├── Index.tsx        # Goonj homepage
│   ├── Artists.tsx
│   ├── Services.tsx
│   ├── Quotation.tsx
│   └── ...
public/
├── gallery/             # Event gallery images (Wedding, Corporate, Concert, etc.)
├── Brands/              # Partner brand logos
└── Team/                # Team photos
scripts/                 # Instagram cache management & monitoring scripts
```

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A [Supabase](https://supabase.com) project

### Setup

```bash
# Clone the repo
git clone https://github.com/your-org/goonj-entertainment.git
cd goonj-entertainment

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Development

```bash
npm run dev
```

### Build & Preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

### Tests

```bash
npm test
```

---

## Instagram Integration

The platform fetches and caches Instagram posts via a Supabase Edge Function. Several utility scripts are available:

```bash
# Check cache health
npm run cache:health

# View cache stats
npm run cache:stats

# Refresh cache
npm run cache:refresh

# Force refresh
npm run cache:refresh:force

# Warm up cache
npm run cache:warm

# Monitor refresh activity
npm run monitor:instagram
```

---

## Deployment

The project is deployed on [Vercel](https://vercel.com). To deploy manually:

```bash
npm run build
# Deploy the dist/ folder to your hosting provider
```

A `.vercelignore` is included to exclude dev-only files from the Vercel build.

---

## Routes

| Path | Page |
|---|---|
| `/` | Goonj Homepage |
| `/about` | About Goonj |
| `/services` | Services Overview |
| `/services/:slug` | Service Detail |
| `/artists` | Artist Roster |
| `/quotation` | Quotation Builder |
| `/contact` | Contact |
| `/bandhan` | Bandhan Homepage |
| `/bandhan/services` | Bandhan Services |
| `/bandhan/gallery` | Event Gallery |
| `/bandhan/destination-weddings` | Destination Weddings |
| `/bandhan/corporate-events` | Corporate Events |
| `/bandhan/photography` | Photography |
| `/bandhan/catering` | Catering |
| `/bandhan/stage-setup` | Stage Setup |
| `/bandhan/talent-fashion` | Talent & Fashion |
| `/bandhan/contact` | Bandhan Contact |

---

## License

© 2026 Goonj Entertainment. All rights reserved.
