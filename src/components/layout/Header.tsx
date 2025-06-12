import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Optimizovano scroll handling sa throttling
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

  // Auto-close menu na route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Memoized navigation links
  const navigationLinks = useMemo(() => [
    { name: 'Početna', path: '/' },
    { name: 'Liga', path: '/league' },
    { name: 'Vesti', path: '/news' },
    { name: 'Kontakt', path: '/contact' },
  ], []);

  const isActive = useCallback((path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  }, [location.pathname]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Keyboard accessibility za mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleKeyDown);
      // Prevent body scroll kada je menu otvoren
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container flex justify-between items-center">
        {/* Logo */}
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

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8" role="navigation" aria-label="Glavna navigacija">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative font-medium transition-colors duration-300 ${
                isScrolled ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-orange-300'
              } ${isActive(link.path) ? 'font-bold' : ''}`}
              aria-current={isActive(link.path) ? 'page' : undefined}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="underline"
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                    isScrolled ? 'bg-blue-600' : 'bg-orange-500'
                  }`}
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <Link 
          to="/register" 
          className={`hidden md:block btn ${
            isScrolled ? 'btn-primary' : 'bg-orange-500 hover:bg-orange-600 text-white'
          } transform hover:scale-105 transition-transform duration-200`}
        >
          Prijavi ekipu
        </Link>

        {/* Mobile Menu Button */}
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

      {/* Mobile Navigation */}
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
            
            {/* Menu */}
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
              <div className="container py-6 flex flex-col space-y-4">
                {navigationLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      to={link.path}
                      className={`text-gray-800 hover:text-blue-600 py-3 text-lg block transition-colors duration-200 ${
                        isActive(link.path) ? 'font-bold text-blue-600' : ''
                      }`}
                      aria-current={isActive(link.path) ? 'page' : undefined}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link 
                    to="/register" 
                    className="btn btn-primary text-center mt-4 w-full"
                  >
                    Prijavi ekipu
                  </Link>
                </motion.div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;