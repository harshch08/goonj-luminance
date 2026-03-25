// Core likes service
export { LikesService } from './likes-service'

// Enhanced service with caching and retry logic
export { EnhancedLikesService } from './likes-service-enhanced'

// Local storage cache service for real-time updates
export { LikesCacheService } from './likes-cache'

// Comments service
export { CommentsService } from './comments-service'
export type { Comment, CommentInsert } from './comments-service'

// Enhanced comments service
export { EnhancedCommentsService } from './comments-service-enhanced'
export type { CommentServiceResponse, CommentServiceOptions } from './comments-service-enhanced'

// Service types and interfaces
export * from './types'

// Re-export database types for convenience
export type { ArtistLike, ArtistLikeInsert, ArtistLikeCount } from '../supabase'