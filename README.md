# Trojka iz ćoška

Website for **Trojka iz ćoška**, a Serbian basketball podcast and fantasy basketball league. It brings the podcast, league standings, news/blog and team registration together in one fast, mobile-friendly single-page app. The UI is in Serbian.

Live site: <https://trojkaizcoska.com>

## Features

- **Home** – hero section, animated league stats counters and the latest news.
- **League** (`/league`) – fantasy league standings table with playoff indicators, plus featured and upcoming matches.
- **News** (`/news`, `/news/:slug`) – blog with category filtering (NBA, Europe, fantasy, NCAA) and article detail pages.
- **Podcast** (`/podcast`) – embedded Spotify player and episode list (SociableKit widget), with links to listening platforms.
- **Register** (`/register`) – team registration form with validation and logo upload preview.
- **Contact** (`/contact`) – contact page.
- **SEO** – per-page meta tags (react-helmet-async), Open Graph/Twitter cards, schema.org structured data, breadcrumbs, `sitemap.xml` and `robots.txt`.
- **Performance** – lazy-loaded routes, vendor chunk splitting, in-memory API caching, Vercel Analytics and Speed Insights.

## Tech stack

| Area | Tools |
|------|-------|
| Framework | React 18, TypeScript, Vite 5 |
| Routing | React Router 6 |
| Styling | Tailwind CSS 3 (+ typography plugin), PostCSS, Autoprefixer |
| Animation & icons | Framer Motion, Lucide React, Phosphor Icons |
| Forms | React Hook Form |
| SEO | React Helmet Async |
| Analytics | Vercel Analytics, Vercel Speed Insights |
| Tooling | ESLint 9, typescript-eslint |

## Getting started

Requirements: **Node.js 18+** and npm.

```bash
git clone https://github.com/bokisatrii/boltnew.git
cd boltnew
npm install
npm run dev
```

The dev server runs at <http://localhost:5173>.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Project structure

```
├── public/                 # Static assets: favicon, robots.txt, sitemap.xml, _redirects
├── src/
│   ├── components/
│   │   ├── home/           # Hero, LatestNews, StatsCounter
│   │   ├── layout/         # Header, Footer
│   │   ├── league/         # StandingsTable, FeaturedMatch, UpcomingMatches
│   │   ├── news/           # NewsGrid
│   │   ├── podcast/        # EpisodeCard, PlatformButton
│   │   ├── register/       # RegistrationForm
│   │   └── ui/             # AnimatedCounter, AnimatedSection, Breadcrumb, LoadingSpinner
│   ├── data/               # Static data (matches, stats, teams)
│   ├── hooks/              # useBlog, useSpotifyEpisodes
│   ├── pages/              # Home, League, News, NewsDetail, Podcast, Register, Contact
│   ├── services/           # blogApi, googleSheetsApi, spotifyApi
│   ├── types/              # Shared TypeScript types
│   ├── App.tsx             # Routes, error boundary, analytics
│   └── main.tsx
├── vercel.json             # SPA rewrite + cache headers for Vercel
├── vite.config.ts
└── DEPLOYMENT.md           # Detailed deployment guide
```

## Data sources

The site has no dedicated backend. Content comes from lightweight services:

- **League standings** – a Google Sheet (Yahoo Fantasy standings) exposed through a Google Apps Script web app (`src/services/googleSheetsApi.ts`). Responses are cached for 3 minutes, with a CORS-proxy retry and static fallback data if the request fails.
- **Blog posts** – a Google Apps Script web app (`src/services/blogApi.ts`) with a 5-minute cache, several CORS proxy fallbacks and built-in mock posts as a last resort.
- **Podcast** – Spotify embed and a SociableKit widget on the Podcast page. `spotifyApi.ts` only provides mock episode data and helpers.
- **Registration** – the form currently validates and shows a success state on the client only; submissions are not yet sent to a backend.

## Product & workflow decisions

- **Google Sheets as a no-code CMS.** League standings and blog posts live in Google Sheets and are published through Google Apps Script endpoints, so non-technical editors can update content without touching code or triggering a deploy.
- **Resilience over perfection.** Every data source has a cache and a fallback (proxy retry, stale cache, then static/mock data), so the site never shows a blank page if an external service is down.
- **Zero-backend, low-cost stack.** Static SPA on Vercel with no servers or databases to maintain.
- **Built for discoverability.** Meta tags, Open Graph cards, schema.org data, sitemap and per-page titles support organic search for a Serbian-language audience.
- **Measured from day one.** Vercel Analytics and Speed Insights are included to track traffic and Core Web Vitals.

## Roadmap ideas

- Send team registrations to a Google Sheet/CRM and trigger a confirmation email (currently client-side only).
- Automate podcast episode updates from the Spotify RSS feed.

## Deployment

The app is a static SPA and deploys well to **Vercel** (recommended, configured via `vercel.json`) or **Netlify** (`public/_redirects` handles SPA routing).

- Build command: `npm run build`
- Output directory: `dist`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for step-by-step instructions, troubleshooting and security notes.

## Author

Made by **Bogdan Terzic**.
