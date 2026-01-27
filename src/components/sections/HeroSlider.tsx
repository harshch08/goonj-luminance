import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

import heroLiveMusic from '@/assets/hero-live-music.jpg';
import heroEvents from '@/assets/hero-events.jpg';
import heroInstrumentalists from '@/assets/hero-instrumentalists.jpg';
import heroCelebrity from '@/assets/hero-celebrity.jpg';
import heroOpenmic from '@/assets/hero-openmic.jpg';
import heroKaraoke from '@/assets/hero-karaoke.jpg';
import heroWedding from '@/assets/hero-wedding.jpg';

const slides = [
  {
    id: 1,
    image: heroLiveMusic,
    title: 'Live Music',
    subtitle: 'Experience the Power of Live Performance',
    description: 'World-class musicians. Unforgettable nights.',
    type: 'artists',
    serviceSlug: 'live-music',
    artists: [
      {
        name: 'Rahul',
        genre: 'Western, Bollywood & Retro',
        followers: 'Singer & Performer',
        achievements: ['Versatile Artist', 'Multi-Genre Expert'],
        image: '/Rahul_Thapa_Ryan.jpeg',
        available: true,
      },
      {
        name: 'Manisha',
        genre: 'Bolly Mix',
        followers: 'Singer & Performer',
        achievements: ['Soulful Renditions', 'Dynamic Performances'],
        image: '/manisha.jpeg',
        available: true,
      },
      {
        name: 'Shreya',
        genre: 'Bolly Mix',
        followers: 'Singer & Performer',
        achievements: ['Melodious Voice', 'Contemporary Music'],
        image: '/shreya.jpeg',
        available: true,
      },
      {
        name: 'Ranjan',
        genre: 'Bolly Mix',
        followers: 'Singer & Performer',
        achievements: ['Traditional & Modern', 'Unique Blend'],
        image: '/ranjan.jpeg',
        available: true,
      },
      {
        name: 'Abhishek',
        genre: 'Bolly Mix',
        followers: 'Singer & Performer',
        achievements: ['Versatile Range', 'Engaging Performances'],
        image: '/abhishek.jpeg',
        available: true,
      },
    ],
  },
  {
    id: 2,
    image: heroEvents,
    title: 'Premium Events',
    subtitle: 'Where Elegance Meets Entertainment',
    description: 'Corporate galas & exclusive celebrations.',
    type: 'regular',
    serviceSlug: 'events',
  },
  {
    id: 3,
    image: heroInstrumentalists,
    title: 'Instrumentalists',
    subtitle: 'Masters of Musical Expression',
    description: 'Curated ensemble of virtuoso performers.',
    type: 'regular',
    serviceSlug: 'instrumentalists',
  },
  {
    id: 4,
    image: heroCelebrity,
    title: 'Celebrity Concerts',
    subtitle: 'Star-Studded Performances',
    description: 'Bringing icons to your stage.',
    type: 'regular',
    serviceSlug: 'celebrity',
  },
  {
    id: 5,
    image: heroOpenmic,
    title: 'Open Mics',
    subtitle: 'Discover Raw Talent',
    description: 'Intimate nights of emerging artistry.',
    type: 'regular',
    serviceSlug: 'openmic',
  },
  {
    id: 6,
    image: heroKaraoke,
    title: 'Karaoke Nights',
    subtitle: 'Your Stage Awaits',
    description: 'Upscale entertainment experiences.',
    type: 'regular',
    serviceSlug: 'karaoke',
  },
  {
    id: 7,
    image: heroWedding,
    title: 'Bandhan',
    subtitle: 'Celebrating Sacred Unions',
    description: 'Luxury wedding & cultural events.',
    type: 'regular',
    serviceSlug: 'bandhan',
  },
  {
    id: 8,
    image: heroCelebrity, // Using celebrity image as background
    title: 'Featured Talent',
    subtitle: 'Top Artists at Your Service',
    description: 'Book India\'s most celebrated artists for your next event. From chart-toppers to underground legends.',
    type: 'artists',
    artists: [
      {
        name: 'Badshah',
        genre: 'Hip-Hop & Rap',
        followers: '12M+ Followers',
        achievements: ['Chart-topping rapper', 'Bollywood Collaborations'],
        image: '/badshah.png',
        available: true,
      },
      {
        name: 'Priyanka Meher',
        genre: 'Bollywood & Pop',
        followers: '5M+ Followers',
        achievements: ['Versatile Singer', 'Award-Winning Artist'],
        image: '/priyanka-meher.png',
        available: true,
      },
      {
        name: 'Paradox',
        genre: 'Electronic & EDM',
        followers: '2M+ Followers',
        achievements: ['International DJ', 'Award-Winning Producer'],
        image: '/paradox.png',
        available: true,
      },
    ],
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwipingActive, setIsSwipingActive] = useState(false);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Swipe detection
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true); // Pause auto-advance during touch
    setIsSwipingActive(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    setIsSwipingActive(false);
    
    if (!touchStart || !touchEnd) {
      setIsPaused(false);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
    
    // Resume auto-advance after a delay
    setTimeout(() => setIsPaused(false), 1000);
  };

  // Auto-advance slides
  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const slideVariants = {
    enter: {
      opacity: 0,
    },
    center: {
      zIndex: 1,
      opacity: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
    },
  };

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative h-screen w-full overflow-hidden film-grain"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Image */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ 
            duration: 1.2, 
            ease: "easeInOut"
          }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 hero-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex items-center justify-center py-20 lg:py-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ 
              duration: 0.3, 
              delay: 0.1,
              ease: "easeOut"
            }}
            className="w-full max-w-7xl mx-auto"
          >
            {slide.type === 'artists' ? (
              // Artists banner layout - mobile-first responsive design
              <div className="flex flex-col items-center justify-center min-h-0 py-8 lg:py-0">
                {/* Mobile: Stack everything vertically, Desktop: Side by side */}
                <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
                  
                  {/* Text Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="flex-1 text-left max-w-xl lg:max-w-2xl"
                  >
                    <motion.h1
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 }}
                      className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 lg:mb-6 leading-tight"
                    >
                      {slide.serviceSlug === 'live-music' ? (
                        <>
                          Live Music
                          <span className="block text-amber-500">Artists</span>
                          <span className="block text-sm sm:text-lg md:text-xl font-normal text-body mt-1 lg:mt-2">
                            At Your Service
                          </span>
                        </>
                      ) : (
                        <>
                          India's Premier
                          <span className="block text-amber-500">Artists</span>
                          <span className="block text-sm sm:text-lg md:text-xl font-normal text-body mt-1 lg:mt-2">
                            At Your Service
                          </span>
                        </>
                      )}
                    </motion.h1>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-sm sm:text-lg md:text-xl text-body mb-6 lg:mb-10 max-w-2xl"
                    >
                      {slide.serviceSlug === 'live-music' 
                        ? 'Experience electrifying live performances with our talented musicians.'
                        : 'From chart-toppers to underground legends, book celebrated artists for unforgettable performances.'
                      }
                    </motion.p>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 }}
                      className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                    >
                      <Button 
                        variant="heroFilled" 
                        size="lg"
                        onClick={() => navigate('/artists')}
                        className="group text-sm lg:text-base"
                      >
                        View All Artists
                        <motion.span
                          className="ml-2 inline-block"
                          animate={{ x: [0, 2, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          →
                        </motion.span>
                      </Button>
                      <Button 
                        variant="hero" 
                        size="lg"
                        onClick={() => navigate('/contact')}
                        className="text-sm lg:text-base"
                      >
                        Book Now
                      </Button>
                    </motion.div>
                  </motion.div>

                  {/* Artists Display */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex-1 w-full max-w-2xl"
                  >
                    {/* Mobile: Horizontal scroll */}
                    <div className="flex lg:hidden gap-3 overflow-x-auto pb-4 px-4 no-scrollbar">
                      {slide.artists?.map((artist, index) => (
                        <motion.div
                          key={artist.name}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            delay: 0.3 + index * 0.05,
                            duration: 0.3,
                            ease: "easeOut"
                          }}
                          className="relative group cursor-pointer flex-shrink-0"
                          onMouseEnter={() => setIsPaused(true)}
                          onMouseLeave={() => setIsPaused(false)}
                          onClick={() => navigate('/artists')}
                        >
                          {/* Compact Artist Card */}
                          <div className="relative w-32 h-44 sm:w-36 sm:h-48 bg-amber-50/20 backdrop-blur-md border border-amber-200/30 shadow-xl overflow-hidden group-hover:border-amber-400/60 transition-all duration-300 hover:scale-105">
                            
                            {/* Artist Image */}
                            <div className="relative h-24 sm:h-28 overflow-hidden">
                              <div
                                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                style={{ backgroundImage: `url(${artist.image})` }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent" />
                              
                              {/* Play icon */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 bg-amber-100/30 backdrop-blur-sm flex items-center justify-center border border-amber-400/40 rounded-full">
                                  <div className="w-0 h-0 border-l-[5px] border-l-amber-600 border-y-[3px] border-y-transparent ml-0.5"></div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Artist Info */}
                            <div className="relative h-20 p-2 bg-gradient-to-t from-amber-50/95 via-amber-50/90 to-amber-50/80 backdrop-blur-sm">
                              <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.35 + index * 0.02 }}
                                className="font-display text-xs sm:text-sm font-bold text-amber-900 mb-1 group-hover:text-amber-600 transition-colors duration-300 text-center leading-tight"
                              >
                                {artist.name}
                              </motion.h3>
                              
                              <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 + index * 0.02 }}
                                className="text-[10px] sm:text-xs text-amber-700/80 font-medium text-center leading-tight"
                              >
                                {artist.followers}
                              </motion.p>
                            </div>
                            
                            {/* Hover effect */}
                            <div className="absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Desktop: Custom Grid with centered bottom row */}
                    <div className="hidden lg:block">
                      {/* First row - 3 artists */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        {slide.artists?.slice(0, 3).map((artist, index) => (
                          <motion.div
                            key={artist.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: 0.3 + index * 0.05,
                              duration: 0.3,
                              ease: "easeOut"
                            }}
                            className="relative group cursor-pointer"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            onClick={() => navigate('/artists')}
                          >
                            {/* Compact Artist Card */}
                            <div className="relative w-40 h-52 bg-amber-50/20 backdrop-blur-md border border-amber-200/30 shadow-xl overflow-hidden group-hover:border-amber-400/60 transition-all duration-300 hover:scale-105">
                              
                              {/* Artist Image */}
                              <div className="relative h-32 overflow-hidden">
                                <div
                                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                  style={{ backgroundImage: `url(${artist.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent" />
                                
                                {/* Play icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="w-8 h-8 bg-amber-100/30 backdrop-blur-sm flex items-center justify-center border border-amber-400/40 rounded-full">
                                    <div className="w-0 h-0 border-l-[5px] border-l-amber-600 border-y-[3px] border-y-transparent ml-0.5"></div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Artist Info */}
                              <div className="relative h-20 p-3 bg-gradient-to-t from-amber-50/95 via-amber-50/90 to-amber-50/80 backdrop-blur-sm">
                                <motion.h3
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.35 + index * 0.02 }}
                                  className="font-display text-base font-bold text-amber-900 mb-1 group-hover:text-amber-600 transition-colors duration-300 text-center leading-tight"
                                >
                                  {artist.name}
                                </motion.h3>
                                
                                <motion.p
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.4 + index * 0.02 }}
                                  className="text-xs text-amber-700/80 font-medium text-center leading-tight"
                                >
                                  {artist.followers}
                                </motion.p>
                              </div>
                              
                              {/* Hover effect */}
                              <div className="absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Second row - 2 artists centered */}
                      <div className="flex justify-center gap-4">
                        {slide.artists?.slice(3, 5).map((artist, index) => (
                          <motion.div
                            key={artist.name}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ 
                              delay: 0.3 + (index + 3) * 0.05,
                              duration: 0.3,
                              ease: "easeOut"
                            }}
                            className="relative group cursor-pointer"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => setIsPaused(false)}
                            onClick={() => navigate('/artists')}
                          >
                            {/* Compact Artist Card */}
                            <div className="relative w-40 h-52 bg-amber-50/20 backdrop-blur-md border border-amber-200/30 shadow-xl overflow-hidden group-hover:border-amber-400/60 transition-all duration-300 hover:scale-105">
                              
                              {/* Artist Image */}
                              <div className="relative h-32 overflow-hidden">
                                <div
                                  className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                                  style={{ backgroundImage: `url(${artist.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-amber-900/60 via-transparent to-transparent" />
                                
                                {/* Play icon */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <div className="w-8 h-8 bg-amber-100/30 backdrop-blur-sm flex items-center justify-center border border-amber-400/40 rounded-full">
                                    <div className="w-0 h-0 border-l-[5px] border-l-amber-600 border-y-[3px] border-y-transparent ml-0.5"></div>
                                  </div>
                                </div>
                              </div>
                              
                              {/* Artist Info */}
                              <div className="relative h-20 p-3 bg-gradient-to-t from-amber-50/95 via-amber-50/90 to-amber-50/80 backdrop-blur-sm">
                                <motion.h3
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.35 + (index + 3) * 0.02 }}
                                  className="font-display text-base font-bold text-amber-900 mb-1 group-hover:text-amber-600 transition-colors duration-300 text-center leading-tight"
                                >
                                  {artist.name}
                                </motion.h3>
                                
                                <motion.p
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.4 + (index + 3) * 0.02 }}
                                  className="text-xs text-amber-700/80 font-medium text-center leading-tight"
                                >
                                  {artist.followers}
                                </motion.p>
                              </div>
                              
                              {/* Hover effect */}
                              <div className="absolute inset-0 bg-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ) : (
              // Regular slide layout
              <div className="max-w-4xl">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="inline-block text-xs uppercase tracking-luxury text-amber-400 mb-4"
                >
                  {slide.title}
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
                >
                  {slide.subtitle}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg md:text-xl text-body mb-10 max-w-2xl"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button 
                    variant="heroFilled" 
                    size="xl"
                    onClick={() => navigate(slide.serviceSlug === 'bandhan' ? '/bandhan' : `/services/${slide.serviceSlug}`)}
                  >
                    Book Your Event
                  </Button>
                  <Button 
                    variant="hero" 
                    size="xl"
                    onClick={() => navigate('/services')}
                  >
                    Explore Experiences
                  </Button>
                </motion.div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-6 lg:left-12 flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1 transition-all duration-500 ${
                index === currentSlide 
                  ? 'w-12 bg-amber-500' 
                  : 'w-4 bg-amber-200/40 hover:bg-amber-300/60'
              }`}
            />
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="lg:hidden absolute bottom-16 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-amber-600/50 animate-pulse">
          <span>←</span>
          <span>Swipe to navigate</span>
          <span>→</span>
        </div>

        {/* Desktop Navigation Arrows - Bottom Right */}
        <div className="hidden lg:flex absolute bottom-8 right-6 lg:right-12 items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-amber-50/20 backdrop-blur-sm border border-amber-200/30 flex items-center justify-center text-amber-700/70 hover:bg-amber-100/30 hover:border-amber-400/60 hover:text-amber-600 transition-all duration-300 group"
          >
            <ChevronLeft size={20} className="group-hover:scale-110 transition-transform duration-200" />
          </button>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-amber-50/20 backdrop-blur-sm border border-amber-200/30 flex items-center justify-center text-amber-700/70 hover:bg-amber-100/30 hover:border-amber-400/60 hover:text-amber-600 transition-all duration-300 group"
          >
            <ChevronRight size={20} className="group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </section>
  );
};