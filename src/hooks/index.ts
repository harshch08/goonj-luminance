// Individual likes management
export { useLikes } from './useLikes'
export type { UseLikesOptions, UseLikesReturn } from './useLikes'

// Comments management
export { useComments } from './useComments'
export type { UseCommentsOptions, UseCommentsReturn } from './useComments'

// Bulk likes management
export { useBulkLikes } from './useBulkLikes'
export type { 
  ArtistLikeData, 
  UseBulkLikesOptions, 
  UseBulkLikesReturn 
} from './useBulkLikes'

// Combined likes manager
export { useLikesManager } from './useLikesManager'
export type { 
  LikesManagerOptions, 
  ArtistConfig, 
  UseLikesManagerReturn 
} from './useLikesManager'

// Error handling
export { useLikeErrorHandler } from './useLikeErrorHandler'
export type { LikeError, UseLikeErrorHandlerReturn } from './useLikeErrorHandler'

// Celebrity artists
export { useCelebrityArtists, useCelebrityArtist } from './useCelebrityArtists'