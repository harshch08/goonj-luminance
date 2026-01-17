import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Bandhan', href: '/bandhan' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms of Service', href: '/terms-of-service' },
];

const services = [
  { label: 'Live Music', href: '#' },
  { label: 'Celebrity Concerts', href: '#' },
  { label: 'Wedding Events', href: '#' },
  { label: 'Corporate Events', href: '#' },
  { label: 'Open Mics', href: '#' },
];

export const Footer = () => {
  const location = useLocation();
  
  // Check if we're on a Bandhan page
  const isBandhanPage = location.pathname === '/bandhan' || 
    location.pathname.startsWith('/services/destination-weddings') ||
    location.pathname.startsWith('/services/catering') ||
    location.pathname.startsWith('/services/photography') ||
    location.pathname.startsWith('/services/stage-setup');
  
  return (
    <footer className="bg-background border-t border-border/30" id="contact">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              {isBandhanPage ? (
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src="/Bandhan Logo.png" 
                    alt="Bandhan Logo" 
                    className="h-20 w-auto"
                  />
                  <h3 className="font-display text-2xl font-bold text-foreground">
                    BANDHAN
                  </h3>
                </div>
              ) : (
                <div className="flex items-center gap-3 mb-2">
                  <img 
                    src="/GOONJ LOGO 2.png" 
                    alt="Goonj Logo" 
                    className="h-20 w-auto"
                  />
                  <div className="flex flex-col">
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      GOONJ
                    </h3>
                    <p className="text-xs uppercase tracking-luxury text-gold-light">
                      Entertainment
                    </p>
                  </div>
                </div>
              )}
            </div>
            <p className="text-body text-sm leading-relaxed mb-6">
              {isBandhanPage 
                ? "Crafting timeless wedding experiences with love and precision. Luxury destination wedding planning celebrating culture and unforgettable moments."
                : "India's premier event management and live entertainment company, crafting unforgettable experiences since 2025."
              }
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/goonj_entertainment__?igsh=MTZuYno5eHY5bjJ0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-300"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-300"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-gold hover:border-gold/50 transition-all duration-300"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-luxury text-foreground mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-body text-sm hover:text-gold-light transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-luxury text-foreground mb-6">
              Our Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.label}>
                  <a
                    href={service.href}
                    className="text-body text-sm hover:text-gold-light transition-colors duration-300"
                  >
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-luxury text-foreground mb-6">
              Get in Touch
            </h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-gold mt-1 flex-shrink-0" />
                <div className="text-body text-sm">
                  <div className="border-b border-gold/50 pb-1 mb-2">
                    <span className="text-gold font-medium">Mr. Ayush Gupta - CEO</span>
                  </div>
                  <div>Personal - +91 9760813704</div>
                  <div>Office - +91 9897642145</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-gold mt-1 flex-shrink-0" />
                <div className="text-body text-sm">
                  <div className="border-b border-gold/50 pb-1 mb-2">
                    <span className="text-gold font-medium">Ms. Sapna Das - Manager</span>
                  </div>
                  <div>+91 8923192218</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gold mt-1 flex-shrink-0" />
                <div className="text-body text-sm">
                  <div>goonjentertainment3@gmail.com</div>
                  <div>ceo@goonjentertainment.com</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-body text-sm">78/2 Chukhuwala Behind GPO, Near Madhav Niwas, Dehradun, Uttarakhand 248001</span>
              </li>
            </ul>
            
            <Button 
              variant="gold" 
              size="lg" 
              className="w-full gap-2"
              onClick={() => window.open('https://wa.me/919897642145?text=Hi%20Goonj%20Entertainment!%20I%20would%20like%20to%20book%20your%20services%20for%20my%20event.', '_blank')}
            >
              <MessageCircle size={16} />
              Book via WhatsApp
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-xs text-muted-foreground">
                © 2026 {isBandhanPage ? 'Bandhan by Cardinal Revolution' : 'Goonj Entertainment'}. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground">
                MSME: UDYAM-UK-05-0097096
              </p>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
