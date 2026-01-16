import { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export const ThemeTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [targetTheme, setTargetTheme] = useState<'dark' | 'light'>('dark');
  const location = useLocation();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    const isBandhanPage = location.pathname === '/bandhan';
    const wasBandhanPage = prevPathRef.current === '/bandhan';
    const newTheme = isBandhanPage ? 'light' : 'dark';
    
    // Only trigger transition if we're actually changing between Bandhan and other pages
    if (
      (isBandhanPage && !wasBandhanPage) || // Going TO Bandhan
      (!isBandhanPage && wasBandhanPage)    // Leaving FROM Bandhan
    ) {
      setTargetTheme(newTheme);
      setIsTransitioning(true);

      // End transition after animation completes
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 1600);

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
          {/* Full Screen Content Blocker - Keeps old page visible until curtain opens */}
          <motion.div
            key="content-blocker"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.1,
              delay: 1.3,
            }}
            className={`fixed inset-0 z-[9996] ${
              targetTheme === 'light' 
                ? 'bg-white' 
                : 'bg-background'
            }`}
          />

          {/* Left Curtain Panel */}
          <motion.div
            key="curtain-left"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{
              duration: 1.2,
              ease: [0.65, 0, 0.35, 1],
              delay: 0.2,
            }}
            className={`fixed left-0 top-0 bottom-0 w-1/2 z-[9999] pointer-events-none ${
              targetTheme === 'light' 
                ? 'bg-white' 
                : 'bg-background'
            }`}
            style={{
              boxShadow: '2px 0 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Curtain Fabric Texture */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)',
              }}
            />
            
            {/* Curtain Pleats/Folds */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, transparent 20px, rgba(0,0,0,0.1) 40px, transparent 60px)',
              }}
            />

            {/* Edge Shadow */}
            <div
              className="absolute right-0 top-0 bottom-0 w-4"
              style={{
                background: 'linear-gradient(to left, rgba(0,0,0,0.2), transparent)',
              }}
            />

            {/* Top Rod Shadow */}
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-0 left-0 right-0 h-8"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)',
              }}
            />
          </motion.div>

          {/* Right Curtain Panel */}
          <motion.div
            key="curtain-right"
            initial={{ y: 0 }}
            animate={{ y: '-100%' }}
            transition={{
              duration: 1.2,
              ease: [0.65, 0, 0.35, 1],
              delay: 0.2,
            }}
            className={`fixed right-0 top-0 bottom-0 w-1/2 z-[9999] pointer-events-none ${
              targetTheme === 'light' 
                ? 'bg-white' 
                : 'bg-background'
            }`}
            style={{
              boxShadow: '-2px 0 30px rgba(0, 0, 0, 0.3)',
            }}
          >
            {/* Curtain Fabric Texture */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.1) 4px, rgba(0,0,0,0.1) 8px)',
              }}
            />
            
            {/* Curtain Pleats/Folds */}
            <div 
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.1) 0px, transparent 20px, rgba(0,0,0,0.1) 40px, transparent 60px)',
              }}
            />

            {/* Edge Shadow */}
            <div
              className="absolute left-0 top-0 bottom-0 w-4"
              style={{
                background: 'linear-gradient(to right, rgba(0,0,0,0.2), transparent)',
              }}
            />

            {/* Top Rod Shadow */}
            <motion.div
              initial={{ opacity: 0.3 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-0 left-0 right-0 h-8"
              style={{
                background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)',
              }}
            />
          </motion.div>

          {/* Center Seam/Gap */}
          <motion.div
            key="curtain-seam"
            initial={{ y: 0, opacity: 1 }}
            animate={{ y: '-100%', opacity: 0 }}
            transition={{
              duration: 1.2,
              ease: [0.65, 0, 0.35, 1],
              delay: 0.2,
            }}
            className="fixed left-1/2 top-0 bottom-0 w-1 z-[10000] pointer-events-none -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.2), rgba(0,0,0,0.3))',
            }}
          />

          {/* Brand Name - Appears before curtain opens */}
          <motion.div
            key="brand-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[9998] pointer-events-none flex items-center justify-center"
          >
            <div className="text-center">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
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
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '100%', opacity: 1 }}
                exit={{ width: '80%', opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
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
                transition={{ duration: 0.5, delay: 0.5 }}
                className={`mt-4 text-sm uppercase tracking-widest ${
                  targetTheme === 'light' 
                    ? 'text-primary/60' 
                    : 'text-gold-light/60'
                }`}
              >
                {targetTheme === 'light' ? 'Wedding Celebrations' : 'Entertainment Excellence'}
              </motion.p>
            </div>
          </motion.div>

          {/* Ambient Stage Lighting */}
          <motion.div
            key="stage-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[9997] pointer-events-none"
            style={{
              backgroundImage: targetTheme === 'light'
                ? 'radial-gradient(ellipse at 50% 40%, rgba(212, 175, 55, 0.2) 0%, transparent 60%)'
                : 'radial-gradient(ellipse at 50% 40%, rgba(212, 175, 55, 0.25) 0%, transparent 60%)',
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
};
