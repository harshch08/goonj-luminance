import { Link, useLocation } from 'react-router-dom';
import { Instagram, Youtube, Phone, Mail, MapPin, MessageCircle } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '/bandhan' },
  { label: 'About Us', href: '/bandhan/about' },
  { label: 'Services', href: '/bandhan/services' },
  { label: 'Contact', href: '/bandhan/contact' },
  { label: 'Goonj Entertainment', href: '/' },
];

const services = [
  { label: 'Destination Weddings', href: '/bandhan/destination-weddings' },
  { label: 'Catering & Decor', href: '/bandhan/catering' },
  { label: 'Photography', href: '/bandhan/photography' },
  { label: 'Stage Setup', href: '/bandhan/stage-setup' },
  { label: 'Corporate Events', href: '/bandhan/corporate-events' },
  { label: 'Other Services', href: '/bandhan/other-services' },
];

export const BandhanFooter = () => {
  return (
    <footer className="bg-[hsl(40,40%,97%)] border-t border-[hsl(38,20%,85%)]" id="bandhan-contact">
      <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src="/bandhanlogo.png" alt="Bandhan Logo" className="h-20 w-auto" />
              <div className="flex flex-col">
                <h3 className="font-display text-2xl font-bold text-[hsl(25,30%,20%)]">BANDHAN</h3>
                <p className="text-xs uppercase tracking-widest text-yellow-700 font-medium">Weddings</p>
              </div>
            </div>
            <p className="text-sm text-[hsl(25,20%,45%)] leading-relaxed mb-6">
              Crafting timeless wedding experiences with love and precision. Luxury destination wedding planning celebrating culture and unforgettable moments.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.instagram.com/goonj_entertainment__?igsh=MTZuYno5eHY5bjJ0" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 border border-[hsl(38,20%,85%)] flex items-center justify-center text-[hsl(25,20%,45%)] hover:text-yellow-700 hover:border-yellow-400 transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 border border-[hsl(38,20%,85%)] flex items-center justify-center text-[hsl(25,20%,45%)] hover:text-yellow-700 hover:border-yellow-400 transition-all duration-300">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links + Services — 2 col on mobile, separate cols on desktop */}
          <div className="grid grid-cols-2 md:contents gap-8 md:gap-0">
          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[hsl(25,30%,20%)] font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className={`text-sm transition-colors duration-300 ${
                      link.href === '/'
                        ? 'text-yellow-700 font-semibold hover:text-yellow-600'
                        : 'text-[hsl(25,20%,45%)] hover:text-yellow-700'
                    }`}
                  >
                    {link.href === '/' ? '' : ''}{link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[hsl(25,30%,20%)] font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map(s => (
                <li key={s.label}>
                  <Link to={s.href} className="text-sm text-[hsl(25,20%,45%)] hover:text-yellow-700 transition-colors duration-300">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[hsl(25,30%,20%)] font-semibold mb-6">Get in Touch</h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-yellow-700 mt-1 flex-shrink-0" />
                <div className="text-sm text-[hsl(25,20%,45%)]">
                  <div className="font-medium text-[hsl(25,30%,20%)] mb-1">Mr. Ayush Gupta — CEO</div>
                  <div className="border-t border-[hsl(38,20%,85%)] pt-1 space-y-0.5">
                    <div>Personal — +91 9760813704</div>
                    <div>Office — +91 9897642145</div>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-yellow-700 mt-1 flex-shrink-0" />
                <div className="text-sm text-[hsl(25,20%,45%)]">
                  <div className="font-medium text-[hsl(25,30%,20%)] mb-1">Ms. Sapna Das — Partner</div>
                  <div className="border-t border-[hsl(38,20%,85%)] pt-1">
                    <div>+91 8923192218</div>
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-yellow-700 mt-1 flex-shrink-0" />
                <div className="text-sm text-[hsl(25,20%,45%)]">
                  <div>goonjentertainment3@gmail.com</div>
                  <div>ceo@goonjentertainment.com</div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-yellow-700 mt-1 flex-shrink-0" />
                <span className="text-sm text-[hsl(25,20%,45%)]">78/2 Chukhuwala Behind GPO, Near Madhav Niwas, Dehradun, Uttarakhand 248001</span>
              </li>
            </ul>
            <button
              onClick={() => window.open('https://wa.me/919897642145?text=Hi%20Bandhan!%20I%20would%20like%20to%20plan%20my%20wedding.', '_blank')}
              className="w-full flex items-center justify-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold text-sm py-3 rounded-xl transition-all duration-200"
            >
              <MessageCircle size={16} />
              Book via WhatsApp
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-[hsl(38,20%,85%)] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(25,20%,45%)]">© 2026 Bandhan. All rights reserved.</p>
          <p className="text-xs text-[hsl(25,20%,45%)]">MSME: UDYAM-UK-05-0097096</p>
        </div>
      </div>
    </footer>
  );
};
