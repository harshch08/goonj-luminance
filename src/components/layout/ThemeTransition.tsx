import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<'dark' | 'light'>('dark');
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    // Define Bandhan-themed pages (pages that should use light theme)
    const bandhanPages = [
      '/bandhan',
      '/services/destination-weddings',
      '/services/catering',
      '/services/photography',
      '/services/stage-setup',
    ];
    
    const isBandhanTheme = bandhanPages.includes(location.pathname);
    const wasBandhanTheme = bandhanPages.includes(prevPathRef.current);
    const newTheme = isBandhanTheme ? 'light' : 'dark';
    
    // Only trigger transition if we're actually changing between Bandhan theme and other pages
    if (
      (isBandhanTheme && !wasBandhanTheme) || // Going TO Bandhan theme
      (!isBandhanTheme && wasBandhanTheme)    // Leaving FROM Bandhan theme
    ) {
      setTargetTheme(newTheme);
      setIsTransitioning(true);

      // End transition after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1000);

      // Update previous path
      prevPathRef.current = location.pathname;

      return () => clearTimeout(timer);
    }
    
    // Update previous path even if no transition
    prevPathRef.current = location.pathname;
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      {isTransitioning && (
        <>
          {/* Main Overlay */}
          <motion.div
            key="transition-overlay"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className={`fixed inset-0 z-[9999] pointer-events-none ${
              targetTheme === 'light' 
                ? 'bg-white' 
                : 'bg-background'
            }`}
          >
            {/* Brand Name */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                  className={`text-6xl md:text-8xl font-display font-bold tracking-wider ${
                    targetTheme === 'light' 
                      ? 'text-primary' 
                      : 'text-gold-light'
                  }`}
                  style={{
                    textShadow: targetTheme === 'light'
                      ? '0 0 40px rgba(212, 175, 55, 0.3)'
                      : '0 0 40px rgba(212, 175, 55, 0.5)',
                  }}
                >
                  {targetTheme === 'light' ? 'Bandhan' : 'Goonj'}
                </motion.div>
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className={`h-1 mt-6 mx-auto rounded-full ${
                    targetTheme === 'light' 
                      ? 'bg-accent' 
                      : 'bg-gold'
                  }`}
                  style={{
                    boxShadow: targetTheme === 'light'
                      ? '0 0 20px rgba(212, 175, 55, 0.6)'
                      : '0 0 20px rgba(212, 175, 55, 0.8)',
                  }}
                />

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className={`mt-4 text-sm uppercase tracking-widest ${
                    targetTheme === 'light' 
                      ? 'text-primary/60' 
                      : 'text-gold-light/60'
                  }`}
                >
                  {targetTheme === 'light' ? 'Wedding Celebrations' : 'Entertainment Excellence'}
                </motion.p>
              </motion.div>
            </div>

            {/* Ambient Glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
              style={{
                backgroundImage: targetTheme === 'light'
                  ? 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)'
                  : 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
              }}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
