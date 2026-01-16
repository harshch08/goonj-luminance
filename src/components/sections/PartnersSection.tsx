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
  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-secondary/10 to-background/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display text-foreground mb-4">
            OUR PARTNERS
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"></div>
        </div>

        {/* Scrolling Logos */}
        <div className="relative">
          {/* Gradient overlays for smooth edges */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-secondary/10 via-secondary/5 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-secondary/10 via-secondary/5 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container */}
          <div className="flex animate-partners-scroll hover:[animation-play-state:paused]">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 mx-8 md:mx-12"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center group">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Message */}
        <p className="text-center text-muted-foreground mt-8 text-sm md:text-base">
          Trusted by leading brands to deliver exceptional experiences
        </p>
      </div>
    </section>
  );
};
