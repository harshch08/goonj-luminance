import { supabase } from '@/lib/supabase';
import type { CelebrityArtist } from '@/types/celebrity';

export interface LiveArtistDB {
  id: number;
  name: string;
  genre: string;
  tag: string;
  bio: string;
  description: string;
  category: string;
  package: string;
  price: number;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
}

export interface FeaturedArtistDB {
  id: number;
  name: string;
  category: string;
  genre: string;
  image: string;
  bio: string;
  performances: string;
  rating: number;
  price: number;
  is_active: boolean;
  sort_order: number;
}

export interface EventServiceDB {
  id: number;
  name: string;
  description: string;
  package: string;
  price: number;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
}

export class CelebrityService {
  static async getAllArtists(): Promise<CelebrityArtist[]> {
    try {
      const { data, error } = await supabase
        .from('celebrity_artists')
        .select('*')
        .order('name', { ascending: true });

      if (error) throw new Error(`Failed to fetch celebrity artists: ${error.message}`);
      return data || [];
    } catch (error) {
      console.error('CelebrityService.getAllArtists error:', error);
      throw error;
    }
  }

  static async getArtistById(id: number): Promise<CelebrityArtist | null> {
    try {
      const { data, error } = await supabase
        .from('celebrity_artists')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') return null;
        throw new Error(`Failed to fetch celebrity artist: ${error.message}`);
      }
      return data;
    } catch (error) {
      console.error('CelebrityService.getArtistById error:', error);
      throw error;
    }
  }

  static async getLiveArtists(): Promise<LiveArtistDB[]> {
    try {
      const { data, error } = await supabase
        .from('live_artists')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw new Error(`Failed to fetch live artists: ${error.message}`);
      return data || [];
    } catch (error) {
      console.error('CelebrityService.getLiveArtists error:', error);
      throw error;
    }
  }

  static async getFeaturedArtists(): Promise<FeaturedArtistDB[]> {
    try {
      const { data, error } = await supabase
        .from('featured_artists')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw new Error(`Failed to fetch featured artists: ${error.message}`);
      return data || [];
    } catch (error) {
      console.error('CelebrityService.getFeaturedArtists error:', error);
      throw error;
    }
  }

  static async saveQuotationRecord(data: {
    quote_no: string;
    client_name: string;
    contact_number: string;
    event_type: string;
    event_from_date: string;
    event_to_date: string;
    venue?: string;
    items: { id: string; name: string; price: number; category: string }[];
    subtotal: number;
    discount: number;
    gst: number;
    total: number;
    coupon_code?: string;
  }): Promise<void> {
    try {
      await supabase.from('quotation_records').insert([data]);
    } catch (error) {
      console.error('Failed to save quotation record:', error);
    }
  }

  static async validateCoupon(code: string, orderAmount: number): Promise<{
    valid: boolean;
    discount: number;
    message: string;
    coupon?: { code: string; discount_type: string; discount_value: number; min_order_amount: number; max_discount_amount: number | null };
  }> {
    try {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .eq('code', code.toUpperCase().trim())
        .eq('is_active', true)
        .single();

      if (error || !data) return { valid: false, discount: 0, message: 'Invalid coupon code' };
      if (data.expires_at && new Date(data.expires_at) < new Date())
        return { valid: false, discount: 0, message: 'Coupon has expired' };
      if (data.max_uses !== null && data.used_count >= data.max_uses)
        return { valid: false, discount: 0, message: 'Coupon usage limit reached' };
      if (orderAmount < data.min_order_amount)
        return { valid: false, discount: 0, message: `Minimum order ₹${new Intl.NumberFormat('en-IN').format(data.min_order_amount)} required` };

      const rawDiscount = data.discount_type === 'percent'
        ? Math.round(orderAmount * data.discount_value / 100)
        : data.discount_value;

      // Apply max_discount_amount cap for percent coupons
      const discount = (data.discount_type === 'percent' && data.max_discount_amount)
        ? Math.min(rawDiscount, data.max_discount_amount)
        : rawDiscount;

      const discountLabel = data.discount_type === 'percent'
        ? `${data.discount_value}%${data.max_discount_amount ? ` (max ₹${new Intl.NumberFormat('en-IN').format(data.max_discount_amount)})` : ''}`
        : `₹${new Intl.NumberFormat('en-IN').format(data.discount_value)}`;

      return { valid: true, discount, message: `${discountLabel} discount applied`, coupon: data };
    } catch (error) {
      return { valid: false, discount: 0, message: 'Error validating coupon' };
    }
  }

  static async getEventServices(): Promise<EventServiceDB[]> {
    try {
      const { data, error } = await supabase
        .from('event_services')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      if (error) throw new Error(`Failed to fetch event services: ${error.message}`);
      return data || [];
    } catch (error) {
      console.error('CelebrityService.getEventServices error:', error);
      throw error;
    }
  }
}
