import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    event: 'Wedding Reception',
    rating: 5,
    text: 'Goonj transformed our wedding into a magical experience. The live band was absolutely phenomenal, and the coordination was flawless. Every guest is still talking about it!',
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    event: 'Corporate Annual Gala',
    rating: 5,
    text: 'Professional, creative, and exceptionally talented. They handled our 500+ guest corporate event with grace and delivered entertainment that exceeded our expectations.',
  },
  {
    id: 3,
    name: 'Ananya Patel',
    event: 'Birthday Celebration',
    rating: 5,
    text: 'The attention to detail was incredible. From the celebrity artist booking to the seamless execution, Goonj made my milestone birthday truly unforgettable.',
  },
  {
    id: 4,
    name: 'Vikram Singh',
    event: 'Product Launch',
    rating: 5,
    text: 'They understood our brand perfectly and curated entertainment that resonated with our audience. The production quality was world-class.',
  },
];

export const TestimonialsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-4">
            Client Stories
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Voices of Satisfaction
          </h2>
          <div className="section-divider" />
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="glass-card p-8 md:p-12 text-center"
            >
              <Quote className="w-12 h-12 text-gold/30 mx-auto mb-8" />
              
              <p className="text-lg md:text-xl text-body leading-relaxed mb-8 italic">
                "{testimonials[currentIndex].text}"
              </p>

              <div className="flex items-center justify-center gap-1 mb-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={16} className="text-gold fill-gold" />
                ))}
              </div>

              <h4 className="font-display text-xl font-semibold text-foreground mb-1">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-xs uppercase tracking-luxury text-muted-foreground">
                {testimonials[currentIndex].event}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold/50 transition-all duration-300"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-gold w-6' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-gold/50 transition-all duration-300"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
