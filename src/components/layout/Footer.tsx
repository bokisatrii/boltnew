import React from 'react';
import { Link } from 'react-router-dom';
import { Basketball, MapPin, Phone, Envelope as Mail, FacebookLogo, InstagramLogo, TwitterLogo } from '@phosphor-icons/react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Basketball size={32} className="text-orange-500" weight="fill" />
              <span className="text-2xl font-bold">BasketLiga</span>
            </Link>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Profesionalna košarkaška liga sa dugom tradicijom promocije vrhunskog sporta, 
              takmičarskog duha i razvoja mladih talenata.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Brzi linkovi</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Početna
                </Link>
              </li>
              <li>
                <Link to="/league" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Liga
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Vesti
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Prijavi ekipu
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Kontakt</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="text-orange-500 mt-1" size={18} />
                <span className="text-gray-400">Sportska 123, Beograd 11000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-orange-500" size={18} />
                <span className="text-gray-400">+381 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-orange-500" size={18} />
                <a href="mailto:info@basketliga.rs" className="text-gray-400 hover:text-orange-500 transition-colors">
                  info@basketliga.rs
                </a>
              </div>
            </div>
          </div>
          
          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Pratite nas</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-blue-800 hover:bg-blue-700 transition-colors p-2 rounded-full">
                <FacebookLogo size={20} />
              </a>
            
                <a
  href="https://www.instagram.com/trojkaizcoska_"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-pink-700 hover:bg-pink-600 transition-colors p-2 rounded-full"
>
                  
  <InstagramLogo size={20} />
</a>
              <a href="https://www.instagram.com/trojkaizcoska_" className="bg-blue-500 hover:bg-blue-400 transition-colors p-2 rounded-full">
                <TwitterLogo size={20} />
              </a>
            </div>
            
            <h3 className="text-lg font-bold mb-2">Newsletter</h3>
            <p className="text-gray-400 mb-2 text-sm">Prijavite se za najnovije vesti</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Vaš email"
                className="px-3 py-2 bg-gray-800 text-white text-sm rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500 flex-grow"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 transition-colors px-3 py-2 rounded-r-lg text-sm font-medium"
              >
                Prijavi se
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} BasketLiga. Sva prava zadržana.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;