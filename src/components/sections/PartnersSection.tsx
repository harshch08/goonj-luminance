import { motion } from 'framer-motion';

const partners = [
  { name: "Brand Partner 1", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53.jpeg" },
  { name: "Brand Partner 2", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (1).jpeg" },
  { name: "Brand Partner 3", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (2).jpeg" },
  { name: "Brand Partner 4", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (3).jpeg" },
  { name: "Brand Partner 5", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (4).jpeg" },
  { name: "Brand Partner 6", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (5).jpeg" },
  { name: "Brand Partner 7", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (6).jpeg" },
  { name: "Brand Partner 8", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (7).jpeg" },
  { name: "Brand Partner 9", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (8).jpeg" },
  { name: "Brand Partner 10", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (9).jpeg" },
  { name: "Brand Partner 11", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (10).jpeg" },
  { name: "Brand Partner 12", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (11).jpeg" },
  { name: "Brand Partner 13", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (12).jpeg" },
  { name: "Brand Partner 14", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (13).jpeg" },
  { name: "Brand Partner 15", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (14).jpeg" },
  { name: "Brand Partner 16", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (15).jpeg" },
  { name: "Brand Partner 17", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.53 (16).jpeg" },
  { name: "Brand Partner 18", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.54.jpeg" },
  { name: "Brand Partner 19", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.54 (1).jpeg" },
  { name: "Brand Partner 20", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.55.jpeg" },
  { name: "Brand Partner 21", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.55 (1).jpeg" },
  { name: "Brand Partner 22", logo: "/Brands/WhatsApp Image 2026-02-23 at 01.05.55 (2).jpeg" },
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
        <div className="relative -mx-6 lg:-mx-12 overflow-hidden">
          {/* Elegant gradient overlays - properly positioned */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-28 md:w-36 bg-gradient-to-r from-background via-background/90 via-background/60 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-28 md:w-36 bg-gradient-to-l from-background via-background/90 via-background/60 to-transparent z-10 pointer-events-none"></div>

          {/* Enhanced scrolling container with proper masking */}
          <div className="flex animate-partners-scroll-fast hover:[animation-play-state:paused] items-center pl-6 lg:pl-12 pr-6 lg:pr-12">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 mx-4 sm:mx-6 md:mx-10"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center group relative"
                >
                  {/* Premium card background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-secondary/20 rounded-lg border border-gold/10 group-hover:border-gold/30 transition-all duration-500 backdrop-blur-sm"></div>
                  
                  {/* Logo - Colorful display */}
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="relative z-10 max-w-[80%] max-h-[80%] object-contain transition-all duration-500 opacity-90 group-hover:opacity-100 group-hover:scale-105"
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
              Trusted by 20+ premium brands nationwide
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
