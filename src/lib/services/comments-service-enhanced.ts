import { CommentsService, Comment, CommentInsert } from './comments-service'
import { SupabaseServiceError } from '../supabase-errors'

export type { Comment, CommentInsert }

export interface CommentServiceResponse<T = void> {
  success: boolean
  data?: T
  error?: string
  code?: string
}

export interface CommentServiceOptions {
  cache?: boolean
  retries?: number
}

/**
 * Enhanced comments service with caching and retry logic
 */
export class EnhancedCommentsService {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>()
  private static readonly DEFAULT_CACHE_TTL = 2 * 60 * 1000 // 2 minutes (shorter for comments)
  private static readonly DEFAULT_RETRY_COUNT = 3

  /**
   * Clear the cache
   */
  static clearCache(): void {
    this.cache.clear()
  }

  /**
   * Get data from cache if valid
   */
  private static getFromCache<T>(key: string): T | null {
    const cached = this.cache.get(key)
    if (!cached) return null

    const now = Date.now()
    if (now > cached.timestamp + cached.ttl) {
      this.cache.delete(key)
      return null
    }

    return cached.data as T
  }

  /**
   * Store data in cache
   */
  private static setCache<T>(key: string, data: T, ttl: number = this.DEFAULT_CACHE_TTL): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl
    })
  }

  /**
   * Execute operation with retry logic
   */
  private static async withRetry<T>(
    operation: () => Promise<T>,
    retries: number = this.DEFAULT_RETRY_COUNT
  ): Promise<T> {
    let lastError: Error | null = null

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await operation()
      } catch (error) {
        lastError = error instanceof Error ? error : new Error('Unknown error')
        
        if (attempt === retries) {
          break
        }

        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError
  }

  /**
   * Add a comment with retry logic
   */
  static async addComment(
    data: CommentInsert,
    options: CommentServiceOptions = {}
  ): Promise<CommentServiceResponse<Comment>> {
    try {
      const comment = await this.withRetry(
        () => CommentsService.addComment(data),
        options.retries
      )

      // Invalidate cache for this artist
      this.cache.delete(`comments-${data.artist_id}`)
      this.cache.delete(`comment-count-${data.artist_id}`)

      return { success: true, data: comment }
    } catch (error) {
      const message = error instanceof SupabaseServiceError 
        ? error.message 
        : 'Failed to add comment'
      
      return { 
        success: false, 
        error: message,
        code: error instanceof SupabaseServiceError ? error.code : undefined
      }
    }
  }

  /**
   * Get comments with caching
   */
  static async getComments(
    artistId: number,
    limit: number = 50,
    options: CommentServiceOptions = {}
  ): Promise<CommentServiceResponse<Comment[]>> {
    const cacheKey = `comments-${artistId}-${limit}`

    try {
      // Check cache first
      if (options.cache !== false) {
        const cached = this.getFromCache<Comment[]>(cacheKey)
        if (cached !== null) {
          return { success: true, data: cached }
        }
      }

      const comments = await this.withRetry(
        () => CommentsService.getComments(artistId, limit),
        options.retries
      )

      // Cache the result
      if (options.cache !== false) {
        this.setCache(cacheKey, comments)
      }

      return { success: true, data: comments }
    } catch (error) {
      const message = error instanceof SupabaseServiceError 
        ? error.message 
        : 'Failed to get comments'
      
      return { 
        success: false, 
        error: message,
        code: error instanceof SupabaseServiceError ? error.code : undefined
      }
    }
  }

  /**
   * Get comment count with caching
   */
  static async getCommentCount(
    artistId: number,
    options: CommentServiceOptions = {}
  ): Promise<CommentServiceResponse<number>> {
    const cacheKey = `comment-count-${artistId}`

    try {
      // Check cache first
      if (options.cache !== false) {
        const cached = this.getFromCache<number>(cacheKey)
        if (cached !== null) {
          return { success: true, data: cached }
        }
      }

      const count = await this.withRetry(
        () => CommentsService.getCommentCount(artistId),
        options.retries
      )

      // Cache the result
      if (options.cache !== false) {
        this.setCache(cacheKey, count)
      }

      return { success: true, data: count }
    } catch (error) {
      const message = error instanceof SupabaseServiceError 
        ? error.message 
        : 'Failed to get comment count'
      
      return { 
        success: false, 
        error: message,
        code: error instanceof SupabaseServiceError ? error.code : undefined
      }
    }
  }

  /**
   * Delete a comment
   */
  static async deleteComment(
    commentId: number,
    sessionId: string,
    artistId: number,
    options: CommentServiceOptions = {}
  ): Promise<CommentServiceResponse> {
    try {
      await this.withRetry(
        () => CommentsService.deleteComment(commentId, sessionId),
        options.retries
      )

      // Invalidate cache
      this.cache.delete(`comments-${artistId}`)
      this.cache.delete(`comment-count-${artistId}`)

      return { success: true }
    } catch (error) {
      const message = error instanceof SupabaseServiceError 
        ? error.message 
        : 'Failed to delete comment'
      
      return { 
        success: false, 
        error: message,
        code: error instanceof SupabaseServiceError ? error.code : undefined
      }
    }
  }
}
