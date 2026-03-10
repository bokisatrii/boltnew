import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  path: string;
  hasDropdown?: boolean;
  dropdownItems?: { name: string; path: string }[];
}

const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Navigation items matching TheRinger-inspired design
  const navItems: NavItem[] = [
    { name: 'The Latest', path: '/' },
    { name: 'NBA', path: '/nba' },
    { 
      name: 'NCAA', 
      path: '/ncaa',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Prospect Watch', path: '/ncaa/prospect-watch' },
        { name: 'What is NIL?', path: '/ncaa/what-is-nil' },
      ]
    },
    { name: 'Europe', path: '/europe' },
    { 
      name: 'Fantasy', 
      path: '/fantasy',
      hasDropdown: true,
      dropdownItems: [
        { name: 'Updates', path: '/fantasy/updates' },
        { name: 'Division 1', path: '/fantasy/division-1' },
        { name: 'Division 2', path: '/fantasy/division-2' },
        { name: 'WTF is Fantasy?', path: '/fantasy/wtf-is-fantasy' },
      ]
    },
    { name: 'TV', path: '/tv' },
    { name: 'CornerThree', path: '/cornerthree' },
  ];

  // Hero routes for transparent header
  const heroRoutes = ['/', '/podcast'];
  const onHeroTop = heroRoutes.includes(location.pathname) && !isScrolled;

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
  }, [location.pathname]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Body lock + ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isMenuOpen) setIsMenuOpen(false);
        if (openDropdown) setOpenDropdown(null);
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
  }, [isMenuOpen, openDropdown]);

  const toggleMenu = useCallback(() => setIsMenuOpen((s) => !s), []);

  // Active link check
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Header styles
  const headerClass = onHeroTop
    ? 'bg-transparent py-5'
    : isScrolled
    ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
    : 'bg-white shadow-sm py-4';

  const textClass = onHeroTop ? 'text-white' : 'text-gray-700';
  const hoverClass = onHeroTop ? 'hover:text-gray-200' : 'hover:text-gray-900';
  const logoTextClass = onHeroTop ? 'text-white' : 'text-blue-600';

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container flex justify-between items-center">
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
          <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${logoTextClass}`}>
            Corner Three
          </span>
        </Link>

        {/* Desktop nav - FIX: items-center ensures vertical alignment */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <div
              key={item.path}
              className="relative"
              onMouseEnter={() => item.hasDropdown && setOpenDropdown(item.name)}
              onMouseLeave={() => item.hasDropdown && setOpenDropdown(null)}
            >
              {item.name === 'The Latest' ? (
                // "The Latest" button - FIX: using flex and items-center to ensure vertical alignment
                <Link
                  to={item.path}
                  className={`
                    inline-flex items-center justify-center
                    px-4 py-2 rounded-full text-sm font-medium
                    transition-colors duration-200
                    ${isActive(item.path) 
                      ? 'bg-gray-900 text-white' 
                      : onHeroTop
                        ? 'bg-white/20 text-white hover:bg-white/30'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }
                  `}
                >
                  {item.name}
                </Link>
              ) : item.hasDropdown ? (
                // Dropdown trigger - FIX: inline-flex items-center for consistent height
                <button
                  className={`
                    inline-flex items-center justify-center
                    px-3 py-2 text-sm font-medium
                    transition-colors duration-200
                    ${textClass} ${hoverClass}
                  `}
                >
                  {item.name}
                  <ChevronDown 
                    size={14} 
                    className={`ml-1 transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                  />
                </button>
              ) : (
                // Regular nav link - FIX: inline-flex items-center for consistent height
                <Link
                  to={item.path}
                  className={`
                    inline-flex items-center justify-center
                    px-3 py-2 text-sm font-medium
                    transition-colors duration-200
                    ${isActive(item.path) 
                      ? 'text-blue-600 font-semibold' 
                      : `${textClass} ${hoverClass}`
                    }
                  `}
                >
                  {item.name}
                </Link>
              )}

              {/* Dropdown menu */}
              {item.hasDropdown && (
                <AnimatePresence>
                  {openDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.15, ease: 'easeOut' }}
                      className="absolute left-0 top-full mt-1 bg-white shadow-xl rounded-lg overflow-hidden min-w-[180px] z-20 border border-gray-100"
                    >
                      {item.dropdownItems?.map((dropItem) => (
                        <Link
                          key={dropItem.path}
                          to={dropItem.path}
                          className="block px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-150 text-sm font-medium"
                        >
                          {dropItem.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            <motion.nav
              id="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-white shadow-lg overflow-hidden relative z-50"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="container py-6 space-y-2">
                {navItems.map((item) => (
                  <div key={item.path}>
                    {item.hasDropdown ? (
                      <>
                        <button
                          onClick={() => setOpenDropdown(openDropdown === item.name ? null : item.name)}
                          className={`
                            flex items-center justify-between w-full
                            px-4 py-3 text-lg rounded-xl
                            transition-all duration-200
                            text-gray-800 hover:bg-gray-50
                          `}
                        >
                          <span>{item.name}</span>
                          <ChevronDown 
                            size={20} 
                            className={`transition-transform duration-200 ${openDropdown === item.name ? 'rotate-180' : ''}`}
                          />
                        </button>
                        <AnimatePresence>
                          {openDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="ml-4 space-y-1 overflow-hidden"
                            >
                              {item.dropdownItems?.map((dropItem) => (
                                <Link
                                  key={dropItem.path}
                                  to={dropItem.path}
                                  className={`
                                    block px-4 py-2 text-gray-600 
                                    hover:text-blue-600 hover:bg-gray-50 
                                    rounded-lg transition-colors duration-200
                                  `}
                                >
                                  {dropItem.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`
                          flex items-center px-4 py-3 text-lg rounded-xl
                          transition-all duration-200
                          ${isActive(item.path)
                            ? 'bg-blue-50 text-blue-700 font-semibold'
                            : 'text-gray-800 hover:bg-gray-50'
                          }
                        `}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
