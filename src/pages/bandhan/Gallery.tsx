import { useState, useMemo } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import BandhanPageTransition from '@/components/bandhan/BandhanPageTransition';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import '@/components/bandhan/bandhan-theme.css';

interface GalleryImage {
  src: string;
  category: string;
  title: string;
}

const allImages: GalleryImage[] = [
  // Wedding
  { src: '/gallery/Wedding/baloon-concept.png', category: 'Wedding', title: 'Balloon Concept' },
  { src: '/gallery/Wedding/destination-wedding-floral-decor.png', category: 'Wedding', title: 'Floral Decor' },
  { src: '/gallery/Wedding/destination-wedding-riverside.png', category: 'Wedding', title: 'Riverside Wedding' },
  { src: '/gallery/Wedding/evening-decor-concept.png', category: 'Wedding', title: 'Evening Decor' },
  { src: '/gallery/Wedding/haldi-concept.png', category: 'Wedding', title: 'Haldi Concept' },
  { src: '/gallery/Wedding/sangeet-decor.png', category: 'Wedding', title: 'Sangeet Decor' },
  { src: '/gallery/Wedding/wedding-decor-2.jpg', category: 'Wedding', title: 'Wedding Decor' },
  { src: '/gallery/Wedding/wedding-riverside-concept.jpg', category: 'Wedding', title: 'Riverside Concept' },
  // Destination Wedding
  { src: '/gallery/Destination-Wedding/Destination-wedding-rishikesh.png', category: 'Destination Wedding', title: 'Rishikesh Wedding' },
  { src: '/gallery/Destination-Wedding/destination-wedding-rishikesh-design.png', category: 'Destination Wedding', title: 'Rishikesh Design' },
  { src: '/gallery/Destination-Wedding/destination-wedding-vermala.png', category: 'Destination Wedding', title: 'Vermala Ceremony' },
  { src: '/gallery/Destination-Wedding/wedding-mandap-design.png', category: 'Destination Wedding', title: 'Mandap Design' },
  { src: '/gallery/Destination-Wedding/wedding-outside.png', category: 'Destination Wedding', title: 'Outdoor Wedding' },
  { src: '/gallery/Destination-Wedding/wedding-resort-corbett.png', category: 'Destination Wedding', title: 'Corbett Resort' },
  { src: '/gallery/Destination-Wedding/wedding-rishikesh.png', category: 'Destination Wedding', title: 'Rishikesh Ceremony' },
  // Photography & Videography
  { src: '/gallery/Photography&Videography/Couple-1.png', category: 'Photography', title: 'Couple Portrait' },
  { src: '/gallery/Photography&Videography/Couple-2.png', category: 'Photography', title: 'Couple Shoot' },
  { src: '/gallery/Photography&Videography/Couple-3.png', category: 'Photography', title: 'Couple Moments' },
  { src: '/gallery/Photography&Videography/Mandap-2.png', category: 'Photography', title: 'Mandap Shot' },
  { src: '/gallery/Photography&Videography/Mandap-couple.png', category: 'Photography', title: 'Mandap Couple' },
  { src: '/gallery/Photography&Videography/Mandap.png', category: 'Photography', title: 'Mandap' },
  // Concert
  { src: '/gallery/Concert/Fest.png', category: 'Concert', title: 'Fest' },
  { src: '/gallery/Concert/University-fest..png', category: 'Concert', title: 'University Fest' },
  { src: '/gallery/Concert/University-fest.png', category: 'Concert', title: 'University Fest' },
  // Corporate
  { src: '/gallery/Corporate/corporate-1.jpg', category: 'Corporate', title: 'Corporate Event' },
  { src: '/gallery/Corporate/corporate-2.jpg', category: 'Corporate', title: 'Corporate Gala' },
  { src: '/gallery/Corporate/corporate-3.jpg', category: 'Corporate', title: 'Corporate Setup' },
  // Fashion
  { src: '/gallery/Fashion/fashion-1.jpg', category: 'Fashion', title: 'Fashion Show' },
  { src: '/gallery/Fashion/fashion-2.jpg', category: 'Fashion', title: 'Fashion Event' },
  { src: '/gallery/Fashion/fashion-3.jpg', category: 'Fashion', title: 'Fashion Showcase' },
  // Fest
  { src: '/gallery/Fest/Fest-design-2.png', category: 'Fest', title: 'Fest Design' },
  { src: '/gallery/Fest/Fest-design.png', category: 'Fest', title: 'Fest Setup' },
  // Live Music
  { src: '/gallery/Live Music/Concert.png', category: 'Live Music', title: 'Concert Night' },
  { src: '/gallery/Live Music/live-band.png', category: 'Live Music', title: 'Live Band' },
  { src: '/gallery/Live Music/live-duet.png', category: 'Live Music', title: 'Live Duet' },
];

const categories = ['All', ...Array.from(new Set(allImages.map(i => i.category)))];

const BandhanGallery = () => {
  const [active, setActive] = useState('All');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = useMemo(() =>
    active === 'All' ? allImages : allImages.filter(i => i.category === active),
    [active]
  );

  const prev = () => setLightbox(i => i === null ? null : (i - 1 + filtered.length) % filtered.length);
  const next = () => setLightbox(i => i === null ? null : (i + 1) % filtered.length);

  return (
    <BandhanPageTransition>
    <div className="min-h-screen bandhan-theme" style={{ backgroundColor: 'hsl(40, 40%, 97%)' }}>
      <BandhanNav />
      <BandhanCategoryNav />
      <FloatingFlowers />

      <main className="relative -mt-[140px] pt-[140px]">

        {/* ── Hero ── */}
        <section className="relative h-[50vh] min-h-[380px] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=800&fit=crop&q=80"
            alt="Gallery"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              Our Gallery
            </h1>
            <p className="text-xl text-white/85 max-w-xl mx-auto">
              Moments we've crafted, memories that last forever
            </p>
          </div>
        </section>

        {/* ── Filter Bar ── */}
        <section className="py-10 bg-gradient-to-b from-background to-secondary/10 sticky top-[140px] z-30 border-b border-accent/20">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-widest transition-all duration-300 border ${
                    active === cat
                      ? 'bg-accent text-white border-accent shadow-md'
                      : 'bg-background/60 text-muted-foreground border-accent/20 hover:border-accent/60 hover:text-primary'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pinterest Masonry Grid ── */}
        <section className="py-10 bg-gradient-to-b from-secondary/10 to-background">
          <div className="container mx-auto px-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5"
                style={{ columnGap: '0.75rem' }}
              >
                {filtered.map((img, index) => (
                  <motion.div
                    key={img.src}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.03 }}
                    className="break-inside-avoid mb-3 group relative cursor-pointer overflow-hidden rounded-xl border border-accent/20 hover:border-accent/50 transition-all duration-300 hover:shadow-elegant"
                    onClick={() => setLightbox(index)}
                  >
                    <img
                      src={img.src}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-auto object-cover block transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-[10px] uppercase tracking-widest text-accent font-semibold block mb-0.5">{img.category}</span>
                      <p className="text-white text-sm font-medium leading-tight">{img.title}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-20">No images in this category.</p>
            )}
          </div>
        </section>

      </main>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(26,16,8,0.95)', backdropFilter: 'blur(12px)' }}
            onClick={() => setLightbox(null)}
          >
            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              onClick={e => { e.stopPropagation(); prev(); }}
              className="absolute left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-accent/80 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
              onClick={e => { e.stopPropagation(); next(); }}
              className="absolute right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-accent/80 flex items-center justify-center text-white transition-colors z-10"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <motion.div
              key={lightbox}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-4xl max-h-[85vh] relative"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox].src}
                alt={filtered[lightbox].title}
                className="max-w-full max-h-[78vh] object-contain rounded-xl border border-accent/30"
              />
              <div className="text-center mt-4">
                <span className="text-xs uppercase tracking-widest text-accent block mb-1">{filtered[lightbox].category}</span>
                <p className="text-white font-medium">{filtered[lightbox].title}</p>
                <p className="text-white/40 text-xs mt-1">{lightbox + 1} / {filtered.length}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BandhanFooter />
    </div>
    </BandhanPageTransition>
  );
};

export default BandhanGallery;
