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
                    className="max-w-[85%] max-h-[85%] object-contain grayscale-0 sm:grayscale sm:group-hover:grayscale-0 transition-all duration-500 opacity-95 sm:opacity-70 sm:group-hover:opacity-100"
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

