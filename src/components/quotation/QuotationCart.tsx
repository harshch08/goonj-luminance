import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, X, Trash2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuotationCart } from '@/context/QuotationCartContext';
import { QuotationPreviewModal } from './QuotationPreviewModal';

const formatINR = (amount: number) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(amount);

// Drawer + modal only — no floating button (trigger lives in CategoryNav)
export const QuotationCartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { items, removeItem, clearCart, total, itemCount } = useQuotationCart();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[90] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative z-10 w-full max-w-sm h-full bg-[#111] border-l border-gold/20 flex flex-col">
              <div className="flex items-center justify-between px-5 py-4 border-b border-gold/20">
                <div className="flex items-center gap-2">
                  <ShoppingCart size={18} className="text-gold-light" />
                  <h3 className="font-display text-lg font-bold text-foreground">Your Cart</h3>
                  {itemCount > 0 && (
                    <span className="bg-gold/20 text-gold-light text-xs px-2 py-0.5 rounded-full">{itemCount}</span>
                  )}
                </div>
                <button onClick={onClose} className="text-muted-foreground hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center gap-3">
                    <ShoppingCart size={40} className="text-muted-foreground/40" />
                    <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                    <p className="text-muted-foreground/60 text-xs">Add artists from the Get Quotation section.</p>
                  </div>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex items-start gap-3 p-3 bg-secondary/40 rounded-lg border border-border/20">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                        <p className="text-sm text-gold-light font-bold mt-1">₹{formatINR(item.price)}</p>
                      </div>
                      <button onClick={() => removeItem(item.id)}
                        className="text-muted-foreground hover:text-red-400 transition-colors mt-0.5 flex-shrink-0">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))
                )}
              </div>
              {items.length > 0 && (
                <div className="px-5 py-4 border-t border-gold/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground text-sm">Total</span>
                    <span className="text-gold-light font-bold text-lg">₹{formatINR(total)}</span>
                  </div>
                  <Button className="w-full bg-gold hover:bg-gold-light text-black font-semibold gap-2"
                    onClick={() => { onClose(); setShowPreview(true); }}>
                    <FileText size={16} /> Get Quotation
                  </Button>
                  <button onClick={clearCart} className="w-full text-xs text-muted-foreground hover:text-red-400 transition-colors">
                    Clear cart
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      <QuotationPreviewModal isOpen={showPreview} onClose={() => setShowPreview(false)} items={items} total={total} />
    </>
  );
};

// Legacy export kept so App.tsx import doesn't break — renders nothing now
export const QuotationCart = () => null;
