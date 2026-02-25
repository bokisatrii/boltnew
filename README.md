# Corner Three - Basketball Podcast & Fantasy League Website

A modern basketball news, podcast, and fantasy league website built with React, TypeScript, and Tailwind CSS.

## 🏀 Features

- **TheRinger.com-inspired design** - Clean, editorial magazine-style layout
- **Category-based news filtering** - NBA, NCAA, Europe, Fantasy, TV, Corner Three originals
- **Fantasy Basketball League** - Yahoo Fantasy integration with standings
- **Podcast Integration** - Spotify and Podcast.rs embeds
- **Responsive Design** - Mobile-first approach with desktop enhancements
- **SEO Optimized** - Full meta tags, structured data, and semantic HTML

## 📁 Project Structure

```
corner_three_website/
├── public/                 # Static assets
├── src/
│   ├── components/
│   │   ├── home/          # Homepage components
│   │   ├── layout/        # Header, Footer
│   │   ├── league/        # League standings components
│   │   ├── news/          # News grid and category components
│   │   ├── podcast/       # Podcast components
│   │   ├── register/      # Registration form
│   │   └── ui/            # Reusable UI components
│   ├── data/              # Static data (matches, stats, teams)
│   ├── hooks/             # Custom React hooks
│   ├── pages/
│   │   ├── ncaa/          # NCAA pages
│   │   └── fantasy/       # Fantasy pages
│   ├── services/          # API services (blogApi, googleSheetsApi)
│   └── types/             # TypeScript types
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd corner_three_website

# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview  # Preview the production build
```

## 📄 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage with featured articles and The Latest section |
| `/news` | All news with category filter |
| `/news/:slug` | Individual article page |
| `/nba` | NBA news |
| `/europe` | European basketball news |
| `/tv` | TV & Media news |
| `/cornerthree` | Corner Three originals |
| `/ncaa/prospect-watch` | NBA draft prospects |
| `/ncaa/what-is-nil` | NIL explainer |
| `/fantasy/updates` | Fantasy basketball news |
| `/fantasy/division-1` | Division 1 standings |
| `/fantasy/division-2` | Division 2 standings |
| `/fantasy/wtf-is-fantasy` | Fantasy basketball guide |
| `/podcast` | Podcast page with Spotify embed |
| `/league` | Fantasy league standings |
| `/register` | Team registration |
| `/contact` | Contact page |

## 🔌 API Integration

### Google Sheets Blog API

The blog content is fetched from Google Sheets via a Google Apps Script API. Articles include:
- `naslov` - Title
- `datum` - Date
- `tekst` - Content text
- `slika` - Image URL
- `slug` - URL slug
- `autor` - Author
- `category` - Comma-separated categories (nba, ncaa, europe, fantasy, tv, cornerthree)

### Yahoo Fantasy Integration

League standings are fetched from Yahoo Fantasy via Google Sheets integration.

## 🎨 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Routing
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Phosphor Icons** - Additional icons
- **React Helmet Async** - SEO
- **React Hook Form** - Forms
- **Vercel Analytics** - Analytics

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

The `vercel.json` includes SPA rewrites for client-side routing.

### Manual Deployment

```bash
npm run build
# Upload the 'dist' folder to your hosting provider
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Mobile navigation with expandable dropdowns
- Desktop navigation with hover dropdowns

## 🔗 External Links

- YouTube: https://www.youtube.com/@trojkaizcoska
- Instagram: https://www.instagram.com/trojkaizcoska_
- Twitter: https://twitter.com/trojkaizcoska
- Spotify Podcast: https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ

## 📝 Environment Variables

No environment variables required for basic functionality. The API URLs are configured in the service files.

## 📜 License

Private project - All rights reserved.

---

Built with ❤️ by Bogdan Terzic
