import { supabase } from './supabase'
import { handleSupabaseError } from './supabase-errors'

/**
 * Test the Supabase connection by attempting to query the database
 * This function can be used to verify that the Supabase client is properly configured
 */
export const testSupabaseConnection = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    // Simple query to test connection - this will work even if tables don't exist yet
    const { data, error } = await supabase
      .from('artist_likes')
      .select('count', { count: 'exact', head: true })

    if (error) {
      // If the table doesn't exist, that's expected at this stage
      if (error.code === 'PGRST116' || error.message.includes('does not exist')) {
        return { success: true }
      }
      
      const supabaseError = handleSupabaseError(error)
      return { 
        success: false, 
        error: supabaseError?.message || 'Connection test failed' 
      }
    }

    return { success: true }
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown connection error' 
    }
  }
}

/**
 * Check if Supabase environment variables are properly configured
 */
export const checkSupabaseConfig = (): { valid: boolean; missing: string[] } => {
  const missing: string[] = []
  
  if (!import.meta.env.VITE_SUPABASE_URL) {
    missing.push('VITE_SUPABASE_URL')
  }
  
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    missing.push('VITE_SUPABASE_ANON_KEY')
  }

  return {
    valid: missing.length === 0,
    missing
  }
}