import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Newspaper, Mic, Trophy, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);       // prati scroll
  const [isMenuOpen, setIsMenuOpen] = useState(false);       // mobilni meni
  const [isFantasyOpen, setIsFantasyOpen] = useState(false); // desktop dropdown

  // HERO logika (čista kao u C)
  const heroRoutes = ['/', '/podcast'];
  const onHeroTop = heroRoutes.includes(location.pathname) && !isScrolled;

  // Scroll handler (glatko, bez reflow “bucanja”)
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Zatvaranje menija pri promeni rute
  useEffect(() => {
    setIsMenuOpen(false);
    setIsFantasyOpen(false);
  }, [location.pathname]);

  // Body lock + ESC za mobilni meni i dropdown
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false);
        if (isFantasyOpen) setIsFantasyOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isFantasyOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen((s) => !s), []);

  // Aktivni link — exact za '/', prefix za ostale
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Header stil: providniji kad je SKROL (što si tražio),
  // “glass” na vrhu svetlih stranica, potpuno transparentan na hero vrhu
  const headerClass =
    onHeroTop
      ? 'bg-transparent py-5'
      : isScrolled
      ? 'bg-white/80 backdrop-blur-md shadow-md py-3'
      : 'bg-white/95 backdrop-blur-sm shadow-sm py-4';

  // Tekst i hover boje
  const textClass = onHeroTop ? 'text-white' : 'text-gray-800';
  const hoverClass = onHeroTop ? 'hover:bg-white/20' : 'hover:bg-gray-100';
  const logoTextClass = onHeroTop ? 'text-white' : 'text-blue-600';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group" aria-label="Trojka iz ćoška početna">
          <img
            src="https://i.postimg.cc/cC10vrmV/2701142-ball-basketball-dribbble-game-logo-icon.png"
            alt="Trojka iz ćoška Logo"
            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
            loading="eager"
            width={32}
            height={32}
          />
          <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${logoTextClass}`}>
            Trojka iz ćoška
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-2 items-center text-sm font-medium">
          {[
            { name: 'Početna', path: '/' },
            { name: 'Vesti', path: '/news' },
            { name: 'Podcast', path: '/podcast' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={[
                'px-4 py-1.5 rounded-full transition-colors duration-200',
                isActive(link.path)
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : `${textClass} ${hoverClass}`,
              ].join(' ')}
            >
              {link.name}
            </Link>
          ))}

          {/* Fantasy dropdown (desktop) */}
          <div
            className="relative"
            onMouseEnter={() => setIsFantasyOpen(true)}
            onMouseLeave={() => setIsFantasyOpen(false)}
          >
            <button
              className={[
                'px-4 py-1.5 rounded-full transition-colors duration-200',
                isFantasyOpen ? 'bg-blue-100 text-blue-700 font-semibold' : `${textClass} ${hoverClass}`,
              ].join(' ')}
            >
              Fantasy
            </button>

            <AnimatePresence>
              {isFantasyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: 'easeOut' }}
                  className="absolute left-0 mt-1 bg-white/95 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden min-w-[140px] z-20"
                >
                  <Link
                    to="/news?category=fantasy"
                    className="block px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 text-sm font-medium"
                  >
                    Vesti
                  </Link>
                  <Link
                    to="/league"
                    className="block px-4 py-3 text-gray-800 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 text-sm font-medium border-t border-gray-200"
                  >
                    Tabela
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* CTA dugme (desktop) */}
        <Link
          to="/register"
          className={[
            'hidden md:block btn transform hover:scale-105 transition-transform duration-200',
            onHeroTop ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'btn-primary',
          ].join(' ')}
        >
          Prijavi ekipu
        </Link>

        {/* Mobile toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label={isMenuOpen ? 'Zatvorite meni' : 'Otvorite meni'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
            {isMenuOpen ? (
              <X className={onHeroTop ? 'text-white' : 'text-gray-800'} />
            ) : (
              <Menu className={onHeroTop ? 'text-white' : 'text-gray-800'} />
            )}
          </motion.div>
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sheet */}
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-white shadow-lg overflow-hidden relative z-50"
              role="navigation"
              aria-label="Mobilna navigacija"
            >
              <div className="container py-6">
                {/* Glavna navigacija */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
                    Navigacija
                  </h3>

                  <Link
                    to="/"
                    className={[
                      'flex items-center space-x-3 px-4 py-3 text-lg rounded-xl transition-all duration-200',
                      isActive('/')
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold transform scale-105'
                        : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600 hover:transform hover:scale-102',
                    ].join(' ')}
                  >
                    <Home size={20} />
                    <span>Početna</span>
                  </Link>

                  <Link
                    to="/news"
                    className={[
                      'flex items-center space-x-3 px-4 py-3 text-lg rounded-xl transition-all duration-200',
                      isActive('/news')
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold transform scale-105'
                        : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600 hover:transform hover:scale-102',
                    ].join(' ')}
                  >
                    <Newspaper size={20} />
                    <span>Vesti</span>
                  </Link>

                  <Link
                    to="/podcast"
                    className={[
                      'flex items-center space-x-3 px-4 py-3 text-lg rounded-xl transition-all duration-200',
                      isActive('/podcast')
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold transform scale-105'
                        : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600 hover:transform hover:scale-102',
                    ].join(' ')}
                  >
                    <Mic size={20} />
                    <span>Podcast</span>
                  </Link>
                </div>

                {/* Fantasy sekcija */}
                <div className="space-y-2 mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
                    Fantasy
                  </h3>

                  <Link
                    to="/news?category=fantasy"
                    className={[
                      'flex items-center space-x-3 px-4 py-3 text-lg rounded-xl transition-all duration-200',
                      location.pathname.startsWith('/news') && window.location.search.includes('category=fantasy')
                        ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 font-semibold transform scale-105'
                        : 'text-gray-800 hover:bg-purple-50 hover:text-purple-600 hover:transform hover:scale-102',
                    ].join(' ')}
                  >
                    <Trophy size={20} />
                    <span>Fantasy Vesti</span>
                  </Link>

                  <Link
                    to="/league"
                    className={[
                      'flex items-center space-x-3 px-4 py-3 text-lg rounded-xl transition-all duration-200',
                      isActive('/league')
                        ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 font-semibold transform scale-105'
                        : 'text-gray-800 hover:bg-purple-50 hover:text-purple-600 hover:transform hover:scale-102',
                    ].join(' ')}
                  >
                    <BarChart3 size={20} />
                    <span>Tabela</span>
                  </Link>
                </div>

                {/* CTA */}
                <div className="px-4">
                  <Link
                    to="/register"
                    className="btn btn-primary text-center w-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    Prijavi ekipu
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
