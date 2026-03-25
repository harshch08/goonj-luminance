import { motion } from 'framer-motion';

const partners = [
  { name: "Brand Partner A", logo: "/Brands/a.png" },
  { name: "Brand Partner B", logo: "/Brands/b.jpeg" },
  { name: "Brand Partner C", logo: "/Brands/c.png" },
  { name: "Brand Partner D", logo: "/Brands/d.png" },
  { name: "Brand Partner E", logo: "/Brands/e.png" },
  { name: "Brand Partner F", logo: "/Brands/f.png" },
  { name: "Brand Partner G", logo: "/Brands/g.png" },
  { name: "Brand Partner H", logo: "/Brands/h.png" },
  { name: "Brand Partner I", logo: "/Brands/i.png" },
  { name: "Brand Partner J", logo: "/Brands/j.png" },
  { name: "Brand Partner K", logo: "/Brands/k.png" },
  { name: "Brand Partner L", logo: "/Brands/l.png" },
  { name: "Brand Partner M", logo: "/Brands/m.png" },
  { name: "Brand Partner N", logo: "/Brands/n.png" },
  { name: "Brand Partner O", logo: "/Brands/o.png" },
  { name: "Brand Partner P", logo: "/Brands/p.png" },
  { name: "Brand Partner Q", logo: "/Brands/q.png" },
  { name: "Brand Partner R", logo: "/Brands/r.png" },
  { name: "Brand Partner S", logo: "/Brands/s.png" },
  { name: "Brand Partner T", logo: "/Brands/t.png" },
];

export const PartnersSection = () => {
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

        {/* Infinite Partner Slider */}
        <div className="relative -mx-6 lg:-mx-12 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-28 md:w-36 bg-gradient-to-r from-background via-background/90 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-28 md:w-36 bg-gradient-to-l from-background via-background/90 to-transparent z-10 pointer-events-none"></div>

          {/* Two identical tracks — animation scrolls exactly one track width */}
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'partners-infinite 60s linear infinite',
            }}
            className="items-center hover:[animation-play-state:paused]"
          >
            {/* Track 1 */}
            {partners.map((partner, index) => (
              <div key={`a-${index}`} className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-secondary/20 rounded-lg border border-gold/10 group-hover:border-gold/30 transition-all duration-500 backdrop-blur-sm"></div>
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="relative z-10 max-w-[80%] max-h-[80%] object-contain opacity-90 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
            {/* Track 2 — identical copy for seamless loop */}
            {partners.map((partner, index) => (
              <div key={`b-${index}`} className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8">
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center group relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-secondary/20 rounded-lg border border-gold/10 group-hover:border-gold/30 transition-all duration-500 backdrop-blur-sm"></div>
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="relative z-10 max-w-[80%] max-h-[80%] object-contain opacity-90 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
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

      <style>{`
        @keyframes partners-infinite {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};
