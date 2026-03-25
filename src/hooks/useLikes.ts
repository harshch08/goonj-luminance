import { useState, useEffect, useCallback, useRef } from 'react'
import { EnhancedLikesService } from '@/lib/services'
import { LikesCacheService } from '@/lib/services/likes-cache'
import { useSession } from '@/lib/session'
import { toast } from 'sonner'

export interface UseLikesOptions {
  enableOptimisticUpdates?: boolean
  enableToasts?: boolean
  retryAttempts?: number
  cacheEnabled?: boolean
  skipInitialLoad?: boolean
}

export interface UseLikesReturn {
  likeCount: number
  isLiked: boolean
  isLoading: boolean
  error: string | null
  handleLike: () => Promise<void>
  refresh: () => Promise<void>
  clearError: () => void
}

/**
 * Custom hook for managing artist likes with real-time local storage updates
 */
export const useLikes = (
  artistId: number,
  artistName: string,
  options: UseLikesOptions = {}
): UseLikesReturn => {
  const {
    enableOptimisticUpdates = true,
    enableToasts = true,
    retryAttempts = 3,
    cacheEnabled = true,
    skipInitialLoad = false
  } = options

  // State management
  const [likeCount, setLikeCount] = useState<number>(() => {
    // Initialize from cache if available
    const cached = LikesCacheService.getLikeCount(artistId)
    return cached ?? 0
  })
  const [isLiked, setIsLiked] = useState<boolean>(() => {
    // Initialize from cache if available
    return LikesCacheService.hasUserLiked(artistId)
  })
  const [isLoading, setIsLoading] = useState<boolean>(!skipInitialLoad)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  // Session management
  const { sessionId, hasLikedArtist, setArtistLiked, isReady: sessionReady } = useSession()

  // Refs for cleanup and preventing stale closures
  const mountedRef = useRef(true)
  const retryTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false
      if (retryTimeoutRef.current) {
        clearTimeout(retryTimeoutRef.current)
      }
    }
  }, [])

  /**
   * Subscribe to cache updates for real-time sync
   */
  useEffect(() => {
    const unsubscribe = LikesCacheService.subscribe((data) => {
      if (mountedRef.current) {
        const newCount = data.counts[artistId]
        if (newCount !== undefined && newCount !== likeCount) {
          setLikeCount(newCount)
        }
        
        const newLiked = data.userLikes.includes(artistId)
        if (newLiked !== isLiked) {
          setIsLiked(newLiked)
        }
      }
    })

    return unsubscribe
  }, [artistId, likeCount, isLiked])

  /**
   * Clear any existing error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Load initial like data
   */
  const loadLikeData = useCallback(async () => {
    if (!sessionReady || !mountedRef.current) return

    try {
      setIsLoading(true)
      setError(null)

      // Check cache first for instant display
      const cachedCount = LikesCacheService.getLikeCount(artistId)
      const cachedLiked = LikesCacheService.hasUserLiked(artistId)
      
      if (cachedCount !== null) {
        setLikeCount(cachedCount)
        setIsLiked(cachedLiked || hasLikedArtist(artistId))
      }

      // Load from database for accuracy
      const [countResponse, likedResponse] = await Promise.all([
        EnhancedLikesService.getLikeCount(artistId, { cache: cacheEnabled }),
        EnhancedLikesService.checkIfLiked(artistId, sessionId, { cache: cacheEnabled })
      ])

      if (!mountedRef.current) return

      if (countResponse.success && likedResponse.success) {
        const dbCount = countResponse.data || 0
        const dbLiked = likedResponse.data || false
        const sessionLiked = hasLikedArtist(artistId)
        const finalLiked = dbLiked || sessionLiked || cachedLiked
        
        // Update state
        setLikeCount(dbCount)
        setIsLiked(finalLiked)
        
        // Update cache
        LikesCacheService.updateLikeCount(artistId, dbCount)
        if (finalLiked) {
          LikesCacheService.markAsLiked(artistId)
        }
      } else {
        const errorMsg = countResponse.error || likedResponse.error || 'Failed to load like data'
        setError(errorMsg)
        if (enableToasts) {
          toast.error('Failed to load like data')
        }
      }
    } catch (err) {
      if (!mountedRef.current) return
      
      const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMsg)
      if (enableToasts) {
        toast.error('Failed to load like data')
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [artistId, sessionId, sessionReady, hasLikedArtist, cacheEnabled, enableToasts])

  /**
   * Refresh like data
   */
  const refresh = useCallback(async () => {
    await loadLikeData()
  }, [loadLikeData])

  /**
   * Handle like action with instant local storage updates
   */
  const handleLike = useCallback(async () => {
    if (!sessionReady || isSubmitting || !mountedRef.current) return

    // Prevent double-clicking
    if (isLiked) {
      if (enableToasts) {
        toast.info('You have already liked this artist')
      }
      return
    }

    setIsSubmitting(true)
    setError(null)

    // Store original state for rollback
    const originalCount = likeCount
    const originalLiked = isLiked

    // INSTANT UPDATE: Update local storage and UI immediately
    const newCount = LikesCacheService.incrementLikeCount(artistId)
    LikesCacheService.markAsLiked(artistId)
    setLikeCount(newCount)
    setIsLiked(true)
    setArtistLiked(artistId)

    let attempt = 0
    const maxAttempts = retryAttempts

    const attemptLike = async (): Promise<void> => {
      attempt++
      
      try {
        const response = await EnhancedLikesService.addLike(
          artistId,
          artistName,
          sessionId,
          { retries: 1, cache: false }
        )

        if (!mountedRef.current) return

        if (response.success) {
          // Success - sync with database count
          const countResponse = await EnhancedLikesService.getLikeCount(artistId, { cache: false })
          if (countResponse.success && mountedRef.current) {
            const dbCount = countResponse.data || newCount
            setLikeCount(dbCount)
            LikesCacheService.updateLikeCount(artistId, dbCount)
          }
          
          if (enableToasts) {
            toast.success(`Liked ${artistName}!`)
          }
        } else {
          throw new Error(response.error || 'Failed to add like')
        }
      } catch (err) {
        if (!mountedRef.current) return

        const errorMsg = err instanceof Error ? err.message : 'Failed to like artist'
        
        // Check if it's a duplicate like error
        if (errorMsg.includes('already liked')) {
          // Keep the optimistic update
          if (enableToasts) {
            toast.info('You have already liked this artist')
          }
          return
        }

        // Retry logic
        if (attempt < maxAttempts) {
          const delay = Math.min(1000 * Math.pow(2, attempt - 1), 5000)
          
          if (enableToasts && attempt === 1) {
            toast.loading(`Retrying... (${attempt}/${maxAttempts})`)
          }

          retryTimeoutRef.current = setTimeout(() => {
            if (mountedRef.current) {
              attemptLike()
            }
          }, delay)
          return
        }

        // All retries failed - rollback
        setLikeCount(originalCount)
        setIsLiked(originalLiked)
        LikesCacheService.updateLikeCount(artistId, originalCount)

        setError(errorMsg)
        
        if (enableToasts) {
          toast.error('Failed to like artist. Please try again.')
        }
      }
    }

    try {
      await attemptLike()
    } finally {
      if (mountedRef.current) {
        setIsSubmitting(false)
      }
    }
  }, [
    artistId,
    artistName,
    sessionId,
    sessionReady,
    isSubmitting,
    isLiked,
    likeCount,
    setArtistLiked,
    enableOptimisticUpdates,
    enableToasts,
    retryAttempts
  ])

  // Load initial data when session is ready
  useEffect(() => {
    if (sessionReady && !skipInitialLoad) {
      loadLikeData()
    }
  }, [sessionReady, loadLikeData, skipInitialLoad])

  // Update liked status when session changes
  useEffect(() => {
    if (sessionReady) {
      const sessionLiked = hasLikedArtist(artistId)
      const cachedLiked = LikesCacheService.hasUserLiked(artistId)
      if ((sessionLiked || cachedLiked) && !isLiked) {
        setIsLiked(true)
      }
    }
  }, [sessionReady, hasLikedArtist, artistId, isLiked])

  return {
    likeCount,
    isLiked,
    isLoading: isLoading || isSubmitting,
    error,
    handleLike,
    refresh,
    clearError
  }
}