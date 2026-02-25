import React from 'react';
import { Link } from 'react-router-dom';
import { Basketball, MapPin, Phone, Envelope as Mail, YoutubeLogo, InstagramLogo, TwitterLogo } from '@phosphor-icons/react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and About */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <Basketball size={32} className="text-orange-500" weight="fill" />
              <span className="text-2xl font-bold">Corner Three</span>
            </Link>
            <p className="text-gray-400 mt-4 leading-relaxed">
              Your source for NBA, EuroLeague, NCAA basketball analysis, fantasy tips, and the latest basketball news. 
              Listen to our podcast and join the fantasy league.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/league" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Fantasy League Standings
                </Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-400 hover:text-orange-500 transition-colors">
                  All News
                </Link>
              </li>
              <li>
                <Link to="/podcast" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Podcast Episodes
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Register Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/nba" className="text-gray-400 hover:text-orange-500 transition-colors">
                  NBA News
                </Link>
              </li>
              <li>
                <Link to="/europe" className="text-gray-400 hover:text-orange-500 transition-colors">
                  European Basketball
                </Link>
              </li>
              <li>
                <Link to="/fantasy/updates" className="text-gray-400 hover:text-orange-500 transition-colors">
                  Fantasy Basketball
                </Link>
              </li>
              <li>
                <Link to="/ncaa/prospect-watch" className="text-gray-400 hover:text-orange-500 transition-colors">
                  NCAA Prospect Watch
                </Link>
              </li>
              <li>
                <a
                  href="https://open.spotify.com/show/3bkhQToL2N4YJ5I2jSopfZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-orange-500 transition-colors"
                >
                  Spotify Podcast
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="text-orange-500 mt-1" size={18} />
                <span className="text-gray-400">Sports Street 123, Belgrade 11000</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-orange-500" size={18} />
                <span className="text-gray-400">+381 11 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="text-orange-500" size={18} />
                <a href="mailto:info@cornerthree.com" className="text-gray-400 hover:text-orange-500 transition-colors">
                  info@cornerthree.com
                </a>
              </div>
            </div>
          </div>
          
          {/* Social Media & Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-gray-700 pb-2">Follow Us</h3>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://www.youtube.com/@trojkaizcoska"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-500 transition-colors p-2 rounded-full"
                aria-label="YouTube"
              >
                <YoutubeLogo size={20} />
              </a>

              <a
                href="https://www.instagram.com/trojkaizcoska_"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-700 hover:bg-pink-600 transition-colors p-2 rounded-full"
                aria-label="Instagram"
              >
                <InstagramLogo size={20} />
              </a>

              <a
                href="https://twitter.com/trojkaizcoska"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-400 transition-colors p-2 rounded-full"
                aria-label="Twitter"
              >
                <TwitterLogo size={20} />
              </a>
            </div>
            
            <h3 className="text-lg font-bold mb-2">Newsletter</h3>
            <p className="text-gray-400 mb-2 text-sm">Subscribe to our newsletter for the latest updates</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-3 py-2 bg-gray-800 text-white text-sm rounded-l-lg focus:outline-none focus:ring-1 focus:ring-orange-500 flex-grow"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 transition-colors px-3 py-2 rounded-r-lg text-sm font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="bg-gray-950 py-4">
        <div className="container text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Corner Three. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
