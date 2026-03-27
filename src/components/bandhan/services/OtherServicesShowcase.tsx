import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './ConceptShowcase.css';

const services = [
  {
    title: 'SANGEET',
    subtitle: 'SANGEET NIGHT SETUPS\nCAN BE RECREATED',
    images: [
      { src: '/gallery/Others/sangeet/1.jpg', alt: 'Sangeet night' },
      { src: '/gallery/Others/sangeet/2.jpg', alt: 'Sangeet decor' },
      { src: '/gallery/Others/sangeet/3.jpg', alt: 'Sangeet stage' },
      { src: '/gallery/Others/sangeet/4.jpg', alt: 'Sangeet setup' },
    ],
  },
  {
    title: 'PYRODRY / FIREWORKS / JAIMALA FIREWORKS',
    subtitle: 'FIREWORKS & PYRO SETUPS\nCAN BE RECREATED',
    images: [
      { src: '/gallery/Others/Pyrodry-Fireworks/1.png', alt: 'Pyrodry effect' },
      { src: '/gallery/Others/Pyrodry-Fireworks/2.jpg', alt: 'Fireworks display' },
      { src: '/gallery/Others/Pyrodry-Fireworks/3.jpg', alt: 'Pyro setup' },
      { src: '/gallery/Others/Jaimala fireworks/1.jpg', alt: 'Jaimala fireworks' },
      { src: '/gallery/Others/Jaimala fireworks/2.jpg', alt: 'Jaimala ceremony' },
    ],
  },
  {
    title: 'LIVE MUSIC',
    subtitle: 'LIVE MUSIC PERFORMANCES\nCAN BE ARRANGED',
    images: [
      { src: '/gallery/Others/Live music/1.jpg', alt: 'Live music 1' },
      { src: '/gallery/Others/Live music/2.jpg', alt: 'Live music 2' },
      { src: '/gallery/Others/Live music/3.jpg', alt: 'Live music 3' },
      { src: '/gallery/Others/Live music/4.jpeg', alt: 'Live music 4' },
    ],
  },
  {
    title: 'MEHENDI ARTIST',
    subtitle: 'MEHENDI CEREMONY SETUPS\nCAN BE RECREATED',
    images: [
      { src: '/gallery/Others/Mehedi artist/1.jpg', alt: 'Mehendi artist 1' },
      { src: '/gallery/Others/Mehedi artist/2.jpg', alt: 'Mehendi artist 2' },
      { src: '/gallery/Others/Mehedi artist/3.jpg', alt: 'Mehendi artist 3' },
      { src: '/gallery/Others/Mehedi artist/4.jpg', alt: 'Mehendi artist 4' },
    ],
  },
  {
    title: 'MAKEUP ARTIST',
    subtitle: 'BRIDAL MAKEUP SERVICES\nCAN BE ARRANGED',
    images: [
      { src: '/gallery/Others/Makeup artist/1.jpg', alt: 'Makeup artist 1' },
      { src: '/gallery/Others/Makeup artist/2.png', alt: 'Makeup artist 2' },
      { src: '/gallery/Others/Makeup artist/3.jpg', alt: 'Makeup artist 3' },
      { src: '/gallery/Others/Makeup artist/4.png', alt: 'Makeup artist 4' },
    ],
  },
  {
    title: 'ANCHORING',
    subtitle: 'PROFESSIONAL ANCHORING\nCAN BE ARRANGED',
    images: [
      { src: '/gallery/Others/Anchoring/anchor 1.jpg', alt: 'Anchoring 1' },
      { src: '/gallery/Others/Anchoring/anchor 2.jpg', alt: 'Anchoring 2' },
      { src: '/gallery/Others/Anchoring/anchor 3.png', alt: 'Anchoring 3' },
      { src: '/gallery/Others/Anchoring/anchor 4.jpg', alt: 'Anchoring 4' },
    ],
  },
  {
    title: 'HALDI MEHENDI',
    subtitle: 'HALDI CEREMONY SETUPS\nCAN BE RECREATED',
    images: [
      { src: '/gallery/Others/Haldi mehendi/haldi-1.jpg', alt: 'Haldi 1' },
      { src: '/gallery/Others/Haldi mehendi/haldi-2.jpg', alt: 'Haldi 2' },
      { src: '/gallery/Others/Haldi mehendi/haldi-3.jpg', alt: 'Haldi 3' },
      { src: '/gallery/Others/Haldi mehendi/haldi-4.jpg', alt: 'Haldi 4' },
    ],
  },
  {
    title: 'ENTRANCE SELFIE POINT',
    subtitle: 'ENTRANCE & SELFIE POINT SETUPS\nCAN BE RECREATED',
    images: [
      { src: '/gallery/Others/Entrance/entrance 1.png', alt: 'Entrance 1' },
      { src: '/gallery/Others/Entrance/entrance 2.png', alt: 'Entrance 2' },
      { src: '/gallery/Others/selfie point/selfie point 1.jpg', alt: 'Selfie point 1' },
      { src: '/gallery/Others/selfie point/selfie point 2.png', alt: 'Selfie point 2' },
      { src: '/gallery/Others/selfie point/selfie point 3.jpg', alt: 'Selfie point 3' },
    ],
  },
  {
    title: 'PRE WEDDING',
    subtitle: 'PRE-WEDDING SHOOT CONCEPTS\nCAN BE RECREATED',
    images: [
      { src: '/gallery/Others/Pre wedding/Pre wedding  helicopter.jpg', alt: 'Pre wedding' },
      { src: '/gallery/Others/Pre wedding/Pre wedding.jpg', alt: 'Pre wedding helicopter' },
      { src: '/gallery/Others/Pre wedding/Pre wedding luxary car.png', alt: 'Pre wedding luxury car' },
      { src: '/gallery/Others/Pre wedding/Pre wedding Shoot in Jaipur.jpg', alt: 'Pre wedding Jaipur' },
    ],
  },
  {
    title: 'WEDDING STATIONARY',
    subtitle: 'WEDDING STATIONARY & INVITES\nCAN BE CUSTOMISED',
    images: [
      { src: '/gallery/Others/wedding stationary/wedding stationary 1.jpg', alt: 'Wedding stationary 1' },
      { src: '/gallery/Others/wedding stationary/wedding stationary 2.png', alt: 'Wedding stationary 2' },
      { src: '/gallery/Others/wedding stationary/wedding stationary 3.jpg', alt: 'Wedding stationary 3' },
      { src: '/gallery/Others/wedding stationary/wedding stationary 4.png', alt: 'Wedding stationary 4' },
    ],
  },
];

const OtherServicesShowcase = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Decorative top-right floral */}
      <div className="absolute top-12 right-8 opacity-40 pointer-events-none z-10">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
          <circle cx="50" cy="30" r="15" fill="#D4AF37" opacity="0.3" />
          <circle cx="65" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <circle cx="35" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <path d="M50 50 L50 110" stroke="#8B7355" strokeWidth="2" />
          <path d="M50 70 L35 85" stroke="#8B7355" strokeWidth="1.5" />
          <path d="M50 80 L65 95" stroke="#8B7355" strokeWidth="1.5" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-6xl mx-auto">

          {/* Section header */}
          <div className="mb-16 animate-fade-in">
            <div className="w-16 h-1 bg-accent mb-6" />
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3 tracking-tight">
              OTHER SERVICES
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything else you need to make your celebration complete
            </p>
          </div>

          {/* Service blocks */}
          <div className="space-y-28">
            {services.map((service, sIdx) => (
              <div key={service.title} className="animate-fade-in-up" style={{ animationDelay: `${sIdx * 60}ms` }}>
                {/* Service title */}
                <div className="mb-10">
                  <div className="w-10 h-1 bg-accent mb-4" />
                  <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-1 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest whitespace-pre-line">
                    {service.subtitle}
                  </p>
                </div>

                {/* Polaroid layout — large left + cluster right */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Large polaroid */}
                  {service.images[0] && (
                    <div className="polaroid-frame large animate-fade-in">
                      <div className="polaroid-inner">
                        <div className="polaroid-image">
                          <img
                            src={service.images[0].src}
                            alt={service.images[0].alt}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Cluster of 4 */}
                  <div className="polaroid-cluster">
                    {service.images.slice(1, 5).map((img, idx) => (
                      <div
                        key={idx}
                        className={`polaroid-frame small polaroid-${idx + 1} animate-fade-in`}
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className="polaroid-inner">
                          <div className="polaroid-image">
                            <img
                              src={img.src}
                              alt={img.alt}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* View More per service */}
                <div className="mt-10 text-center animate-fade-in">
                  <Link
                    to="/bandhan/gallery"
                    className="inline-flex items-center gap-2 border border-accent/40 hover:border-accent text-primary hover:bg-accent/10 font-semibold px-6 py-3 rounded-xl shadow-soft transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group text-sm"
                  >
                    View More
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform text-accent" />
                  </Link>
                </div>

                {/* Divider */}
                {sIdx < services.length - 1 && (
                  <div className="mt-16 border-b border-accent/15" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default OtherServicesShowcase;
