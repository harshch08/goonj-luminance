import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Check, Trash2, FileText, ShoppingCart, Sparkles, X, Tag, Loader2 } from 'lucide-react';
import { MainNav } from '@/components/layout/MainNav';
import { CategoryNav } from '@/components/layout/CategoryNav';
import { Footer } from '@/components/sections/Footer';
import { quotationCategories, formatPriceShort } from '@/data/quotationData';
import type { QuotationArtist } from '@/data/quotationData';
import { useQuotationCart } from '@/context/QuotationCartContext';
import { QuotationPreviewModal } from '@/components/quotation/QuotationPreviewModal';
import { ItemDetailPopup } from '@/components/quotation/ItemDetailPopup';
import { useQuotationArtists } from '@/hooks/useQuotationArtists';
import { CelebrityService } from '@/services/celebrity.service';

const fmt = (n: number) => new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n);

/* ── Artist Card (grid item) ── */
const ArtistCard = ({ artist, inCart, onAdd, onRemove, onViewDetail }: { artist: QuotationArtist; inCart: boolean; onAdd: () => void; onRemove: () => void; onViewDetail: () => void }) => (
  <motion.div
    layout
    onClick={onViewDetail}
    className={`relative flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer group
      ${inCart ? 'border-gold/60 shadow-[0_0_18px_rgba(180,150,80,0.25)]' : 'border-border/30 hover:border-gold/40 hover:shadow-[0_0_12px_rgba(180,150,80,0.12)]'}`}
  >
    {/* Info */}
    <div className="flex flex-col flex-1 p-4 bg-[#111]">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-wider bg-secondary text-gold-light px-2 py-0.5 rounded-full">
          {artist.category}
        </span>
        {inCart && (
          <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Check size={9} /> Added
          </span>
        )}
      </div>
      <p className="font-display font-semibold text-foreground text-sm leading-snug mb-1">{artist.name}</p>
      <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-3 line-clamp-2">{artist.description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-gold-light font-bold text-sm">{formatPriceShort(artist.price)}</span>
        {inCart ? (
          <button
            onClick={e => { e.stopPropagation(); onRemove(); }}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold transition-all duration-200 bg-red-500/15 hover:bg-red-500 text-red-400 hover:text-white hover:scale-105"
          >
            <Trash2 size={11} />
            Remove
          </button>
        ) : (
          <button
            onClick={e => { e.stopPropagation(); onAdd(); }}
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold transition-all duration-200 bg-gold/20 hover:bg-gold text-gold-light hover:text-black hover:scale-105"
          >
            <Plus size={11} />
            Add
          </button>
        )}
      </div>
    </div>
  </motion.div>
);

/* ── Category Section ── */
const CategorySection = ({ category }: { category: typeof quotationCategories[0] }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedArtist, setSelectedArtist] = useState<QuotationArtist | null>(null);
  const { addItem, removeItem, isInCart } = useQuotationCart();

  return (
    <div className="mb-8">
      <button
        onClick={() => setIsOpen(o => !o)}
        className="w-full flex items-center justify-between mb-4 group"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{category.icon}</span>
          <h3 className="font-display text-lg font-bold text-foreground group-hover:text-gold-light transition-colors">
            {category.label}
          </h3>
          <span className="text-xs text-muted-foreground bg-secondary/60 px-2 py-0.5 rounded-full">
            {category.artists.length}
          </span>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-muted-foreground group-hover:text-gold-light transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {category.artists.map((a, i) => (
                <motion.div
                  key={a.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.04 }}
                >
                  <ArtistCard
                    artist={a}
                    inCart={isInCart(a.id)}
                    onAdd={() => addItem(a)}
                    onRemove={() => removeItem(a.id)}
                    onViewDetail={() => setSelectedArtist(a)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-6 border-b border-border/20" />

      <ItemDetailPopup
        artist={selectedArtist}
        inCart={selectedArtist ? isInCart(selectedArtist.id) : false}
        onAdd={() => selectedArtist && addItem(selectedArtist)}
        onRemove={() => selectedArtist && removeItem(selectedArtist.id)}
        onClose={() => setSelectedArtist(null)}
      />
    </div>
  );
};

/* ── Floating Cart Button + Overlay ── */
const FloatingCart = ({ onGetQuotation }: { onGetQuotation: (discount: number, couponCode: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [couponValid, setCouponValid] = useState(false);
  const [couponData, setCouponData] = useState<{ min_order_amount: number; discount_type: string; discount_value: number; max_discount_amount: number | null } | null>(null);
  const [discount, setDiscount] = useState(0);
  const [applying, setApplying] = useState(false);
  const { items, removeItem, clearCart, total, itemCount } = useQuotationCart();

  // Re-validate coupon whenever total changes
  useEffect(() => {
    if (!couponValid || !couponData) return;
    if (total < couponData.min_order_amount) {
      setCouponMsg(`Minimum order ₹${new Intl.NumberFormat('en-IN').format(couponData.min_order_amount)} required`);
      setCouponValid(false);
      setDiscount(0);
    } else {
      // Recalculate discount based on new total
      const rawDiscount = couponData.discount_type === 'percent'
        ? Math.round(total * couponData.discount_value / 100)
        : couponData.discount_value;
      const newDiscount = (couponData.discount_type === 'percent' && couponData.max_discount_amount)
        ? Math.min(rawDiscount, couponData.max_discount_amount)
        : rawDiscount;
      setDiscount(newDiscount);
    }
  }, [total]);

  const finalTotal = Math.max(0, total - discount);

  const applyCoupon = async () => {
    if (!couponCode.trim()) return;
    setApplying(true);
    const result = await CelebrityService.validateCoupon(couponCode, total);
    setApplying(false);
    setCouponMsg(result.message);
    setCouponValid(result.valid);
    setDiscount(result.valid ? result.discount : 0);
    setCouponData(result.valid && result.coupon ? result.coupon : null);
  };

  const removeCoupon = () => {
    setCouponCode('');
    setCouponMsg('');
    setCouponValid(false);
    setDiscount(0);
    setCouponData(null);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-6 z-50 flex items-center gap-3 bg-gold hover:bg-gold-light text-black font-bold px-5 py-3.5 rounded-full shadow-2xl shadow-gold/30 transition-all duration-300 hover:scale-105"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', damping: 15 }}
      >
        <ShoppingCart size={18} />
        <span className="text-sm">Cart</span>
        {itemCount > 0 && (
          <span className="bg-black text-gold text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </motion.button>

      {/* Cart Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-[#0d0d0d] border-l border-gold/20 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gold/20 bg-gold/5">
                <div className="flex items-center gap-3">
                  <ShoppingCart size={18} className="text-gold-light" />
                  <span className="font-display font-bold text-foreground text-lg">Your Cart</span>
                  {itemCount > 0 && (
                    <span className="bg-gold/20 text-gold-light text-xs px-2 py-0.5 rounded-full font-semibold">{itemCount}</span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  {itemCount > 0 && (
                    <button onClick={clearCart} className="text-xs text-muted-foreground hover:text-red-400 transition-colors">
                      Clear all
                    </button>
                  )}
                  <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors p-1">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                <AnimatePresence>
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full py-20 text-center gap-3">
                      <ShoppingCart size={40} className="text-muted-foreground/20" />
                      <p className="text-muted-foreground">No items yet</p>
                      <p className="text-muted-foreground/50 text-sm">Browse categories and add items</p>
                      <button
                        onClick={() => setIsOpen(false)}
                        className="mt-4 text-gold-light text-sm underline underline-offset-4"
                      >
                        Continue browsing →
                      </button>
                    </div>
                  ) : (
                    items.map(item => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-start gap-3 p-4 bg-secondary/30 rounded-xl border border-border/20"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0 text-gold-light font-bold text-sm">
                          {item.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground leading-snug">{item.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{item.category}</p>
                          <p className="text-gold-light font-bold text-sm mt-1">₹{fmt(item.price)}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-400 transition-colors mt-1">
                          <Trash2 size={15} />
                        </button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>

              {/* Footer */}
              {itemCount > 0 && (
                <div className="px-6 py-5 border-t border-gold/20 bg-gold/5 space-y-4">
                  {/* Coupon Input */}
                  <div className="space-y-2">
                    {!couponValid ? (
                      <div className="flex gap-2">
                        <div className="flex-1 flex items-center gap-2 bg-secondary/50 border border-border/40 rounded-xl px-3 py-2">
                          <Tag size={14} className="text-muted-foreground flex-shrink-0" />
                          <input
                            value={couponCode}
                            onChange={e => { setCouponCode(e.target.value.toUpperCase()); setCouponMsg(''); }}
                            onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                            placeholder="Coupon code"
                            className="bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none w-full"
                          />
                        </div>
                        <button
                          onClick={applyCoupon}
                          disabled={applying || !couponCode.trim()}
                          className="px-4 py-2 bg-gold/20 hover:bg-gold text-gold-light hover:text-black text-sm font-semibold rounded-xl transition-all disabled:opacity-40"
                        >
                          {applying ? <Loader2 size={14} className="animate-spin" /> : 'Apply'}
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 rounded-xl px-3 py-2">
                        <div className="flex items-center gap-2">
                          <Tag size={14} className="text-green-400" />
                          <span className="text-sm font-semibold text-green-400">{couponCode}</span>
                        </div>
                        <button onClick={removeCoupon} className="text-muted-foreground hover:text-red-400 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                    )}
                    {couponMsg && (
                      <p className={`text-xs px-1 ${couponValid ? 'text-green-400' : 'text-red-400'}`}>{couponMsg}</p>
                    )}
                  </div>

                  {/* Totals */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Subtotal ({itemCount} items)</span>
                      <span>₹{fmt(total)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex items-center justify-between text-sm text-green-400">
                        <span>Discount</span>
                        <span>- ₹{fmt(discount)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between font-bold text-gold-light text-lg pt-1 border-t border-gold/20">
                      <span>Total</span>
                      <span>₹{fmt(finalTotal)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => { setIsOpen(false); onGetQuotation(discount, couponValid ? couponCode : ''); }}
                    className="w-full flex items-center justify-center gap-2 bg-gold hover:bg-gold-light text-black font-bold text-sm py-3.5 rounded-xl transition-all duration-200 hover:scale-[1.02]"
                  >
                    <FileText size={16} />
                    Get Quotation
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

/* ── Page ── */
const Quotation = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [cartDiscount, setCartDiscount] = useState(0);
  const [cartCouponCode, setCartCouponCode] = useState('');
  const { items, total } = useQuotationCart();
  const { categories, isLoading: artistsLoading } = useQuotationArtists();

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <CategoryNav />

      {/* Hero Banner */}
      <div className="relative h-[320px] md:h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=600&fit=crop&q=80"
          alt="Event"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-gold-light" />
              <span className="text-xs uppercase tracking-[0.2em] text-gold-light">Build Your Package</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Get a <span className="text-gold-light">Quotation</span>
            </h1>
            <p className="text-white/70 text-sm md:text-base max-w-lg leading-relaxed">
              Browse our artists and services, add them to your cart, and generate a personalised quotation in seconds.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {artistsLoading ? (
            <div className="flex items-center justify-center py-20 text-muted-foreground text-sm">
              Loading artists...
            </div>
          ) : (
            categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                viewport={{ once: true }}
              >
                <CategorySection category={cat} />
              </motion.div>
            ))
          )}
        </div>
      </div>

      <FloatingCart onGetQuotation={(discount, code) => { setCartDiscount(discount); setCartCouponCode(code); setShowPreview(true); }} />

      <Footer />

      <QuotationPreviewModal
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        items={items}
        total={total}
        discount={cartDiscount}
        couponCode={cartCouponCode}
      />
    </div>
  );
};

export default Quotation;
