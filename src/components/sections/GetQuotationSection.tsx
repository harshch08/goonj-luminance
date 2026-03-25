import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Check } from 'lucide-react';
import { quotationCategories, formatPrice, formatPriceShort } from '@/data/quotationData';
import type { QuotationArtist } from '@/data/quotationData';
import { useQuotationCart } from '@/context/QuotationCartContext';

const CategoryRow = ({ category }: { category: typeof quotationCategories[0] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { addItem, isInCart } = useQuotationCart();

  return (
    <div className="border border-border/30 rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-4 bg-secondary/40 hover:bg-secondary/70 transition-colors duration-200 group"
      >
        <div className="flex items-center gap-3">
          <span className="text-xl">{category.icon}</span>
          <span className="font-display text-base font-semibold text-foreground group-hover:text-gold-light transition-colors">
            {category.label}
          </span>
          <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
            {category.artists.length} options
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-muted-foreground group-hover:text-gold-light transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="divide-y divide-border/20">
              {category.artists.map(artist => (
                <ArtistRow key={artist.id} artist={artist} inCart={isInCart(artist.id)} onAdd={() => addItem(artist)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ArtistRow = ({
  artist,
  inCart,
  onAdd,
}: {
  artist: QuotationArtist;
  inCart: boolean;
  onAdd: () => void;
}) => (
  <div className="flex items-center gap-4 px-5 py-3 bg-background/60 hover:bg-secondary/30 transition-colors">
    {artist.image && (
      <img
        src={artist.image}
        alt={artist.name}
        className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-gold/20"
      />
    )}
    {!artist.image && (
      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold-light font-bold text-sm">
        {artist.name[0]}
      </div>
    )}
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-foreground">{artist.name}</p>
      <p className="text-xs text-muted-foreground truncate">{artist.description}</p>
    </div>
    <div className="flex items-center gap-3 flex-shrink-0">
      <span className="text-sm font-bold text-gold-light">{formatPriceShort(artist.price)}</span>
      <button
        onClick={onAdd}
        disabled={inCart}
        className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full font-semibold transition-all duration-200 ${
          inCart
            ? 'bg-green-500/20 text-green-400 cursor-default'
            : 'bg-gold/20 hover:bg-gold text-gold-light hover:text-black'
        }`}
      >
        {inCart ? <Check size={12} /> : <Plus size={12} />}
        {inCart ? 'Added' : 'Add'}
      </button>
    </div>
  </div>
);

export const GetQuotationSection = () => {
  const { itemCount } = useQuotationCart();

  return (
    <section className="py-20 lg:py-28 bg-secondary/20">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-xs uppercase tracking-widest text-gold-light mb-4 block">
            Build Your Package
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Get a Quotation
          </h2>
          <div className="w-16 h-px bg-gold mx-auto mb-6" />
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            Select artists and services from the categories below, add them to your cart, and generate a personalised quotation instantly.
          </p>
          {itemCount > 0 && (
            <p className="mt-4 text-gold-light text-sm font-medium">
              {itemCount} item{itemCount > 1 ? 's' : ''} in cart — open the cart button (bottom-right) to get your quotation.
            </p>
          )}
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-3">
          {quotationCategories.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              viewport={{ once: true }}
            >
              <CategoryRow category={cat} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
