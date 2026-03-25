import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { QuotationArtist } from '@/data/quotationData';

export interface CartItem extends QuotationArtist {
  quantity: number;
}

interface QuotationCartContextType {
  items: CartItem[];
  addItem: (artist: QuotationArtist) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  total: number;
  itemCount: number;
  isInCart: (id: string) => boolean;
}

const QuotationCartContext = createContext<QuotationCartContextType | null>(null);

export const QuotationCartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = useCallback((artist: QuotationArtist) => {
    setItems(prev => {
      if (prev.find(i => i.id === artist.id)) return prev;
      return [...prev, { ...artist, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.length;
  const isInCart = useCallback((id: string) => items.some(i => i.id === id), [items]);

  return (
    <QuotationCartContext.Provider value={{ items, addItem, removeItem, clearCart, total, itemCount, isInCart }}>
      {children}
    </QuotationCartContext.Provider>
  );
};

export const useQuotationCart = () => {
  const ctx = useContext(QuotationCartContext);
  if (!ctx) throw new Error('useQuotationCart must be used within QuotationCartProvider');
  return ctx;
};
