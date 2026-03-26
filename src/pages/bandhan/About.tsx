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
                  About Us
                </h2>
                <div className="space-y-4 text-foreground/90 leading-relaxed text-lg">
                  <p>
                    <strong>Bandhan by Cardinal Revolution</strong> is a luxury destination wedding planning company born out of a passion for celebrating love, culture, and unforgettable moments. We specialize in curating dream weddings across scenic locations in India and beyond, turning every couple's vision into a beautifully orchestrated reality.
                  </p>
                  <p>
                    From grand royal affairs to intimate beach ceremonies, our team ensures every detail is flawlessly managed—right from venue selection and premium décor to guest hospitality, logistics, entertainment, and culinary experiences.
                  </p>
                  <p>
                    <strong>At Bandhan</strong>, we believe a wedding is not just an event; it's an emotion. Our in-house creatives, designers, and hospitality experts work hand-in-hand with couples to reflect their story through personalized themes, elegant setups, and immersive experiences.
                  </p>
                  <p>
                    With roots in tradition and eyes on innovation, <strong>Bandhan by Cardinal Revolution</strong> is your trusted partner in crafting weddings that are heartfelt, hassle-free, and truly spectacular.
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
                  Our Values
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  '"Crafting one-of-a-kind experiences tailored to each couple\'s unique story."',
                  '"Delivering flawless execution with the highest standards of quality and luxury."',
                  '"Building heartfelt relationships to create joyful, stress-free celebrations."',
                ].map((quote, index) => (
                  <div
                    key={index}
                    className="animate-fade-in-up bg-background/50 backdrop-blur-sm p-8 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300 flex items-center justify-center"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <p className="text-lg text-foreground/80 leading-relaxed italic text-center font-body">{quote}</p>
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
                  Why Choose Us?
                </h2>
              </div>

              <div className="space-y-4 animate-fade-in-up">
                {[
                  { text: <>We are <strong>customer satisfaction oriented</strong> business.</> },
                  { text: <>We provide an <strong>early-bird</strong> flat <strong>discount of 10%</strong> for all.</> },
                  { text: <>We provide <strong>complimentary services</strong> if you book the entire wedding with us.</> },
                  { text: <>We have <strong>customizable premium packages</strong> that can be swapped from our add-on services.</> },
                  { text: <>We offer a range of <strong>Pre-Wedding</strong> shoot types and locations.</> },
                  { text: <>We maintain high standards by using <strong>brand-new linens</strong>, ensuring premium <strong>quality and hygiene</strong>.</> },
                  { text: <>Our photographic services are top notch, as we give the album and edited material in just <strong>30-45 days</strong> period.</> },
                  { text: <>We have realistic and moderate costs, and we offer branded food stalls, i.e., <strong>Bikaner, Haldirams, Barista</strong>, etc.</> },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 bg-background/50 backdrop-blur-sm p-5 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300 group"
                    style={{ animationDelay: `${index * 80}ms` }}
                  >
                    <CheckCircle size={20} className="text-accent mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <p className="text-foreground/90 leading-relaxed">{item.text}</p>
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
