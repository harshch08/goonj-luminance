import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavSearch } from './NavSearch';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Artists', href: '/artists' },
];

// Indian Married Couple Icon Component
const CoupleIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    {/* Bride with saree/dupatta */}
    <path d="M8 8c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
    <path d="M10 11c-2.2 0-4 1.3-4 3v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-2c0-1.7-1.8-3-4-3z" />
    <path d="M6 15l-1 5c-.1.5.3 1 .8 1h8.4c.5 0 .9-.5.8-1l-1-5" opacity="0.7" />
    
    {/* Groom with turban */}
    <path d="M14 7c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
    <path d="M13 6h6c.6 0 1 .4 1 1v1h-8V7c0-.6.4-1 1-1z" />
    <path d="M16 10c-2.2 0-4 1.3-4 3v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1v-2c0-1.7-1.8-3-4-3z" />
    <path d="M12 14l-1 6c-.1.5.3 1 .8 1h8.4c.5 0 .9-.5.8-1l-1-6" opacity="0.7" />
  </svg>
);

export const MainNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if we're on the homepage
  const isHomePage = location.pathname === '/';
  
  // Check if we're on a Bandhan page
  const isBandhanPage = location.pathname === '/bandhan' || 
    location.pathname.startsWith('/bandhan/');

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
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isBandhanPage 
            ? (isScrolled ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50' : 'bg-transparent')
            : isHomePage 
              ? 'bg-background/95 backdrop-blur-md border-b border-border/50'
              : (isScrolled ? 'bg-background/95 backdrop-blur-md border-b border-border/50' : 'bg-transparent')
        }`}
        style={isBandhanPage && !isScrolled ? { backgroundColor: 'transparent !important' } : {}}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={isBandhanPage ? "/bandhan" : "/"} className="flex items-center gap-3">
              {isBandhanPage ? (
                <div className="flex items-center gap-3">
                  <img 
                    src="/bandhanlogo.png" 
                    alt="Bandhan Logo" 
                    className="h-24 w-auto"
                  />
                  <span className={`font-display text-2xl font-bold tracking-wide ${isBandhanPage ? 'text-white' : 'text-foreground'}`}>
                    BANDHAN
                  </span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <img 
                    src="/goonj_entertainment.png" 
                    alt="Goonj Logo" 
                    className="h-28 w-auto"
                  />
                  <div className="flex flex-col">
                    <span className="font-display text-2xl font-bold tracking-wide text-foreground">
                      GOONJ
                    </span>
                    <span className="text-xs text-gold-light tracking-luxury uppercase">
                      Entertainment
                    </span>
                  </div>
                </div>
              )}
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm transition-colors duration-300 underline-sweep relative ${
                    location.pathname === link.href 
                      ? (isBandhanPage ? 'text-yellow-300' : 'text-gold-light')
                      : (isBandhanPage ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-foreground')
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Bandhan Wedding Link - Highlighted with Golden Wedding Vibes */}
              {!isBandhanPage && (
                <Link
                  to="/bandhan"
                  className={`group relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-500 overflow-hidden ${
                    location.pathname === '/bandhan' || location.pathname.startsWith('/bandhan')
                      ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-white shadow-xl shadow-amber-500/40 animate-shimmer'
                      : 'bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 text-amber-700 hover:from-amber-400 hover:via-yellow-500 hover:to-amber-400 hover:text-white hover:shadow-xl hover:shadow-amber-500/40 border border-amber-300/50'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  <img src="/bandhanlogo.png" alt="Bandhan" className="w-5 h-5 relative z-10 object-contain" />
                  <div className="flex flex-col items-center relative z-10">
                    <span className="text-sm font-bold tracking-widest font-serif leading-tight">BANDHAN</span>
                    <span className="text-[9px] font-light tracking-wider opacity-90 -mt-0.5">Weddings</span>
                  </div>
                  <span className="text-xs relative z-10 opacity-80">✨</span>
                </Link>
              )}
              
              {/* Goonj Entertainment Link - Highlighted when on Bandhan page */}
              {isBandhanPage && (
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
              )}
            </div>

            {/* Desktop CTA + Search */}
            <div className="hidden lg:flex items-center gap-4">
              <NavSearch />
              <Link to="/contact">
                <Button variant="hero" size="lg">
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Mobile Search + Menu Toggle */}
            <div className="flex items-center gap-2 lg:hidden">
              <NavSearch isMobile />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`p-2 ${isBandhanPage ? 'text-white' : 'text-foreground'}`}
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
              className="lg:hidden bg-background/98 backdrop-blur-xl border-t border-border/50"
            >
              <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
                {navLinks.map((link) => (
                  <div key={link.label}>
                    <Link
                      to={link.href}
                      className={`text-lg transition-colors ${
                        location.pathname === link.href 
                          ? 'text-gold-light' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </div>
                ))}
                
                {/* Bandhan Wedding Link - Mobile with Golden Wedding Vibes */}
                {!isBandhanPage && (
                  <Link
                    to="/bandhan"
                    className={`group relative flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-500 overflow-hidden ${
                      location.pathname === '/bandhan' || location.pathname.startsWith('/bandhan')
                        ? 'bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 text-white shadow-xl shadow-amber-500/40'
                        : 'bg-gradient-to-r from-amber-100 via-yellow-50 to-amber-100 text-amber-700 border border-amber-300/50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <img src="/bandhanlogo.png" alt="Bandhan" className="w-6 h-6 relative z-10 object-contain" />
                    <div className="flex flex-col items-center relative z-10">
                      <span className="text-lg font-bold tracking-widest font-serif leading-tight">BANDHAN</span>
                      <span className="text-[10px] font-light tracking-wider opacity-90 -mt-0.5">Weddings</span>
                    </div>
                    <span className="text-sm relative z-10 opacity-80">✨</span>
                  </Link>
                )}
                
                {/* Goonj Entertainment Link - Mobile when on Bandhan page */}
                {isBandhanPage && (
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
                )}
                
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="heroFilled" size="lg" className="mt-4 w-full">
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
