import { motion } from 'framer-motion';
import bikanerLogo from "@/assets/bandhan/partners/bikaner-logo.png";
import haldiramLogo from "@/assets/bandhan/partners/haldiram-logo.png";
import baristaLogo from "@/assets/bandhan/partners/barista-logo.png";
import hotelLogo from "@/assets/bandhan/partners/hotel-logo.png";
import cateringLogo from "@/assets/bandhan/partners/catering-logo.png";
import photographyLogo from "@/assets/bandhan/partners/photography-logo.png";

const partners = [
  { name: "Bikaner", logo: bikanerLogo },
  { name: "Haldiram", logo: haldiramLogo },
  { name: "Barista", logo: baristaLogo },
  { name: "Luxury Hotels", logo: hotelLogo },
  { name: "Premium Catering", logo: cateringLogo },
  { name: "Photography Studio", logo: photographyLogo },
];

export const PartnersSection = () => {
  // Triple duplication for ultra-smooth infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-secondary/5 to-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
            Trusted Partners
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            Our Premium Partners
          </h2>
          <div className="section-divider" />
          <p className="text-body mt-6 max-w-2xl mx-auto">
            Collaborating with industry leaders to deliver exceptional experiences and unmatched quality for every event
          </p>
        </motion.div>

        {/* Premium Partner Slider */}
        <div className="relative">
          {/* Elegant gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none"></div>

          {/* Enhanced scrolling container */}
          <div className="flex animate-partners-scroll-fast hover:[animation-play-state:paused] items-center">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 mx-6 md:mx-10"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-28 h-28 md:w-36 md:h-36 flex items-center justify-center group relative"
                >
                  {/* Premium card background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-secondary/20 rounded-lg border border-gold/10 group-hover:border-gold/30 transition-all duration-500 backdrop-blur-sm"></div>
                  
                  {/* Logo */}
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="relative z-10 max-w-[70%] max-h-[70%] object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                  />
                  
                  {/* Subtle glow effect on hover */}
                  <div className="absolute inset-0 bg-gold/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gold/10 rounded-full border border-gold/20">
            <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gold-light">
              Trusted by 500+ premium brands nationwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
