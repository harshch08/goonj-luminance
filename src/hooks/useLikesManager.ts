import { useState, useEffect, useCallback, useRef } from 'react'
import { useLikes } from './useLikes'
import { useBulkLikes } from './useBulkLikes'
import { useSession } from '@/lib/session'

export interface LikesManagerOptions {
  enableOptimisticUpdates?: boolean
  enableToasts?: boolean
  enableCache?: boolean
  autoRefresh?: boolean
  refreshInterval?: number
}

export interface ArtistConfig {
  id: number
  name: string
}

export interface UseLikesManagerReturn {
  // Individual artist management
  useLikesForArtist: (artistId: number, artistName: string) => ReturnType<typeof useLikes>
  
  // Bulk management
  loadArtists: (artists: ArtistConfig[]) => Promise<void>
  refreshAllArtists: () => Promise<void>
  getArtistLikeCount: (artistId: number) => number
  isArtistLiked: (artistId: number) => boolean
  
  // Global state
  isLoading: boolean
  error: string | null
  clearError: () => void
  
  // Session info
  sessionStats: {
    totalLikes: number
    sessionId: string
    isReady: boolean
  }
}

/**
 * Comprehensive likes management hook that combines individual and bulk functionality
 */
export const useLikesManager = (options: LikesManagerOptions = {}): UseLikesManagerReturn => {
  const {
    enableOptimisticUpdates = true,
    enableToasts = true,
    enableCache = true,
    autoRefresh = false,
    refreshInterval = 5 * 60 * 1000
  } = options

  // Session management
  const session = useSession()
  
  // Bulk likes management
  const bulkLikes = useBulkLikes({
    enableCache,
    autoRefresh,
    refreshInterval
  })

  // Individual likes cache
  const individualLikesRef = useRef<Map<string, ReturnType<typeof useLikes>>>(new Map())
  const [globalError, setGlobalError] = useState<string | null>(null)

  /**
   * Create or get individual likes hook for an artist
   */
  const useLikesForArtist = useCallback((artistId: number, artistName: string) => {
    const key = `${artistId}-${artistName}`
    
    // Check if we already have a hook for this artist
    if (!individualLikesRef.current.has(key)) {
      // This is a bit of a hack since we can't call hooks conditionally
      // In practice, this should be used at the component level
      console.warn('useLikesForArtist should be called at component level, not dynamically')
    }

    return useLikes(artistId, artistName, {
      enableOptimisticUpdates,
      enableToasts,
      cacheEnabled: enableCache
    })
  }, [enableOptimisticUpdates, enableToasts, enableCache])

  /**
   * Load multiple artists for bulk management
   */
  const loadArtists = useCallback(async (artists: ArtistConfig[]) => {
    try {
      setGlobalError(null)
      
      const artistIds = artists.map(a => a.id)
      const artistNames = artists.reduce((acc, artist) => {
        acc[artist.id] = artist.name
        return acc
      }, {} as Record<number, string>)

      await bulkLikes.loadArtists(artistIds, artistNames)
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to load artists'
      setGlobalError(errorMsg)
    }
  }, [bulkLikes])

  /**
   * Refresh all artists data
   */
  const refreshAllArtists = useCallback(async () => {
    try {
      setGlobalError(null)
      await bulkLikes.refreshAll()
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to refresh artists'
      setGlobalError(errorMsg)
    }
  }, [bulkLikes])

  /**
   * Get like count for an artist
   */
  const getArtistLikeCount = useCallback((artistId: number): number => {
    const artistData = bulkLikes.getArtistData(artistId)
    return artistData?.likeCount || 0
  }, [bulkLikes])

  /**
   * Check if an artist is liked
   */
  const isArtistLiked = useCallback((artistId: number): boolean => {
    // Check bulk data first, then session
    const artistData = bulkLikes.getArtistData(artistId)
    if (artistData) {
      return artistData.isLiked
    }
    
    // Fallback to session data
    return session.hasLikedArtist(artistId)
  }, [bulkLikes, session])

  /**
   * Clear all errors
   */
  const clearError = useCallback(() => {
    setGlobalError(null)
    bulkLikes.clearError()
  }, [bulkLikes])

  /**
   * Get session statistics
   */
  const sessionStats = {
    totalLikes: session.getTotalLikes(),
    sessionId: session.sessionId,
    isReady: session.isReady
  }

  // Sync global error with bulk likes error
  useEffect(() => {
    if (bulkLikes.error && !globalError) {
      setGlobalError(bulkLikes.error)
    }
  }, [bulkLikes.error, globalError])

  return {
    useLikesForArtist,
    loadArtists,
    refreshAllArtists,
    getArtistLikeCount,
    isArtistLiked,
    isLoading: bulkLikes.isLoading,
    error: globalError || bulkLikes.error,
    clearError,
    sessionStats
  }
}