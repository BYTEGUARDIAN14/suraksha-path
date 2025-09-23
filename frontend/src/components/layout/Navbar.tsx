import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import SurakshaLogo from '@/assets/WhatsApp-Image-2025-09-09-at-20.33.33_d0915ebd.svg';
import { useI18n, useTranslation } from '@/state/i18n';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, setLang } = useI18n();
  const t = useTranslation();

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src={SurakshaLogo}
              alt="Suraksha Path Logo"
              className="w-16 h-16 rounded-xl object-contain"
              style={{ filter: 'invert(23%) sepia(93%) saturate(3566%) hue-rotate(213deg) brightness(88%) contrast(105%)' }}
            />
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 font-poppins">Suraksha Path</h1>
              <p className="text-xs md:text-sm text-gray-500">{t['subtitle'] || "India's Disaster Awareness Platform"}</p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary">{t['home'] || 'Home'}</Link>
            <a href="/#features" className="text-gray-600 hover:text-primary">{t['features'] || 'Features'}</a>
            <Link to="/resources" className="text-gray-600 hover:text-primary">{t['resources'] || 'Resources'}</Link>
            {/* Language Toggle */}
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-2 text-gray-600 hover:text-primary relative"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === 'en' ? 'EN' : 'हिन्दी'}</span>
              <ChevronDown className="w-4 h-4" />
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-50">
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setLang('en'); setIsLangOpen(false); }}>English</button>
                  <button className="block w-full text-left px-4 py-2 hover:bg-gray-100" onClick={() => { setLang('hi'); setIsLangOpen(false); }}>हिन्दी</button>
                </div>
              )}
            </button>
            {/* Auth */}
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-primary">{t['login'] || 'Login'}</Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-hover"
              >
                {t['register'] || 'Register'}
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600">{t['home'] || 'Home'}</Link>
              <a href="/#features" className="text-gray-600">{t['features'] || 'Features'}</a>
              <Link to="/resources" className="text-gray-600">{t['resources'] || 'Resources'}</Link>
              <Link to="/login" className="text-gray-600">{t['login'] || 'Login'}</Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-primary text-white rounded-lg text-center"
              >
                {t['register'] || 'Register'}
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}