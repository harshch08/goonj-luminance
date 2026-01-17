import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Play, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Using placeholder images - you can replace these with actual artist images
import heroLiveMusic from '@/assets/hero-live-music.jpg';
import heroEvents from '@/assets/hero-events.jpg';
import heroCelebrity from '@/assets/hero-celebrity.jpg';

const topArtists = [
  {
    id: 1,
    name: 'Badshah',
    genre: 'Hip-Hop & Rap',
    image: '/badshah.png',
    followers: '15M+',
    rating: 4.9,
    description: 'Chart-topping rapper and music producer known for his energetic performances and hit tracks.',
    achievements: ['Multiple Platinum Albums', 'Bollywood Collaborations', 'International Tours'],
  },
  {
    id: 2,
    name: 'Paradox',
    genre: 'Electronic & EDM',
    image: '/paradox.png',
    followers: '8M+',
    rating: 4.8,
    description: 'Innovative electronic music artist creating immersive soundscapes and unforgettable live experiences.',
    achievements: ['Festival Headliner', 'Award-Winning Producer', 'Global Recognition'],
  },
  {
    id: 3,
    name: 'MC Square',
    genre: 'Hip-Hop & Freestyle',
    image: '/mcsquare.png',
    followers: '12M+',
    rating: 4.9,
    description: 'Dynamic freestyle rapper and performer bringing raw energy and authentic street culture to the stage.',
    achievements: ['MTV Hustle Winner', 'Viral Performances', 'Youth Icon'],
  },
];

export const TopArtistsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const handleBookArtist = (artistName: string) => {
    window.open(`https://wa.me/919897642145?text=Hi%20Goonj%20Entertainment!%20I%20would%20like%20to%20book%20${artistName}%20for%20my%20event.`, '_blank');
  };

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gold/20 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-4">
            Featured Talent
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Top Artists at Your Service
          </h2>
          <div className="section-divider mb-8" />
          <p className="text-body text-lg max-w-2xl mx-auto">
            Book India's most celebrated artists for your next event. From chart-toppers to underground legends.
          </p>
        </motion.div>

        {/* Artists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {topArtists.map((artist, index) => (
            <motion.div
              key={artist.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              {/* Artist Card */}
              <div className="glass-card overflow-hidden hover:shadow-elegant transition-all duration-500 group-hover:scale-[1.02]">
                {/* Artist Image */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={artist.image} 
                    alt={artist.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 rounded-full bg-gold/20 backdrop-blur-sm border border-gold/30 flex items-center justify-center">
                      <Play size={24} className="text-gold ml-1" />
                    </div>
                  </div>

                  {/* Top Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 bg-gold/20 backdrop-blur-sm rounded-full border border-gold/30">
                      <span className="text-xs font-semibold text-gold-light">Featured</span>
                    </div>
                  </div>
                </div>

                {/* Artist Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs uppercase tracking-luxury text-gold-light">
                      {artist.genre}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-gold fill-gold" />
                      <span className="text-sm text-foreground font-medium">{artist.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                    {artist.name}
                  </h3>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <Users size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{artist.followers} Followers</span>
                  </div>

                  <p className="text-sm text-body mb-4 line-clamp-3">
                    {artist.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-xs uppercase tracking-luxury text-foreground mb-2">Achievements</h4>
                    <ul className="space-y-1">
                      {artist.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-gold" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Book Button */}
                  <Button 
                    onClick={() => handleBookArtist(artist.name)}
                    variant="gold" 
                    className="w-full group-hover:shadow-glow transition-all duration-300"
                  >
                    Book {artist.name}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-body mb-6">
            Looking for a specific artist or custom performance?
          </p>
          <Button 
            variant="hero" 
            size="lg"
            onClick={() => window.open('https://wa.me/919897642145?text=Hi%20Goonj%20Entertainment!%20I%20need%20help%20finding%20the%20perfect%20artist%20for%20my%20event.', '_blank')}
          >
            Request Custom Booking
          </Button>
        </motion.div>
      </div>
    </section>
  );
};