import { SessionManager } from './session-manager'

/**
 * Utility functions for session management and validation
 */

export interface SessionValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface SessionCleanupResult {
  cleaned: boolean
  itemsRemoved: number
  errors: string[]
}

/**
 * Validate session ID format
 */
export const validateSessionId = (sessionId: string): boolean => {
  if (!sessionId || typeof sessionId !== 'string') {
    return false
  }

  // Session ID should match the format: session_timestamp_random
  const sessionIdPattern = /^session_[a-z0-9]+_[a-z0-9]+$/
  return sessionIdPattern.test(sessionId)
}

/**
 * Validate session data structure
 */
export const validateSessionData = (sessionData: any): SessionValidationResult => {
  const errors: string[] = []
  const warnings: string[] = []

  // Check required fields
  if (!sessionData) {
    errors.push('Session data is null or undefined')
    return { isValid: false, errors, warnings }
  }

  if (!sessionData.sessionId) {
    errors.push('Session ID is missing')
  } else if (!validateSessionId(sessionData.sessionId)) {
    errors.push('Session ID format is invalid')
  }

  if (!sessionData.createdAt) {
    errors.push('Created timestamp is missing')
  } else {
    const createdAt = new Date(sessionData.createdAt)
    if (isNaN(createdAt.getTime())) {
      errors.push('Created timestamp is invalid')
    }
  }

  if (!sessionData.lastActivity) {
    errors.push('Last activity timestamp is missing')
  } else {
    const lastActivity = new Date(sessionData.lastActivity)
    if (isNaN(lastActivity.getTime())) {
      errors.push('Last activity timestamp is invalid')
    }
  }

  if (!Array.isArray(sessionData.likedArtists)) {
    errors.push('Liked artists must be an array')
  } else {
    // Validate artist IDs
    const invalidArtists = sessionData.likedArtists.filter((id: any) => 
      !Number.isInteger(id) || id <= 0
    )
    
    if (invalidArtists.length > 0) {
      errors.push(`Invalid artist IDs found: ${invalidArtists.join(', ')}`)
    }

    // Check for reasonable limits
    if (sessionData.likedArtists.length > 1000) {
      warnings.push('Session has an unusually high number of liked artists')
    }

    // Check for duplicates
    const uniqueArtists = new Set(sessionData.likedArtists)
    if (uniqueArtists.size !== sessionData.likedArtists.length) {
      warnings.push('Session contains duplicate artist likes')
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  }
}

/**
 * Clean up expired or invalid sessions from localStorage
 */
export const cleanupExpiredSessions = (): SessionCleanupResult => {
  const result: SessionCleanupResult = {
    cleaned: false,
    itemsRemoved: 0,
    errors: []
  }

  try {
    const keysToRemove: string[] = []
    
    // Check all localStorage keys for session-related data
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key || !key.includes('like_session')) continue

      try {
        const data = localStorage.getItem(key)
        if (!data) continue

        const sessionData = JSON.parse(data)
        const validation = validateSessionData(sessionData)
        
        if (!validation.isValid) {
          keysToRemove.push(key)
          continue
        }

        // Check if session is expired
        const lastActivity = new Date(sessionData.lastActivity)
        const now = new Date()
        const sessionDuration = 24 * 60 * 60 * 1000 // 24 hours
        
        if (now.getTime() - lastActivity.getTime() > sessionDuration) {
          keysToRemove.push(key)
        }
      } catch (error) {
        // Invalid JSON or other parsing error
        keysToRemove.push(key!)
        result.errors.push(`Failed to parse session data for key ${key}: ${error}`)
      }
    }

    // Remove expired/invalid sessions
    keysToRemove.forEach(key => {
      try {
        localStorage.removeItem(key)
        result.itemsRemoved++
      } catch (error) {
        result.errors.push(`Failed to remove key ${key}: ${error}`)
      }
    })

    result.cleaned = true
  } catch (error) {
    result.errors.push(`Cleanup failed: ${error}`)
  }

  return result
}

/**
 * Get session storage usage statistics
 */
export const getSessionStorageStats = (): {
  totalSessions: number
  totalStorageUsed: number
  averageSessionSize: number
  oldestSession: Date | null
  newestSession: Date | null
} => {
  let totalSessions = 0
  let totalStorageUsed = 0
  let oldestSession: Date | null = null
  let newestSession: Date | null = null

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key || !key.includes('like_session')) continue

      const data = localStorage.getItem(key)
      if (!data) continue

      totalStorageUsed += data.length
      totalSessions++

      try {
        const sessionData = JSON.parse(data)
        const createdAt = new Date(sessionData.createdAt)
        
        if (!isNaN(createdAt.getTime())) {
          if (!oldestSession || createdAt < oldestSession) {
            oldestSession = createdAt
          }
          if (!newestSession || createdAt > newestSession) {
            newestSession = createdAt
          }
        }
      } catch {
        // Skip invalid session data
      }
    }
  } catch (error) {
    console.warn('Failed to get session storage stats:', error)
  }

  return {
    totalSessions,
    totalStorageUsed,
    averageSessionSize: totalSessions > 0 ? Math.round(totalStorageUsed / totalSessions) : 0,
    oldestSession,
    newestSession
  }
}

/**
 * Export session data for debugging or migration
 */
export const exportSessionData = (): {
  sessions: any[]
  exportedAt: Date
  totalSessions: number
} => {
  const sessions: any[] = []
  const exportedAt = new Date()

  try {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)
      if (!key || !key.includes('like_session')) continue

      const data = localStorage.getItem(key)
      if (!data) continue

      try {
        const sessionData = JSON.parse(data)
        sessions.push({
          key,
          ...sessionData,
          validation: validateSessionData(sessionData)
        })
      } catch (error) {
        sessions.push({
          key,
          error: `Failed to parse: ${error}`,
          rawData: data
        })
      }
    }
  } catch (error) {
    console.warn('Failed to export session data:', error)
  }

  return {
    sessions,
    exportedAt,
    totalSessions: sessions.length
  }
}

/**
 * Initialize session cleanup on app start
 */
export const initializeSessionCleanup = (): void => {
  // Clean up expired sessions on initialization
  const cleanup = cleanupExpiredSessions()
  
  if (cleanup.itemsRemoved > 0) {
    console.log(`Cleaned up ${cleanup.itemsRemoved} expired sessions`)
  }

  if (cleanup.errors.length > 0) {
    console.warn('Session cleanup errors:', cleanup.errors)
  }
}