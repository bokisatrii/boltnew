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

### 2. Environment Variables Setup

Create a `.env` file in the root directory:

```bash
# Copy the example and fill in your values
cp .env.example .env
```

Required environment variables:

```env
VITE_SHEETBEST_API_KEY=your_sheetbest_api_key_here
VITE_SPOTIFY_CLIENT_ID=your_spotify_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_spotify_client_secret_here
```

### 3. Spotify API Setup

1. **Create Spotify App**:
   - Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
   - Click "Create App"
   - Fill in app details (name, description)
   - Set redirect URI (not needed for Client Credentials flow)
   - Note down Client ID and Client Secret

2. **Configure Environment Variables**:
   - Add `VITE_SPOTIFY_CLIENT_ID` with your Client ID
   - Add `VITE_SPOTIFY_CLIENT_SECRET` with your Client Secret

### 4. Start Development Server

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

3. **Environment Variables**
   - Go to Site settings → Environment variables
   - Add: `VITE_SHEETBEST_API_KEY` with your API key
   - Add: `VITE_SPOTIFY_CLIENT_ID` with your Spotify Client ID
   - Add: `VITE_SPOTIFY_CLIENT_SECRET` with your Spotify Client Secret

4. **Deploy**
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

3. **Environment Variables**
   - Add: `VITE_SHEETBEST_API_KEY` with your API key
   - Add: `VITE_SPOTIFY_CLIENT_ID` with your Spotify Client ID
   - Add: `VITE_SPOTIFY_CLIENT_SECRET` with your Spotify Client Secret

4. **Deploy**
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

1. **Environment Variables Not Working**
   - Ensure variables start with `VITE_`
   - Restart development server after adding variables
   - Check deployment platform environment settings

2. **Spotify API Issues**
   - Verify Client ID and Client Secret are correct
   - Check if Spotify app is properly configured
   - Ensure API credentials have proper permissions

3. **Routing Issues (404 on refresh)**
   - Verify `_redirects` file for Netlify
   - Verify `vercel.json` for Vercel
   - Ensure SPA routing is properly configured

4. **Build Failures**
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
   - Check for TypeScript errors: `npm run lint`

5. **API Issues**
   - Verify API keys are correctly set
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

1. **Environment Variables**
   - Never commit `.env` files
   - Use different API keys for development/production
   - Rotate API keys regularly

2. **Spotify API Security**
   - Client Credentials are exposed in frontend (acceptable for public data)
   - Consider backend proxy for sensitive operations
   - Monitor API usage and rate limits

3. **Content Security Policy**
   - Configure CSP headers
   - Restrict external resource loading
   - Enable HTTPS only

4. **Dependencies**
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