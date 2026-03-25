import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LiveArtistHeroCard, type LiveArtistHero } from '@/components/artists';
import { LikeErrorBoundary, LikeToastProvider } from '@/components/likes';
import { useBulkLikes } from '@/hooks';
import heroLiveMusic from '@/assets/hero-live-music.jpg';

const artists: LiveArtistHero[] = [
  {
    id: 101, // Using 100+ IDs to avoid conflicts with main artists
    name: 'Rahul',
    genre: 'Western, Bollywood & Retro',
    tag: 'Singer & Performer',
    image: '/Rahul_Thapa_Ryan.jpeg'
  },
  {
    id: 104,
    name: 'Ranjan',
    genre: 'Bolly Mix',
    tag: 'Singer & Performer',
    image: '/ranjan.jpeg'
  },
  {
    id: 107,
    name: 'Ajay',
    genre: 'Bolly Mix',
    tag: 'Singer & Performer',
    image: '/Ajay.jpeg'
  }
];

export const LiveMusicHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);

  // Bulk likes management for better performance
  const {
    artistsData,
    isLoading: bulkLoading,
    loadArtists,
    getArtistData
  } = useBulkLikes({
    enableCache: true,
    autoRefresh: false
  });

  // Load all artist like data when component mounts
  useEffect(() => {
    const artistConfigs = artists.map(artist => ({
      id: artist.id,
      name: artist.name
    }));
    
    loadArtists(
      artistConfigs.map(a => a.id),
      artistConfigs.reduce((acc, artist) => {
        acc[artist.id] = artist.name;
        return acc;
      }, {} as Record<number, string>)
    );
  }, [loadArtists]);

  // Desktop auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % artists.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Mobile auto-slide
  useEffect(() => {
    const mobileTimer = setInterval(() => {
      setMobileSlide((prev) => (prev + 1) % artists.length);
    }, 3000); // Slightly faster for mobile

    return () => clearInterval(mobileTimer);
  }, []);

  return (
    <LikeToastProvider>
      <LikeErrorBoundary>
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          {/* Static Background */}
          <div className="absolute inset-0">
            <img
              src={heroLiveMusic}
              alt="Live Music Performance"
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-background/90" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/40" />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="text-left order-2 lg:order-1">
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-4"
                >
                  Goonj Entertainment
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 lg:mb-6"
                >
                  Live Music
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-white/90 text-base sm:text-lg md:text-xl mb-6 lg:mb-8 max-w-lg"
                >
                  Electrifying performances that create unforgettable moments with our talented artists
                </motion.p>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="w-24 h-1 bg-gold-light"
                />
              </div>

              {/* Right Content - Artist Card */}
              <div className="relative order-1 lg:order-2">
                {/* Artist Card */}
                <div className="relative h-80 sm:h-72 lg:h-80 w-full max-w-sm sm:max-w-xl lg:max-w-3xl mx-auto">
                  {/* Mobile Layout - Auto-sliding through all artists */}
                  <div className="sm:hidden h-full">
                    <div className="h-full bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg overflow-hidden shadow-2xl">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={mobileSlide}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="w-full h-full relative overflow-hidden"
                        >
                          <LiveArtistHeroCard
                            artist={artists[mobileSlide]}
                            isActive={true}
                            isMobile={true}
                            bulkData={getArtistData(artists[mobileSlide].id)}
                            isLoading={bulkLoading}
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Desktop/Tablet Layout - With animation */}
                  <div className="hidden sm:block relative h-full">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -50, scale: 0.95 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                        className="absolute inset-0 bg-white/15 backdrop-blur-xl border border-white/30 rounded-lg overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500"
                      >
                        <LiveArtistHeroCard
                          artist={artists[currentSlide]}
                          isActive={true}
                          isMobile={false}
                          bulkData={getArtistData(artists[currentSlide].id)}
                          isLoading={bulkLoading}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                {/* Slide Indicators - Hidden on mobile */}
                <div className="hidden sm:flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                  {artists.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`transition-all duration-300 ${
                        index === currentSlide 
                          ? 'w-6 sm:w-8 h-2 sm:h-3 bg-gold-light rounded-full' 
                          : 'w-2 sm:w-3 h-2 sm:h-3 bg-white/40 hover:bg-white/60 rounded-full'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </LikeErrorBoundary>
    </LikeToastProvider>
  );
};