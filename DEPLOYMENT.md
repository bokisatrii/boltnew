# BasketLiga Deployment Guide

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

## 🔧 Local Development Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd basket-liga-website
npm install
```

### 2. Configuration

No environment variables are required. Content is loaded from Google Apps Script endpoints (see `src/services/`), and the Spotify player is an embed.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🌐 Deployment Options

### Option 1: Netlify Deployment

#### Automatic Deployment (Recommended)

1. **Connect Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub/GitLab repository

2. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Deploy**
   - Netlify will automatically deploy on every push to main branch

#### Manual Deployment

```bash
# Build the project
npm run build

# Install Netlify CLI (if not installed)
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### Option 2: Vercel Deployment

#### Automatic Deployment (Recommended)

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

2. **Build Settings**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

3. **Deploy**
   - Vercel will automatically deploy on every push

#### Manual Deployment

```bash
# Build the project
npm run build

# Install Vercel CLI (if not installed)
npm install -g vercel

# Deploy to Vercel
vercel --prod
```

## 🔄 Deployment Differences

### Netlify vs Vercel

| Feature | Netlify | Vercel |
|---------|---------|---------|
| **Build Time** | ~2-3 minutes | ~1-2 minutes |
| **CDN** | Global CDN | Edge Network |
| **SPA Routing** | `_redirects` file | `vercel.json` |
| **Environment Variables** | Site Settings UI | Project Settings UI |
| **Custom Domains** | Free on all plans | Free on all plans |
| **Analytics** | Available | Available |

### Configuration Files

- **Netlify**: Uses `public/_redirects` for SPA routing
- **Vercel**: Uses `vercel.json` for routing and headers

## 🚀 Useful Commands

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

### Deployment

```bash
# Build and deploy to Netlify
npm run build && netlify deploy --prod --dir=dist

# Build and deploy to Vercel
npm run build && vercel --prod

# Quick preview deployment (Vercel)
vercel
```

## 🔍 Troubleshooting

### Common Issues

1. **Routing Issues (404 on refresh)**
   - Verify `_redirects` file for Netlify
   - Verify `vercel.json` for Vercel
   - Ensure SPA routing is properly configured

2. **Build Failures**
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check for TypeScript errors: `npm run lint`

3. **Data Not Loading**
   - Check that the Google Apps Script web apps are still deployed and public
   - Check network connectivity
   - Review browser console for errors

### Performance Optimization

1. **Bundle Analysis**
   ```bash
   npm run build -- --analyze
   ```

2. **Image Optimization**
   - Use WebP format when possible
   - Implement lazy loading for images
   - Optimize image sizes for different screen sizes

3. **Caching Strategy**
   - Static assets are cached for 1 year
   - API responses are cached for 5 minutes
   - Service worker can be added for offline support

## 📊 Monitoring

### Analytics Setup

1. **Google Analytics**
   - Add tracking ID to environment variables
   - Implement GA4 tracking

2. **Performance Monitoring**
   - Use Lighthouse for performance audits
   - Monitor Core Web Vitals
   - Set up error tracking (Sentry, LogRocket)

### Health Checks

- Monitor API endpoint availability
- Set up uptime monitoring
- Configure alerts for deployment failures

## 🔐 Security Considerations

1. **Secrets**
   - Never commit API keys or `.env` files; this is a frontend app, so anything in the bundle is public
   - Keep sensitive operations behind a backend or serverless function

2. **Content Security Policy**
   - Configure CSP headers
   - Restrict external resource loading
   - Enable HTTPS only

3. **Dependencies**
   - Regularly update dependencies
   - Run security audits: `npm audit`
   - Use dependabot for automated updates

## 📝 Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Spotify Web API Documentation](https://developer.spotify.com/documentation/web-api/)
- [Netlify Documentation](https://docs.netlify.com/)
- [Vercel Documentation](https://vercel.com/docs)