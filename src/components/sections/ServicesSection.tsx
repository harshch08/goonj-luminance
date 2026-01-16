import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Music2, Users, Mic2, Star, Crown, Calendar, Sparkles } from 'lucide-react';

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
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 bg-secondary/30" id="services">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-4">
            What We Offer
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Why Choose Goonj
          </h2>
          <div className="section-divider" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group glass-card p-6 sm:p-8 hover:border-gold/30 transition-all duration-500"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg bg-gold/10 flex items-center justify-center mb-4 sm:mb-6 group-hover:bg-gold/20 group-hover:shadow-glow transition-all duration-500">
                <service.icon size={22} className="text-gold-light sm:w-6 sm:h-6" />
              </div>
              <h3 className="font-display text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3">
                {service.title}
              </h3>
              <p className="text-body text-sm leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
