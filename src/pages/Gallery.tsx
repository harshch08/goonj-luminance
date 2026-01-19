import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';
import type { GalleryItem } from '@/types/instagram.types';

import heroLiveMusic from '@/assets/hero-live-music.jpg';
import heroEvents from '@/assets/hero-events.jpg';
import heroInstrumentalists from '@/assets/hero-instrumentalists.jpg';
import heroCelebrity from '@/assets/hero-celebrity.jpg';
import heroOpenmic from '@/assets/hero-openmic.jpg';
import heroKaraoke from '@/assets/hero-karaoke.jpg';
import heroWedding from '@/assets/hero-wedding.jpg';

/**
 * Auto-load all local gallery images from categorised folders.
 *
 * Recommended folder structure (you can change categories just by changing folder names):
 * - src/assets/bandhan/gallery/wedding/...
 * - src/assets/bandhan/gallery/corporate/...
 * - src/assets/bandhan/gallery/fashion/...
 * - etc.
 *
 * Adding/removing an image file in any subfolder will automatically
 * update the gallery on next dev/build run – no code changes needed.
 */
const localImageModules = import.meta.glob<true, string, string>(
  '@/assets/bandhan/gallery/**/*.{jpg,jpeg,png,webp,avif}',
  {
    eager: true,
    import: 'default',
  }
);

const formatFromSlug = (slug: string) =>
  slug
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());

const buildLocalGalleryItems = (): GalleryItem[] => {
  const items: GalleryItem[] = [];

  Object.entries(localImageModules).forEach(([path, src], index) => {
    // Example paths:
    // - /src/assets/bandhan/gallery/wedding/haldi-ceremony-1.jpg
    // - /src/assets/bandhan/gallery/wedding-1.jpg
    const folderMatch = path.match(/gallery[\\/](.+)[\\/](.+)\.(jpg|jpeg|png|webp|avif)$/i);

    let category: string;
    let rawName: string;

    if (folderMatch) {
      // Use folder name as category when image is inside a subfolder.
      category = formatFromSlug(folderMatch[1]);
      rawName = folderMatch[2];
    } else {
      const fileName = path.split(/[\\/]/).pop() || 'Image';
      const basename = fileName.replace(/\.(jpg|jpeg|png|webp|avif)$/i, '');

      // Derive category from prefix before first "-" (e.g. "wedding-1" → "Wedding").
      const [prefix, ...rest] = basename.split('-');
      category = formatFromSlug(prefix || 'Gallery');
      rawName = rest.length > 0 ? rest.join('-') : basename;
    }

    const title = formatFromSlug(rawName || category);

    items.push({
      id: path || index,
      image: src as unknown as string,
      category,
      title,
      source: 'local',
    });
  });

  // Fallback: if you have no files in the gallery folders yet,
  // we still show a few hero images so the page isn't empty.
  if (items.length === 0) {
    return [
      { id: 'hero-1', image: heroLiveMusic, category: 'Live Music', title: 'Rock Concert Night', source: 'local' },
      { id: 'hero-2', image: heroEvents, category: 'Events', title: 'Corporate Gala', source: 'local' },
      { id: 'hero-3', image: heroInstrumentalists, category: 'Instrumentalists', title: 'Classical Evening', source: 'local' },
      { id: 'hero-4', image: heroCelebrity, category: 'Celebrity', title: 'Star Performance', source: 'local' },
      { id: 'hero-5', image: heroOpenmic, category: 'Open Mic', title: 'Talent Night', source: 'local' },
      { id: 'hero-6', image: heroKaraoke, category: 'Karaoke', title: 'Fun Friday', source: 'local' },
      { id: 'hero-7', image: heroWedding, category: 'Wedding', title: 'Sangeet Celebration', source: 'local' },
    ];
  }

  return items;
};

const localGalleryItems: GalleryItem[] = buildLocalGalleryItems();

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | string | null>(null);

  // Merge local and Instagram items
  const allGalleryItems = useMemo(() => {
    return [...localGalleryItems];
  }, []);

  // Get all unique categories
  const categories = useMemo(() => {
    const cats = new Set(localGalleryItems.map(item => item.category));
    return ['All', ...Array.from(cats)];
  }, []);

  // Filter items by category and tags
  const filteredItems = useMemo(() => {
    const items = selectedCategory === 'All' 
      ? allGalleryItems 
      : allGalleryItems.filter(item => item.category === selectedCategory);
    return items;
  }, [allGalleryItems, selectedCategory]);

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
          <div className="flex gap-2 justify-start sm:justify-center mb-6 overflow-x-auto no-scrollbar py-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`shrink-0 px-4 py-2 text-xs uppercase tracking-luxury rounded-full transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gold/20 text-gold-light border border-gold/50'
                    : 'text-muted-foreground hover:text-foreground border border-transparent hover:border-border/50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Grid - Pinterest Style Masonry */}
      <section className="py-10 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <motion.div 
            layout
            // Pinterest-style masonry: 2 columns on mobile, then scales up.
            className="columns-2 sm:columns-3 lg:columns-4 2xl:columns-5"
            style={{ columnGap: '0.5rem' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                  className="break-inside-avoid mb-2 group relative rounded-lg overflow-hidden cursor-pointer bg-card shadow-sm hover:shadow-xl transition-all duration-300 w-full"
                  onClick={() => setSelectedImage(item.id)}
                >
                  <div className="relative w-full overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105 block"
                      loading="lazy"
                      decoding="async"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Category badge */}
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">
                      <span className="px-2.5 py-1 md:px-3 text-[10px] md:text-xs font-medium uppercase tracking-wider bg-background/90 backdrop-blur-sm text-gold-light rounded-full border border-gold/30">
                        {item.category}
                      </span>
                    </div>
                    
                    {/* Title overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 translate-y-0 md:translate-y-full md:group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="font-display text-sm md:text-lg font-semibold text-foreground leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-16 text-muted-foreground">
              <p>No images found in this category.</p>
            </div>
          )}
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
                loading="lazy"
                decoding="async"
                className="max-w-full max-h-[70vh] object-contain rounded-lg"
              />
              <div className="text-center mt-4">
                <span className="text-xs uppercase tracking-luxury text-gold-light block mb-1">
                  {selectedItem.category}
                </span>
                <h3 className="font-display text-xl text-foreground">{selectedItem.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageLayout>
  );
};

export default Gallery;
