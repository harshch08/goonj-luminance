import { motion } from 'framer-motion';
import { Music, Star, Award, Users } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Button } from '@/components/ui/button';

// Import placeholder images
import heroLiveMusic from '@/assets/hero-live-music.jpg';
import heroEvents from '@/assets/hero-events.jpg';
import heroInstrumentalists from '@/assets/hero-instrumentalists.jpg';
import heroCelebrity from '@/assets/hero-celebrity.jpg';
import heroOpenmic from '@/assets/hero-openmic.jpg';
import heroKaraoke from '@/assets/hero-karaoke.jpg';

const featuredArtists = [
  {
    id: 1,
    name: 'Rahul Sharma',
    category: 'Vocalist',
    genre: 'Bollywood & Classical',
    image: heroLiveMusic,
    bio: 'Award-winning vocalist with 15+ years of experience. Specializes in Bollywood hits and classical fusion.',
    performances: '500+',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'The Groove Collective',
    category: 'Band',
    genre: 'Rock & Pop',
    image: heroEvents,
    bio: 'High-energy band known for electrifying performances. Perfect for corporate events and weddings.',
    performances: '300+',
    rating: 4.8,
  },
  {
    id: 3,
    name: 'DJ Arjun',
    category: 'DJ',
    genre: 'EDM & Bollywood',
    image: heroInstrumentalists,
    bio: 'Top-rated DJ specializing in EDM and Bollywood remixes. Known for reading the crowd perfectly.',
    performances: '400+',
    rating: 4.9,
  },
  {
    id: 4,
    name: 'Priya Mehta',
    category: 'Celebrity Singer',
    genre: 'Playback & Live',
    image: heroCelebrity,
    bio: 'Renowned playback singer with multiple hit songs. Available for exclusive performances.',
    performances: '200+',
    rating: 5.0,
  },
  {
    id: 5,
    name: 'Tabla Maestro Vikram',
    category: 'Instrumentalist',
    genre: 'Classical & Fusion',
    image: heroOpenmic,
    bio: 'Master tabla player trained in classical tradition. Creates magical fusion performances.',
    performances: '600+',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Amit Kumar',
    category: 'Comedian',
    genre: 'Stand-up Comedy',
    image: heroKaraoke,
    bio: 'Popular stand-up comedian with sharp wit and clean humor. Perfect for corporate events.',
    performances: '250+',
    rating: 4.7,
  },
];

const artistCategories = [
  {
    title: 'Vocalists',
    count: '50+',
    description: 'Trained singers across genres from classical to contemporary',
  },
  {
    title: 'Bands',
    count: '30+',
    description: 'Professional bands for rock, pop, jazz, and fusion performances',
  },
  {
    title: 'DJs',
    count: '25+',
    description: 'Top DJs specializing in EDM, Bollywood, and commercial music',
  },
  {
    title: 'Instrumentalists',
    count: '40+',
    description: 'Skilled musicians playing traditional and western instruments',
  },
  {
    title: 'Celebrities',
    count: '100+',
    description: 'Network of Bollywood singers, actors, and famous personalities',
  },
  {
    title: 'Comedians',
    count: '20+',
    description: 'Stand-up comedians for corporate and private events',
  },
];

const features = [
  { icon: Star, title: 'Verified Artists', description: 'Every artist is personally vetted for quality and professionalism' },
  { icon: Award, title: 'Experienced Performers', description: 'Artists with proven track records and extensive stage experience' },
  { icon: Users, title: 'Pan-India Network', description: 'Access to talent from across the country for any location' },
  { icon: Music, title: 'All Genres', description: 'From classical to contemporary, we cover every musical genre' },
];

const Artists = () => {
  return (
    <PageLayout>
      <PageHero 
        title="Our Artists"
        subtitle="A curated network of India's finest entertainers and performers"
      />

      {/* Artist Categories */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
              Our Network
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Artist Categories
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center group hover:border-gold/30 transition-all duration-500"
              >
                <span className="font-display text-4xl font-bold text-gold-light block mb-2">
                  {category.count}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                <p className="text-body text-sm">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artists Catalogue */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
              Featured Talent
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Meet Our Artists
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtists.map((artist, index) => (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] cursor-pointer"
              >
                {/* Artist Image */}
                <img 
                  src={artist.image} 
                  alt={artist.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
                
                {/* Artist Info - Always Visible */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs uppercase tracking-luxury text-gold-light">
                      {artist.category}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-gold fill-gold" />
                      <span className="text-xs text-foreground">{artist.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-foreground mb-1">
                    {artist.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {artist.genre}
                  </p>

                  {/* Hover Content */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <p className="text-sm text-body mb-4 line-clamp-3">
                      {artist.bio}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-semibold text-gold-light">{artist.performances}</span> Performances
                      </div>
                      
                      <Button variant="hero" size="sm">
                        Book Now
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="px-3 py-1 bg-gold/20 backdrop-blur-sm rounded-full border border-gold/30">
                    <span className="text-xs font-semibold text-gold-light">Available</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View More Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button variant="hero" size="lg">
              View Full Artist Roster
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Why Our Artists */}
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
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Goonj Difference
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={28} className="text-gold-light" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-body text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book an Artist */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
                Book Now
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Looking for the Perfect Artist?
              </h2>
              <p className="text-body mb-6">
                Tell us about your event and we'll recommend the ideal artists from our 
                extensive network. Whether you need a solo performer or a full band, 
                we'll find the perfect match for your occasion.
              </p>
              <p className="text-body">
                Our team handles everything from artist selection to coordination, 
                ensuring a seamless experience for you and a stellar performance for your guests.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <InquiryForm serviceType="Artist Booking" />
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Artists;
