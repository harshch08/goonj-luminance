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
  },
  {
    id: 2,
    image: heroEvents,
    title: 'Premium Events',
    subtitle: 'Where Elegance Meets Entertainment',
    description: 'Corporate galas & exclusive celebrations.',
    type: 'regular',
  },
  {
    id: 3,
    image: heroInstrumentalists,
    title: 'Instrumentalists',
    subtitle: 'Masters of Musical Expression',
    description: 'Curated ensemble of virtuoso performers.',
    type: 'regular',
  },
  {
    id: 4,
    image: heroCelebrity,
    title: 'Celebrity Concerts',
    subtitle: 'Star-Studded Performances',
    description: 'Bringing icons to your stage.',
    type: 'regular',
  },
  {
    id: 5,
    image: heroOpenmic,
    title: 'Open Mics',
    subtitle: 'Discover Raw Talent',
    description: 'Intimate nights of emerging artistry.',
    type: 'regular',
  },
  {
    id: 6,
    image: heroKaraoke,
    title: 'Karaoke Nights',
    subtitle: 'Your Stage Awaits',
    description: 'Upscale entertainment experiences.',
    type: 'regular',
  },
  {
    id: 7,
    image: heroWedding,
    title: 'Bandhan',
    subtitle: 'Celebrating Sacred Unions',
    description: 'Luxury wedding & cultural events.',
    type: 'regular',
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
        image: heroCelebrity,
        available: true,
      },
      {
        name: 'Paradox',
        genre: 'Electronic & EDM',
        followers: '2M+ Followers',
        achievements: ['International DJ', 'Award-Winning Producer'],
        image: heroEvents,
        available: true,
      },
      {
        name: 'MC Square',
        genre: 'Hip-Hop & Freestyle',
        followers: '1.5M+ Followers',
        achievements: ['MTV Hustle Winner', 'Viral Performances'],
        image: heroLiveMusic,
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
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  };

  const slide = slides[currentSlide];

  return (
    <section className="relative h-screen w-full overflow-hidden film-grain">
      {/* Background Image */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
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
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-7xl w-full mx-auto"
          >
            {slide.type === 'artists' ? (
              // Artists banner layout - side text with 3 artist images
              <div className="flex items-center justify-between gap-12 h-full">
                {/* Left side - Text content */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex-1 max-w-2xl pr-8"
                >
                  <span className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-4">
                    Featured Talent
                  </span>
                  
                  <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                    Top Artists at Your Service
                  </h1>
                  
                  <p className="text-base md:text-lg text-body mb-8 max-w-lg">
                    Book India's most celebrated artists for your next event. From chart-toppers to underground legends.
                  </p>

                  <Button 
                    variant="heroFilled" 
                    size="xl"
                    onClick={() => navigate('/artists')}
                  >
                    View All Artists
                  </Button>
                </motion.div>

                {/* Right side - Artist images */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex-1 flex justify-center"
                >
                  <div className="grid grid-cols-3 gap-6 max-w-4xl">
                    {slide.artists?.map((artist, index) => (
                      <motion.div
                        key={artist.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="relative group cursor-pointer"
                        onClick={() => navigate('/artists')}
                      >
                        <div className="relative w-56 h-80 overflow-hidden rounded-lg shadow-2xl">
                          <div
                            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url(${artist.image})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
                          
                          {/* Artist info overlay */}
                          <div className="absolute bottom-0 left-0 right-0 p-6">
                            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                              {artist.name}
                            </h3>
                            <p className="text-sm text-gold-light">
                              {artist.genre}
                            </p>
                          </div>
                        </div>
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
                  <Button variant="heroFilled" size="xl">
                    Book Your Event
                  </Button>
                  <Button variant="hero" size="xl">
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
      </div>

      {/* Side Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-border/50 bg-background/20 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-gold/20 hover:border-gold/50 hover:text-gold transition-all duration-300 opacity-80 hover:opacity-100"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full border border-border/50 bg-background/20 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-gold/20 hover:border-gold/50 hover:text-gold transition-all duration-300 opacity-80 hover:opacity-100"
      >
        <ChevronRight size={24} />
      </button>
    </section>
  );
};
