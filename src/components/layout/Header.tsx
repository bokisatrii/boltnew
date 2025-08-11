import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Newspaper, Mic, Trophy, BarChart3 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFantasyOpen, setIsFantasyOpen] = useState(false);
  const location = useLocation();

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
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsFantasyOpen(false);
  }, [location]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
      if (e.key === 'Escape' && isFantasyOpen) {
        setIsFantasyOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen, isFantasyOpen]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const handleFantasyMouseEnter = () => {
    setIsFantasyOpen(true);
  };

  const handleFantasyMouseLeave = () => {
    setIsFantasyOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center space-x-2 group" aria-label="BasketLiga početna">
          <img
            src="https://i.postimg.cc/cC10vrmV/2701142-ball-basketball-dribbble-game-logo-icon.png"
            alt="BasketLiga Logo"
            className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
            loading="eager"
            width={32}
            height={32}
          />
          <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${
            isScrolled ? 'text-blue-600' : 'text-white'
          }`}>
            BasketLiga
          </span>
        </Link>

        <nav className="hidden md:flex gap-2 items-center text-sm font-medium">
          {[
            { name: 'Početna', path: '/' },
            { name: 'Vesti', path: '/news' },
            { name: 'Podcast', path: '/podcast' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-1.5 rounded-full transition-colors duration-200 text-shadow ${
                isActive(link.path)
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : isScrolled
                  ? 'text-gray-800 hover:bg-gray-200 border-b-2 border-gray-300'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={handleFantasyMouseEnter}
            onMouseLeave={handleFantasyMouseLeave}
          >
            <button
              className={`px-4 py-1.5 rounded-full transition-colors duration-200 ${
                isFantasyOpen
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : isScrolled
                  ? 'text-gray-800 hover:bg-gray-200'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              Fantasy
            </button>

            <AnimatePresence>
              {isFantasyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute left-0 mt-1 bg-white/60 backdrop-blur-md shadow-xl rounded-2xl overflow-hidden min-w-[140px] z-20"
                >
                  <Link
                    to="/news?category=fantasy"
                    className="block px-4 py-3 text-gray-800 hover:bg-white/30 hover:text-blue-700 transition-colors duration-150 text-sm font-medium"
                  >
                    Vesti
                  </Link>
                  <Link
                    to="/league"
                    className="block px-4 py-3 text-gray-800 hover:bg-white/30 hover:text-blue-700 transition-colors duration-150 text-sm font-medium border-t border-white/20"
                  >
                    Tabela
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        <Link
          to="/register"
          className={`hidden md:block btn ${
            isScrolled ? 'btn-primary' : 'bg-orange-500 hover:bg-orange-600 text-white'
          } transform hover:scale-105 transition-transform duration-200`}
        >
          Prijavi ekipu
        </Link>

        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label={isMenuOpen ? 'Zatvorite meni' : 'Otvorite meni'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <motion.div
            animate={{ rotate: isMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isMenuOpen ? (
              <X className={isScrolled ? 'text-gray-800' : 'text-white'} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-800' : 'text-white'} />
            )}
          </motion.div>
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white shadow-lg overflow-hidden relative z-50"
              role="navigation"
              aria-label="Mobilna navigacija"
            >
              <div className="container mx-auto py-6 px-4">
                <div className="space-y-2 mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
                    Navigacija
                  </h3>

                  <Link
                    to="/"
                    className={`flex items-center space-x-3 px-4 py-3 text-lg rounded-xl transition-all duration-200 ${
                      isActive('/')
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold transform scale-105'
                        : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600 hover:transform hover:scale-102'
                    }`}
                  >
                    <Home size={20} />
                    <span>Početna</span>
                  </Link>

                  <Link
                    to="/news"
                    className={`flex items-center space-x-3 px-4 py-3 text-lg rounded-xl transition-all duration-200 ${
                      isActive('/news')
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold transform scale-105'
                        : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600 hover:transform hover:scale-102'
                    }`}
                  >
                    <Newspaper size={20} />
                    <span>Vesti</span>
                  </Link>

                  <Link
                    to="/podcast"
                    className={`flex items-center space-x-3 px-4 py-3 text-lg rounded-xl transition-all duration-200 ${
                      isActive('/podcast')
                        ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold transform scale-105'
                        : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600 hover:transform hover:scale-102'
                    }`}
                  >
                    <Mic size={20} />
                    <span>Podcast</span>
                  </Link>
                </div>

                <div className="space-y-2 mb-6">
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-3">
                    Fantasy
                  </h3>

                  <Link
                    to="/news?category=fantasy"
                    className={`flex items-center space-x-3 px-4 py-3 text-lg rounded-xl transition-all duration-200 ${
                      isActive('/news') && window.location.search.includes('category=fantasy')
                        ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 font-semibold transform scale-105'
                        : 'text-gray-800 hover:bg-purple-50 hover:text-purple-600 hover:transform hover:scale-102'
                    }`}
                  >
                    <Trophy size={20} />
                    <span>Fantasy Vesti</span>
                  </Link>

                  <Link
                    to="/league"
                    className={`flex items-center space-x-3 px-4 py-3 text-lg rounded-xl transition-all duration-200 ${
                      isActive('/league')
                        ? 'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 font-semibold transform scale-105'
                        : 'text-gray-800 hover:bg-purple-50 hover:text-purple-600 hover:transform hover:scale-102'
                    }`}
                  >
                    <BarChart3 size={20} />
                    <span>Tabela</span>
                  </Link>
                </div>

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
