import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
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
    id: 'couple',
    title: 'Couple Portraits',
    subtitle: 'Intimate & Candid Moments',
    images: {
      large: '/gallery/Photography&Videography/Couple-1.png',
      polaroids: [
        '/gallery/Photography&Videography/Couple-2.png',
        '/gallery/Photography&Videography/Couple-3.png',
        '/gallery/Photography&Videography/Mandap-couple.png',
      ]
    }
  },
  {
    id: 'mandap',
    title: 'Mandap & Ceremony',
    subtitle: 'Sacred Moments Captured',
    images: {
      large: '/gallery/Photography&Videography/Mandap.png',
      polaroids: [
        '/gallery/Photography&Videography/Mandap-2.png',
        '/gallery/Photography&Videography/Mandap-couple.png',
        '/gallery/Photography&Videography/Couple-1.png',
      ]
    }
  },
  {
    id: 'candid',
    title: 'Candid Photography',
    subtitle: 'Real Emotions, Real Stories',
    images: {
      large: '/gallery/Photography&Videography/Couple-3.png',
      polaroids: [
        '/gallery/Photography&Videography/Couple-1.png',
        '/gallery/Photography&Videography/Couple-2.png',
        '/gallery/Photography&Videography/Mandap.png',
      ]
    }
  },
];

const PhotographyServices = () => {
  const [activeService, setActiveService] = useState(0);
  const service = photoServices[activeService];

  return (
    <section className="py-14 md:py-24 bg-gradient-to-b from-secondary/10 to-background relative overflow-hidden">
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
          <div className="mb-8 md:mb-16 animate-fade-in">
            <div className="w-16 h-1 bg-accent mb-4 md:mb-6" />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-primary tracking-tight mb-3 md:mb-6">
              Our Photography Services
            </h2>
            <p className="text-base md:text-xl text-muted-foreground max-w-2xl">
              Capturing Your Special Moments
            </p>
          </div>

          {/* Service Tabs — 3 in a row on mobile */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-8 md:mb-12">
            {photoServices.map((srv, index) => (
              <button
                key={srv.id}
                onClick={() => setActiveService(index)}
                className={`px-2 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-base font-medium transition-all duration-300 text-center ${
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
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* View More → Gallery */}
          <div className="text-center mt-12 animate-fade-in">
            <Link
              to="/bandhan/gallery"
              className="inline-flex items-center gap-2 border border-accent/40 hover:border-accent text-primary hover:bg-accent/10 font-semibold px-8 py-4 rounded-xl shadow-soft transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
            >
              View More
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-accent" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyServices;
