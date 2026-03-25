import type { ArtistLike, ArtistLikeCount } from '../supabase'

/**
 * Service response types for the likes system
 */

export interface LikeServiceResponse<T = void> {
  success: boolean
  data?: T
  error?: string
  code?: string
}

export interface LikeCountResponse {
  artistId: number
  count: number
  lastUpdated: Date
}

export interface LikeStatusResponse {
  artistId: number
  isLiked: boolean
  sessionId: string
}

export interface BulkLikeCountsResponse {
  counts: Record<number, number>
  totalArtists: number
  lastUpdated: Date
}

export interface TopArtistsResponse {
  artists: ArtistLikeCount[]
  totalCount: number
  limit: number
}

export interface RecentLikesResponse {
  likes: ArtistLike[]
  totalCount: number
  limit: number
}

/**
 * Service operation options
 */
export interface LikeServiceOptions {
  timeout?: number
  retries?: number
  cache?: boolean
}

/**
 * Batch operation types
 */
export interface BatchLikeRequest {
  artistId: number
  artistName: string
  sessionId: string
}

export interface BatchLikeResponse {
  successful: number[]
  failed: Array<{
    artistId: number
    error: string
  }>
  totalProcessed: number
}

/**
 * Analytics and monitoring types
 */
export interface LikeAnalytics {
  totalLikes: number
  uniqueArtists: number
  uniqueSessions: number
  averageLikesPerArtist: number
  topArtist: {
    id: number
    name: string
    likes: number
  } | null
  recentActivity: {
    last24Hours: number
    last7Days: number
    last30Days: number
  }
}

export interface LikeSystemHealth {
  status: 'healthy' | 'degraded' | 'down'
  responseTime: number
  errorRate: number
  lastChecked: Date
  issues: string[]
}