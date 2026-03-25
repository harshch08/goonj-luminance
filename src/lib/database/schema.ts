import { supabase } from '../supabase'
import { handleSupabaseError } from '../supabase-errors'

/**
 * Database schema validation and setup utilities
 */

export interface DatabaseSchema {
  tables: {
    artist_likes: {
      exists: boolean
      rowCount?: number
    }
  }
  views: {
    artist_like_counts: {
      exists: boolean
    }
  }
}

/**
 * Check if the required database schema exists
 */
export const validateDatabaseSchema = async (): Promise<{
  valid: boolean
  schema: DatabaseSchema
  errors: string[]
}> => {
  const errors: string[] = []
  const schema: DatabaseSchema = {
    tables: {
      artist_likes: { exists: false }
    },
    views: {
      artist_like_counts: { exists: false }
    }
  }

  try {
    // Check if artist_likes table exists by attempting to query it
    const { data: tableData, error: tableError } = await supabase
      .from('artist_likes')
      .select('count', { count: 'exact', head: true })

    if (tableError) {
      if (tableError.code === 'PGRST116' || tableError.message.includes('does not exist')) {
        errors.push('Table "artist_likes" does not exist')
      } else {
        const supabaseError = handleSupabaseError(tableError)
        errors.push(`Error checking artist_likes table: ${supabaseError?.message}`)
      }
    } else {
      schema.tables.artist_likes.exists = true
      schema.tables.artist_likes.rowCount = tableData?.length || 0
    }

    // Check if artist_like_counts view exists
    const { data: viewData, error: viewError } = await supabase
      .from('artist_like_counts')
      .select('*', { head: true })

    if (viewError) {
      if (viewError.code === 'PGRST116' || viewError.message.includes('does not exist')) {
        errors.push('View "artist_like_counts" does not exist')
      } else {
        const supabaseError = handleSupabaseError(viewError)
        errors.push(`Error checking artist_like_counts view: ${supabaseError?.message}`)
      }
    } else {
      schema.views.artist_like_counts.exists = true
    }

  } catch (error) {
    errors.push(`Unexpected error during schema validation: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  return {
    valid: errors.length === 0,
    schema,
    errors
  }
}

/**
 * Database constraints and validation rules
 */
export const DATABASE_CONSTRAINTS = {
  ARTIST_ID: {
    MIN: 1,
    MAX: 999999
  },
  ARTIST_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 255
  },
  SESSION_ID: {
    MIN_LENGTH: 10,
    MAX_LENGTH: 255,
    PATTERN: /^[a-zA-Z0-9-_]+$/
  }
} as const

/**
 * Validate artist like data before database insertion
 */
export const validateArtistLikeData = (data: {
  artist_id: number
  artist_name: string
  session_id: string
}): { valid: boolean; errors: string[] } => {
  const errors: string[] = []

  // Validate artist_id
  if (!Number.isInteger(data.artist_id) || 
      data.artist_id < DATABASE_CONSTRAINTS.ARTIST_ID.MIN || 
      data.artist_id > DATABASE_CONSTRAINTS.ARTIST_ID.MAX) {
    errors.push(`Invalid artist_id: must be an integer between ${DATABASE_CONSTRAINTS.ARTIST_ID.MIN} and ${DATABASE_CONSTRAINTS.ARTIST_ID.MAX}`)
  }

  // Validate artist_name
  if (!data.artist_name || 
      data.artist_name.length < DATABASE_CONSTRAINTS.ARTIST_NAME.MIN_LENGTH ||
      data.artist_name.length > DATABASE_CONSTRAINTS.ARTIST_NAME.MAX_LENGTH) {
    errors.push(`Invalid artist_name: must be between ${DATABASE_CONSTRAINTS.ARTIST_NAME.MIN_LENGTH} and ${DATABASE_CONSTRAINTS.ARTIST_NAME.MAX_LENGTH} characters`)
  }

  // Validate session_id
  if (!data.session_id ||
      data.session_id.length < DATABASE_CONSTRAINTS.SESSION_ID.MIN_LENGTH ||
      data.session_id.length > DATABASE_CONSTRAINTS.SESSION_ID.MAX_LENGTH ||
      !DATABASE_CONSTRAINTS.SESSION_ID.PATTERN.test(data.session_id)) {
    errors.push(`Invalid session_id: must be ${DATABASE_CONSTRAINTS.SESSION_ID.MIN_LENGTH}-${DATABASE_CONSTRAINTS.SESSION_ID.MAX_LENGTH} characters and contain only alphanumeric characters, hyphens, and underscores`)
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

/**
 * Get database statistics for monitoring
 */
export const getDatabaseStats = async (): Promise<{
  totalLikes: number
  uniqueArtists: number
  uniqueSessions: number
  error?: string
}> => {
  try {
    const { data, error } = await supabase
      .rpc('get_like_stats')

    if (error) {
      // If the RPC doesn't exist, fall back to basic queries
      const [likesResult, artistsResult, sessionsResult] = await Promise.all([
        supabase.from('artist_likes').select('count', { count: 'exact', head: true }),
        supabase.from('artist_likes').select('artist_id', { head: true }),
        supabase.from('artist_likes').select('session_id', { head: true })
      ])

      return {
        totalLikes: likesResult.count || 0,
        uniqueArtists: 0, // Would need more complex query
        uniqueSessions: 0, // Would need more complex query
        error: 'Advanced statistics not available'
      }
    }

    return data || { totalLikes: 0, uniqueArtists: 0, uniqueSessions: 0 }
  } catch (error) {
    return {
      totalLikes: 0,
      uniqueArtists: 0,
      uniqueSessions: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}