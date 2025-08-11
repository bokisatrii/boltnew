import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Header / Navbar - ULTIMATIVNA VERZIJA
 * ✅ Optimizovane performanse (kao Opcija C)
 * ✅ Providnost na scroll (backdrop-blur)
 * ✅ Aktivni state za trenutnu stranicu (kao Opcija S)
 * ✅ Originalni layout i dugmići (kao Opcija S)
 * ✅ Dinamička logika za svetle stranice
 */
const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  // Hero stranice (transparentne na vrhu)
  const heroRoutes = ["/", "/podcast"];
  const onHeroTop = heroRoutes.includes(location.pathname) && !isScrolled;

  // Svetle stranice (uvek svetli header)
  const isLightPage = () => {
    const lightPages = ['/news', '/league', '/register', '/contact', '/schedule', '/about'];
    return lightPages.some(page => location.pathname.startsWith(page));
  };

  // Optimizovan scroll listener
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // Helper funkcija za aktivni link
  const isActive = (path: string) => location.pathname === path;

  // ORIGINALNI navLinks iz Opcije S
  const navLinks = [
    { name: 'Početna', path: '/' },
    { name: 'Vesti', path: '/news' },
    { name: 'Podcast', path: '/podcast' },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Dinamički stilovi
  const getHeaderStyle = () => {
    if (onHeroTop) {
      return "bg-transparent py-5";
    } else if (isLightPage() || isScrolled) {
      return "bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm py-3";
    } else {
      return "bg-transparent py-5";
    }
  };

  const getTextColor = () => {
    return (onHeroTop && !isLightPage()) ? "text-white" : "text-gray-800";
  };

  const getLogoColor = () => {
    return (onHeroTop && !isLightPage()) ? "text-white" : "text-blue-600";
  };

  const getLinkStyle = (isActiveLink: boolean) => {
    if (isActiveLink) {
      return "bg-blue-100 text-blue-700 font-semibold";
    } else if (onHeroTop && !isLightPage()) {
      return "text-white/90 hover:text-white hover:bg-white/10";
    } else {
      return "text-gray-800 hover:text-blue-700 hover:bg-gray-50";
    }
  };

  const getCTAStyle = () => {
    if (onHeroTop && !isLightPage()) {
      return "bg-orange-500 hover:bg-orange-600 text-white";
    } else {
      return "bg-blue-600 hover:bg-blue-700 text-white";
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getHeaderStyle()}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
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
            <span className={`text-xl md:text-2xl font-bold transition-colors duration-300 ${getLogoColor()}`}>
              BasketLiga
            </span>
          </Link>

          {/* Desktop nav - ORIGINALNI STILOVI */}
          <nav className="hidden md:flex gap-2 items-center text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-1.5 rounded-full transition-colors duration-200 ${getLinkStyle(isActive(link.path))}`}
              >
                {link.name}
              </Link>
            ))}

            {/* CTA dugme */}
            <Link
              to="/register"
              className={`ml-2 btn ${getCTAStyle()} transform hover:scale-105 transition-transform duration-200`}
            >
              Prijavi ekipu
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((s) => !s)}
            className={`md:hidden text-2xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded transition-colors ${getTextColor()}`}
            aria-expanded={mobileOpen}
          >
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-[max-height] duration-300 overflow-hidden
          ${mobileOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div className="bg-white shadow-lg">
          <div className="container mx-auto px-4 py-6">
            <div className="space-y-2 mb-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-3 text-lg rounded-xl transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold transform scale-105'
                      : 'text-gray-800 hover:bg-gray-50 hover:text-blue-600 hover:transform hover:scale-102'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="px-4">
              <Link
                to="/register"
                className="btn btn-primary text-center w-full py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Prijavi ekipu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;