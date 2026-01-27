import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Music } from 'lucide-react';
import heroLiveMusic from '@/assets/hero-live-music.jpg';

const artists = [
  {
    name: 'Rahul',
    genre: 'Western, Bollywood & Retro',
    tag: 'Singer & Performer',
    image: '/Rahul_Thapa_Ryan.jpeg'
  },
  {
    name: 'Shreya',
    genre: 'Bolly Mix',
    tag: 'Singer & Performer',
    image: '/shreya.jpeg'
  },
  {
    name: 'Manisha',
    genre: 'Bolly Mix',
    tag: 'Singer & Performer',
    image: '/manisha.jpeg'
  },
  {
    name: 'Ranjan',
    genre: 'Bolly Mix',
    tag: 'Singer & Performer',
    image: '/ranjan.jpeg'
  },
  {
    name: 'Abhishek',
    genre: 'Bolly Mix',
    tag: 'Singer & Performer',
    image: '/abhishek.jpeg'
  },
  {
    name: 'Krish',
    genre: 'Bolly Mix',
    tag: 'Singer & Performer',
    image: '/krish.jpeg'
  },
  {
    name: 'Ajay',
    genre: 'Bolly Mix',
    tag: 'Singer & Performer',
    image: '/Ajay.jpeg'
  }
];

export const LiveMusicHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % artists.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + artists.length) % artists.length);
  };

  return (
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
              className="w-24 h-1 bg-gold-light mb-6 lg:mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="hidden sm:flex flex-col sm:flex-row items-center gap-3 sm:gap-4"
            >
              <button
                onClick={() => {
                  const artistsSection = document.querySelector('#our-artists');
                  artistsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-gold hover:bg-gold-light text-background px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Meet Our Artists
              </button>
              <button
                onClick={() => {
                  const formSection = document.getElementById('inquiry-form');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base"
              >
                Book Now
              </button>
            </motion.div>
          </div>

          {/* Right Content - Artist Card */}
          <div className="relative order-1 lg:order-2">
            {/* Navigation Arrows - Hidden on mobile */}
            <button
              onClick={prevSlide}
              className="hidden sm:block absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg"
            >
              <ChevronLeft size={20} className="text-white group-hover:text-gold-light lg:w-6 lg:h-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="hidden sm:block absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 lg:w-12 lg:h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg"
            >
              <ChevronRight size={20} className="text-white group-hover:text-gold-light lg:w-6 lg:h-6" />
            </button>

            {/* Artist Card */}
            <div className="relative h-80 sm:h-72 lg:h-80 w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto">
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
                      <img
                        src={artists[mobileSlide].image}
                        alt={artists[mobileSlide].name}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <div className="hidden absolute inset-0 bg-gradient-to-br from-gold/30 to-gold-light/30 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-20 h-20 bg-gold/40 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Music size={32} className="text-gold" />
                          </div>
                          <p className="text-gold font-semibold text-xl">{artists[mobileSlide].name}</p>
                        </div>
                      </div>
                      
                      {/* Mobile: Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      
                      {/* Mobile: Artist name at bottom */}
                      <div className="absolute bottom-6 left-6 right-6 text-center">
                        <h3 className="font-display text-3xl font-bold text-white mb-2 leading-tight">
                          {artists[mobileSlide].name}
                        </h3>
                        <p className="text-gold-light text-sm font-medium uppercase tracking-wide">
                          {artists[mobileSlide].tag}
                        </p>
                      </div>
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
                    <div className="flex flex-row h-full">
                      {/* Desktop: Left - Artist Image */}
                      <div className="w-2/5 h-full relative overflow-hidden">
                        <img
                          src={artists[currentSlide].image}
                          alt={artists[currentSlide].name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="hidden absolute inset-0 bg-gradient-to-br from-gold/30 to-gold-light/30 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-16 h-16 bg-gold/40 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Music size={28} className="text-gold" />
                            </div>
                            <p className="text-gold font-semibold text-lg">{artists[currentSlide].name}</p>
                          </div>
                        </div>
                        
                        {/* Desktop: Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
                      </div>

                      {/* Desktop: Right - Artist Details */}
                      <div className="w-3/5 p-6 lg:p-8 flex flex-col justify-center">
                        <div className="mb-6">
                          <h3 className="font-display text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                            {artists[currentSlide].name}
                          </h3>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 bg-gold-light rounded-full"></div>
                            <p className="text-gold-light text-sm font-medium uppercase tracking-wide">
                              {artists[currentSlide].tag}
                            </p>
                          </div>
                          
                          <div className="bg-white/10 p-3 mb-6 rounded">
                            <p className="text-white/90 text-sm font-medium">
                              <span className="text-gold-light">Specializes in:</span><br />
                              {artists[currentSlide].genre}
                            </p>
                          </div>
                        </div>
                        
                        {/* Desktop: Action Buttons */}
                        <div className="space-y-3">
                          <button
                            onClick={() => {
                              const message = `Hi! I would like to book ${artists[currentSlide].name} (${artists[currentSlide].tag}) for my event. Please provide more details about availability and pricing.`;
                              const whatsappUrl = `https://wa.me/919897642145?text=${encodeURIComponent(message)}`;
                              window.open(whatsappUrl, '_blank');
                            }}
                            className="w-full bg-gold hover:bg-gold-light text-background px-6 py-3 rounded font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                          >
                            <Music size={18} />
                            Book {artists[currentSlide].name}
                          </button>
                          
                          <button
                            onClick={() => {
                              const artistsSection = document.querySelector('#our-artists');
                              artistsSection?.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-6 py-2.5 rounded font-medium transition-all duration-300 text-sm"
                          >
                            View All Artists
                          </button>
                        </div>
                      </div>
                    </div>
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
  );
};