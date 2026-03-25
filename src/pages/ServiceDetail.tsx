import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle, MessageCircle, X, Sparkles } from 'lucide-react';
import { Music, Star, Heart } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';
import { LiveMusicHero } from '@/components/sections/LiveMusicHero';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Button } from '@/components/ui/button';
import { LiveArtistCard, type LiveArtist } from '@/components/artists';
import { LikeErrorBoundary, LikeToastProvider } from '@/components/likes';
import { useBulkLikes, useCelebrityArtists } from '@/hooks';
import type { CelebrityArtist } from '@/types/celebrity';

import heroLiveMusic from '@/assets/hero-live-music.jpg';
import heroCelebrity from '@/assets/hero-celebrity.jpg';
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
    icon: Star,
    title: 'Events',
    subtitle: 'End-to-end event management for flawless execution',
    description: 'From conceptualization to execution, we handle every aspect of your event with precision and creativity. Our experienced team ensures every detail is perfect.',
    image: heroLiveMusic,
    types: [
      { name: 'Corporate Events', description: 'Professional events for businesses including conferences and galas' },
      { name: 'Product Launches', description: 'Spectacular launches that make your brand shine' },
      { name: 'Award Ceremonies', description: 'Prestigious events celebrating achievements and excellence' },
      { name: 'Private Parties', description: 'Exclusive celebrations tailored to your unique vision' },
    ],
    features: ['Complete Event Planning', 'Venue Selection', 'Vendor Coordination', 'On-site Management'],
  },
  'instrumentalists': {
    icon: Music,
    title: 'Instrumentalists',
    subtitle: 'World-class musicians for sophisticated entertainment',
    description: 'Add a touch of elegance to your event with our roster of skilled instrumentalists. From classical to contemporary, our musicians create the perfect ambiance.',
    image: heroLiveMusic,
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
    icon: Star,
    title: 'Open Mics',
    subtitle: 'Platforms for emerging talent to shine',
    description: 'We create professionally organized open mic events that give emerging artists the spotlight they deserve while entertaining your audience.',
    image: heroLiveMusic,
    types: [
      { name: 'Comedy Nights', description: 'Open stages for stand-up comedy performances' },
      { name: 'Poetry Slams', description: 'Spoken word and poetry performance events' },
      { name: 'Music Open Mics', description: 'Platform for emerging singers and musicians' },
      { name: 'Talent Shows', description: 'Multi-talent events showcasing various arts' },
    ],
    features: ['Professional Hosting', 'Quality Sound', 'Audience Engagement', 'Talent Discovery'],
  },
  'karaoke': {
    icon: Music,
    title: 'Karaoke Nights',
    subtitle: 'Fun-filled singing experiences for everyone',
    description: 'Transform any gathering into a memorable karaoke experience with our professional equipment, extensive song library, and expert hosts.',
    image: heroLiveMusic,
    types: [
      { name: 'Private Karaoke', description: 'Exclusive karaoke setups for private gatherings' },
      { name: 'Corporate Fun', description: 'Team building karaoke events for companies' },
      { name: 'Birthday Parties', description: 'Special karaoke celebrations for birthdays' },
      { name: 'Theme Nights', description: 'Themed karaoke events for added excitement' },
    ],
    features: ['Professional Equipment', 'Extensive Song Library', 'Party Lights', 'Expert Hosts'],
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
    icon: Star,
    title: 'Catering & Decor',
    subtitle: 'Exquisite cuisine and stunning aesthetics for your event',
    description: 'Delight your guests with world-class catering and breathtaking decor. Our expert team creates culinary masterpieces and visual spectacles that perfectly complement your celebration.',
    image: heroCelebrity,
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
  const [selectedCelebrity, setSelectedCelebrity] = useState<CelebrityArtist | null>(null);
  const [preSelectedCelebrityName, setPreSelectedCelebrityName] = useState<string>('');

  // Bulk likes management for live music artists
  const {
    artistsData,
    isLoading: bulkLoading,
    loadArtists,
    getArtistData
  } = useBulkLikes({
    enableCache: true,
    autoRefresh: false
  });

  // Fetch celebrity artists for celebrity concerts page
  const { data: celebrityArtists, isLoading: celebrityLoading } = useCelebrityArtists();

  // Define live music artists with IDs
  const soloArtists: LiveArtist[] = [
    {
      id: 201, // Using 200+ IDs to avoid conflicts
      name: 'Rahul Thapa Ryan',
      genre: 'Western Country Pop Indie',
      tag: 'Singer & Performer',
      bio: 'A Western Country Pop Indie Musician with a stage experience of 15+ years. An experienced judge, a music teacher, and a Guitar + Piano grade & degree holder with mastery in western vocals.',
      image: '/Rahul_Thapa_Ryan.jpeg'
    },
    {
      id: 204,
      name: 'Ranjan',
      genre: 'Bolly Mix',
      tag: 'Singer & Performer',
      bio: 'A Bollywood Mix Musician experienced in gigs, bringing energy and versatility to every performance.',
      image: '/ranjan.jpeg'
    },
    {
      id: 207,
      name: 'Ajay',
      genre: 'Bolly Mix',
      tag: 'Singer & Performer',
      bio: 'A Bollywood Mix Musician and new beginner artist with a fresh and enthusiastic approach to every performance.',
      image: '/Ajay.jpeg'
    },
    {
      id: 208,
      name: 'Vansh',
      genre: 'Bolly Mix',
      tag: 'Singer & Performer',
      bio: 'A Bollywood Mix Musician and a regular gigs performer, delivering consistent and engaging live performances.',
      image: '/Vansh.png'
    },
    {
      id: 209,
      name: 'Manisha',
      genre: 'Bolly Mix',
      tag: 'Singer & Performer',
      bio: 'A Bollywood Mix Musician trained in classical music, bringing depth and finesse to every performance.',
      image: '/manisha.jpeg'
    },
    {
      id: 210,
      name: 'Krrish',
      genre: 'Bolly Mix',
      tag: 'Singer & Performer',
      bio: 'A Bollywood Mix Musician and new beginner artist with a fresh and enthusiastic approach to every performance.',
      image: '/krish.jpeg'
    }
  ];

  const duoArtists: LiveArtist[] = [
    {
      id: 301, // Using 300+ IDs for duo artists
      name: 'Rahul Thapa Ryan + Pianist',
      genre: 'Western Country Pop Indie',
      tag: 'Singer & Performer',
      bio: 'A Western Country Pop Indie Musician with a stage experience of 15+ years. An experienced judge, a music teacher, and a Guitar + Piano grade & degree holder with mastery in western vocals.',
      image: '/Rahul_Thapa_Ryan.jpeg'
    },
    {
      id: 302,
      name: 'Manisha + Guitarist',
      genre: 'Bolly Mix',
      tag: 'Singer & Performer',
      bio: 'A Bollywood Mix Musician trained in classical music, bringing depth and finesse to every performance.',
      image: '/manisha.jpeg'
    },
    {
      id: 303,
      name: 'Ranjan + Pianist',
      genre: 'Bolly Mix',
      tag: 'Singer & Performer',
      bio: 'A Bollywood Mix Musician experienced in gigs, bringing energy and versatility to every performance.',
      image: '/ranjan.jpeg'
    },
    {
      id: 305,
      name: 'Sirat Band',
      genre: 'Bolly Mix',
      tag: 'Singer & Performer',
      bio: 'A powerful combination of strong vocals and guitar expertise that engages and entertains crowds.',
      image: '/Sirat band.jpeg'
    }
  ];

  // Load all artist like data when component mounts for live music
  useEffect(() => {
    if (slug === 'live-music') {
      const allArtists = [...soloArtists, ...duoArtists];
      const artistConfigs = allArtists.map(artist => ({
        id: artist.id,
        name: artist.name
      }));
      
      loadArtists(
        artistConfigs.map(a => a.id),
        artistConfigs.reduce((acc, artist) => {
          acc[artist.id] = artist.name;
          return acc;
        }, {} as Record<number, string>)
      );
    }
  }, [slug, loadArtists]);

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
    <LikeToastProvider>
      <PageLayout>
      {/* Conditional Hero - Custom for Live Music, Regular for Others */}
      {slug === 'live-music' ? (
        <LiveMusicHero />
      ) : (
        <PageHero 
          title={service.title}
          subtitle={service.subtitle}
          backgroundImage={service.image}
        />
      )}

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
              <p className="text-body text-lg leading-relaxed mb-8 text-justify sm:text-left">{service.description}</p>
              
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

      {/* Our Artists Section - Only for Live Music */}
      {slug === 'live-music' && (
        <section id="our-artists" className="py-20 lg:py-28">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
                Meet Our Talent
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Our Artists
              </h2>
              <div className="section-divider" />
            </motion.div>

            {/* Solo Artists */}
            <LikeErrorBoundary>
              <div className="mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Solo
                  </h3>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {soloArtists.map((artist, index) => (
                    <LiveArtistCard
                      key={artist.id}
                      artist={artist}
                      index={index}
                      bulkData={getArtistData(artist.id)}
                      isLoading={bulkLoading}
                      variant="solo"
                    />
                  ))}
                </div>
              </div>
            </LikeErrorBoundary>

            {/* Duo Artists */}
            <LikeErrorBoundary>
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-center mb-12"
                >
                  <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                    Duo
                  </h3>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {duoArtists.map((artist, index) => (
                    <LiveArtistCard
                      key={artist.id}
                      artist={artist}
                      index={index}
                      bulkData={getArtistData(artist.id)}
                      isLoading={bulkLoading}
                      variant="duo"
                    />
                  ))}
                </div>
              </div>
            </LikeErrorBoundary>
          </div>
        </section>
      )}

      {/* Celebrity Artists Section - Only for Celebrity Concerts */}
      {slug === 'celebrity' && (
        <section id="celebrity-artists" className="py-20 lg:py-28">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
                Star Performers
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Celebrity Artists
              </h2>
              <div className="section-divider" />
            </motion.div>

            {celebrityLoading ? (
              <div className="space-y-4 max-w-5xl mx-auto">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-24 bg-muted animate-pulse rounded-lg" />
                ))}
              </div>
            ) : celebrityArtists && celebrityArtists.length > 0 ? (
              <div className="max-w-5xl mx-auto">
                <div className="space-y-4">
                  {celebrityArtists.map((artist, index) => (
                    <motion.div
                      key={artist.id}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      viewport={{ once: true }}
                      onClick={() => setSelectedCelebrity(artist)}
                      className="glass-card p-6 hover:border-gold/30 transition-all duration-300 group cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-start gap-3">
                            <span className="font-display text-2xl font-bold text-gold-light mt-1">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <div className="flex-1">
                              <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-gold-light transition-colors">
                                {artist.name}
                              </h3>
                              <p className="text-sm text-gold mb-2 font-medium">
                                {artist.niche}
                              </p>
                              {artist.bio && (
                                <p className="text-sm text-body leading-relaxed">
                                  {artist.bio}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="sm:text-right space-y-2 sm:min-w-[280px]">
                          <div className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/20">
                            <p className="text-xs uppercase tracking-wider text-gold-light font-semibold">
                              Package Details
                            </p>
                          </div>
                          <p className="text-sm font-semibold text-foreground">
                            {artist.package}
                          </p>
                          <p className="text-xs text-gold-light group-hover:text-gold transition-colors">
                            Click for details →
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No celebrity artists available at the moment.</p>
              </div>
            )}

            {/* Celebrity Artist Modal */}
            <AnimatePresence>
              {selectedCelebrity && (
                <>
                  {/* Backdrop */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setSelectedCelebrity(null)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                  />

                  {/* Modal */}
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: 20 }}
                      transition={{ type: 'spring', duration: 0.5 }}
                      className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* Close Button */}
                      <button
                        onClick={() => setSelectedCelebrity(null)}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="p-8">
                        {/* Header */}
                        <div className="mb-6">
                          <div className="flex items-center gap-3 mb-4">
                            <Star className="w-6 h-6 text-gold" />
                            <span className="text-xs uppercase tracking-luxury text-gold-light">
                              Celebrity Artist
                            </span>
                          </div>
                          <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                            {selectedCelebrity.name}
                          </h2>
                          <p className="text-lg text-gold font-semibold mb-4">
                            {selectedCelebrity.niche}
                          </p>
                          {selectedCelebrity.bio && (
                            <p className="text-body leading-relaxed">
                              {selectedCelebrity.bio}
                            </p>
                          )}
                        </div>

                        {/* Package Details */}
                        <div className="glass-card p-6 mb-6 border-2 border-gold/20">
                          <div className="flex items-start gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center shrink-0">
                              <Sparkles className="w-5 h-5 text-gold" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-1">Package Details</h3>
                              <p className="text-sm text-muted-foreground">Complete pricing information</p>
                            </div>
                          </div>
                          <div className="pl-13">
                            <p className="text-lg font-semibold text-gold-light">
                              {selectedCelebrity.package}
                            </p>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-3 mb-8">
                          <div className="flex items-center gap-3 text-sm">
                            <CheckCircle className="w-4 h-4 text-gold-light shrink-0" />
                            <span className="text-body">Professional Performance</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <CheckCircle className="w-4 h-4 text-gold-light shrink-0" />
                            <span className="text-body">Travel & Accommodation Included</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <CheckCircle className="w-4 h-4 text-gold-light shrink-0" />
                            <span className="text-body">Complete Event Management Support</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <CheckCircle className="w-4 h-4 text-gold-light shrink-0" />
                            <span className="text-body">Premium Celebrity Experience</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <Button
                            variant="heroFilled"
                            size="lg"
                            className="flex-1"
                            onClick={() => {
                              setPreSelectedCelebrityName(selectedCelebrity.name);
                              setSelectedCelebrity(null);
                              setTimeout(() => {
                                const formSection = document.getElementById('inquiry-form');
                                formSection?.scrollIntoView({ behavior: 'smooth' });
                              }, 100);
                            }}
                          >
                            <MessageCircle size={18} className="mr-2" />
                            Book Now
                          </Button>
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={() => setSelectedCelebrity(null)}
                          >
                            Close
                          </Button>
                        </div>

                        <p className="text-center text-xs text-muted-foreground mt-4 uppercase tracking-wide">
                          We respond within 24 hours • Premium service guaranteed
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>
        </section>
      )}

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
            
            <InquiryForm 
              serviceType={service.title} 
              preSelectedCelebrity={preSelectedCelebrityName}
            />
          </div>
        </div>
      </section>
    </PageLayout>
    </LikeToastProvider>
  );
};

export default ServiceDetail;
