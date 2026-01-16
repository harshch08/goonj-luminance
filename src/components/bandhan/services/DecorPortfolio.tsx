import { useState } from 'react';
import './DecorPortfolio.css';

interface PortfolioCategory {
  id: string;
  title: string;
  images: {
    large: string;
    polaroids: string[];
  };
}

const portfolioCategories: PortfolioCategory[] = [
  {
    id: 'lavender',
    title: 'Lavender Decor Ideas',
    images: {
      large: '/api/placeholder/800/600',
      polaroids: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ]
    }
  },
  {
    id: 'floral',
    title: 'Floral Installations',
    images: {
      large: '/api/placeholder/800/600',
      polaroids: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ]
    }
  },
  {
    id: 'outdoor',
    title: 'Outdoor Setups',
    images: {
      large: '/api/placeholder/800/600',
      polaroids: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ]
    }
  },
  {
    id: 'mandap',
    title: 'Mandap & Stage Design',
    images: {
      large: '/api/placeholder/800/600',
      polaroids: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ]
    }
  },
  {
    id: 'heritage',
    title: 'Heritage & Colorful Setups',
    images: {
      large: '/api/placeholder/800/600',
      polaroids: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ]
    }
  }
];

const DecorPortfolio = () => {
  const [activeCategory, setActiveCategory] = useState(0);
  const category = portfolioCategories[activeCategory];

  return (
    <section className="py-24 bg-gradient-to-b from-secondary/10 to-background relative overflow-hidden">
      {/* Decorative floral accent */}
      <div className="absolute bottom-20 left-10 opacity-20 pointer-events-none hidden lg:block">
        <svg width="120" height="140" viewBox="0 0 120 140" fill="none">
          <circle cx="40" cy="40" r="25" fill="#D4AF37" opacity="0.3" />
          <circle cx="40" cy="40" r="15" fill="#D4AF37" opacity="0.5" />
          <path d="M40 55 L40 130" stroke="#8B7355" strokeWidth="3" />
          <ellipse cx="60" cy="85" rx="15" ry="20" fill="#D4AF37" opacity="0.2" transform="rotate(20 60 85)" />
          <ellipse cx="20" cy="90" rx="15" ry="20" fill="#D4AF37" opacity="0.2" transform="rotate(-20 20 90)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-16 animate-fade-in">
            <div className="w-16 h-1 bg-accent mb-6" />
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-primary tracking-tight mb-6">
              Our Portfolio
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Décor Ideas
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {portfolioCategories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === index
                    ? 'bg-accent text-white shadow-lg scale-105'
                    : 'bg-white text-foreground hover:bg-accent/10 border border-border'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>

          {/* Portfolio Layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Large Image - Left */}
            <div className="polaroid-frame large animate-fade-in" key={`large-${activeCategory}`}>
              <div className="polaroid-inner">
                <div className="polaroid-image">
                  <img
                    src={category.images.large}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="polaroid-caption">
                  <p className="font-heading text-lg text-foreground/80">{category.title}</p>
                </div>
              </div>
            </div>

            {/* Polaroid Cluster - Right */}
            <div className="polaroid-cluster">
              {category.images.polaroids.map((img, idx) => (
                <div
                  key={`polaroid-${activeCategory}-${idx}`}
                  className={`polaroid-frame small polaroid-${idx + 1} animate-fade-in`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="polaroid-inner">
                    <div className="polaroid-image">
                      <img
                        src={img}
                        alt={`${category.title} ${idx + 1}`}
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

export default DecorPortfolio;
