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

const PartnersSection = () => {
  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-secondary/20 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-4">
            OUR PARTNERS
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>
        </div>

        {/* Scrolling Logos */}
        <div className="relative -mx-4 overflow-hidden">
          {/* Gradient overlays for smooth edges - properly positioned with stronger fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-background via-background/90 via-background/60 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-l from-background via-background/90 via-background/60 to-transparent z-10"></div>

          {/* Scrolling container with proper masking */}
          <div className="flex animate-scroll hover:pause-animation pl-4 pr-4">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 mx-6 sm:mx-8 md:mx-12"
              >
                <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center group">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-w-[85%] max-h-[85%] object-contain transition-all duration-500 opacity-95 group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Message */}
        <p className="text-center text-muted-foreground mt-8 text-sm md:text-base animate-fade-in">
          Trusted by leading brands to deliver exceptional experiences
        </p>
      </div>
    </section>
  );
};

export default PartnersSection;

