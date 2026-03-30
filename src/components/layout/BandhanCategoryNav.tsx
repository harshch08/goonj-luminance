import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Heart, Camera, Utensils, Mic2, Briefcase, MoreHorizontal } from 'lucide-react';

const categories = [
  { label: 'Destination Weddings', icon: Heart, href: '/bandhan/destination-weddings' },
  { label: 'Catering & Decor', icon: Utensils, href: '/bandhan/catering' },
  { label: 'Photography', icon: Camera, href: '/bandhan/photography' },
  { label: 'Stage Setup', icon: Mic2, href: '/bandhan/stage-setup' },
  { label: 'Corporate Events', icon: Briefcase, href: '/bandhan/corporate-events' },
  { label: 'Other Services', icon: MoreHorizontal, href: '/bandhan/other-services' },
];

export const BandhanCategoryNav = () => {
  const location = useLocation();
  const [barVisible, setBarVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setBarVisible(y < lastScrollY.current || y < 10);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // nav height: 64px mobile / 80px desktop. bar: 38px when visible.
  const isDesktop = typeof window !== 'undefined' && window.innerWidth >= 1024;
  const navHeight = isDesktop ? 80 : 64;
  const top = barVisible ? navHeight + 38 : navHeight;

  return (
    <div
      className="sticky z-40 bg-white border-b border-gray-200/50"
      style={{ top: `${top}px`, transition: 'top 0.3s ease' }}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center py-3 overflow-x-auto overflow-y-hidden no-scrollbar md:justify-center scroll-smooth">
          <div className="flex items-center gap-2 md:gap-6 pl-2 pr-4 md:px-0">
            {categories.map((category) => {
              const isActive = location.pathname === category.href;
              return (
                <motion.div key={category.label} className="flex-shrink-0">
                  <Link
                    to={category.href}
                    className={`flex items-center gap-1.5 px-3 py-2 text-[10px] md:text-xs uppercase tracking-wide transition-all duration-300 whitespace-nowrap group min-w-max ${
                      isActive ? 'text-yellow-600' : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    <category.icon size={12} className={`transition-colors ${isActive ? 'text-yellow-600' : 'group-hover:text-gray-800'}`} />
                    <span>{category.label}</span>
                    <span className={`block h-px bg-yellow-600 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
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
