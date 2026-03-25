import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music, Star, FileText, ShoppingCart } from 'lucide-react';
import { useQuotationCart } from '@/context/QuotationCartContext';

const leftCategories = [
  { label: 'Live Music', icon: Music, href: '/services/live-music' },
];

const rightCategories = [
  { label: 'Celebrity Concerts', icon: Star, href: '/services/celebrity' },
];

export const CategoryNav = () => {
  const location = useLocation();
  const { itemCount } = useQuotationCart();

  const isBandhanPage = location.pathname === '/bandhan' ||
    location.pathname.startsWith('/bandhan/');

  const isQuotationPage = location.pathname === '/quotation';

  const linkClass = (href: string) => {
    const isActive = location.pathname === href;
    return `flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] md:text-xs uppercase tracking-wide transition-all duration-300 whitespace-nowrap group min-w-max ${
      isActive
        ? (isBandhanPage ? 'text-yellow-300' : 'text-gold-light')
        : (isBandhanPage ? 'text-white/80 hover:text-white' : 'text-muted-foreground hover:text-gold-light')
    }`;
  };

  const iconClass = (href: string) => {
    const isActive = location.pathname === href;
    return `${isActive ? (isBandhanPage ? 'text-yellow-300' : 'text-gold') : (isBandhanPage ? 'group-hover:text-white' : 'group-hover:text-gold')} transition-colors`;
  };

  const underlineClass = (href: string) => {
    const isActive = location.pathname === href;
    return `block h-px ${isBandhanPage ? 'bg-white' : 'bg-gold'} transition-all duration-300 ${isActive ? 'w-12' : 'w-0 group-hover:w-12'}`;
  };

  const renderLink = (cat: { label: string; icon: React.ElementType; href: string }) => (
    <motion.div key={cat.label} className="flex-shrink-0 md:flex-1">
      <Link to={cat.href} className={linkClass(cat.href)}>
        <cat.icon size={12} className={iconClass(cat.href)} />
        <span className="hidden sm:inline">{cat.label}</span>
        <span className="sm:hidden">{cat.label.split(' ')[0]}</span>
        <span className={underlineClass(cat.href)} />
      </Link>
    </motion.div>
  );

  return (
    <div className={`sticky top-20 z-40 bg-transparent backdrop-blur-sm border-b ${isBandhanPage ? 'border-white/20' : 'border-border/20'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <nav className="flex items-center py-2 overflow-x-auto overflow-y-hidden no-scrollbar scroll-smooth">
          <div className="flex items-center w-full gap-1 md:gap-0">
            {/* Left categories */}
            <div className="flex items-center md:flex-1 md:justify-around gap-1 md:gap-0">
              {leftCategories.map(renderLink)}
            </div>

            {/* Centre: Get Quotation */}
            <div className="flex-shrink-0 px-2 md:px-4">
              <Link to="/quotation"
                className={`relative flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-semibold uppercase tracking-wide transition-all duration-300 whitespace-nowrap
                  ${isQuotationPage
                    ? 'bg-gold text-black shadow-[0_0_20px_rgba(180,150,80,0.7)] scale-105'
                    : 'bg-gold/90 hover:bg-gold text-black shadow-[0_0_12px_rgba(180,150,80,0.4)] hover:shadow-[0_0_20px_rgba(180,150,80,0.6)] hover:scale-105'
                  }`}>
                <FileText size={11} />
                <span className="hidden sm:inline">Get Quotation</span>
                <span className="sm:hidden">Quote</span>
                {itemCount > 0 && (
                  <span className="flex items-center gap-0.5 ml-0.5">
                    <ShoppingCart size={10} />
                    <span className="font-bold">{itemCount}</span>
                  </span>
                )}
              </Link>
            </div>

            {/* Right categories */}
            <div className="flex items-center md:flex-1 md:justify-around gap-1 md:gap-0">
              {rightCategories.map(renderLink)}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};
