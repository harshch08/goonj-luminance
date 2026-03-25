import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavSearch } from './NavSearch';

const navLinks = [
  { label: 'Home', href: '/bandhan' },
  { label: 'About Us', href: '/bandhan/about' },
  { label: 'Services', href: '/bandhan/services' },
  { label: 'Gallery', href: '/bandhan/gallery' },
];

export const BandhanNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* Backdrop blur overlay when mobile menu is open */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <header
        className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200/50 shadow-sm"
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/bandhan" className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <img 
                  src="/public/bandhanlogo.png" 
                  alt="Bandhan Logo" 
                  className="h-28 w-auto object-contain drop-shadow-md"
                />
                <div className="flex flex-col leading-tight">
                  <span style={{ fontFamily: "'Great Vibes', cursive", fontSize: '2rem', fontWeight: 400, color: '#1a1008', lineHeight: 1.1 }}>
                    Bandhan
                  </span>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: '0.6rem', letterSpacing: '0.3em', color: '#92400e', fontWeight: 600, textTransform: 'uppercase' }}>
                    Weddings
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm transition-colors duration-300 underline-sweep relative ${
                    location.pathname === link.href 
                      ? 'text-yellow-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Goonj Entertainment Link - Highlighted */}
              <Link
                to="/"
                className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-500 overflow-hidden bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 text-purple-700 hover:from-purple-400 hover:via-pink-500 hover:to-purple-400 hover:text-white hover:shadow-xl hover:shadow-purple-500/40 border border-purple-300/50"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="text-lg relative z-10 opacity-80">🎵</span>
                <div className="flex flex-col items-center relative z-10">
                  <span className="text-sm font-bold tracking-widest font-serif leading-tight">GOONJ</span>
                  <span className="text-[9px] font-light tracking-wider opacity-90 -mt-0.5">Entertainment</span>
                </div>
                <span className="text-xs relative z-10 opacity-80">✨</span>
              </Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to="/bandhan/contact">
                <Button 
                  variant="hero" 
                  size="lg"
                  className="bg-yellow-600 hover:bg-yellow-700 text-white"
                >
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Mobile Search + Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-800"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </nav>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white/98 backdrop-blur-xl border-t border-gray-200/50"
            >
              <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      to={link.href}
                      className={`text-lg transition-colors ${
                        location.pathname === link.href 
                          ? 'text-yellow-600' 
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
                
                {/* Goonj Entertainment Link - Mobile */}
                <Link
                  to="/"
                  className="group relative flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-500 overflow-hidden bg-gradient-to-r from-purple-100 via-pink-50 to-purple-100 text-purple-700 border border-purple-300/50"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <span className="text-xl relative z-10 opacity-80">🎵</span>
                  <div className="flex flex-col items-center relative z-10">
                    <span className="text-lg font-bold tracking-widest font-serif leading-tight">GOONJ</span>
                    <span className="text-[10px] font-light tracking-wider opacity-90 -mt-0.5">Entertainment</span>
                  </div>
                  <span className="text-sm relative z-10 opacity-80">✨</span>
                </Link>
                
                <Link to="/bandhan/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="heroFilled" size="lg" className="mt-4 w-full bg-yellow-600 hover:bg-yellow-700">
                    Book Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};