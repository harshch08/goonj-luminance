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
              <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                {isBandhanPage ? 'BANDHAN' : 'GOONJ'}
              </h3>
              {!isBandhanPage && (
                <p className="text-xs uppercase tracking-luxury text-gold-light">
                  Entertainment
                </p>
              )}
            </div>
            <p className="text-body text-sm leading-relaxed mb-6">
              {isBandhanPage 
                ? "Crafting timeless wedding experiences with love and precision. Luxury destination wedding planning celebrating culture and unforgettable moments."
                : "India's premier event management and live entertainment company, crafting unforgettable experiences since 2015."
              }
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com"
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
                <span className="text-body text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-body text-sm">hello@goonjentertainment.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-gold mt-1 flex-shrink-0" />
                <span className="text-body text-sm">Mumbai, Maharashtra, India</span>
              </li>
            </ul>
            
            <Button variant="gold" size="lg" className="w-full gap-2">
              <MessageCircle size={16} />
              Book via WhatsApp
            </Button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/30">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              © 2024 {isBandhanPage ? 'Bandhan by Cardinal Revolution' : 'Goonj Entertainment'}. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
