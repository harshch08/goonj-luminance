import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const teamMembers = [
  {
    id: 1,
    name: 'Team Member 1',
    image: '/Team/WhatsApp Image 2026-02-28 at 22.36.07.jpeg',
  },
  {
    id: 2,
    name: 'Team Member 2',
    image: '/Team/WhatsApp Image 2026-02-28 at 22.36.08 (1).jpeg',
  },
  {
    id: 3,
    name: 'Team Member 3',
    image: '/Team/WhatsApp Image 2026-02-28 at 22.36.08.jpeg',
  },
];

export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section 
      ref={ref}
      className="py-20 lg:py-28 bg-gradient-to-b from-background to-secondary/30"
    >
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
            Meet The Team
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Team
          </h2>
          <div className="section-divider" />
          <p className="text-body mt-6 max-w-2xl mx-auto">
            The passionate professionals behind every unforgettable event
          </p>
        </motion.div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group relative"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden shadow-2xl bg-secondary/20">
                {/* Image */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                
                {/* Decorative Border */}
                <div className="absolute inset-0 border-2 border-gold/20 group-hover:border-gold/40 transition-colors duration-500" />
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
