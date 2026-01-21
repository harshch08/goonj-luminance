import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music2, Users, Star, Crown, Calendar, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Music2,
    title: 'Live Performances & Concerts',
    description: 'Electrifying live music experiences with world-class sound and production.',
  },
  {
    icon: Users,
    title: 'Professional Verified Artists',
    description: 'Curated roster of talented musicians and performers vetted for excellence.',
  },
  {
    icon: Crown,
    title: 'Wedding & Cultural Expertise',
    description: 'Bespoke entertainment solutions for traditional and contemporary celebrations.',
  },
  {
    icon: Calendar,
    title: 'Corporate Event Execution',
    description: 'Seamless event management for brands, launches, and corporate gatherings.',
  },
  {
    icon: Star,
    title: 'Pan-India Artist Bookings',
    description: 'Access to celebrities and performers from across the nation.',
  },
  {
    icon: Sparkles,
    title: 'Customizable Packages',
    description: 'Tailored solutions designed to match your vision and budget perfectly.',
  },
];

export const ServicesSection = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
  };

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-24 bg-secondary/30" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 sm:mb-12 lg:mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-3 sm:mb-4">
            What We Offer
          </span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 px-4">
            Why Choose Goonj
          </h2>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group glass-card p-4 sm:p-6 lg:p-8 hover:border-gold/30 transition-all duration-300 rounded-xl"
            >
              {/* Icon Container - Mobile Optimized */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-3 sm:mb-4 lg:mb-6 group-hover:bg-gold/20 group-hover:shadow-glow transition-all duration-300">
                <service.icon size={18} className="text-gold-light sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
              </div>
              
              {/* Title - Mobile Optimized */}
              <h3 className="font-display text-base sm:text-lg lg:text-xl font-semibold text-foreground mb-2 sm:mb-3 leading-tight">
                {service.title}
              </h3>
              
              {/* Description - Mobile Optimized */}
              <p className="text-body text-xs sm:text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Mobile CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-8 sm:mt-12 lg:mt-16"
        >
          <p className="text-body text-sm sm:text-base mb-4 sm:mb-6 px-4">
            Ready to create something extraordinary?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Button 
              variant="heroFilled" 
              size="lg"
              onClick={() => navigate('/contact')}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              Get Started
            </Button>
            <Button 
              variant="hero" 
              size="lg"
              onClick={() => navigate('/services')}
              className="w-full sm:w-auto text-sm sm:text-base"
            >
              View Services
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
