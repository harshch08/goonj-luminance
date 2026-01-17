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
    name: 'Khullar G',
    category: 'Singer & Rapper',
    genre: 'Punjabi Rapper & Singer',
    image: heroLiveMusic,
    bio: 'Dynamic Punjabi rapper and singer known for his energetic performances and contemporary style. Brings the perfect blend of traditional Punjabi music with modern rap elements.',
    performances: '200+',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Kamakshi',
    category: 'Singer',
    genre: 'Bollywood & Punjabi',
    image: heroEvents,
    bio: 'Versatile vocalist specializing in Bollywood and Punjabi music. Known for her soulful voice and captivating stage presence that mesmerizes audiences.',
    performances: '300+',
    rating: 4.9,
  },
  {
    id: 3,
    name: 'Ananya Mishra',
    category: 'Singer & Performer',
    genre: 'Multi-Genre Performer',
    image: heroInstrumentalists,
    bio: 'Talented singer and performer leading a 4-artist ensemble. Delivers powerful performances across multiple genres with exceptional vocal range and stage charisma.',
    performances: '250+',
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Priyanka Mehar',
    category: 'Singer',
    genre: 'Folk & Bollywood',
    image: heroCelebrity,
    bio: 'Accomplished folk and Bollywood singer with deep roots in traditional Indian music. Her performances beautifully blend classical folk traditions with contemporary Bollywood hits.',
    performances: '350+',
    rating: 4.8,
  },
  {
    id: 5,
    name: 'Sid K',
    category: 'Singer',
    genre: 'Punjabi & Bollywood',
    image: heroOpenmic,
    bio: 'Popular Punjabi and Bollywood singer known for his versatile voice and crowd-pleasing performances. Brings high energy and authentic musical experience to every event.',
    performances: '400+',
    rating: 4.9,
  },
  {
    id: 6,
    name: 'Vijay Jammer',
    category: 'Singer',
    genre: 'Sufi & Bollywood',
    image: heroKaraoke,
    bio: 'Soulful Sufi and Bollywood singer with a mesmerizing voice that touches hearts. Specializes in creating intimate, spiritual musical experiences through his performances.',
    performances: '300+',
    rating: 4.8,
  },
  {
    id: 7,
    name: 'Yashraj',
    category: 'Rapper',
    genre: 'Hip-Hop & Rap',
    image: heroLiveMusic,
    bio: 'Rising star in the Indian rap scene known for his lyrical prowess and dynamic stage presence. Delivers high-energy performances that resonate with young audiences.',
    performances: '150+',
    rating: 4.7,
  },
  {
    id: 8,
    name: 'Khushboo Grewal',
    category: 'Singer',
    genre: 'Bollywood Singer',
    image: heroEvents,
    bio: 'Renowned Bollywood playback singer with numerous hit songs to her credit. Her melodious voice and professional stage presence make her a favorite for premium events.',
    performances: '500+',
    rating: 4.9,
  },
  {
    id: 9,
    name: 'Sandeep Batraa',
    category: 'Singer & Performer',
    genre: 'Bollywood Singer & Performer',
    image: heroInstrumentalists,
    bio: 'Versatile Bollywood singer and performer with extensive experience in live entertainment. Known for his engaging performances and ability to connect with diverse audiences.',
    performances: '600+',
    rating: 4.8,
  },
  {
    id: 10,
    name: 'Charu Semwal',
    category: 'Singer & Performer',
    genre: 'Bollywood Singer & Performer',
    image: heroCelebrity,
    bio: 'Accomplished Bollywood singer and performer available both as solo artist and with ensemble. Delivers captivating performances with professional excellence.',
    performances: '450+',
    rating: 4.9,
  },
  {
    id: 11,
    name: 'Jyotica Tangri',
    category: 'Playback Singer',
    genre: 'Bollywood Singer',
    image: heroOpenmic,
    bio: 'Popular Bollywood playback singer known for hit songs in major films. Her powerful voice and stage charisma make her performances unforgettable experiences.',
    performances: '300+',
    rating: 5.0,
  },
  {
    id: 12,
    name: 'Usha Uthup',
    category: 'Legendary Singer',
    genre: 'Traditional Indian Melodies',
    image: heroKaraoke,
    bio: 'Iconic Indian singer and cultural legend known for her distinctive voice and timeless melodies. A true treasure of Indian music with decades of memorable performances.',
    performances: '1000+',
    rating: 5.0,
  },
  {
    id: 13,
    name: 'Paradox',
    category: 'Music Group',
    genre: 'Bollywood Mix',
    image: heroLiveMusic,
    bio: 'Dynamic music group specializing in Bollywood remixes and contemporary sounds. Known for their innovative approach to popular music and electrifying live performances.',
    performances: '200+',
    rating: 4.8,
  },
  {
    id: 14,
    name: 'MC Square',
    category: 'Rapper',
    genre: 'Hip-Hop Rapper',
    image: heroEvents,
    bio: 'Rising hip-hop sensation and winner of MTV Hustle. Known for his unique style, powerful lyrics, and ability to energize crowds with his dynamic rap performances.',
    performances: '100+',
    rating: 4.9,
  },
  {
    id: 15,
    name: 'Shaarib & Toshi',
    category: 'Music Directors',
    genre: 'Bollywood Music Directors & Performers',
    image: heroInstrumentalists,
    bio: 'Acclaimed Bollywood music director duo known for composing hit songs for major films. Available as 2-artist or 4-artist ensemble for exclusive performances.',
    performances: '150+',
    rating: 5.0,
  },
  {
    id: 16,
    name: 'Badshah',
    category: 'Celebrity Artist',
    genre: 'Bollywood Singer & Punjabi Rapper',
    image: heroCelebrity,
    bio: 'Bollywood superstar and one of India\'s most popular rappers. Known for chart-topping hits and electrifying performances that guarantee unforgettable entertainment experiences.',
    performances: '500+',
    rating: 5.0,
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
