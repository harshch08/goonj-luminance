import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Instagram as InstagramIcon, ExternalLink } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';
import { TagFilter } from '@/components/gallery/TagFilter';
import { useInstagramMedia } from '@/hooks/useInstagramMedia';
import { extractTitle } from '@/lib/instagram.utils';
import type { GalleryItem } from '@/types/instagram.types';

import heroLiveMusic from '@/assets/hero-live-music.jpg';
import heroEvents from '@/assets/hero-events.jpg';
import heroInstrumentalists from '@/assets/hero-instrumentalists.jpg';
import heroCelebrity from '@/assets/hero-celebrity.jpg';
import heroOpenmic from '@/assets/hero-openmic.jpg';
import heroKaraoke from '@/assets/hero-karaoke.jpg';
import heroWedding from '@/assets/hero-wedding.jpg';

const localGalleryItems: GalleryItem[] = [
  { id: 1, image: heroLiveMusic, category: 'Live Music', title: 'Rock Concert Night', source: 'local' },
  { id: 2, image: heroEvents, category: 'Events', title: 'Corporate Gala', source: 'local' },
  { id: 3, image: heroInstrumentalists, category: 'Instrumentalists', title: 'Classical Evening', source: 'local' },
  { id: 4, image: heroCelebrity, category: 'Celebrity', title: 'Star Performance', source: 'local' },
  { id: 5, image: heroOpenmic, category: 'Open Mic', title: 'Talent Night', source: 'local' },
  { id: 6, image: heroKaraoke, category: 'Karaoke', title: 'Fun Friday', source: 'local' },
  { id: 7, image: heroWedding, category: 'Wedding', title: 'Sangeet Celebration', source: 'local' },
  { id: 8, image: heroLiveMusic, category: 'Live Music', title: 'Jazz Evening', source: 'local' },
  { id: 9, image: heroEvents, category: 'Events', title: 'Product Launch', source: 'local' },
];

const categories = ['All', 'Live Music', 'Events', 'Instrumentalists', 'Celebrity', 'Open Mic', 'Karaoke', 'Wedding'];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const { media: instagramMedia, allTags, isLoading, error } = useInstagramMedia();

  // Transform Instagram media to GalleryItem format
  const instagramGalleryItems: GalleryItem[] = useMemo(() => {
    return instagramMedia.map(item => ({
      id: item.id,
      image: item.mediaUrl,
      category: 'Instagram',
      title: extractTitle(item.caption) || 'Instagram Post',
      source: 'instagram' as const,
      tags: item.tags,
      permalink: item.permalink,
    }));
  }, [instagramMedia]);

  // Merge local and Instagram items
  const allGalleryItems = useMemo(() => {
    return [...localGalleryItems, ...instagramGalleryItems];
  }, [instagramGalleryItems]);

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set(localGalleryItems.map(item => item.category));
    if (instagramGalleryItems.length > 0) {
      cats.add('Instagram');
    }
    return ['All', ...Array.from(cats)];
  }, [instagramGalleryItems]);

  // Calculate tag counts
  const tagCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    allGalleryItems.forEach(item => {
      if (item.tags) {
        item.tags.forEach(tag => {
          counts[tag] = (counts[tag] || 0) + 1;
        });
      }
    });
    return counts;
  }, [allGalleryItems]);

  // Filter items by category and tags
  const filteredItems = useMemo(() => {
    let items = selectedCategory === 'All' 
      ? allGalleryItems 
      : allGalleryItems.filter(item => item.category === selectedCategory);

    if (selectedTags.length > 0) {
      items = items.filter(item => 
        item.tags && item.tags.some(tag => selectedTags.includes(tag))
      );
    }

    return items;
  }, [allGalleryItems, selectedCategory, selectedTags]);

  const handlePrev = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
    const prevIndex = currentIndex === 0 ? filteredItems.length - 1 : currentIndex - 1;
    setSelectedImage(filteredItems[prevIndex].id);
  };

  const handleNext = () => {
    if (selectedImage === null) return;
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage);
    const nextIndex = currentIndex === filteredItems.length - 1 ? 0 : currentIndex + 1;
    setSelectedImage(filteredItems[nextIndex].id);
  };

  const selectedItem = allGalleryItems.find(item => item.id === selectedImage);

  return (
    <PageLayout>
      <PageHero 
        title="Gallery"
        subtitle="A glimpse into the magical moments we've created"
      />

      {/* Category Filter */}
      <section className="py-8 border-b border-border/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 text-xs uppercase tracking-luxury rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gold/20 text-gold-light border border-gold/50'
                    : 'text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Tag Filter */}
          {allTags.length > 0 && (
            <div className="flex justify-center">
              <TagFilter
                tags={allTags}
                selectedTags={selectedTags}
                onTagsChange={setSelectedTags}
                tagCounts={tagCounts}
              />
            </div>
          )}
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-6 lg:px-12">
          {isLoading && instagramGalleryItems.length === 0 && (
            <div className="text-center text-muted-foreground mb-8">
              Loading Instagram images...
            </div>
          )}

          {error && (
            <div className="text-center text-destructive mb-8 text-sm">
              Unable to load Instagram content. Showing local gallery only.
            </div>
          )}

          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  
                  {/* Instagram Badge */}
                  {item.source === 'instagram' && (
                    <div className="absolute top-3 right-3 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1.5 rounded-full">
                      <InstagramIcon className="w-4 h-4 text-white" />
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs uppercase tracking-luxury text-gold-light block mb-1">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg text-foreground">{item.title}</h3>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <X size={32} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 lg:left-8 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <ChevronLeft size={40} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 lg:right-8 text-muted-foreground hover:text-foreground transition-colors z-10"
            >
              <ChevronRight size={40} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="max-w-5xl max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedItem.image} 
                alt={selectedItem.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <span className="text-xs uppercase tracking-luxury text-gold-light block mb-1">
                  {selectedItem.category}
                </span>
                <h3 className="font-display text-xl text-foreground">{selectedItem.title}</h3>
                {selectedItem.source === 'instagram' && selectedItem.permalink && (
                  <a
                    href={selectedItem.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-sm text-gold-light hover:text-gold transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <InstagramIcon size={16} />
                    View on Instagram
                    <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Gallery;
