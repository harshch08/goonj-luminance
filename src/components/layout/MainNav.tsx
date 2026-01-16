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
  { label: 'Gallery', href: '/gallery' },
];

export const MainNav = () => {
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
            className="fixed inset-0 z-40 bg-background/60 backdrop-blur-md lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md border-b border-border/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <span className="font-display text-2xl font-bold tracking-wide text-foreground">
                GOONJ
              </span>
              <span className="hidden sm:block text-xs text-muted-foreground tracking-luxury uppercase">
                Entertainment
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm transition-colors duration-300 underline-sweep relative ${
                    location.pathname === link.href 
                      ? 'text-gold-light' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
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
                className="text-foreground p-2"
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
                {navLinks.map((link, index) => (
                  <motion.div key={link.label}>
                    <Link
                      to={link.href}
                      className={`text-lg transition-colors ${
                        location.pathname === link.href 
                          ? 'text-gold-light' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {link.label}
                      </motion.span>
                    </Link>
                  </motion.div>
                ))}
                <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button variant="heroFilled" size="lg" className="mt-4 w-full">
                    Book Now
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
