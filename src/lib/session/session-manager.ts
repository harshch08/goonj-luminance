/**
 * Session management for tracking user likes without authentication
 * Uses localStorage to persist session data across browser sessions
 */

export interface LikeSession {
  sessionId: string
  likedArtists: Set<number>
  createdAt: Date
  lastActivity: Date
}

export interface SessionConfig {
  storageKey: string
  sessionDuration: number // in milliseconds
  maxLikedArtists: number
}

export class SessionManager {
  private static readonly DEFAULT_CONFIG: SessionConfig = {
    storageKey: 'goonj_like_session',
    sessionDuration: 24 * 60 * 60 * 1000, // 24 hours
    maxLikedArtists: 1000 // Reasonable limit to prevent abuse
  }

  private config: SessionConfig
  private session: LikeSession | null = null

  constructor(config: Partial<SessionConfig> = {}) {
    this.config = { ...SessionManager.DEFAULT_CONFIG, ...config }
    this.loadSession()
  }

  /**
   * Generate a unique session ID
   */
  private generateSessionId(): string {
    const timestamp = Date.now().toString(36)
    const randomPart = Math.random().toString(36).substring(2, 15)
    return `session_${timestamp}_${randomPart}`
  }

  /**
   * Load session from localStorage
   */
  private loadSession(): void {
    try {
      const stored = localStorage.getItem(this.config.storageKey)
      if (!stored) {
        this.createNewSession()
        return
      }

      const parsed = JSON.parse(stored)
      const createdAt = new Date(parsed.createdAt)
      const lastActivity = new Date(parsed.lastActivity)
      
      // Check if session has expired
      const now = new Date()
      if (now.getTime() - lastActivity.getTime() > this.config.sessionDuration) {
        this.createNewSession()
        return
      }

      // Restore session
      this.session = {
        sessionId: parsed.sessionId,
        likedArtists: new Set(parsed.likedArtists || []),
        createdAt,
        lastActivity
      }

      // Update last activity
      this.updateLastActivity()
    } catch (error) {
      console.warn('Failed to load session from localStorage:', error)
      this.createNewSession()
    }
  }

  /**
   * Save session to localStorage
   */
  private saveSession(): void {
    if (!this.session) return

    try {
      const sessionData = {
        sessionId: this.session.sessionId,
        likedArtists: Array.from(this.session.likedArtists),
        createdAt: this.session.createdAt.toISOString(),
        lastActivity: this.session.lastActivity.toISOString()
      }

      localStorage.setItem(this.config.storageKey, JSON.stringify(sessionData))
    } catch (error) {
      console.warn('Failed to save session to localStorage:', error)
    }
  }

  /**
   * Create a new session
   */
  private createNewSession(): void {
    const now = new Date()
    this.session = {
      sessionId: this.generateSessionId(),
      likedArtists: new Set(),
      createdAt: now,
      lastActivity: now
    }
    this.saveSession()
  }

  /**
   * Update last activity timestamp
   */
  private updateLastActivity(): void {
    if (!this.session) return

    this.session.lastActivity = new Date()
    this.saveSession()
  }

  /**
   * Get the current session ID
   */
  getSessionId(): string {
    if (!this.session) {
      this.createNewSession()
    }
    return this.session!.sessionId
  }

  /**
   * Check if an artist has been liked in this session
   */
  hasLikedArtist(artistId: number): boolean {
    if (!this.session) return false
    return this.session.likedArtists.has(artistId)
  }

  /**
   * Mark an artist as liked in this session
   */
  setArtistLiked(artistId: number): boolean {
    if (!this.session) {
      this.createNewSession()
    }

    // Check if we've reached the maximum number of liked artists
    if (this.session!.likedArtists.size >= this.config.maxLikedArtists) {
      console.warn('Maximum number of liked artists reached for this session')
      return false
    }

    this.session!.likedArtists.add(artistId)
    this.updateLastActivity()
    return true
  }

  /**
   * Remove an artist from liked list (for unlike functionality if needed)
   */
  removeArtistLike(artistId: number): void {
    if (!this.session) return

    this.session.likedArtists.delete(artistId)
    this.updateLastActivity()
  }

  /**
   * Get all liked artists in this session
   */
  getLikedArtists(): number[] {
    if (!this.session) return []
    return Array.from(this.session.likedArtists)
  }

  /**
   * Get session statistics
   */
  getSessionStats(): {
    sessionId: string
    totalLikes: number
    createdAt: Date
    lastActivity: Date
    sessionAge: number // in milliseconds
    isExpired: boolean
  } {
    if (!this.session) {
      this.createNewSession()
    }

    const now = new Date()
    const sessionAge = now.getTime() - this.session!.createdAt.getTime()
    const isExpired = now.getTime() - this.session!.lastActivity.getTime() > this.config.sessionDuration

    return {
      sessionId: this.session!.sessionId,
      totalLikes: this.session!.likedArtists.size,
      createdAt: this.session!.createdAt,
      lastActivity: this.session!.lastActivity,
      sessionAge,
      isExpired
    }
  }

  /**
   * Clear the current session
   */
  clearSession(): void {
    try {
      localStorage.removeItem(this.config.storageKey)
    } catch (error) {
      console.warn('Failed to clear session from localStorage:', error)
    }
    this.session = null
    this.createNewSession()
  }

  /**
   * Check if localStorage is available
   */
  static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__'
      localStorage.setItem(test, test)
      localStorage.removeItem(test)
      return true
    } catch {
      return false
    }
  }

  /**
   * Get session configuration
   */
  getConfig(): SessionConfig {
    return { ...this.config }
  }

  /**
   * Update session configuration
   */
  updateConfig(newConfig: Partial<SessionConfig>): void {
    this.config = { ...this.config, ...newConfig }
  }
}