import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

// Lazy load pages for better performance
const Home = React.lazy(() => import('./pages/Home'));
const League = React.lazy(() => import('./pages/League'));
const News = React.lazy(() => import('./pages/News'));
const NewsDetail = React.lazy(() => import('./pages/NewsDetail'));
const Podcast = React.lazy(() => import('./pages/Podcast'));
const Register = React.lazy(() => import('./pages/Register'));
const Contact = React.lazy(() => import('./pages/Contact'));

// New Category Pages
const NBA = React.lazy(() => import('./pages/NBA'));
const Europe = React.lazy(() => import('./pages/Europe'));
const TV = React.lazy(() => import('./pages/TV'));
const CornerThree = React.lazy(() => import('./pages/CornerThree'));

// NCAA Pages
const ProspectWatch = React.lazy(() => import('./pages/ncaa/ProspectWatch'));
const WhatIsNIL = React.lazy(() => import('./pages/ncaa/WhatIsNIL'));

// Fantasy Pages
const FantasyUpdates = React.lazy(() => import('./pages/fantasy/Updates'));
const Division1 = React.lazy(() => import('./pages/fantasy/Division1'));
const Division2 = React.lazy(() => import('./pages/fantasy/Division2'));
const WTFisFantasy = React.lazy(() => import('./pages/fantasy/WTFisFantasy'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Main Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/league" element={<League />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:slug" element={<NewsDetail />} />
                <Route path="/podcast" element={<Podcast />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />

                {/* Category News Pages */}
                <Route path="/nba" element={<NBA />} />
                <Route path="/europe" element={<Europe />} />
                <Route path="/tv" element={<TV />} />
                <Route path="/cornerthree" element={<CornerThree />} />

                {/* NCAA Pages */}
                <Route path="/ncaa/prospect-watch" element={<ProspectWatch />} />
                <Route path="/ncaa/what-is-nil" element={<WhatIsNIL />} />

                {/* Fantasy Pages */}
                <Route path="/fantasy/updates" element={<FantasyUpdates />} />
                <Route path="/fantasy/division-1" element={<Division1 />} />
                <Route path="/fantasy/division-2" element={<Division2 />} />
                <Route path="/fantasy/wtf-is-fantasy" element={<WTFisFantasy />} />

                {/* 404 Page */}
                <Route
                  path="*"
                  element={
                    <div className="pt-32 pb-16 text-center">
                      <div className="container">
                        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                        <p className="text-xl text-gray-600 mb-8">Page not found</p>
                        <a href="/" className="btn btn-primary">
                          Back to Home
                        </a>
                      </div>
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
