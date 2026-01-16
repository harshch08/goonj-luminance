import { Utensils, Flame, Flower2, FileText, Wine, Heart, ChefHat, Globe } from 'lucide-react';
import './WhatsIncluded.css';

const inclusions = [
  {
    icon: Utensils,
    title: "Branded Food Stalls",
    description: "Custom-designed food stations with premium branding and presentation"
  },
  {
    icon: Flame,
    title: "Live Cooking Stations",
    description: "Interactive culinary experiences with expert chefs preparing dishes on-site"
  },
  {
    icon: Flower2,
    title: "Floral Arrangements",
    description: "Exquisite centerpieces and floral installations tailored to your theme"
  },
  {
    icon: FileText,
    title: "Custom Menu Design",
    description: "Personalized menus crafted to match your event aesthetic and preferences"
  },
  {
    icon: Wine,
    title: "Premium Tableware",
    description: "Elegant china, glassware, and cutlery for a sophisticated dining experience"
  },
  {
    icon: Heart,
    title: "Dietary Accommodations",
    description: "Specialized options for all dietary requirements and preferences"
  },
  {
    icon: ChefHat,
    title: "Chef-Led Experiences",
    description: "Gourmet culinary journeys curated by award-winning chefs"
  },
  {
    icon: Globe,
    title: "International Stations",
    description: "Authentic cuisine from around the world with premium ingredients"
  }
];

const WhatsIncluded = () => {
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
              Comprehensive catering and décor services for an unforgettable experience
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inclusions.map((item, index) => (
              <div
                key={item.title}
                className="inclusion-card animate-fade-in-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="inclusion-card-inner">
                  {/* Icon */}
                  <div className="inclusion-icon">
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

export default WhatsIncluded;
