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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % artists.length);
    }, 4000);

    return () => clearInterval(timer);
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
      <div className="relative z-10 container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-left">
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
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Live Music
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/90 text-lg md:text-xl mb-8 max-w-lg"
            >
              Electrifying performances that create unforgettable moments with our talented artists
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="w-24 h-1 bg-gold-light mb-8"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={() => {
                  const artistsSection = document.querySelector('#our-artists');
                  artistsSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gold hover:bg-gold-light text-background px-8 py-3 font-semibold transition-all duration-300 hover:scale-105"
              >
                Meet Our Artists
              </button>
              <button
                onClick={() => {
                  const formSection = document.getElementById('inquiry-form');
                  formSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-8 py-3 font-semibold transition-all duration-300"
              >
                Book Now
              </button>
            </motion.div>
          </div>

          {/* Right Content - Artist Card Slideshow */}
          <div className="relative">
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg"
            >
              <ChevronLeft size={24} className="text-white group-hover:text-gold-light" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg"
            >
              <ChevronRight size={24} className="text-white group-hover:text-gold-light" />
            </button>

            {/* Artist Card */}
            <div className="relative h-80 w-full max-w-lg mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0 bg-white/15 backdrop-blur-xl border border-white/30 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500"
                >
                  <div className="flex h-full">
                    {/* Left - Artist Image */}
                    <div className="w-2/5 relative overflow-hidden">
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
                      
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/20" />
                    </div>

                    {/* Right - Artist Details */}
                    <div className="w-3/5 p-8 flex flex-col justify-center">
                      <div className="mb-6">
                        <h3 className="font-display text-3xl font-bold text-white mb-3 leading-tight">
                          {artists[currentSlide].name}
                        </h3>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-2 h-2 bg-gold-light rounded-full"></div>
                          <p className="text-gold-light text-sm font-medium uppercase tracking-wide">
                            {artists[currentSlide].tag}
                          </p>
                        </div>
                        
                        <div className="bg-white/10 p-3 mb-6">
                          <p className="text-white/90 text-sm font-medium">
                            <span className="text-gold-light">Specializes in:</span><br />
                            {artists[currentSlide].genre}
                          </p>
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <button
                          onClick={() => {
                            const message = `Hi! I would like to book ${artists[currentSlide].name} (${artists[currentSlide].tag}) for my event. Please provide more details about availability and pricing.`;
                            const whatsappUrl = `https://wa.me/919897642145?text=${encodeURIComponent(message)}`;
                            window.open(whatsappUrl, '_blank');
                          }}
                          className="w-full bg-gold hover:bg-gold-light text-background px-6 py-3 font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                        >
                          <Music size={18} />
                          Book {artists[currentSlide].name}
                        </button>
                        
                        <button
                          onClick={() => {
                            const artistsSection = document.querySelector('#our-artists');
                            artistsSection?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-sm px-6 py-2.5 font-medium transition-all duration-300 text-sm"
                        >
                          View All Artists
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-3 mt-8">
              {artists.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentSlide 
                      ? 'w-8 h-3 bg-gold-light rounded-full' 
                      : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full'
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