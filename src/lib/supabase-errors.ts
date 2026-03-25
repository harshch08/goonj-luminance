import { PostgrestError } from '@supabase/supabase-js'

export interface SupabaseError {
  message: string
  code?: string
  details?: string
}

export class SupabaseServiceError extends Error {
  public code?: string
  public details?: string

  constructor(error: PostgrestError | Error | string) {
    if (typeof error === 'string') {
      super(error)
      this.name = 'SupabaseServiceError'
    } else if (error instanceof Error && !('code' in error)) {
      super(error.message)
      this.name = 'SupabaseServiceError'
      this.stack = error.stack
    } else {
      // PostgrestError
      const pgError = error as PostgrestError
      super(pgError.message)
      this.name = 'SupabaseServiceError'
      this.code = pgError.code
      this.details = pgError.details
    }
  }
}

export const handleSupabaseError = (error: PostgrestError | Error | null): SupabaseError | null => {
  if (!error) return null

  // Check if it's a PostgrestError
  if (isSupabaseError(error)) {
    return {
      message: error.message || 'Database operation failed',
      code: error.code,
      details: error.details
    }
  }

  // Generic Error
  return {
    message: error.message || 'An unexpected error occurred'
  }
}

export const isSupabaseError = (error: any): error is PostgrestError => {
  return error && typeof error === 'object' && 'code' in error && 'details' in error
}