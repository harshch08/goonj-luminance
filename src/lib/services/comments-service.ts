import { supabase } from '../supabase'
import { SupabaseServiceError } from '../supabase-errors'

export interface Comment {
  id: number
  artist_id: number
  artist_name: string
  session_id: string
  user_name: string | null
  comment_text: string
  created_at: string
}

export interface CommentInsert {
  artist_id: number
  artist_name: string
  session_id: string
  user_name?: string
  comment_text: string
}

/**
 * Service for managing artist comments
 */
export class CommentsService {
  /**
   * Add a new comment
   */
  static async addComment(data: CommentInsert): Promise<Comment> {
    try {
      const { data: comment, error } = await supabase
        .from('artist_comments')
        .insert({
          artist_id: data.artist_id,
          artist_name: data.artist_name,
          session_id: data.session_id,
          user_name: data.user_name || null,
          comment_text: data.comment_text
        })
        .select()
        .single()

      if (error) {
        throw new SupabaseServiceError(error)
      }

      return comment
    } catch (error) {
      if (error instanceof SupabaseServiceError) {
        throw error
      }
      throw new SupabaseServiceError(error as Error)
    }
  }

  /**
   * Get comments for an artist
   */
  static async getComments(artistId: number, limit: number = 50): Promise<Comment[]> {
    try {
      const { data, error } = await supabase
        .from('artist_comments')
        .select('*')
        .eq('artist_id', artistId)
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        throw new SupabaseServiceError(error)
      }

      return data || []
    } catch (error) {
      if (error instanceof SupabaseServiceError) {
        throw error
      }
      throw new SupabaseServiceError(error as Error)
    }
  }

  /**
   * Get comment count for an artist
   */
  static async getCommentCount(artistId: number): Promise<number> {
    try {
      const { count, error } = await supabase
        .from('artist_comments')
        .select('*', { count: 'exact', head: true })
        .eq('artist_id', artistId)

      if (error) {
        throw new SupabaseServiceError(error)
      }

      return count || 0
    } catch (error) {
      if (error instanceof SupabaseServiceError) {
        throw error
      }
      throw new SupabaseServiceError(error as Error)
    }
  }

  /**
   * Delete a comment (only by the user who created it)
   */
  static async deleteComment(commentId: number, sessionId: string): Promise<void> {
    try {
      const { error } = await supabase
        .from('artist_comments')
        .delete()
        .eq('id', commentId)
        .eq('session_id', sessionId)

      if (error) {
        throw new SupabaseServiceError(error)
      }
    } catch (error) {
      if (error instanceof SupabaseServiceError) {
        throw error
      }
      throw new SupabaseServiceError(error as Error)
    }
  }

  /**
   * Get recent comments across all artists
   */
  static async getRecentComments(limit: number = 10): Promise<Comment[]> {
    try {
      const { data, error } = await supabase
        .from('artist_comments')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit)

      if (error) {
        throw new SupabaseServiceError(error)
      }

      return data || []
    } catch (error) {
      if (error instanceof SupabaseServiceError) {
        throw error
      }
      throw new SupabaseServiceError(error as Error)
    }
  }
}
