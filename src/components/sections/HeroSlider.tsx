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
    type: 'regular',
    serviceSlug: 'live-music',
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
    serviceSlug: 'wedding',
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
        image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=800&h=1000&fit=crop&crop=face',
        available: true,
      },
      {
        name: 'Paradox',
        genre: 'Electronic & EDM',
        followers: '2M+ Followers',
        achievements: ['International DJ', 'Award-Winning Producer'],
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=1000&fit=crop&crop=face',
        available: true,
      },
      {
        name: 'MC Square',
        genre: 'Hip-Hop & Freestyle',
        followers: '1.5M+ Followers',
        achievements: ['MTV Hustle Winner', 'Viral Performances'],
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop&crop=face',
        available: true,
      },
    ],
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  }, [currentSlide]);

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const slideVariants = {
    enter: {
      opacity: 0,
      scale: 1.05,
    },
    center: {
      zIndex: 1,
      opacity: 1,
      scale: 1,
    },
    exit: {
      zIndex: 0,
      opacity: 0,
      scale: 0.95,
    },
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden film-grain">
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
            ease: [0.25, 0.46, 0.45, 0.94],
            opacity: { duration: 0.8 },
            scale: { duration: 1.2 }
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
      <div className="relative z-10 container mx-auto px-4 lg:px-8 h-full flex flex-col justify-center pt-24 lg:pt-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            className="max-w-7xl w-full mx-auto"
          >
            {slide.type === 'artists' ? (
              // Artists banner layout - enhanced design
              <div className="flex flex-col lg:flex-row items-center justify-between gap-16 h-full">
                {/* Left side - Enhanced text content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex-1 max-w-2xl text-center lg:text-left"
                >
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-block text-sm uppercase tracking-[0.2em] text-gold font-semibold mb-6 px-4 py-2 border border-gold/30 rounded-full bg-gold/10 backdrop-blur-sm"
                  >
                    ✨ Featured Talent
                  </motion.span>
                  
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-8 leading-tight"
                  >
                    India's Premier
                    <span className="block text-gold">Artists</span>
                    <span className="block text-3xl md:text-4xl lg:text-5xl font-normal text-body mt-2">
                      At Your Service
                    </span>
                  </motion.h1>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg md:text-xl text-body mb-10 max-w-lg leading-relaxed"
                  >
                    From chart-topping sensations to underground legends, book the most celebrated artists for unforgettable performances that will elevate your event.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  >
                    <Button 
                      variant="heroFilled" 
                      size="xl"
                      onClick={() => navigate('/artists')}
                      className="group"
                    >
                      View All Artists
                      <motion.span
                        className="ml-2 inline-block"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </Button>
                    <Button 
                      variant="hero" 
                      size="xl"
                      onClick={() => navigate('/contact')}
                    >
                      Book Now
                    </Button>
                  </motion.div>
                </motion.div>

                {/* Right side - Premium artist display */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex-1 flex justify-center lg:justify-end"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl">
                    {slide.artists?.map((artist, index) => (
                      <motion.div
                        key={artist.name}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          delay: 0.6 + index * 0.2,
                          duration: 0.6,
                          ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                        className="relative group cursor-pointer"
                        onClick={() => navigate('/artists')}
                      >
                        {/* Premium Artist Card */}
                        <div className="relative w-80 h-[480px] bg-background border-2 border-gold/30 shadow-[0_8px_32px_rgba(0,0,0,0.3)] overflow-hidden group-hover:border-gold/60 transition-all duration-500">
                          
                          {/* Artist Image Section */}
                          <div className="relative h-80 overflow-hidden">
                            <div
                              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                              style={{ backgroundImage: `url(${artist.image})` }}
                            />
                            
                            {/* Elegant overlay gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                          </div>
                          
                          {/* Artist Information Section */}
                          <div className="relative h-24 p-6 bg-background border-t border-gold/20">
                            <motion.h3
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.8 + index * 0.1 }}
                              className="font-display text-2xl font-bold text-foreground mb-1 group-hover:text-gold transition-colors duration-300"
                            >
                              {artist.name}
                            </motion.h3>
                            
                            <motion.p
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.9 + index * 0.1 }}
                              className="text-sm text-body/80 font-medium uppercase tracking-wider"
                            >
                              {artist.genre}
                            </motion.p>
                          </div>
                          
                          {/* Subtle hover effect */}
                          <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Premium corner accents */}
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        
                        {/* Elegant shadow enhancement on hover */}
                        <div className="absolute inset-0 shadow-[0_16px_64px_rgba(212,175,55,0.15)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ) : (
              // Regular slide layout
              <div className="max-w-4xl">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-4"
                >
                  {slide.title}
                </motion.span>
                
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
                >
                  {slide.subtitle}
                </motion.h1>
                
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-lg md:text-xl text-body mb-10 max-w-2xl"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button 
                    variant="heroFilled" 
                    size="xl"
                    onClick={() => navigate(`/services/${slide.serviceSlug}`)}
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
                  ? 'w-12 bg-gold' 
                  : 'w-4 bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>

        {/* Desktop Navigation Arrows - Bottom Right */}
        <div className="hidden lg:flex absolute bottom-8 right-6 lg:right-12 items-center gap-3">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-background/20 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground/60 hover:bg-gold/20 hover:border-gold/50 hover:text-gold transition-all duration-300 group"
          >
            <ChevronLeft size={20} className="group-hover:scale-110 transition-transform duration-200" />
          </button>
          
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-background/20 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground/60 hover:bg-gold/20 hover:border-gold/50 hover:text-gold transition-all duration-300 group"
          >
            <ChevronRight size={20} className="group-hover:scale-110 transition-transform duration-200" />
          </button>
        </div>
      </div>


    </section>
  );
};
