import { Link } from 'react-router-dom';
import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import FloralDecor from '@/components/bandhan/services/FloralDecor';
import { Heart, Camera, Utensils, Mic2, ArrowRight } from 'lucide-react';
import weddingDecor from '@/assets/bandhan/wedding-decor.jpg';
import destinationSetup from '@/assets/bandhan/destination-setup.jpg';
import '@/components/bandhan/bandhan-theme.css';

const services = [
  {
    icon: Heart,
    title: 'Destination Weddings',
    subtitle: 'Create unforgettable experiences in breathtaking locations',
    description: 'From riverside ceremonies in Rishikesh to grand celebrations in Corbett, we transform stunning destinations into the perfect backdrop for your love story.',
    href: '/bandhan/destination-weddings',
    image: weddingDecor,
    highlights: ['Venue scouting & selection', 'Travel & accommodation', 'Local vendor coordination', 'Guest management'],
  },
  {
    icon: Utensils,
    title: 'Catering & Decor',
    subtitle: 'Exquisite cuisine and stunning aesthetics',
    description: 'Delight your guests with world-class culinary experiences and breathtaking decor. We combine gourmet cuisine with artistic presentation for unforgettable dining.',
    href: '/bandhan/catering',
    image: destinationSetup,
    highlights: ['Premium branded food stalls', 'Custom menu design', 'Floral arrangements', 'Live cooking stations'],
  },
  {
    icon: Camera,
    title: 'Photography & Videography',
    subtitle: 'Capture every precious moment with artistry',
    description: 'Preserve your memories with our expert photography and cinematic videography. Our team captures the emotion and beauty of your special day with artistic vision.',
    href: '/bandhan/photography',
    image: weddingDecor,
    highlights: ['Pre-wedding shoots', 'Cinematic wedding films', 'Drone photography', 'Same-day editing'],
  },
  {
    icon: Mic2,
    title: 'Stage Setup & Sound',
    subtitle: 'State-of-the-art audio-visual production',
    description: 'Transform your venue with professional stage design, lighting, and sound systems. Our technical expertise ensures perfect ambiance and flawless audio-visual experiences.',
    href: '/bandhan/stage-setup',
    image: destinationSetup,
    highlights: ['Professional sound systems', 'Ambient & dramatic lighting', 'Custom stage design', 'LED screens & projections'],
  },
];

const BandhanServices = () => {
  return (
    <div className="min-h-screen bandhan-theme" style={{ backgroundColor: 'hsl(40, 40%, 97%)' }}>
      <BandhanNav />
      <BandhanCategoryNav />
      <FloatingFlowers />

      <main className="relative -mt-[140px] pt-[140px]">

        {/* ── Hero ── */}
        <section className="relative h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden">
          <img src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&h=900&fit=crop&q=80" alt="Bandhan services" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 tracking-tight">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto font-body">
              Every detail, perfectly crafted for your most special day
            </p>
          </div>
        </section>

        {/* ── Intro ── */}
        <section className="py-20 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
          <div className="absolute top-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center animate-fade-in">
              <div className="w-16 h-1 bg-accent mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 tracking-tight">
                Everything You Need
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At Bandhan, we offer a complete suite of wedding services — from destination planning and world-class catering to cinematic photography and professional stage production. Each service is delivered with the same unwavering commitment to excellence.
              </p>
            </div>
          </div>
        </section>

        {/* ── Services List ── */}
        <section className="py-8 bg-gradient-to-b from-secondary/10 to-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto space-y-24">
              {services.map((service, index) => (
                <div
                  key={service.title}
                  className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center animate-fade-in-up ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image — alternates sides */}
                  <div className={`relative ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="polaroid-frame hover:scale-105 transition-transform duration-500">
                      <img src={service.image} alt={service.title} className="w-full h-80 object-cover rounded" />
                    </div>
                    {/* Icon badge */}
                    <div className="absolute -top-4 -right-4 w-14 h-14 bg-white rounded-xl shadow-elegant flex items-center justify-center border border-accent/20">
                      <service.icon size={22} className="text-accent" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <div className="w-12 h-1 bg-accent mb-5" />
                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-3 tracking-tight leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-accent font-medium mb-4">{service.subtitle}</p>
                    <p className="text-foreground/90 leading-relaxed text-lg mb-6">{service.description}</p>

                    {/* Highlights */}
                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {service.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2 bg-background/50 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/30 hover:border-accent/30 transition-all duration-300 group">
                          <span className="text-accent mt-0.5 flex-shrink-0 group-hover:scale-125 transition-transform">•</span>
                          <span className="text-sm text-foreground/90">{h}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={service.href}
                      className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-4 rounded-xl shadow-elegant hover:shadow-soft transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group"
                    >
                      Explore Service
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <FloralDecor />
        </section>

        {/* ── Why Choose Bandhan ── */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
          <div className="absolute top-1/4 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <div className="w-16 h-1 bg-accent mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight">
                  Why Choose Bandhan
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 animate-fade-in-up">
                {[
                  { title: 'End-to-End Planning', desc: 'From the first consultation to the last dance, we handle every detail so you can be fully present.' },
                  { title: 'Premium Partnerships', desc: 'We work exclusively with top-tier vendors, venues, and brands to guarantee exceptional quality.' },
                  { title: 'Personalised Approach', desc: 'Every wedding is unique. We listen deeply and craft a celebration that is truly yours.' },
                ].map((item, i) => (
                  <div
                    key={item.title}
                    className="bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300 group text-center"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="w-10 h-1 bg-accent mx-auto mb-4" />
                    <h3 className="text-xl font-heading font-semibold text-primary mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-secondary/30 via-accent/5 to-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-12 right-8 opacity-30 pointer-events-none hidden md:block">
            <svg width="100" height="120" viewBox="0 0 100 120" fill="none">
              <circle cx="50" cy="30" r="15" fill="#D4AF37" opacity="0.3" />
              <circle cx="65" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
              <circle cx="35" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
              <path d="M50 50 L50 110" stroke="#8B7355" strokeWidth="2" />
            </svg>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <div className="w-16 h-1 bg-accent mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 tracking-tight">
                Ready to Begin?
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Let's create something extraordinary together. Contact us today for a personalised consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/bandhan/contact"
                  className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-10 py-5 rounded-xl shadow-elegant hover:shadow-soft transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-center"
                >
                  Get in Touch
                </a>
                <a
                  href="/bandhan"
                  className="inline-block border border-accent/40 hover:border-accent text-primary hover:bg-accent/10 font-semibold px-10 py-5 rounded-xl shadow-soft transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-center"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <BandhanFooter />
    </div>
  );
};

export default BandhanServices;
