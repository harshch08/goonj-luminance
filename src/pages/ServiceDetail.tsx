import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle, MessageCircle } from 'lucide-react';
import { Music, Calendar, Guitar, Star, Mic, MicVocal, Heart } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Button } from '@/components/ui/button';

import heroLiveMusic from '@/assets/hero-live-music.jpg';
import heroEvents from '@/assets/hero-events.jpg';
import heroInstrumentalists from '@/assets/hero-instrumentalists.jpg';
import heroCelebrity from '@/assets/hero-celebrity.jpg';
import heroOpenmic from '@/assets/hero-openmic.jpg';
import heroKaraoke from '@/assets/hero-karaoke.jpg';
import heroWedding from '@/assets/hero-wedding.jpg';

const serviceData: Record<string, {
  icon: typeof Music;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  types: { name: string; description: string }[];
  features: string[];
}> = {
  'live-music': {
    icon: Music,
    title: 'Live Music',
    subtitle: 'Electrifying performances that create unforgettable moments',
    description: 'Experience the magic of live music with our curated selection of talented artists. From soulful acoustic sessions to high-energy band performances, we bring the perfect sound to your event.',
    image: heroLiveMusic,
    types: [
      { name: 'Live Bands', description: 'Full band setups for energetic performances covering various genres' },
      { name: 'Solo Performers', description: 'Talented individual artists for intimate and personalized shows' },
      { name: 'DJ Sets', description: 'Professional DJs with state-of-the-art equipment for dance floors' },
      { name: 'Acoustic Sessions', description: 'Unplugged performances perfect for elegant gatherings' },
    ],
    features: ['Professional Sound Equipment', 'Custom Setlists', 'Genre Flexibility', 'Stage Setup'],
  },
  'events': {
    icon: Calendar,
    title: 'Events',
    subtitle: 'End-to-end event management for flawless execution',
    description: 'From conceptualization to execution, we handle every aspect of your event with precision and creativity. Our experienced team ensures every detail is perfect.',
    image: heroEvents,
    types: [
      { name: 'Corporate Events', description: 'Professional events for businesses including conferences and galas' },
      { name: 'Product Launches', description: 'Spectacular launches that make your brand shine' },
      { name: 'Award Ceremonies', description: 'Prestigious events celebrating achievements and excellence' },
      { name: 'Private Parties', description: 'Exclusive celebrations tailored to your unique vision' },
    ],
    features: ['Complete Event Planning', 'Venue Selection', 'Vendor Coordination', 'On-site Management'],
  },
  'instrumentalists': {
    icon: Guitar,
    title: 'Instrumentalists',
    subtitle: 'World-class musicians for sophisticated entertainment',
    description: 'Add a touch of elegance to your event with our roster of skilled instrumentalists. From classical to contemporary, our musicians create the perfect ambiance.',
    image: heroInstrumentalists,
    types: [
      { name: 'Classical Musicians', description: 'Trained artists performing timeless classical pieces' },
      { name: 'Jazz Artists', description: 'Smooth jazz performers for sophisticated atmospheres' },
      { name: 'Fusion Performers', description: 'Artists blending traditional and modern sounds' },
      { name: 'Session Musicians', description: 'Versatile players for custom musical requirements' },
    ],
    features: ['Premium Instruments', 'Customized Repertoire', 'Formal Attire', 'Flexible Duration'],
  },
  'celebrity': {
    icon: Star,
    title: 'Celebrity Concerts',
    subtitle: 'Bring star power to your special occasions',
    description: 'Access to top celebrities and renowned artists for spectacular concert experiences. We manage everything from artist coordination to stage production.',
    image: heroCelebrity,
    types: [
      { name: 'Bollywood Stars', description: 'Popular Bollywood singers and performers' },
      { name: 'Playback Singers', description: 'Renowned voices from the film industry' },
      { name: 'Stand-up Comedians', description: 'Top comedians for laughter-filled evenings' },
      { name: 'International Artists', description: 'Global talent for world-class performances' },
    ],
    features: ['Artist Management', 'Production Setup', 'Security Coordination', 'Media Handling'],
  },
  'openmic': {
    icon: Mic,
    title: 'Open Mics',
    subtitle: 'Platforms for emerging talent to shine',
    description: 'We create professionally organized open mic events that give emerging artists the spotlight they deserve while entertaining your audience.',
    image: heroOpenmic,
    types: [
      { name: 'Comedy Nights', description: 'Open stages for stand-up comedy performances' },
      { name: 'Poetry Slams', description: 'Spoken word and poetry performance events' },
      { name: 'Music Open Mics', description: 'Platform for emerging singers and musicians' },
      { name: 'Talent Shows', description: 'Multi-talent events showcasing various arts' },
    ],
    features: ['Professional Hosting', 'Quality Sound', 'Audience Engagement', 'Talent Discovery'],
  },
  'karaoke': {
    icon: MicVocal,
    title: 'Karaoke Nights',
    subtitle: 'Fun-filled singing experiences for everyone',
    description: 'Transform any gathering into a memorable karaoke experience with our professional equipment, extensive song library, and expert hosts.',
    image: heroKaraoke,
    types: [
      { name: 'Private Karaoke', description: 'Exclusive karaoke setups for private gatherings' },
      { name: 'Corporate Fun', description: 'Team building karaoke events for companies' },
      { name: 'Birthday Parties', description: 'Special karaoke celebrations for birthdays' },
      { name: 'Theme Nights', description: 'Themed karaoke events for added excitement' },
    ],
    features: ['Professional Equipment', 'Extensive Song Library', 'Party Lights', 'Expert Hosts'],
  },
  'wedding': {
    icon: Heart,
    title: 'Bandhan',
    subtitle: 'Complete wedding entertainment solutions',
    description: 'Make your wedding celebrations unforgettable with our comprehensive entertainment services covering every ceremony from sangeet to reception.',
    image: heroWedding,
    types: [
      { name: 'Sangeet Night', description: 'Choreographed performances and live entertainment' },
      { name: 'Wedding Bands', description: 'Traditional and contemporary wedding music' },
      { name: 'Mehendi Artists', description: 'Entertainment and artists for mehendi ceremonies' },
      { name: 'Reception Entertainment', description: 'Grand reception entertainment packages' },
    ],
    features: ['Multi-event Packages', 'Choreography Services', 'Traditional + Modern', 'Complete Coordination'],
  },
  'destination-weddings': {
    icon: Heart,
    title: 'Destination Weddings',
    subtitle: 'Create unforgettable experiences in breathtaking locations',
    description: 'Transform your dream destination into the perfect wedding venue. We handle every detail from venue selection to guest coordination, ensuring your destination wedding is seamless and spectacular.',
    image: heroWedding,
    types: [
      { name: 'Beach Weddings', description: 'Romantic ceremonies on pristine beaches with ocean views' },
      { name: 'Mountain Retreats', description: 'Majestic celebrations in scenic mountain locations' },
      { name: 'Palace Weddings', description: 'Royal experiences in heritage palaces and forts' },
      { name: 'International Destinations', description: 'Exotic locations across the globe for your special day' },
    ],
    features: ['Venue Selection', 'Travel Coordination', 'Guest Management', 'Local Vendor Network'],
  },
  'catering': {
    icon: Calendar,
    title: 'Catering & Decor',
    subtitle: 'Exquisite cuisine and stunning aesthetics for your event',
    description: 'Delight your guests with world-class catering and breathtaking decor. Our expert team creates culinary masterpieces and visual spectacles that perfectly complement your celebration.',
    image: heroEvents,
    types: [
      { name: 'Multi-Cuisine Catering', description: 'Diverse menu options from traditional to international' },
      { name: 'Theme-Based Decor', description: 'Custom decor designs matching your wedding theme' },
      { name: 'Floral Arrangements', description: 'Stunning floral designs and installations' },
      { name: 'Lighting Design', description: 'Ambient lighting to create the perfect atmosphere' },
    ],
    features: ['Custom Menus', 'Professional Chefs', 'Decor Planning', 'Setup & Breakdown'],
  },
  'photography': {
    icon: Star,
    title: 'Photography',
    subtitle: 'Capture every precious moment with professional artistry',
    description: 'Preserve your special moments forever with our award-winning photography and videography services. We capture the emotions, details, and magic of your celebration.',
    image: heroCelebrity,
    types: [
      { name: 'Wedding Photography', description: 'Comprehensive coverage of all wedding ceremonies' },
      { name: 'Cinematic Videography', description: 'Film-style videos that tell your love story' },
      { name: 'Pre-Wedding Shoots', description: 'Creative photo sessions at stunning locations' },
      { name: 'Drone Coverage', description: 'Aerial photography for breathtaking perspectives' },
    ],
    features: ['Professional Equipment', 'Edited Albums', 'Same-Day Edits', 'Online Gallery'],
  },
  'stage-setup': {
    icon: Music,
    title: 'Stage Setup & Lighting / Sound',
    subtitle: 'State-of-the-art audio-visual production',
    description: 'Create an immersive experience with our professional stage, lighting, and sound systems. From intimate gatherings to grand celebrations, we provide technical excellence.',
    image: heroLiveMusic,
    types: [
      { name: 'Stage Design', description: 'Custom stage setups for ceremonies and performances' },
      { name: 'LED Walls', description: 'High-resolution LED displays for visual impact' },
      { name: 'Sound Systems', description: 'Crystal-clear audio for speeches and entertainment' },
      { name: 'Lighting Effects', description: 'Dynamic lighting to enhance ambiance and mood' },
    ],
    features: ['Professional Equipment', 'Technical Support', 'Custom Designs', 'Backup Systems'],
  },
};

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? serviceData[slug] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return (
      <PageLayout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl text-foreground mb-4">Service Not Found</h1>
            <Link to="/services">
              <Button variant="hero">Back to Services</Button>
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  const ServiceIcon = service.icon;

  return (
    <PageLayout>
      <PageHero 
        title={service.title}
        subtitle={service.subtitle}
        backgroundImage={service.image}
      />

      {/* Back Button */}
      <div className="container mx-auto px-6 lg:px-12 py-6">
        <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-gold-light transition-colors">
          <ArrowLeft size={18} />
          <span className="text-sm">Back to Services</span>
        </Link>
      </div>

      {/* Description Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-gold/20 flex items-center justify-center">
                  <ServiceIcon size={32} className="text-gold" />
                </div>
                <span className="text-xs uppercase tracking-luxury text-gold-light">Our Expertise</span>
              </div>
              <p className="text-body text-lg leading-relaxed mb-8">{service.description}</p>
              
              <div className="grid grid-cols-2 gap-4">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-gold-light shrink-0" />
                    <span className="text-body text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Types */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
              What We Offer
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              {service.title} Options
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {service.types.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 hover:border-gold/30 transition-all duration-500 group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                      {type.name}
                    </h3>
                    <p className="text-body text-sm">{type.description}</p>
                  </div>
                  <Button 
                    variant="heroFilled" 
                    size="sm"
                    onClick={() => {
                      const formSection = document.getElementById('inquiry-form');
                      formSection?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="shrink-0"
                  >
                    <MessageCircle size={14} className="mr-2" />
                    Contact
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
                Get Started
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Book {service.title}
              </h2>
              <p className="text-body">
                Fill out the form below and our team will get back to you with the best options.
              </p>
            </motion.div>
            
            <InquiryForm serviceType={service.title} />
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
