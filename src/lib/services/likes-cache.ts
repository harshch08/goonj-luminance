/**
 * Local Storage Cache Service for Artist Likes
 * Provides instant UI updates while syncing with database
 */

const CACHE_KEY = 'artist_likes_cache'
const CACHE_VERSION = '1.0'
const CACHE_EXPIRY = 24 * 60 * 60 * 1000 // 24 hours

export interface LikeCacheData {
  counts: Record<number, number>
  userLikes: number[]
  lastUpdated: number
  version: string
}

export class LikesCacheService {
  /**
   * Get the cache data from local storage
   */
  static getCache(): LikeCacheData | null {
    try {
      const cached = localStorage.getItem(CACHE_KEY)
      if (!cached) return null

      const data: LikeCacheData = JSON.parse(cached)
      
      // Check version and expiry
      if (data.version !== CACHE_VERSION) {
        this.clearCache()
        return null
      }

      if (Date.now() - data.lastUpdated > CACHE_EXPIRY) {
        this.clearCache()
        return null
      }

      return data
    } catch (error) {
      console.warn('Error reading likes cache:', error)
      return null
    }
  }

  /**
   * Save cache data to local storage
   */
  static saveCache(data: Partial<LikeCacheData>): void {
    try {
      const current = this.getCache() || {
        counts: {},
        userLikes: [],
        lastUpdated: Date.now(),
        version: CACHE_VERSION
      }

      const updated: LikeCacheData = {
        ...current,
        ...data,
        lastUpdated: Date.now(),
        version: CACHE_VERSION
      }

      localStorage.setItem(CACHE_KEY, JSON.stringify(updated))
      
      // Dispatch custom event for cross-tab sync
      window.dispatchEvent(new CustomEvent('likesUpdated', { detail: updated }))
    } catch (error) {
      console.warn('Error saving likes cache:', error)
    }
  }

  /**
   * Get like count for a specific artist from cache
   */
  static getLikeCount(artistId: number): number | null {
    const cache = this.getCache()
    if (!cache) return null
    
    return cache.counts[artistId] ?? null
  }

  /**
   * Update like count for a specific artist
   */
  static updateLikeCount(artistId: number, count: number): void {
    const cache = this.getCache() || {
      counts: {},
      userLikes: [],
      lastUpdated: Date.now(),
      version: CACHE_VERSION
    }

    cache.counts[artistId] = count
    this.saveCache(cache)
  }

  /**
   * Increment like count for an artist (optimistic update)
   */
  static incrementLikeCount(artistId: number): number {
    const cache = this.getCache() || {
      counts: {},
      userLikes: [],
      lastUpdated: Date.now(),
      version: CACHE_VERSION
    }

    const currentCount = cache.counts[artistId] || 0
    const newCount = currentCount + 1
    
    cache.counts[artistId] = newCount
    this.saveCache(cache)
    
    return newCount
  }

  /**
   * Check if user has liked an artist (from cache)
   */
  static hasUserLiked(artistId: number): boolean {
    const cache = this.getCache()
    if (!cache) return false
    
    return cache.userLikes.includes(artistId)
  }

  /**
   * Mark artist as liked by user
   */
  static markAsLiked(artistId: number): void {
    const cache = this.getCache() || {
      counts: {},
      userLikes: [],
      lastUpdated: Date.now(),
      version: CACHE_VERSION
    }

    if (!cache.userLikes.includes(artistId)) {
      cache.userLikes.push(artistId)
      this.saveCache(cache)
    }
  }

  /**
   * Bulk update like counts
   */
  static bulkUpdateCounts(counts: Record<number, number>): void {
    const cache = this.getCache() || {
      counts: {},
      userLikes: [],
      lastUpdated: Date.now(),
      version: CACHE_VERSION
    }

    cache.counts = { ...cache.counts, ...counts }
    this.saveCache(cache)
  }

  /**
   * Sync user likes from session
   */
  static syncUserLikes(likedArtistIds: number[]): void {
    const cache = this.getCache() || {
      counts: {},
      userLikes: [],
      lastUpdated: Date.now(),
      version: CACHE_VERSION
    }

    cache.userLikes = [...new Set([...cache.userLikes, ...likedArtistIds])]
    this.saveCache(cache)
  }

  /**
   * Clear the cache
   */
  static clearCache(): void {
    try {
      localStorage.removeItem(CACHE_KEY)
    } catch (error) {
      console.warn('Error clearing likes cache:', error)
    }
  }

  /**
   * Get all cached counts
   */
  static getAllCounts(): Record<number, number> {
    const cache = this.getCache()
    return cache?.counts || {}
  }

  /**
   * Subscribe to cache updates (for cross-tab sync)
   */
  static subscribe(callback: (data: LikeCacheData) => void): () => void {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<LikeCacheData>
      callback(customEvent.detail)
    }

    window.addEventListener('likesUpdated', handler)
    
    // Also listen to storage events for cross-tab sync
    const storageHandler = (event: StorageEvent) => {
      if (event.key === CACHE_KEY && event.newValue) {
        try {
          const data = JSON.parse(event.newValue) as LikeCacheData
          callback(data)
        } catch (error) {
          console.warn('Error parsing storage event:', error)
        }
      }
    }
    
    window.addEventListener('storage', storageHandler)

    // Return cleanup function
    return () => {
      window.removeEventListener('likesUpdated', handler)
      window.removeEventListener('storage', storageHandler)
    }
  }
}
