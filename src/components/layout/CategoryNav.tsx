import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Calendar, Guitar, Star, Mic, MicVocal, Heart } from 'lucide-react';

const categories = [
  { label: 'Live Music', icon: Music, href: '/services/live-music' },
  { label: 'Events', icon: Calendar, href: '/services/events' },
  { label: 'Instrumentalists', icon: Guitar, href: '/services/instrumentalists' },
  { label: 'Celebrity Concerts', icon: Star, href: '/services/celebrity' },
  { label: 'Open Mics', icon: Mic, href: '/services/openmic' },
  { label: 'Karaoke Nights', icon: MicVocal, href: '/services/karaoke' },
  { label: 'Bandhan', icon: Heart, href: '/bandhan' },
];

export const CategoryNav = () => {
  const location = useLocation();
  
  // Check if we're on a Bandhan page
  const isBandhanPage = location.pathname === '/bandhan' || 
    location.pathname.startsWith('/services/destination-weddings') ||
    location.pathname.startsWith('/services/catering') ||
    location.pathname.startsWith('/services/photography') ||
    location.pathname.startsWith('/services/stage-setup');
  
  return (
    <div className={`sticky top-20 z-40 ${isBandhanPage ? 'bg-transparent' : 'bg-transparent backdrop-blur-sm'} border-b ${isBandhanPage ? 'border-white/20' : 'border-border/20'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center py-3 overflow-x-auto overflow-y-hidden no-scrollbar md:justify-between md:overflow-hidden scroll-smooth">
          <div className="flex items-center gap-2 md:contents pl-2 pr-4 md:px-0">
            {categories.map((category) => {
              const isActive = location.pathname === category.href;
              return (
                <motion.div key={category.label} className="flex-shrink-0 md:flex-1">
                  <Link
                    to={category.href}
                    className={`flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] md:text-xs uppercase tracking-wide transition-all duration-300 whitespace-nowrap group min-w-max ${
                      isActive 
                        ? (isBandhanPage ? 'text-yellow-300' : 'text-gold-light')
                        : (isBandhanPage ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-gold-light')
                    }`}
                  >
                    <category.icon size={12} className={`${isActive ? (isBandhanPage ? 'text-yellow-300' : 'text-gold') : (isBandhanPage ? 'group-hover:text-white' : 'group-hover:text-gold')} transition-colors`} />
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                    <span className={`block h-px ${isBandhanPage ? 'bg-white' : 'bg-gold'} transition-all duration-300 ${isActive ? 'w-12' : 'w-0 group-hover:w-12'}`} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
};
