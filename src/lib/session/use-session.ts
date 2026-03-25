import { useState, useEffect, useCallback, useRef } from 'react'
import { SessionManager } from './session-manager'

/**
 * React hook for managing user session and like tracking
 */
export const useSession = () => {
  const sessionManagerRef = useRef<SessionManager | null>(null)
  const [isReady, setIsReady] = useState(false)
  const [sessionId, setSessionId] = useState<string>('')
  const [likedArtists, setLikedArtists] = useState<Set<number>>(new Set())

  // Initialize session manager
  useEffect(() => {
    if (!SessionManager.isStorageAvailable()) {
      console.warn('localStorage is not available, session management will be limited')
    }

    sessionManagerRef.current = new SessionManager()
    setSessionId(sessionManagerRef.current.getSessionId())
    setLikedArtists(new Set(sessionManagerRef.current.getLikedArtists()))
    setIsReady(true)
  }, [])

  /**
   * Check if an artist is liked in the current session
   */
  const hasLikedArtist = useCallback((artistId: number): boolean => {
    if (!sessionManagerRef.current) return false
    return sessionManagerRef.current.hasLikedArtist(artistId)
  }, [])

  /**
   * Mark an artist as liked
   */
  const setArtistLiked = useCallback((artistId: number): boolean => {
    if (!sessionManagerRef.current) return false
    
    const success = sessionManagerRef.current.setArtistLiked(artistId)
    if (success) {
      setLikedArtists(new Set(sessionManagerRef.current.getLikedArtists()))
    }
    return success
  }, [])

  /**
   * Remove an artist from liked list
   */
  const removeArtistLike = useCallback((artistId: number): void => {
    if (!sessionManagerRef.current) return
    
    sessionManagerRef.current.removeArtistLike(artistId)
    setLikedArtists(new Set(sessionManagerRef.current.getLikedArtists()))
  }, [])

  /**
   * Get all liked artists
   */
  const getLikedArtists = useCallback((): number[] => {
    if (!sessionManagerRef.current) return []
    return sessionManagerRef.current.getLikedArtists()
  }, [])

  /**
   * Get session statistics
   */
  const getSessionStats = useCallback(() => {
    if (!sessionManagerRef.current) return null
    return sessionManagerRef.current.getSessionStats()
  }, [])

  /**
   * Clear the current session
   */
  const clearSession = useCallback(() => {
    if (!sessionManagerRef.current) return
    
    sessionManagerRef.current.clearSession()
    setSessionId(sessionManagerRef.current.getSessionId())
    setLikedArtists(new Set())
  }, [])

  /**
   * Check if session is expired
   */
  const isSessionExpired = useCallback((): boolean => {
    if (!sessionManagerRef.current) return true
    const stats = sessionManagerRef.current.getSessionStats()
    return stats.isExpired
  }, [])

  /**
   * Get total number of likes in session
   */
  const getTotalLikes = useCallback((): number => {
    return likedArtists.size
  }, [likedArtists])

  return {
    // State
    isReady,
    sessionId,
    likedArtists,
    
    // Methods
    hasLikedArtist,
    setArtistLiked,
    removeArtistLike,
    getLikedArtists,
    getSessionStats,
    clearSession,
    isSessionExpired,
    getTotalLikes,
    
    // Utilities
    isStorageAvailable: SessionManager.isStorageAvailable()
  }
}