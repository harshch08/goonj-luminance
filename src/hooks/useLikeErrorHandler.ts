import { useCallback, useState } from 'react'
import { useLikeToast } from '@/components/likes/LikeToastProvider'

export interface LikeError {
  type: 'network' | 'validation' | 'duplicate' | 'session' | 'unknown'
  message: string
  code?: string
  retryable: boolean
}

export interface UseLikeErrorHandlerReturn {
  error: LikeError | null
  clearError: () => void
  handleError: (error: any, artistName?: string) => LikeError
  isRetryable: boolean
}

/**
 * Hook for handling like-related errors with user-friendly messages
 */
export const useLikeErrorHandler = (): UseLikeErrorHandlerReturn => {
  const [error, setError] = useState<LikeError | null>(null)
  const { showLikeError, showLikeWarning, showLikeInfo } = useLikeToast()

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const categorizeError = useCallback((error: any): LikeError => {
    // Network errors
    if (error.message?.includes('fetch') || error.message?.includes('network')) {
      return {
        type: 'network',
        message: 'Network connection failed. Please check your internet connection.',
        retryable: true
      }
    }

    // Duplicate like errors
    if (error.message?.includes('already liked') || error.code === '23505') {
      return {
        type: 'duplicate',
        message: 'You have already liked this artist.',
        retryable: false
      }
    }

    // Validation errors
    if (error.message?.includes('Invalid') || error.message?.includes('validation')) {
      return {
        type: 'validation',
        message: 'Invalid data provided. Please try again.',
        retryable: true
      }
    }

    // Session errors
    if (error.message?.includes('session') || error.message?.includes('Session')) {
      return {
        type: 'session',
        message: 'Session expired. Please refresh the page.',
        retryable: false
      }
    }

    // Database/server errors
    if (error.message?.includes('Database') || error.message?.includes('server')) {
      return {
        type: 'unknown',
        message: 'Server error. Please try again later.',
        retryable: true
      }
    }

    // Generic unknown error
    return {
      type: 'unknown',
      message: error.message || 'An unexpected error occurred.',
      retryable: true
    }
  }, [])

  const handleError = useCallback((error: any, artistName?: string): LikeError => {
    const categorizedError = categorizeError(error)
    setError(categorizedError)

    // Show appropriate toast based on error type
    switch (categorizedError.type) {
      case 'duplicate':
        showLikeInfo(categorizedError.message)
        break
      case 'session':
        showLikeWarning(categorizedError.message)
        break
      case 'network':
      case 'validation':
      case 'unknown':
      default:
        showLikeError(categorizedError.message, artistName)
        break
    }

    return categorizedError
  }, [categorizeError, showLikeError, showLikeWarning, showLikeInfo])

  return {
    error,
    clearError,
    handleError,
    isRetryable: error?.retryable ?? false
  }
}