import { Camera, Video, Plane, Clock, Users, Image, Film, Sparkles } from 'lucide-react';
import './PhotographyInclusions.css';

const inclusions = [
  {
    icon: Camera,
    title: "Pre-Wedding Shoots",
    description: "Stunning outdoor and destination pre-wedding photography sessions"
  },
  {
    icon: Film,
    title: "Cinematic Films",
    description: "Professional wedding films with storytelling and emotion"
  },
  {
    icon: Plane,
    title: "Drone Photography",
    description: "Breathtaking aerial shots and unique perspectives"
  },
  {
    icon: Clock,
    title: "Same-Day Editing",
    description: "Quick turnaround highlights for your special moments"
  },
  {
    icon: Users,
    title: "Candid Photography",
    description: "Natural, unposed moments captured beautifully"
  },
  {
    icon: Image,
    title: "Photo Albums",
    description: "Premium printed albums with custom design"
  },
  {
    icon: Video,
    title: "Live Streaming",
    description: "Share your celebration with loved ones worldwide"
  },
  {
    icon: Sparkles,
    title: "Creative Installations",
    description: "Selfie points and photo booths for guest entertainment"
  }
];

const PhotographyInclusions = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight mb-4">
              What's Included
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive photography and videography services to capture every precious moment
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inclusions.map((item, index) => (
              <div
                key={item.title}
                className="photo-inclusion-card animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="photo-inclusion-inner">
                  {/* Icon */}
                  <div className="photo-inclusion-icon">
                    <item.icon size={28} strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyInclusions;
