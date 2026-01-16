import { useState } from 'react';
import './PhotographyServices.css';

interface PhotoService {
  id: string;
  title: string;
  subtitle: string;
  images: {
    large: string;
    polaroids: string[];
  };
}

const photoServices: PhotoService[] = [
  {
    id: 'prewedding',
    title: "Pre-Wedding",
    subtitle: "Chopper Shoot",
    images: {
      large: '/api/placeholder/600/400',
      polaroids: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ]
    }
  },
  {
    id: 'selfiepoint',
    title: "Selfie Point",
    subtitle: "Creative Installations",
    images: {
      large: '/api/placeholder/600/400',
      polaroids: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ]
    }
  },
  {
    id: 'cinematic',
    title: "Cinematic Films",
    subtitle: "Wedding Stories",
    images: {
      large: '/api/placeholder/600/400',
      polaroids: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ]
    }
  },
  {
    id: 'drone',
    title: "Drone Photography",
    subtitle: "Aerial Perspectives",
    images: {
      large: '/api/placeholder/600/400',
      polaroids: [
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300',
        '/api/placeholder/400/300'
      ]
    }
  }
];

const PhotographyServices = () => {
  const [activeService, setActiveService] = useState(0);
  const service = photoServices[activeService];

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
              Our Photography Services
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Capturing Your Special Moments
            </p>
          </div>

          {/* Service Tabs */}
          <div className="flex flex-wrap gap-3 mb-12">
            {photoServices.map((srv, index) => (
              <button
                key={srv.id}
                onClick={() => setActiveService(index)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeService === index
                    ? 'bg-accent text-white shadow-lg scale-105'
                    : 'bg-white text-foreground hover:bg-accent/10 border border-border'
                }`}
              >
                {srv.title}
              </button>
            ))}
          </div>

          {/* Photo Layout */}
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Large Image - Left */}
            <div className="large-photo-frame animate-fade-in" key={`large-${activeService}`}>
              <div className="photo-frame-inner">
                <div className="photo-image">
                  <img
                    src={service.images.large}
                    alt={service.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="photo-caption">
                  <p className="font-heading text-lg text-foreground/80">{service.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{service.subtitle}</p>
                </div>
              </div>
            </div>

            {/* Polaroid Cluster - Right */}
            <div className="photo-cluster">
              {service.images.polaroids.map((img, idx) => (
                <div
                  key={`polaroid-${activeService}-${idx}`}
                  className={`photo-polaroid polaroid-${idx + 1} animate-fade-in`}
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="polaroid-inner">
                    <div className="polaroid-image">
                      <img
                        src={img}
                        alt={`${service.title} ${idx + 1}`}
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

export default PhotographyServices;
