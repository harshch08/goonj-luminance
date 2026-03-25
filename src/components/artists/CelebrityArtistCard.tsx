import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Package } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CelebrityArtist } from '@/types/celebrity';
import { CelebrityArtistModal } from '@/components/artists/CelebrityArtistModal';

interface CelebrityArtistCardProps {
  artist: CelebrityArtist;
  index: number;
}

const tierColors = {
  green: {
    bg: 'from-emerald-500/10 to-green-500/10',
    border: 'border-emerald-500/30',
    text: 'text-emerald-600',
    badge: 'bg-emerald-500/20 text-emerald-700'
  },
  yellow: {
    bg: 'from-yellow-500/10 to-amber-500/10',
    border: 'border-yellow-500/30',
    text: 'text-yellow-600',
    badge: 'bg-yellow-500/20 text-yellow-700'
  },
  red: {
    bg: 'from-red-500/10 to-rose-500/10',
    border: 'border-red-500/30',
    text: 'text-red-600',
    badge: 'bg-red-500/20 text-rose-700'
  }
};

export function CelebrityArtistCard({ artist, index }: CelebrityArtistCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const tierStyle = tierColors[artist.tier];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        viewport={{ once: true }}
        className={cn(
          "group relative overflow-hidden rounded-xl border-2 transition-all duration-500 cursor-pointer",
          "hover:shadow-2xl hover:-translate-y-2",
          tierStyle.border,
          `bg-gradient-to-br ${tierStyle.bg}`
        )}
        onClick={() => setIsModalOpen(true)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-muted">
          {!imageError && artist.image_url ? (
            <img
              src={artist.image_url}
              alt={artist.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-muted to-muted/50">
              <Star className="w-16 h-16 text-muted-foreground/30" />
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Tier Badge */}
          <div className={cn(
            "absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
            tierStyle.badge
          )}>
            {artist.tier}
          </div>

          {/* Hover Content */}
          <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="text-white">
              <p className="text-xs font-medium mb-1 flex items-center gap-1">
                <Package className="w-3 h-3" />
                Package
              </p>
              <p className="text-xs opacity-90 line-clamp-2">{artist.package}</p>
            </div>
          </div>
        </div>

        {/* Artist Info */}
        <div className="p-4 bg-background/95 backdrop-blur-sm">
          <h3 className="font-display text-lg font-bold text-foreground mb-1 line-clamp-1">
            {artist.name}
          </h3>
          <p className={cn("text-sm font-medium mb-2", tierStyle.text)}>
            {artist.niche}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Star className="w-3 h-3" />
              Celebrity
            </span>
            <span className="text-gold-light font-medium">View Details →</span>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <CelebrityArtistModal
        artist={artist}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
