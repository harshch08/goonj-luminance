import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import BandhanPageTransition from '@/components/bandhan/BandhanPageTransition';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import FloralDecor from '@/components/bandhan/services/FloralDecor';
import { Heart, Award, Users, Sparkles, Star, CheckCircle } from 'lucide-react';
import weddingDecor from '@/assets/bandhan/wedding-decor.jpg';
import destinationSetup from '@/assets/bandhan/destination-setup.jpg';
import '@/components/bandhan/bandhan-theme.css';

const stats = [
  { number: '200+', label: 'Weddings Crafted' },
  { number: '50+', label: 'Destinations Covered' },
  { number: '5+', label: 'Years of Excellence' },
  { number: '1000+', label: 'Happy Families' },
];

const values = [
  {
    icon: Heart,
    title: 'Crafted with Love',
    description: 'Every wedding we plan is treated as our own. We pour our hearts into every detail, ensuring your celebration is as unique as your love story.',
  },
  {
    icon: Award,
    title: 'Uncompromising Quality',
    description: 'From the finest floral arrangements to world-class catering, we partner only with the best vendors to deliver an experience beyond expectations.',
  },
  {
    icon: Users,
    title: 'Dedicated Team',
    description: 'Our experienced team of wedding planners, designers, and coordinators work in perfect harmony to bring your vision to life seamlessly.',
  },
  {
    icon: Sparkles,
    title: 'Bespoke Experiences',
    description: 'No two weddings are alike. We listen, understand, and create a celebration that is a true reflection of who you are as a couple.',
  },
];

const milestones = [
  'Founded with a vision to redefine luxury wedding planning in India',
  'Expanded to destination weddings across Rishikesh, Corbett, and beyond',
  'Partnered with premium brands — Bikaner, Haldirams, Barista and more',
  'Recognised for excellence in wedding photography and cinematic films',
  'Trusted by 1000+ families across North India for their most special day',
];

const BandhanAbout = () => {
  return (
    <BandhanPageTransition>
    <div className="min-h-screen bandhan-theme" style={{ backgroundColor: 'hsl(40, 40%, 97%)' }}>
      <BandhanNav />
      <BandhanCategoryNav />
      <FloatingFlowers />

      <main className="relative -mt-[140px] pt-[140px]">

        {/* ── Hero ── */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden">
          <img src="https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1920&h=900&fit=crop&q=80" alt="Bandhan about us" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 gradient-hero" />
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 tracking-tight">
              Our Story
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto font-body">
              Where every love story becomes a timeless celebration
            </p>
          </div>
        </section>

        {/* ── Who We Are ── */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
          <div className="absolute top-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

              {/* Text */}
              <div className="animate-fade-in">
                <div className="w-16 h-1 bg-accent mb-6" />
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 tracking-tight leading-tight">
                  Bandhan by Cardinal Revolution
                </h2>
                <p className="text-accent text-lg font-medium mb-6">
                  Crafting timeless wedding experiences since 2020
                </p>
                <div className="space-y-4 text-foreground/90 leading-relaxed text-lg">
                  <p>
                    Bandhan was born from a simple yet powerful belief — that every wedding deserves to be extraordinary. We are a luxury wedding planning company dedicated to transforming your most cherished moments into memories that last a lifetime.
                  </p>
                  <p>
                    From intimate riverside ceremonies in Rishikesh to grand destination celebrations in Corbett, we bring the same level of passion, precision, and artistry to every event we touch.
                  </p>
                  <p>
                    Our team of experienced planners, designers, and coordinators work tirelessly behind the scenes so you can be fully present in every magical moment of your celebration.
                  </p>
                </div>
              </div>

              {/* Images */}
              <div className="relative animate-fade-in-up">
                <div className="polaroid-frame mb-6 hover:scale-105 transition-transform duration-500">
                  <img src={weddingDecor} alt="Wedding decor" className="w-full h-80 object-cover rounded" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="polaroid-frame -rotate-1 hover:rotate-0 hover:scale-105 transition-all duration-500">
                    <img src={destinationSetup} alt="Destination setup" className="w-full h-48 object-cover rounded" />
                  </div>
                  <div className="polaroid-frame rotate-1 mt-4 hover:rotate-0 hover:scale-105 transition-all duration-500">
                    <img src={weddingDecor} alt="Wedding ceremony" className="w-full h-48 object-cover rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <FloralDecor />
        </section>

        {/* ── Stats ── */}
        <section className="py-20 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center animate-fade-in-up bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-4xl lg:text-5xl font-heading font-bold text-accent mb-2">{stat.number}</div>
                  <p className="text-sm text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Our Values ── */}
        <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
          <div className="absolute top-1/4 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <div className="w-16 h-1 bg-accent mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight">
                  What We Stand For
                </h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className="animate-fade-in-up bg-background/50 backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300 group text-center"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-accent/20 transition-colors duration-300">
                      <value.icon size={24} className="text-accent" />
                    </div>
                    <h3 className="text-lg font-heading font-semibold text-primary mb-3">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Journey ── */}
        <section className="py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16 animate-fade-in">
                <div className="w-16 h-1 bg-accent mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight">
                  Our Journey
                </h2>
              </div>

              <div className="space-y-4 animate-fade-in-up">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 bg-background/50 backdrop-blur-sm p-5 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <CheckCircle size={20} className="text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <p className="text-foreground/90 leading-relaxed">{milestone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <FloralDecor />
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
                Let's Plan Your Dream Wedding
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
                Every great love story deserves a perfect celebration. Let us be part of yours.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/bandhan/contact"
                  className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-10 py-5 rounded-xl shadow-elegant hover:shadow-soft transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-center"
                >
                  Get in Touch
                </a>
                <a
                  href="/bandhan/services"
                  className="inline-block border border-accent/40 hover:border-accent text-primary hover:bg-accent/10 font-semibold px-10 py-5 rounded-xl shadow-soft transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-center"
                >
                  Explore Services
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>
      <BandhanFooter />
    </div>
    </BandhanPageTransition>
  );
};

export default BandhanAbout;
