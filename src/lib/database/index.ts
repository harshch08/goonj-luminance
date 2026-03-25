// Database schema and setup utilities
export * from './schema'
export * from './setup'

// Re-export types from supabase for convenience
export type { ArtistLike, ArtistLikeInsert, ArtistLikeCount } from '../supabase'