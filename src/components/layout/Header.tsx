import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Youtube, Headphones } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  path: string;
  dropdown?: { name: string; path: string }[];
}

const navItems: NavItem[] = [
  { name: 'NBA', path: '/nba' },
  { 
    name: 'NCAA', 
    path: '/ncaa',
    dropdown: [
      { name: 'Prospect Watch', path: '/ncaa/prospect-watch' },
      { name: 'What is NIL?', path: '/ncaa/what-is-nil' },
    ]
  },
  { name: 'Europe', path: '/europe' },
  { 
    name: 'Fantasy', 
    path: '/fantasy',
    dropdown: [
      { name: 'Updates', path: '/fantasy/updates' },
      { name: 'Division 1', path: '/fantasy/division-1' },
      { name: 'Division 2', path: '/fantasy/division-2' },
      { name: 'WTF is Fantasy?', path: '/fantasy/wtf-is-fantasy' },
    ]
  },
  { name: 'TV', path: '/tv' },
  { name: 'CornerThree', path: '/cornerthree' },
];

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedItems, setMobileExpandedItems] = useState<string[]>([]);

  // Scroll handler
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
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
    setMobileExpandedItems([]);
  }, [location.pathname]);

  // Body lock and ESC handler
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setOpenDropdown(null);
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
  }, [isMenuOpen]);

  const toggleMenu = useCallback(() => setIsMenuOpen((s) => !s), []);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleMobileDropdown = (name: string) => {
    setMobileExpandedItems((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const headerClass = isScrolled
    ? 'bg-white shadow-md py-2'
    : 'bg-white py-3';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container">
        {/* Top Bar */}
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group" aria-label="Corner Three Home">
            <img
              src="https://i.postimg.cc/cC10vrmV/2701142-ball-basketball-dribbble-game-logo-icon.png"
              alt="Corner Three Logo"
              className="w-8 h-8 transition-transform duration-300 group-hover:scale-110"
              loading="eager"
              width={32}
              height={32}
            />
            <span className="text-xl md:text-2xl font-bold text-gray-900 flex items-center">
              <span className="text-orange-500">●</span>
              <span className="ml-1">Corner Three</span>
            </span>
          </Link>

          {/* Desktop: Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://www.youtube.com/@trojkaizcoska"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
              aria-label="YouTube Channel"
            >
              <Youtube size={20} />
              <span className="text-sm font-medium">Videos</span>
            </a>
            <Link
              to="/podcast"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Podcast"
            >
              <Headphones size={20} />
              <span className="text-sm font-medium">Podcasts</span>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            <motion.div animate={{ rotate: isMenuOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
              {isMenuOpen ? <X className="text-gray-800" /> : <Menu className="text-gray-800" />}
            </motion.div>
          </button>
        </div>

        {/* Desktop Navigation Pills — FIXED: added items-center */}
        <nav className="hidden md:flex justify-center items-center gap-1 mt-3 py-2 border-t border-gray-100">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              location.pathname === '/'
                ? 'bg-gray-900 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            The Latest
          </Link>
          
          {navItems.map((item) => (
            <div
              key={item.name}
              className="relative"
              onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              {item.dropdown ? (
                <>
                  <button
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-1 ${
                      isActive(item.path)
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {item.name}
                    <ChevronDown size={14} className={`transition-transform ${openDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {openDropdown === item.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full mt-1 bg-white shadow-xl rounded-lg overflow-hidden min-w-[180px] z-50 border border-gray-100"
                      >
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.path}
                            to={subItem.path}
                            className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors text-sm font-medium border-b border-gray-50 last:border-b-0"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              ) : (
                <Link
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white shadow-lg overflow-hidden relative z-50 max-h-[80vh] overflow-y-auto"
            >
              <div className="container py-4">
                {/* Mobile Nav Items */}
                <div className="space-y-1">
                  <Link
                    to="/"
                    className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                      location.pathname === '/'
                        ? 'bg-gray-100 text-blue-600'
                        : 'text-gray-800 hover:bg-gray-50'
                    }`}
                  >
                    The Latest
                  </Link>

                  {navItems.map((item) => (
                    <div key={item.name}>
                      {item.dropdown ? (
                        <>
                          <button
                            onClick={() => toggleMobileDropdown(item.name)}
                            className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-colors ${
                              isActive(item.path)
                                ? 'bg-gray-100 text-blue-600'
                                : 'text-gray-800 hover:bg-gray-50'
                            }`}
                          >
                            {item.name}
                            <ChevronDown
                              size={18}
                              className={`transition-transform ${
                                mobileExpandedItems.includes(item.name) ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          
                          <AnimatePresence>
                            {mobileExpandedItems.includes(item.name) && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="ml-4 overflow-hidden"
                              >
                                {item.dropdown.map((subItem) => (
                                  <Link
                                    key={subItem.path}
                                    to={subItem.path}
                                    className="block px-4 py-2.5 text-gray-600 hover:text-blue-600 transition-colors text-sm"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          to={item.path}
                          className={`block px-4 py-3 rounded-lg font-medium transition-colors ${
                            isActive(item.path)
                              ? 'bg-gray-100 text-blue-600'
                              : 'text-gray-800 hover:bg-gray-50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mobile: Quick Links */}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <a
                    href="https://www.youtube.com/@trojkaizcoska"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <Youtube size={20} className="text-red-600" />
                    <span className="font-medium">Videos</span>
                  </a>
                  <Link
                    to="/podcast"
                    className="flex items-center space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg"
                  >
                    <Headphones size={20} className="text-blue-600" />
                    <span className="font-medium">Podcasts</span>
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