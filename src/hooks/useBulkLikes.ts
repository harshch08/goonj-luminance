import { useState, useEffect, useCallback, useRef } from 'react'
import { EnhancedLikesService } from '@/lib/services'
import { LikesCacheService } from '@/lib/services/likes-cache'
import { useSession } from '@/lib/session'

export interface ArtistLikeData {
  artistId: number
  artistName: string
  likeCount: number
  isLiked: boolean
}

export interface UseBulkLikesOptions {
  enableCache?: boolean
  autoRefresh?: boolean
  refreshInterval?: number // in milliseconds
}

export interface UseBulkLikesReturn {
  artistsData: Map<number, ArtistLikeData>
  isLoading: boolean
  error: string | null
  loadArtists: (artistIds: number[], artistNames: Record<number, string>) => Promise<void>
  refreshArtist: (artistId: number) => Promise<void>
  refreshAll: () => Promise<void>
  getArtistData: (artistId: number) => ArtistLikeData | null
  clearError: () => void
}

/**
 * Custom hook for managing likes for multiple artists with real-time local storage sync
 */
export const useBulkLikes = (options: UseBulkLikesOptions = {}): UseBulkLikesReturn => {
  const {
    enableCache = true,
    autoRefresh = false,
    refreshInterval = 5 * 60 * 1000 // 5 minutes
  } = options

  // State management - Initialize from cache
  const [artistsData, setArtistsData] = useState<Map<number, ArtistLikeData>>(() => {
    const cachedCounts = LikesCacheService.getAllCounts()
    const initialMap = new Map<number, ArtistLikeData>()
    
    Object.entries(cachedCounts).forEach(([id, count]) => {
      const artistId = parseInt(id)
      initialMap.set(artistId, {
        artistId,
        artistName: `Artist ${artistId}`,
        likeCount: count,
        isLiked: LikesCacheService.hasUserLiked(artistId)
      })
    })
    
    return initialMap
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Session management
  const { sessionId, hasLikedArtist, isReady: sessionReady } = useSession()

  // Refs for cleanup
  const mountedRef = useRef(true)
  const refreshTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const currentArtistIds = useRef<number[]>([])
  const currentArtistNames = useRef<Record<number, string>>({})

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
    }
  }, [])

  /**
   * Subscribe to cache updates for real-time sync across all artists
   */
  useEffect(() => {
    const unsubscribe = LikesCacheService.subscribe((data) => {
      if (mountedRef.current) {
        setArtistsData(prevData => {
          const newData = new Map(prevData)
          let hasChanges = false

          // Update counts from cache
          Object.entries(data.counts).forEach(([id, count]) => {
            const artistId = parseInt(id)
            const existing = newData.get(artistId)
            
            if (existing && existing.likeCount !== count) {
              newData.set(artistId, { ...existing, likeCount: count })
              hasChanges = true
            }
          })

          // Update liked status from cache
          newData.forEach((artistData, artistId) => {
            const isLiked = data.userLikes.includes(artistId)
            if (artistData.isLiked !== isLiked) {
              newData.set(artistId, { ...artistData, isLiked })
              hasChanges = true
            }
          })

          return hasChanges ? newData : prevData
        })
      }
    })

    return unsubscribe
  }, [])

  /**
   * Clear any existing error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Get artist data by ID
   */
  const getArtistData = useCallback((artistId: number): ArtistLikeData | null => {
    return artistsData.get(artistId) || null
  }, [artistsData])

  /**
   * Load like data for multiple artists
   */
  const loadArtists = useCallback(async (
    artistIds: number[], 
    artistNames: Record<number, string>
  ) => {
    if (!sessionReady || !mountedRef.current || artistIds.length === 0) return

    // Store current artists for auto-refresh
    currentArtistIds.current = artistIds
    currentArtistNames.current = artistNames

    try {
      setIsLoading(true)
      setError(null)

      // First, display cached data immediately
      const cachedCounts = LikesCacheService.getAllCounts()
      const cachedData = new Map<number, ArtistLikeData>()
      
      artistIds.forEach(artistId => {
        const artistName = artistNames[artistId] || `Artist ${artistId}`
        const cachedCount = cachedCounts[artistId]
        const isLiked = LikesCacheService.hasUserLiked(artistId) || hasLikedArtist(artistId)
        
        if (cachedCount !== undefined) {
          cachedData.set(artistId, {
            artistId,
            artistName,
            likeCount: cachedCount,
            isLiked
          })
        }
      })
      
      if (cachedData.size > 0) {
        setArtistsData(cachedData)
      }

      // Then load from database for accuracy
      const countsResponse = await EnhancedLikesService.getAllLikeCounts({
        cache: enableCache
      })

      if (!mountedRef.current) return

      if (countsResponse.success && countsResponse.data) {
        const { counts } = countsResponse.data
        const newArtistsData = new Map<number, ArtistLikeData>()

        // Process each artist
        for (const artistId of artistIds) {
          const artistName = artistNames[artistId] || `Artist ${artistId}`
          const likeCount = counts[artistId] || 0
          const isLiked = hasLikedArtist(artistId) || LikesCacheService.hasUserLiked(artistId)

          newArtistsData.set(artistId, {
            artistId,
            artistName,
            likeCount,
            isLiked
          })
        }

        setArtistsData(newArtistsData)
        
        // Update cache with fresh data
        LikesCacheService.bulkUpdateCounts(counts)
        
        // Sync user likes to cache
        const likedIds = artistIds.filter(id => hasLikedArtist(id))
        if (likedIds.length > 0) {
          LikesCacheService.syncUserLikes(likedIds)
        }
      } else {
        throw new Error(countsResponse.error || 'Failed to load like counts')
      }
    } catch (err) {
      if (!mountedRef.current) return
      
      const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMsg)
      
      // Use cached data as fallback if available, otherwise create fallback data
      if (artistsData.size === 0) {
        const fallbackData = new Map<number, ArtistLikeData>()
        for (const artistId of artistIds) {
          const artistName = artistNames[artistId] || `Artist ${artistId}`
          const cachedCount = LikesCacheService.getLikeCount(artistId)
          
          fallbackData.set(artistId, {
            artistId,
            artistName,
            likeCount: cachedCount ?? 0,
            isLiked: hasLikedArtist(artistId) || LikesCacheService.hasUserLiked(artistId)
          })
        }
        setArtistsData(fallbackData)
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [sessionReady, hasLikedArtist, enableCache, artistsData.size])

  /**
   * Refresh data for a specific artist
   */
  const refreshArtist = useCallback(async (artistId: number) => {
    if (!sessionReady || !mountedRef.current) return

    const currentData = artistsData.get(artistId)
    if (!currentData) return

    try {
      const countResponse = await EnhancedLikesService.getLikeCount(artistId, { 
        cache: false 
      })

      if (!mountedRef.current) return

      if (countResponse.success) {
        const newCount = countResponse.data || 0
        const updatedData = {
          ...currentData,
          likeCount: newCount,
          isLiked: hasLikedArtist(artistId) || LikesCacheService.hasUserLiked(artistId)
        }

        setArtistsData(prev => new Map(prev.set(artistId, updatedData)))
        
        // Update cache
        LikesCacheService.updateLikeCount(artistId, newCount)
      }
    } catch (err) {
      console.warn(`Failed to refresh artist ${artistId}:`, err)
    }
  }, [sessionReady, artistsData, hasLikedArtist])

  /**
   * Refresh all artists data
   */
  const refreshAll = useCallback(async () => {
    if (currentArtistIds.current.length > 0) {
      await loadArtists(currentArtistIds.current, currentArtistNames.current)
    }
  }, [loadArtists])

  /**
   * Update artist data when session changes
   */
  useEffect(() => {
    if (sessionReady && artistsData.size > 0) {
      const updatedData = new Map(artistsData)
      let hasChanges = false

      for (const [artistId, data] of updatedData) {
        const sessionLiked = hasLikedArtist(artistId)
        const cachedLiked = LikesCacheService.hasUserLiked(artistId)
        const finalLiked = sessionLiked || cachedLiked
        
        if (data.isLiked !== finalLiked) {
          updatedData.set(artistId, { ...data, isLiked: finalLiked })
          hasChanges = true
        }
      }

      if (hasChanges) {
        setArtistsData(updatedData)
      }
    }
  }, [sessionReady, hasLikedArtist, artistsData])

  /**
   * Auto-refresh functionality
   */
  useEffect(() => {
    if (!autoRefresh || !sessionReady || currentArtistIds.current.length === 0) {
      return
    }

    const scheduleRefresh = () => {
      refreshTimeoutRef.current = setTimeout(() => {
        if (mountedRef.current) {
          refreshAll().finally(() => {
            if (mountedRef.current) {
              scheduleRefresh()
            }
          })
        }
      }, refreshInterval)
    }

    scheduleRefresh()

    return () => {
      if (refreshTimeoutRef.current) {
        clearTimeout(refreshTimeoutRef.current)
      }
    }
  }, [autoRefresh, sessionReady, refreshInterval, refreshAll])

  return {
    artistsData,
    isLoading,
    error,
    loadArtists,
    refreshArtist,
    refreshAll,
    getArtistData,
    clearError
  }
}