import { LikesService } from './likes-service'
import type { 
  LikeServiceResponse, 
  LikeServiceOptions, 
  BulkLikeCountsResponse,
  TopArtistsResponse,
  RecentLikesResponse 
} from './types'
import { SupabaseServiceError } from '../supabase-errors'

/**
 * Enhanced likes service with caching, retry logic, and additional features
 */
export class EnhancedLikesService {
  private static cache = new Map<string, { data: any; timestamp: number; ttl: number }>()
  private static readonly DEFAULT_CACHE_TTL = 5 * 60 * 1000 // 5 minutes
  private static readonly DEFAULT_RETRY_COUNT = 3
  private static readonly DEFAULT_TIMEOUT = 10000 // 10 seconds

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

        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
        await new Promise(resolve => setTimeout(resolve, delay))
      }
    }

    throw lastError
  }

  /**
   * Add a like with enhanced error handling and retry logic
   */
  static async addLike(
    artistId: number, 
    artistName: string, 
    sessionId: string,
    options: LikeServiceOptions = {}
  ): Promise<LikeServiceResponse> {
    try {
      await this.withRetry(
        () => LikesService.addLike(artistId, artistName, sessionId),
        options.retries
      )

      // Invalidate relevant cache entries
      this.cache.delete(`like-count-${artistId}`)
      this.cache.delete('all-like-counts')
      this.cache.delete(`like-status-${artistId}-${sessionId}`)

      return { success: true }
    } catch (error) {
      const message = error instanceof SupabaseServiceError 
        ? error.message 
        : 'Failed to add like'
      
      return { 
        success: false, 
        error: message,
        code: error instanceof SupabaseServiceError ? error.code : undefined
      }
    }
  }

  /**
   * Get like count with caching
   */
  static async getLikeCount(
    artistId: number,
    options: LikeServiceOptions = {}
  ): Promise<LikeServiceResponse<number>> {
    const cacheKey = `like-count-${artistId}`

    try {
      // Check cache first
      if (options.cache !== false) {
        const cached = this.getFromCache<number>(cacheKey)
        if (cached !== null) {
          return { success: true, data: cached }
        }
      }

      const count = await this.withRetry(
        () => LikesService.getLikeCount(artistId),
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
        : 'Failed to get like count'
      
      return { 
        success: false, 
        error: message,
        code: error instanceof SupabaseServiceError ? error.code : undefined
      }
    }
  }

  /**
   * Check if liked with caching
   */
  static async checkIfLiked(
    artistId: number,
    sessionId: string,
    options: LikeServiceOptions = {}
  ): Promise<LikeServiceResponse<boolean>> {
    const cacheKey = `like-status-${artistId}-${sessionId}`

    try {
      // Check cache first
      if (options.cache !== false) {
        const cached = this.getFromCache<boolean>(cacheKey)
        if (cached !== null) {
          return { success: true, data: cached }
        }
      }

      const isLiked = await this.withRetry(
        () => LikesService.checkIfLiked(artistId, sessionId),
        options.retries
      )

      // Cache the result with shorter TTL since this can change
      if (options.cache !== false) {
        this.setCache(cacheKey, isLiked, 2 * 60 * 1000) // 2 minutes
      }

      return { success: true, data: isLiked }
    } catch (error) {
      const message = error instanceof SupabaseServiceError 
        ? error.message 
        : 'Failed to check like status'
      
      return { 
        success: false, 
        error: message,
        code: error instanceof SupabaseServiceError ? error.code : undefined
      }
    }
  }

  /**
   * Get all like counts with caching and enhanced response
   */
  static async getAllLikeCounts(
    options: LikeServiceOptions = {}
  ): Promise<LikeServiceResponse<BulkLikeCountsResponse>> {
    const cacheKey = 'all-like-counts'

    try {
      // Check cache first
      if (options.cache !== false) {
        const cached = this.getFromCache<BulkLikeCountsResponse>(cacheKey)
        if (cached !== null) {
          return { success: true, data: cached }
        }
      }

      const counts = await this.withRetry(
        () => LikesService.getAllLikeCounts(),
        options.retries
      )

      const response: BulkLikeCountsResponse = {
        counts,
        totalArtists: Object.keys(counts).length,
        lastUpdated: new Date()
      }

      // Cache the result
      if (options.cache !== false) {
        this.setCache(cacheKey, response)
      }

      return { success: true, data: response }
    } catch (error) {
      const message = error instanceof SupabaseServiceError 
        ? error.message 
        : 'Failed to get all like counts'
      
      return { 
        success: false, 
        error: message,
        code: error instanceof SupabaseServiceError ? error.code : undefined
      }
    }
  }

  /**
   * Get top liked artists with enhanced response
   */
  static async getTopLikedArtists(
    limit: number = 10,
    options: LikeServiceOptions = {}
  ): Promise<LikeServiceResponse<TopArtistsResponse>> {
    const cacheKey = `top-artists-${limit}`

    try {
      // Check cache first
      if (options.cache !== false) {
        const cached = this.getFromCache<TopArtistsResponse>(cacheKey)
        if (cached !== null) {
          return { success: true, data: cached }
        }
      }

      const artists = await this.withRetry(
        () => LikesService.getTopLikedArtists(limit),
        options.retries
      )

      const response: TopArtistsResponse = {
        artists,
        totalCount: artists.length,
        limit
      }

      // Cache the result
      if (options.cache !== false) {
        this.setCache(cacheKey, response)
      }

      return { success: true, data: response }
    } catch (error) {
      const message = error instanceof SupabaseServiceError 
        ? error.message 
        : 'Failed to get top liked artists'
      
      return { 
        success: false, 
        error: message,
        code: error instanceof SupabaseServiceError ? error.code : undefined
      }
    }
  }

  /**
   * Get recent likes with enhanced response
   */
  static async getRecentLikes(
    limit: number = 10,
    options: LikeServiceOptions = {}
  ): Promise<LikeServiceResponse<RecentLikesResponse>> {
    const cacheKey = `recent-likes-${limit}`

    try {
      // Check cache first (shorter TTL for recent data)
      if (options.cache !== false) {
        const cached = this.getFromCache<RecentLikesResponse>(cacheKey)
        if (cached !== null) {
          return { success: true, data: cached }
        }
      }

      const likes = await this.withRetry(
        () => LikesService.getRecentLikes(limit),
        options.retries
      )

      const response: RecentLikesResponse = {
        likes,
        totalCount: likes.length,
        limit
      }

      // Cache with shorter TTL for recent data
      if (options.cache !== false) {
        this.setCache(cacheKey, response, 1 * 60 * 1000) // 1 minute
      }

      return { success: true, data: response }
    } catch (error) {
      const message = error instanceof SupabaseServiceError 
        ? error.message 
        : 'Failed to get recent likes'
      
      return { 
        success: false, 
        error: message,
        code: error instanceof SupabaseServiceError ? error.code : undefined
      }
    }
  }
}