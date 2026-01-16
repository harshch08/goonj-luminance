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
  
  return (
    <div className="sticky top-20 z-40 bg-transparent backdrop-blur-sm border-b border-border/20">
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center gap-1 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => {
            const isActive = location.pathname === category.href;
            return (
              <motion.div key={category.label}>
                <Link
                  to={category.href}
                  className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-luxury transition-all duration-300 whitespace-nowrap group ${
                    isActive 
                      ? 'text-gold-light' 
                      : 'text-muted-foreground hover:text-gold-light'
                  }`}
                >
                  <category.icon size={14} className={isActive ? 'text-gold' : 'group-hover:text-gold transition-colors'} />
                  <span>{category.label}</span>
                  <span className={`block h-px bg-gold transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
