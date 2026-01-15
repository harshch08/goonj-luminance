import { motion } from 'framer-motion';
import { Music, Calendar, Guitar, Star, Mic, MicVocal, Heart } from 'lucide-react';

const categories = [
  { label: 'Live Music', icon: Music, href: '#live-music' },
  { label: 'Events', icon: Calendar, href: '#events' },
  { label: 'Instrumentalists', icon: Guitar, href: '#instrumentalists' },
  { label: 'Celebrity Concerts', icon: Star, href: '#celebrity' },
  { label: 'Open Mics', icon: Mic, href: '#openmic' },
  { label: 'Karaoke Nights', icon: MicVocal, href: '#karaoke' },
  { label: 'Bandhan', icon: Heart, href: '#wedding' },
];

export const CategoryNav = () => {
  return (
    <div className="sticky top-20 z-40 bg-background/80 backdrop-blur-lg border-b border-border/30">
      <div className="container mx-auto px-6 lg:px-12">
        <nav className="flex items-center gap-1 py-4 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <motion.a
              key={category.label}
              href={category.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.3 }}
              className="flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-luxury text-muted-foreground hover:text-gold-light transition-all duration-300 whitespace-nowrap group"
            >
              <category.icon size={14} className="group-hover:text-gold transition-colors" />
              <span>{category.label}</span>
              <span className="block h-px w-0 bg-gold group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>
      </div>
    </div>
  );
};
