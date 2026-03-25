import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Package, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { CelebrityArtist } from '@/types/celebrity';

interface CelebrityArtistModalProps {
  artist: CelebrityArtist;
  isOpen: boolean;
  onClose: () => void;
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

export function CelebrityArtistModal({ artist, isOpen, onClose }: CelebrityArtistModalProps) {
  const tierStyle = tierColors[artist.tier];

  const handleBookNow = () => {
    onClose();
    // Scroll to inquiry form
    setTimeout(() => {
      const formSection = document.getElementById('inquiry-form');
      formSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-background rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2 gap-6 p-6">
                {/* Left: Image */}
                <div className={cn(
                  "relative aspect-[3/4] rounded-xl overflow-hidden border-2",
                  tierStyle.border,
                  `bg-gradient-to-br ${tierStyle.bg}`
                )}>
                  {artist.image_url ? (
                    <img
                      src={artist.image_url}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Star className="w-24 h-24 text-muted-foreground/30" />
                    </div>
                  )}

                  {/* Tier Badge */}
                  <div className={cn(
                    "absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider",
                    tierStyle.badge
                  )}>
                    {artist.tier} Tier
                  </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <div className="mb-6">
                      <h2 className="font-display text-3xl font-bold text-foreground mb-2">
                        {artist.name}
                      </h2>
                      <p className={cn("text-lg font-semibold mb-4", tierStyle.text)}>
                        {artist.niche}
                      </p>
                      {artist.bio && (
                        <p className="text-body text-sm leading-relaxed">
                          {artist.bio}
                        </p>
                      )}
                    </div>

                    {/* Package Info */}
                    <div className={cn(
                      "p-4 rounded-lg border-2 mb-6",
                      tierStyle.border,
                      `bg-gradient-to-br ${tierStyle.bg}`
                    )}>
                      <div className="flex items-start gap-3">
                        <Package className={cn("w-5 h-5 mt-0.5", tierStyle.text)} />
                        <div>
                          <h3 className="font-semibold text-foreground mb-1">Package Details</h3>
                          <p className="text-sm text-body">{artist.package}</p>
                        </div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Star className="w-4 h-4 text-gold-light" />
                        <span className="text-body">Celebrity Artist</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Music className="w-4 h-4 text-gold-light" />
                        <span className="text-body">Professional Performance</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Package className="w-4 h-4 text-gold-light" />
                        <span className="text-body">All-Inclusive Package</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button
                      variant="heroFilled"
                      size="lg"
                      className="flex-1"
                      onClick={handleBookNow}
                    >
                      Book Now
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={onClose}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
