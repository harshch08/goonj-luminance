import { supabase } from '../supabase'
import { validateDatabaseSchema } from './schema'
import { handleSupabaseError } from '../supabase-errors'

/**
 * Database setup and initialization utilities
 * Note: The actual SQL schema should be executed in the Supabase dashboard or via CLI
 */

export interface SetupResult {
  success: boolean
  message: string
  details?: string[]
}

/**
 * Check if the database is ready for the like system
 */
export const checkDatabaseReadiness = async (): Promise<SetupResult> => {
  try {
    const validation = await validateDatabaseSchema()
    
    if (validation.valid) {
      return {
        success: true,
        message: 'Database schema is ready for the like system',
        details: [
          `artist_likes table: ${validation.schema.tables.artist_likes.exists ? 'exists' : 'missing'}`,
          `artist_like_counts view: ${validation.schema.views.artist_like_counts.exists ? 'exists' : 'missing'}`
        ]
      }
    }

    return {
      success: false,
      message: 'Database schema is not ready',
      details: validation.errors
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to check database readiness',
      details: [error instanceof Error ? error.message : 'Unknown error']
    }
  }
}

/**
 * Test basic database operations
 */
export const testDatabaseOperations = async (): Promise<SetupResult> => {
  try {
    // Test 1: Check if we can read from artist_likes table
    const { data: readData, error: readError } = await supabase
      .from('artist_likes')
      .select('*')
      .limit(1)

    if (readError) {
      const supabaseError = handleSupabaseError(readError)
      return {
        success: false,
        message: 'Cannot read from artist_likes table',
        details: [supabaseError?.message || 'Unknown read error']
      }
    }

    // Test 2: Check if we can read from artist_like_counts view
    const { data: viewData, error: viewError } = await supabase
      .from('artist_like_counts')
      .select('*')
      .limit(1)

    if (viewError) {
      const supabaseError = handleSupabaseError(viewError)
      return {
        success: false,
        message: 'Cannot read from artist_like_counts view',
        details: [supabaseError?.message || 'Unknown view error']
      }
    }

    return {
      success: true,
      message: 'All database operations are working correctly',
      details: [
        'Read access to artist_likes table: OK',
        'Read access to artist_like_counts view: OK'
      ]
    }
  } catch (error) {
    return {
      success: false,
      message: 'Database operation test failed',
      details: [error instanceof Error ? error.message : 'Unknown error']
    }
  }
}

/**
 * Get setup instructions for the database schema
 */
export const getSetupInstructions = (): {
  title: string
  steps: string[]
  sqlFile: string
} => {
  return {
    title: 'Database Schema Setup Instructions',
    steps: [
      '1. Go to your Supabase project dashboard',
      '2. Navigate to the SQL Editor',
      '3. Copy and paste the contents of src/lib/database/schema.sql',
      '4. Execute the SQL to create tables, views, and policies',
      '5. Verify the setup by running the database readiness check'
    ],
    sqlFile: 'src/lib/database/schema.sql'
  }
}

/**
 * Initialize the like system (run after database schema is set up)
 */
export const initializeLikeSystem = async (): Promise<SetupResult> => {
  try {
    // Check database readiness
    const readinessCheck = await checkDatabaseReadiness()
    if (!readinessCheck.success) {
      return readinessCheck
    }

    // Test database operations
    const operationsTest = await testDatabaseOperations()
    if (!operationsTest.success) {
      return operationsTest
    }

    return {
      success: true,
      message: 'Like system is ready to use',
      details: [
        'Database schema validated',
        'Database operations tested',
        'System ready for production use'
      ]
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to initialize like system',
      details: [error instanceof Error ? error.message : 'Unknown error']
    }
  }
}