import { useState, useEffect, useCallback, useRef } from 'react'
import { EnhancedCommentsService, Comment } from '@/lib/services/comments-service-enhanced'
import { useSession } from '@/lib/session'
import { toast } from 'sonner'

export interface UseCommentsOptions {
  enableToasts?: boolean
  autoLoad?: boolean
  limit?: number
}

export interface UseCommentsReturn {
  comments: Comment[]
  commentCount: number
  isLoading: boolean
  isSubmitting: boolean
  error: string | null
  addComment: (text: string, userName?: string) => Promise<void>
  deleteComment: (commentId: number) => Promise<void>
  refresh: () => Promise<void>
  clearError: () => void
}

/**
 * Custom hook for managing artist comments
 */
export const useComments = (
  artistId: number,
  artistName: string,
  options: UseCommentsOptions = {}
): UseCommentsReturn => {
  const {
    enableToasts = true,
    autoLoad = true,
    limit = 50
  } = options

  // State management
  const [comments, setComments] = useState<Comment[]>([])
  const [commentCount, setCommentCount] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(autoLoad)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Session management
  const { sessionId, isReady: sessionReady } = useSession()

  // Refs for cleanup
  const mountedRef = useRef(true)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false
    }
  }, [])

  /**
   * Clear any existing error
   */
  const clearError = useCallback(() => {
    setError(null)
  }, [])

  /**
   * Load comments
   */
  const loadComments = useCallback(async () => {
    if (!sessionReady || !mountedRef.current) return

    try {
      setIsLoading(true)
      setError(null)

      const [commentsResponse, countResponse] = await Promise.all([
        EnhancedCommentsService.getComments(artistId, limit, { cache: true }),
        EnhancedCommentsService.getCommentCount(artistId, { cache: true })
      ])

      if (!mountedRef.current) return

      if (commentsResponse.success && countResponse.success) {
        setComments(commentsResponse.data || [])
        setCommentCount(countResponse.data || 0)
      } else {
        const errorMsg = commentsResponse.error || countResponse.error || 'Failed to load comments'
        setError(errorMsg)
        if (enableToasts) {
          toast.error('Failed to load comments')
        }
      }
    } catch (err) {
      if (!mountedRef.current) return
      
      const errorMsg = err instanceof Error ? err.message : 'Unknown error occurred'
      setError(errorMsg)
      if (enableToasts) {
        toast.error('Failed to load comments')
      }
    } finally {
      if (mountedRef.current) {
        setIsLoading(false)
      }
    }
  }, [artistId, limit, sessionReady, enableToasts])

  /**
   * Refresh comments
   */
  const refresh = useCallback(async () => {
    // Clear cache and reload
    EnhancedCommentsService.clearCache()
    await loadComments()
  }, [loadComments])

  /**
   * Add a new comment
   */
  const addComment = useCallback(async (text: string, userName?: string) => {
    if (!sessionReady || isSubmitting || !mountedRef.current) return

    if (!text.trim()) {
      if (enableToasts) {
        toast.error('Comment cannot be empty')
      }
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await EnhancedCommentsService.addComment({
        artist_id: artistId,
        artist_name: artistName,
        session_id: sessionId,
        user_name: userName,
        comment_text: text.trim()
      }, { cache: false })

      if (!mountedRef.current) return

      if (response.success && response.data) {
        // Add new comment to the top of the list
        setComments(prev => [response.data!, ...prev])
        setCommentCount(prev => prev + 1)
        
        if (enableToasts) {
          toast.success('Comment added!')
        }
      } else {
        throw new Error(response.error || 'Failed to add comment')
      }
    } catch (err) {
      if (!mountedRef.current) return

      const errorMsg = err instanceof Error ? err.message : 'Failed to add comment'
      setError(errorMsg)
      
      if (enableToasts) {
        toast.error('Failed to add comment. Please try again.')
      }
    } finally {
      if (mountedRef.current) {
        setIsSubmitting(false)
      }
    }
  }, [artistId, artistName, sessionId, sessionReady, isSubmitting, enableToasts])

  /**
   * Delete a comment
   */
  const deleteComment = useCallback(async (commentId: number) => {
    if (!sessionReady || !mountedRef.current) return

    try {
      const response = await EnhancedCommentsService.deleteComment(
        commentId,
        sessionId,
        artistId,
        { cache: false }
      )

      if (!mountedRef.current) return

      if (response.success) {
        // Remove comment from list
        setComments(prev => prev.filter(c => c.id !== commentId))
        setCommentCount(prev => Math.max(0, prev - 1))
        
        if (enableToasts) {
          toast.success('Comment deleted')
        }
      } else {
        throw new Error(response.error || 'Failed to delete comment')
      }
    } catch (err) {
      if (!mountedRef.current) return

      const errorMsg = err instanceof Error ? err.message : 'Failed to delete comment'
      setError(errorMsg)
      
      if (enableToasts) {
        toast.error('Failed to delete comment')
      }
    }
  }, [artistId, sessionId, sessionReady, enableToasts])

  // Load comments when session is ready
  useEffect(() => {
    if (sessionReady && autoLoad) {
      loadComments()
    }
  }, [sessionReady, autoLoad, loadComments])

  return {
    comments,
    commentCount,
    isLoading,
    isSubmitting,
    error,
    addComment,
    deleteComment,
    refresh,
    clearError
  }
}
