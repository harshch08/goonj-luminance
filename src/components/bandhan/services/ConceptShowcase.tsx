import { ServiceImage } from "@/components/bandhan/data/services/types";
import './ConceptShowcase.css';

interface ConceptShowcaseProps {
  title: string;
  subtitle?: string;
  images: ServiceImage[];
  layout?: "default" | "threeColumn" | "masonry";
}

const ConceptShowcase = ({ title, subtitle, images, layout = "default" }: ConceptShowcaseProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Decorative floral element - bottom left */}
      <div className="absolute bottom-12 left-8 opacity-50 pointer-events-none z-10">
        <svg width="120" height="150" viewBox="0 0 120 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main flower */}
          <circle cx="35" cy="35" r="20" fill="#D4AF37" opacity="0.3" />
          <circle cx="35" cy="35" r="12" fill="#D4AF37" opacity="0.5" />
          <circle cx="35" cy="35" r="6" fill="#D4AF37" opacity="0.7" />
          
          {/* Petals */}
          <ellipse cx="20" cy="25" rx="8" ry="12" fill="#D4AF37" opacity="0.4" transform="rotate(-30 20 25)" />
          <ellipse cx="50" cy="25" rx="8" ry="12" fill="#D4AF37" opacity="0.4" transform="rotate(30 50 25)" />
          <ellipse cx="25" cy="50" rx="8" ry="12" fill="#D4AF37" opacity="0.4" transform="rotate(-60 25 50)" />
          <ellipse cx="45" cy="50" rx="8" ry="12" fill="#D4AF37" opacity="0.4" transform="rotate(60 45 50)" />
          
          {/* Stem */}
          <path d="M35 50 L35 140" stroke="#8B7355" strokeWidth="3" />
          
          {/* Leaves */}
          <ellipse cx="50" cy="90" rx="12" ry="18" fill="#D4AF37" opacity="0.25" transform="rotate(25 50 90)" />
          <ellipse cx="20" cy="100" rx="12" ry="18" fill="#D4AF37" opacity="0.25" transform="rotate(-25 20 100)" />
          <ellipse cx="45" cy="115" rx="10" ry="15" fill="#D4AF37" opacity="0.25" transform="rotate(15 45 115)" />
        </svg>
      </div>

      {/* Decorative floral element - top right */}
      <div className="absolute top-12 right-8 opacity-40 pointer-events-none z-10">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Flower cluster */}
          <circle cx="50" cy="30" r="15" fill="#D4AF37" opacity="0.3" />
          <circle cx="65" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <circle cx="35" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <circle cx="50" cy="50" r="10" fill="#D4AF37" opacity="0.4" />
          
          {/* Stems */}
          <path d="M50 50 L50 110" stroke="#8B7355" strokeWidth="2" />
          <path d="M50 70 L35 85" stroke="#8B7355" strokeWidth="1.5" />
          <path d="M50 80 L65 95" stroke="#8B7355" strokeWidth="1.5" />
          
          {/* Small leaves */}
          <ellipse cx="35" cy="85" rx="6" ry="10" fill="#D4AF37" opacity="0.2" transform="rotate(-20 35 85)" />
          <ellipse cx="65" cy="95" rx="6" ry="10" fill="#D4AF37" opacity="0.2" transform="rotate(20 65 95)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto">
          {/* Title Section */}
          <div className="mb-12 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
              {title}
            </h2>
            {subtitle && (
              <p className="text-lg text-muted-foreground whitespace-pre-line uppercase tracking-wide">
                {subtitle}
              </p>
            )}
          </div>

          {/* Premium Polaroid Layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Large Polaroid - Left */}
            {images[0] && (
              <div className="polaroid-frame large animate-fade-in">
                <div className="polaroid-inner">
                  <div className="polaroid-image">
                    <img
                      src={images[0].src}
                      alt={images[0].alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="polaroid-caption">
                    <p className="font-heading text-lg text-foreground/80">{title}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Polaroid Cluster - Right */}
            <div className="polaroid-cluster">
              {images.slice(1, 5).map((image, idx) => (
                <div
                  key={idx}
                  className={`polaroid-frame small polaroid-${idx + 1} animate-fade-in`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="polaroid-inner">
                    <div className="polaroid-image">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="polaroid-caption">
                      <p className="text-xs text-foreground/60">Destination Wedding Planner</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConceptShowcase;
