import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, ExternalLink } from 'lucide-react';

// Simulated Instagram posts data
const instagramPosts = [
  { id: 1, likes: '2.4K', type: 'Concert' },
  { id: 2, likes: '1.8K', type: 'Wedding' },
  { id: 3, likes: '3.2K', type: 'Corporate' },
  { id: 4, likes: '2.1K', type: 'Open Mic' },
  { id: 5, likes: '4.5K', type: 'Celebrity' },
  { id: 6, likes: '1.9K', type: 'Karaoke' },
];

export const SocialProofSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background" id="gallery">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-4">
            Follow Our Journey
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Connect With Us
          </h2>
          <div className="section-divider mb-8" />
        </motion.div>

        {/* Instagram Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12"
        >
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href="https://www.instagram.com/goonj_entertainment__?igsh=MTZuYno5eHY5bjJ0"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * index + 0.5 }}
              className="group relative aspect-square bg-charcoal rounded-lg overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-60" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-xs uppercase tracking-luxury text-gold-light mb-2">
                  {post.type}
                </span>
                <span className="text-lg font-semibold text-foreground">{post.likes}</span>
              </div>
              <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <ExternalLink className="text-gold" size={24} />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-center gap-6"
        >
          <a
            href="https://www.instagram.com/goonj_entertainment__?igsh=MTZuYno5eHY5bjJ0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-gold-light transition-colors duration-300"
          >
            <Instagram size={20} />
            <span className="text-sm">@goonj_entertainment__</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
