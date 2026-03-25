import { supabase } from './supabase'
import { checkSupabaseConfig, testSupabaseConnection } from './supabase-test'
import { validateDatabaseSchema, initializeLikeSystem } from './database'

/**
 * Complete setup verification for Supabase integration
 * Run this after setting up your Supabase project and database schema
 */
export const verifySupabaseSetup = async () => {
  console.log('🚀 Starting Supabase setup verification...\n')

  // Step 1: Check configuration
  console.log('1️⃣ Checking Supabase configuration...')
  const config = checkSupabaseConfig()
  
  if (!config.valid) {
    console.error('❌ Configuration invalid. Missing:', config.missing.join(', '))
    console.log('Please update your .env file with:')
    console.log('VITE_SUPABASE_URL=your_supabase_project_url')
    console.log('VITE_SUPABASE_ANON_KEY=your_supabase_anon_key')
    return false
  }
  console.log('✅ Configuration valid\n')

  // Step 2: Test connection
  console.log('2️⃣ Testing Supabase connection...')
  const connection = await testSupabaseConnection()
  
  if (!connection.success) {
    console.error('❌ Connection failed:', connection.error)
    return false
  }
  console.log('✅ Connection successful\n')

  // Step 3: Validate database schema
  console.log('3️⃣ Validating database schema...')
  const schema = await validateDatabaseSchema()
  
  if (!schema.valid) {
    console.error('❌ Schema validation failed:')
    schema.errors.forEach(error => console.error('  -', error))
    console.log('\nPlease run the SQL schema in your Supabase dashboard.')
    return false
  }
  console.log('✅ Database schema valid\n')

  // Step 4: Initialize like system
  console.log('4️⃣ Initializing like system...')
  const initialization = await initializeLikeSystem()
  
  if (!initialization.success) {
    console.error('❌ Initialization failed:', initialization.message)
    if (initialization.details) {
      initialization.details.forEach(detail => console.error('  -', detail))
    }
    return false
  }
  console.log('✅ Like system initialized\n')

  // Step 5: Test basic operations
  console.log('5️⃣ Testing basic operations...')
  try {
    // Test reading (should return empty array initially)
    const { data: likeCounts, error: readError } = await supabase
      .from('artist_like_counts')
      .select('*')
      .limit(5)

    if (readError) {
      console.error('❌ Read test failed:', readError.message)
      return false
    }

    console.log(`✅ Read test successful (found ${likeCounts?.length || 0} artists with likes)`)

    // Test write (add a test like)
    const testSessionId = `test_${Date.now()}_${Math.random().toString(36).substring(7)}`
    const { error: writeError } = await supabase
      .from('artist_likes')
      .insert({
        artist_id: 999,
        artist_name: 'Test Artist',
        session_id: testSessionId
      })

    if (writeError) {
      console.error('❌ Write test failed:', writeError.message)
      return false
    }

    console.log('✅ Write test successful')

    // Clean up test data
    await supabase
      .from('artist_likes')
      .delete()
      .eq('artist_id', 999)
      .eq('session_id', testSessionId)

    console.log('✅ Cleanup successful\n')

  } catch (error) {
    console.error('❌ Operation test failed:', error)
    return false
  }

  // Success!
  console.log('🎉 Supabase setup verification complete!')
  console.log('Your artist like count feature is ready to use.\n')
  
  console.log('Next steps:')
  console.log('1. Start your development server: npm run dev')
  console.log('2. Visit the Artists page to test the like functionality')
  console.log('3. Check the Supabase dashboard to see like data in real-time')
  
  return true
}

/**
 * Quick setup check (for use in components)
 */
export const quickSetupCheck = async (): Promise<boolean> => {
  try {
    const config = checkSupabaseConfig()
    if (!config.valid) return false

    const connection = await testSupabaseConnection()
    if (!connection.success) return false

    const schema = await validateDatabaseSchema()
    return schema.valid
  } catch {
    return false
  }
}