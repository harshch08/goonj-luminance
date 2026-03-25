import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Check, Trash2 } from 'lucide-react';
import type { QuotationArtist } from '@/data/quotationData';

interface Props {
  artist: QuotationArtist | null;
  inCart: boolean;
  onAdd: () => void;
  onRemove: () => void;
  onClose: () => void;
}

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

export const ItemDetailPopup = ({ artist, inCart, onAdd, onRemove, onClose }: Props) => (
  <AnimatePresence>
    {artist && (
      <>
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Popup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 24 }}
          transition={{ type: 'spring', damping: 24, stiffness: 280 }}
          className="fixed z-[61] inset-0 flex items-center justify-center p-4 pointer-events-none"
        >
          <div className="pointer-events-auto w-full max-w-md bg-[#0f0f0f] border border-gold/25 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">

            {/* Image */}
            {artist.image ? (
              <div className="relative w-full overflow-hidden bg-black">
                <img src={artist.image} alt={artist.name} className="w-full h-auto object-contain max-h-72" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent" />
                {/* Close button over image */}
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
                >
                  <X size={15} />
                </button>
                {/* Category badge over image */}
                <span className="absolute bottom-3 left-4 text-[10px] uppercase tracking-wider bg-black/60 backdrop-blur-sm text-gold-light px-2.5 py-1 rounded-full border border-gold/20">
                  {artist.category}
                </span>
              </div>
            ) : (
              <div className="relative h-32 w-full bg-gradient-to-br from-gold/10 to-gold/5 flex items-center justify-center">
                <span className="text-5xl">🎵</span>
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            )}

            {/* Content */}
            <div className="p-5 space-y-4">
              {/* Name */}
              <h3 className="font-display font-bold text-foreground text-xl leading-snug">
                {artist.name}
              </h3>

              {/* Detail description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {artist.detailDescription || artist.description}
              </p>

              {/* Highlights */}
              {artist.highlights && artist.highlights.length > 0 && (
                <ul className="space-y-1.5">
                  {artist.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                      <span className="text-gold-light mt-0.5 flex-shrink-0">✦</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {/* Price + CTA */}
              <div className="flex items-center justify-between pt-2 border-t border-border/20">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Starting from</p>
                  <span className="text-gold-light font-bold text-2xl">₹{fmt(artist.price)}</span>
                </div>
                {inCart ? (
                  <button
                    onClick={() => { onRemove(); onClose(); }}
                    className="flex items-center gap-2 text-sm px-6 py-2.5 rounded-full font-semibold transition-all duration-200 bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white hover:scale-105"
                  >
                    <Trash2 size={14} />
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => { onAdd(); onClose(); }}
                    className="flex items-center gap-2 text-sm px-6 py-2.5 rounded-full font-semibold transition-all duration-200 bg-gold hover:bg-gold-light text-black hover:scale-105"
                  >
                    <Plus size={14} />
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);
