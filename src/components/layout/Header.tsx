import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Header / Navbar
 * - Transparent + beli tekst SAMO na herou ('/' i '/podcast') dok nisi skrolovao
 * - Na svim drugim rutama odmah je svetli header (bela pozadina, tamni tekst)
 */
const Header: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const heroRoutes = ["/", "/podcast"];
  const onHeroTop = heroRoutes.includes(location.pathname) && !isScrolled;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  // EDITUJ po potrebi – čuvam neutralne nazive da ne uvodim zavisnost od tačnih ruta
  const navLinks = [
    { to: "/news", label: "Vesti" },
    { to: "/league", label: "Liga" },
    { to: "/schedule", label: "Raspored" },
    { to: "/podcast", label: "Podcast" },
    { to: "/about", label: "O nama" },
  ];

  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    // zatvori mobilni meni kad promeniš rutu
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${onHeroTop
          ? "bg-transparent py-5"
          : "bg-white/80 backdrop-blur-md border-b border-gray-200/60 shadow-sm py-3"}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {/* Ako imaš sliku logotipa, ubaci je ovde umesto teksta */}
            <span
              className={`text-xl md:text-2xl font-bold tracking-tight transition-colors duration-300
                ${onHeroTop ? "text-white" : "text-blue-600"}`}
            >
              BasketLiga
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors duration-200
                  ${onHeroTop
                    ? "text-white/90 hover:text-white hover:bg-white/10"
                    : "text-gray-800 hover:text-blue-700 hover:bg-gray-50"}`}
              >
                {item.label}
              </Link>
            ))}

            {/* CTA desno */}
            <Link
              to="/register"
              className={`ml-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200
                ${onHeroTop
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"}
              `}
            >
              Prijavi ekipu
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            aria-label="Menu"
            onClick={() => setMobileOpen((s) => !s)}
            className={`md:hidden inline-flex items-center justify-center rounded-lg p-2 transition-colors
              ${onHeroTop
                ? "text-white hover:bg-white/10"
                : "text-gray-800 hover:bg-gray-100"}`}
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

      {/* Mobile sheet */}
      <div
        className={`md:hidden transition-[max-height] duration-300 overflow-hidden
          ${mobileOpen ? "max-h-96" : "max-h-0"}`}
      >
        <div
          className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-3 pt-2
            ${onHeroTop ? "text-white" : "text-gray-900"}`}
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`rounded-lg px-3 py-2 text-base font-medium
                  ${onHeroTop ? "hover:bg-white/10" : "hover:bg-gray-100"}`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/register"
              className={`mt-1 rounded-lg px-3 py-2 text-base font-semibold text-center
                ${onHeroTop
                  ? "bg-orange-500 hover:bg-orange-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              Prijavi ekipu
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
