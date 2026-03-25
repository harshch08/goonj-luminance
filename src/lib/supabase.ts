import { createClient } from '@supabase/supabase-js'
import type { InstagramCacheRow, InstagramFollowerData, InstagramPost } from '@/types/instagram'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database type definitions
export type Database = {
  public: {
    Tables: {
      artist_likes: {
        Row: {
          id: number
          artist_id: number
          artist_name: string
          session_id: string
          created_at: string
        }
        Insert: {
          artist_id: number
          artist_name: string
          session_id: string
        }
        Update: {
          artist_id?: number
          artist_name?: string
          session_id?: string
        }
      }
      instagram_cache: {
        Row: InstagramCacheRow
        Insert: {
          data_type: 'follower_count' | 'posts'
          content: InstagramFollowerData | InstagramPost[]
        }
        Update: {
          data_type?: 'follower_count' | 'posts'
          content?: InstagramFollowerData | InstagramPost[]
        }
      }
    }
    Views: {
      artist_like_counts: {
        Row: {
          artist_id: number
          artist_name: string
          like_count: number
        }
      }
    }
  }
}

// Type the supabase client
export type SupabaseClient = typeof supabase

// Export types for use in components
export type ArtistLike = Database['public']['Tables']['artist_likes']['Row']
export type ArtistLikeInsert = Database['public']['Tables']['artist_likes']['Insert']
export type ArtistLikeCount = Database['public']['Views']['artist_like_counts']['Row']

// Instagram cache types
export type InstagramCacheTable = Database['public']['Tables']['instagram_cache']['Row']
export type InstagramCacheInsert = Database['public']['Tables']['instagram_cache']['Insert']
export type InstagramCacheUpdate = Database['public']['Tables']['instagram_cache']['Update']