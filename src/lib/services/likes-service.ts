import { supabase } from '../supabase'
import type { ArtistLike, ArtistLikeInsert, ArtistLikeCount } from '../supabase'
import { handleSupabaseError, SupabaseServiceError } from '../supabase-errors'
import { validateArtistLikeData } from '../database/schema'

/**
 * Service for managing artist likes in Supabase
 */
export class LikesService {
  /**
   * Add a like for an artist
   */
  static async addLike(artistId: number, artistName: string, sessionId: string): Promise<void> {
    try {
      // Validate input data
      const validation = validateArtistLikeData({ artist_id: artistId, artist_name: artistName, session_id: sessionId })
      if (!validation.valid) {
        throw new SupabaseServiceError(`Invalid like data: ${validation.errors.join(', ')}`)
      }

      const likeData: ArtistLikeInsert = {
        artist_id: artistId,
        artist_name: artistName,
        session_id: sessionId
      }

      const { error } = await supabase
        .from('artist_likes')
        .insert(likeData)

      if (error) {
        // Handle duplicate like attempts gracefully
        if (error.code === '23505') { // Unique constraint violation
          throw new SupabaseServiceError('You have already liked this artist')
        }
        
        const supabaseError = handleSupabaseError(error)
        throw new SupabaseServiceError(supabaseError?.message || 'Failed to add like')
      }
    } catch (error) {
      if (error instanceof SupabaseServiceError) {
        throw error
      }
      throw new SupabaseServiceError(error instanceof Error ? error.message : 'Unknown error adding like')
    }
  }

  /**
   * Get the like count for a specific artist
   */
  static async getLikeCount(artistId: number): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('artist_likes')
        .select('*', { count: 'exact', head: true })
        .eq('artist_id', artistId)

      if (error) {
        const supabaseError = handleSupabaseError(error)
        throw new SupabaseServiceError(supabaseError?.message || 'Failed to get like count')
      }

      return count || 0
    } catch (error) {
      if (error instanceof SupabaseServiceError) throw error
      console.warn('Error getting like count, returning 0:', error)
      return 0
    }
  }

  /**
   * Check if a session has already liked an artist
   */
  static async checkIfLiked(artistId: number, sessionId: string): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('artist_likes')
        .select('id')
        .eq('artist_id', artistId)
        .eq('session_id', sessionId)
        .single()

      if (error) {
        // If no record found, user hasn't liked this artist
        if (error.code === 'PGRST116') {
          return false
        }
        
        const supabaseError = handleSupabaseError(error)
        throw new SupabaseServiceError(supabaseError?.message || 'Failed to check like status')
      }

      return !!data
    } catch (error) {
      if (error instanceof SupabaseServiceError) {
        throw error
      }
      // Return false as fallback for any unexpected errors
      console.warn('Error checking like status, returning false:', error)
      return false
    }
  }

  /**
   * Get like counts for all artists
   */
  static async getAllLikeCounts(): Promise<Record<number, number>> {
    try {
      const { data, error } = await supabase
        .from('artist_likes')
        .select('artist_id')

      if (error) {
        const supabaseError = handleSupabaseError(error)
        throw new SupabaseServiceError(supabaseError?.message || 'Failed to get all like counts')
      }

      // Count manually from raw rows
      const likeCounts: Record<number, number> = {}
      data?.forEach((item: { artist_id: number }) => {
        likeCounts[item.artist_id] = (likeCounts[item.artist_id] || 0) + 1
      })

      return likeCounts
    } catch (error) {
      if (error instanceof SupabaseServiceError) throw error
      console.warn('Error getting all like counts, returning empty object:', error)
      return {}
    }
  }

  /**
   * Get like counts for multiple specific artists
   */
  static async getLikeCountsForArtists(artistIds: number[]): Promise<Record<number, number>> {
    try {
      if (artistIds.length === 0) return {}

      const { data, error } = await supabase
        .from('artist_likes')
        .select('artist_id')
        .in('artist_id', artistIds)

      if (error) {
        const supabaseError = handleSupabaseError(error)
        throw new SupabaseServiceError(supabaseError?.message || 'Failed to get like counts for artists')
      }

      const likeCounts: Record<number, number> = {}
      artistIds.forEach(id => { likeCounts[id] = 0 })
      data?.forEach((item: { artist_id: number }) => {
        likeCounts[item.artist_id] = (likeCounts[item.artist_id] || 0) + 1
      })

      return likeCounts
    } catch (error) {
      if (error instanceof SupabaseServiceError) throw error
      console.warn('Error getting like counts for artists, returning zeros:', error)
      const fallback: Record<number, number> = {}
      artistIds.forEach(id => { fallback[id] = 0 })
      return fallback
    }
  }

  /**
   * Get recent likes for monitoring/analytics
   */
  static async getRecentLikes(limit: number = 10): Promise<ArtistLike[]> {
    try {
      const { data, error } = await supabase
        .from('artist_likes')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        const supabaseError = handleSupabaseError(error)
        throw new SupabaseServiceError(supabaseError?.message || 'Failed to get recent likes')
      }

      return data || []
    } catch (error) {
      if (error instanceof SupabaseServiceError) {
        throw error
      }
      console.warn('Error getting recent likes, returning empty array:', error)
      return []
    }
  }

  /**
   * Get top liked artists
   */
  static async getTopLikedArtists(limit: number = 10): Promise<ArtistLikeCount[]> {
    try {
      const { data, error } = await supabase
        .from('artist_like_counts')
        .select('*')
        .order('like_count', { ascending: false })
        .limit(limit)

      if (error) {
        const supabaseError = handleSupabaseError(error)
        throw new SupabaseServiceError(supabaseError?.message || 'Failed to get top liked artists')
      }

      return data || []
    } catch (error) {
      if (error instanceof SupabaseServiceError) {
        throw error
      }
      console.warn('Error getting top liked artists, returning empty array:', error)
      return []
    }
  }
}