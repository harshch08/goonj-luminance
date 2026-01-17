import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Calendar, Guitar, Star, Mic, MicVocal, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';

const categories = [
  { label: 'Live Music', icon: Music, href: '/services/live-music' },
  { label: 'Events', icon: Calendar, href: '/services/events' },
  { label: 'Instrumentalists', icon: Guitar, href: '/services/instrumentalists' },
  { label: 'Celebrity Concerts', icon: Star, href: '/services/celebrity' },
  { label: 'Open Mics', icon: Mic, href: '/services/openmic' },
  { label: 'Karaoke Nights', icon: MicVocal, href: '/services/karaoke' },
  { label: 'Bandhan', icon: Heart, href: '/bandhan' },
];

export const BandhanCategoryNav = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="sticky top-20 z-40 bg-white border-b border-gray-200/50">
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center justify-between py-3 overflow-hidden">
          {categories.map((category, index) => {
            const isActive = location.pathname === category.href;
            return (
              <motion.div key={category.label} className="flex-1">
                <Link
                  to={category.href}
                  className={`flex items-center justify-center gap-1.5 px-2 py-2 text-[10px] md:text-xs uppercase tracking-wide transition-all duration-300 whitespace-nowrap group ${
                    isActive 
                      ? 'text-yellow-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <category.icon 
                    size={12} 
                    className={`transition-colors ${
                      isActive 
                        ? 'text-yellow-600'
                        : 'group-hover:text-gray-800'
                    }`} 
                  />
                  <span className="hidden sm:inline">{category.label}</span>
                  <span className="sm:hidden">{category.label.split(' ')[0]}</span>
                  <span 
                    className={`block h-px bg-yellow-600 transition-all duration-300 ${isActive ? 'w-12' : 'w-0 group-hover:w-12'}`} 
                  />
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </div>
  );
};