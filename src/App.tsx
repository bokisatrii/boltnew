import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react'; // 👈 ovde dodato

// Lazy load stranica za bolju performance
const Home = React.lazy(() => import('./pages/Home'));
const League = React.lazy(() => import('./pages/League'));
const News = React.lazy(() => import('./pages/News'));
const NewsDetail = React.lazy(() => import('./pages/NewsDetail'));
const Podcast = React.lazy(() => import('./pages/Podcast'));
const Register = React.lazy(() => import('./pages/Register'));
const Contact = React.lazy(() => import('./pages/Contact'));

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/league" element={<League />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:slug" element={<NewsDetail />} />
                <Route path="/podcast" element={<Podcast />} />
                <Route path="/register" element={<Register />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="*"
                  element={
                    <div className="section text-center">
                      <h1 className="text-4xl font-bold mb-4">404</h1>
                      <p className="text-xl mb-8">Stranica nije pronađena</p>
                      <a href="/" className="btn btn-primary">
                        Nazad na početnu
                      </a>
                    </div>
                  }
                />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <Analytics /> {/* 📈 */}
        <SpeedInsights /> {/* 🚀 */}
      </Router>
    </ErrorBoundary>
  );
}

export default App;