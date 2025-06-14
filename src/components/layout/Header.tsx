import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);            // prati da li je skrolovano
  const [isMenuOpen, setIsMenuOpen] = useState(false);            // mobile menu toggle
  const location = useLocation();

  // Prati scroll da bi promenio stil navbara (npr. dodao senku)
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

  // Zatvori meni kad se promeni ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Dodaj/ukloni body scroll i escape shortcut za mobilni meni
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
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
  }, [isMenuOpen]);

  // Pomocna funkcija da oboji aktivni link
  const isActive = (path: string) => location.pathname === path;

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

        {/* Navigacija - desktop verzija */}
        <nav className="hidden md:flex gap-2 items-center text-sm font-medium">
          {[
            { name: 'Početna', path: '/' },
            { name: 'Vesti', path: '/news' },
            { name: 'NBA', path: '/nba' },
            { name: 'Evropa', path: '/europe' },
            { name: 'NCAA', path: '/ncaa' },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-4 py-1.5 rounded-full transition-colors duration-200 ${
                isActive(link.path)
                  ? 'bg-blue-100 text-blue-700 font-semibold'
                  : isScrolled
                  ? 'text-gray-800 hover:bg-gray-100'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Dropdown za "Fantasy" */}
          <div className="relative group">
            <button
              className={`px-4 py-1.5 rounded-full transition-colors duration-200 ${
                isScrolled ? 'text-gray-800 hover:bg-gray-100' : 'text-white hover:bg-white/20'
              }`}
            >
              Fantasy
            </button>
            <div className="absolute left-0 mt-2 bg-white shadow-md rounded hidden group-hover:block z-10 min-w-[120px]">
              <Link to="/fantasy-news" className="block px-4 py-2 hover:bg-gray-100">Vesti</Link>
              <Link to="/league" className="block px-4 py-2 hover:bg-gray-100">Tabela</Link>
            </div>
          </div>
        </nav>

        {/* CTA dugme */}
        <Link 
          to="/register" 
          className={`hidden md:block btn ${
            isScrolled ? 'btn-primary' : 'bg-orange-500 hover:bg-orange-600 text-white'
          } transform hover:scale-105 transition-transform duration-200`}
        >
          Prijavi ekipu
        </Link>

        {/* Mobilni toggle meni */}
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

      {/* Navigacija - mobilna verzija */}
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

            {/* Meni */}
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
                <Link to="/" className="text-gray-800 hover:text-blue-600 py-3 text-lg block">Početna</Link>
                <Link to="/news" className="text-gray-800 hover:text-blue-600 py-3 text-lg block">Vesti</Link>
                <Link to="/nba" className="text-gray-800 hover:text-blue-600 py-3 text-lg block">NBA</Link>
                <Link to="/europe" className="text-gray-800 hover:text-blue-600 py-3 text-lg block">Evropa</Link>
                <Link to="/ncaa" className="text-gray-800 hover:text-blue-600 py-3 text-lg block">NCAA</Link>
                <Link to="/fantasy-news" className="text-gray-800 hover:text-blue-600 py-3 text-lg block">Fantasy Vesti</Link>
                <Link to="/league" className="text-gray-800 hover:text-blue-600 py-3 text-lg block">Tabela</Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary text-center mt-4 w-full"
                >
                  Prijavi ekipu
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
