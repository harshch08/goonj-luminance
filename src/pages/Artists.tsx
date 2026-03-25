import { motion } from 'framer-motion';
import { Music, Star, Award, Users } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Button } from '@/components/ui/button';
import { BookingModal } from '@/components/modals/BookingModal';
import { ArtistCard, type Artist, LiveArtistCard, type LiveArtist } from '@/components/artists';
import { LikeErrorBoundary, LikeToastProvider, LikeSystemStatus } from '@/components/likes';
import { useBulkLikes } from '@/hooks';
import { useLiveArtists } from '@/hooks/useLiveArtists';
import { useFeaturedArtists } from '@/hooks/useFeaturedArtists';
import { useState, useEffect, useRef } from 'react';

const artistCategories = [
  {
    title: 'Vocalists',
    count: '10+',
    description: 'Trained singers across genres from classical to contemporary',
  },
  {
    title: 'Bands',
    count: '10+',
    description: 'Professional bands for rock, pop, jazz, and fusion performances',
  },
  {
    title: 'DJs',
    count: '10+',
    description: 'Top DJs specializing in EDM, Bollywood, and commercial music',
  },
  {
    title: 'Instrumentalists',
    count: '10+',
    description: 'Skilled musicians playing traditional and western instruments',
  },
  {
    title: 'Celebrities',
    count: '25+',
    description: 'Network of Bollywood singers, actors, and famous personalities',
  },
  {
    title: 'Comedians',
    count: '10+',
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
  const [bookingModal, setBookingModal] = useState({
    isOpen: false,
    artistName: '',
    artistCategory: '',
    artistGenre: '',
    artistRating: 0
  });

  const artistRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [openModalArtistId, setOpenModalArtistId] = useState<number | null>(null);

  const { liveMusicArtists } = useLiveArtists();
  const { featuredArtists } = useFeaturedArtists();

  // All live music artists come from DB already sorted — no need to split
  const duoArtists: LiveArtist[] = [];
  const soloLiveArtists: LiveArtist[] = liveMusicArtists;

  // Bulk likes management for better performance
  const {
    artistsData,
    isLoading: bulkLoading,
    error: bulkError,
    loadArtists,
    getArtistData,
    clearError
  } = useBulkLikes({
    enableCache: true,
    autoRefresh: false
  });

  // Load all artist like data when component mounts (including live music artists)
  useEffect(() => {
    const allArtists = [...featuredArtists, ...liveMusicArtists, ...duoArtists];
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
  }, [loadArtists]);

  // Handle scroll to artist when URL has hash
  useEffect(() => {
    const handleScrollToArtist = () => {
      const hash = window.location.hash
      if (hash.startsWith('#artist-')) {
        const artistId = parseInt(hash.replace('#artist-', ''))
        
        // Wait for DOM to be ready
        setTimeout(() => {
          const artistElement = artistRefs.current[artistId]
          if (artistElement) {
            // Scroll to the artist with smooth behavior and offset for header
            const yOffset = -100 // Offset for fixed header
            const y = artistElement.getBoundingClientRect().top + window.pageYOffset + yOffset
            
            window.scrollTo({ top: y, behavior: 'smooth' })
            
            // Open the modal for this artist
            setOpenModalArtistId(artistId)
            
            // Add a highlight effect (will be visible when modal closes)
            artistElement.classList.add('ring-2', 'ring-gold', 'ring-offset-2', 'ring-offset-background')
            setTimeout(() => {
              artistElement.classList.remove('ring-2', 'ring-gold', 'ring-offset-2', 'ring-offset-background')
            }, 3000)
          }
        }, 500) // Delay to ensure content is rendered
      }
    }

    // Handle on mount and on hash change
    handleScrollToArtist()
    window.addEventListener('hashchange', handleScrollToArtist)
    
    return () => {
      window.removeEventListener('hashchange', handleScrollToArtist)
    }
  }, []);

  const closeBookingModal = () => {
    setBookingModal({
      isOpen: false,
      artistName: '',
      artistCategory: '',
      artistGenre: '',
      artistRating: 0
    });
  };

  return (
    <LikeToastProvider>
      <PageLayout>
        <PageHero 
          title="Our Artists"
          subtitle="A curated network of India's finest entertainers and performers"
          backgroundImage="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1920&h=1080&fit=crop"
        />

        {/* Like System Status */}
        <LikeSystemStatus
          hasError={!!bulkError}
          isLoading={bulkLoading}
          errorMessage={bulkError || undefined}
          onRetry={() => {
            clearError()
            const allArtists = [...featuredArtists, ...liveMusicArtists];
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
          }}
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

        {/* Live Music Performers Section */}
        <LikeErrorBoundary
          onError={(error, errorInfo) => {
            console.error('Live music artist like system error:', error, errorInfo)
          }}
        >
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
                  Live Entertainment
                </span>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Live Music Performers
                </h2>
                <div className="section-divider" />
                <p className="text-body mt-6 max-w-2xl mx-auto">
                  Experience the magic of live music with our talented performers, perfect for intimate gatherings and elegant events.
                </p>
              </motion.div>

              {/* Error State */}
              {bulkError && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
                >
                  <p className="text-red-400 text-sm mb-2">
                    Failed to load like counts. Artists are still available for booking.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      clearError()
                      const allArtists = [...featuredArtists, ...liveMusicArtists, ...duoArtists];
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
                    }}
                  >
                    Retry Loading Likes
                  </Button>
                </motion.div>
              )}

              {/* All Live Music Performers */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {liveMusicArtists.map((artist, index) => (
                  <div
                    key={artist.id}
                    ref={(el) => { artistRefs.current[artist.id] = el }}
                    className="transition-all duration-300"
                  >
                    <LiveArtistCard
                      artist={artist}
                      index={index}
                      bulkData={getArtistData(artist.id)}
                      isLoading={bulkLoading}
                      variant="solo"
                      forceOpenModal={openModalArtistId === artist.id}
                      onModalClose={() => setOpenModalArtistId(null)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </LikeErrorBoundary>

        {/* Featured Artists Catalogue */}
        <LikeErrorBoundary
          onError={(error, errorInfo) => {
            console.error('Artist like system error:', error, errorInfo)
          }}
        >
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

              {/* Error State */}
              {bulkError && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-center"
                >
                  <p className="text-red-400 text-sm mb-2">
                    Failed to load like counts. Artists are still available for booking.
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      clearError()
                      const allArtists = [...featuredArtists, ...liveMusicArtists];
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
                    }}
                  >
                    Retry Loading Likes
                  </Button>
                </motion.div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {featuredArtists.map((artist, index) => (
                  <ArtistCard
                    key={artist.id}
                    artist={artist}
                    index={index}
                    bulkData={getArtistData(artist.id)}
                    isLoading={bulkLoading}
                    onBookingClick={(artist) => {
                      setBookingModal({
                        isOpen: true,
                        artistName: artist.name,
                        artistCategory: artist.category,
                        artistGenre: artist.genre,
                        artistRating: artist.rating
                      })
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        </LikeErrorBoundary>

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

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center p-4 sm:p-6"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <feature.icon size={20} className="text-gold-light sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="font-display text-sm sm:text-lg font-semibold text-foreground mb-1 sm:mb-2 leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-body text-xs sm:text-sm leading-relaxed">{feature.description}</p>
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
                <p className="text-body mb-6 text-justify sm:text-left">
                  Tell us about your event and we'll recommend the ideal artists from our 
                  extensive network. Whether you need a solo performer or a full band, 
                  we'll find the perfect match for your occasion.
                </p>
                <p className="text-body text-justify sm:text-left">
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
        
        {/* Booking Modal */}
        <BookingModal
          isOpen={bookingModal.isOpen}
          onClose={closeBookingModal}
          artistName={bookingModal.artistName}
          artistCategory={bookingModal.artistCategory}
          artistGenre={bookingModal.artistGenre}
          artistRating={bookingModal.artistRating}
        />
      </PageLayout>
    </LikeToastProvider>
  );
};

export default Artists;
