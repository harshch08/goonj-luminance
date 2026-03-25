import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { InstagramCacheManager } from '../_shared/cache-utils.ts'

// Enhanced logging utility
class Logger {
  private context: string

  constructor(context: string) {
    this.context = context
  }

  info(message: string, data?: any) {
    const logEntry = {
      level: 'INFO',
      context: this.context,
      message,
      timestamp: new Date().toISOString(),
      ...(data && { data })
    }
    console.log(JSON.stringify(logEntry))
  }

  warn(message: string, data?: any) {
    const logEntry = {
      level: 'WARN',
      context: this.context,
      message,
      timestamp: new Date().toISOString(),
      ...(data && { data })
    }
    console.warn(JSON.stringify(logEntry))
  }

  error(message: string, errorOrData?: any, data?: any) {
    const logEntry: any = {
      level: 'ERROR',
      context: this.context,
      message,
      timestamp: new Date().toISOString()
    }
    
    // Handle different parameter combinations
    if (errorOrData) {
      if (errorOrData.message && errorOrData.stack) {
        // First parameter is an error object
        logEntry.error = {
          message: errorOrData.message,
          stack: errorOrData.stack,
          name: errorOrData.name
        }
        if (data) {
          logEntry.data = data
        }
      } else {
        // First parameter is data
        logEntry.data = errorOrData
      }
    }
    
    console.error(JSON.stringify(logEntry))
  }
}

// Custom error classes for better error categorization
class InstagramAPIError extends Error {
  constructor(message: string, public statusCode?: number, public response?: any) {
    super(message)
    this.name = 'InstagramAPIError'
  }
}

class DatabaseError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message)
    this.name = 'DatabaseError'
  }
}

class ConfigurationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConfigurationError'
  }
}

class ValidationError extends Error {
  constructor(message: string, public data?: any) {
    super(message)
    this.name = 'ValidationError'
  }
}

interface InstagramPost {
  id: string
  media_url: string
  permalink: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  timestamp: string
}

interface InstagramFollowerData {
  followers_count: number
  last_updated: string
}

interface InstagramGraphAPIResponse {
  data: InstagramPost[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

interface InstagramAccountResponse {
  followers_count: number
  follows_count?: number
  media_count?: number
  username?: string
  name?: string
  profile_picture_url?: string
  id: string
}

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  const logger = new Logger('fetch-instagram-data')
  const startTime = Date.now()
  
  logger.info('Function invocation started', {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries())
  })

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    logger.info('Handling CORS preflight request')
    return new Response('ok', { headers: corsHeaders })
  }

  let cacheManager: InstagramCacheManager | null = null
  let fallbackData: any = null

  try {
    // Validate environment variables with detailed error messages
    const requiredEnvVars = {
      INSTAGRAM_ACCESS_TOKEN: Deno.env.get('INSTAGRAM_ACCESS_TOKEN'),
      INSTAGRAM_BUSINESS_ACCOUNT_ID: Deno.env.get('INSTAGRAM_BUSINESS_ACCOUNT_ID'),
      SUPABASE_URL: Deno.env.get('SUPABASE_URL'),
      SUPABASE_SERVICE_ROLE_KEY: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
    }

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key)

    if (missingVars.length > 0) {
      throw new ConfigurationError(`Missing required environment variables: ${missingVars.join(', ')}`)
    }

    logger.info('Environment variables validated successfully')

    // Initialize cache manager with error handling
    try {
      cacheManager = new InstagramCacheManager(
        requiredEnvVars.SUPABASE_URL!,
        requiredEnvVars.SUPABASE_SERVICE_ROLE_KEY!
      )
      logger.info('Cache manager initialized successfully')
    } catch (error) {
      throw new DatabaseError('Failed to initialize cache manager', error)
    }

    // Attempt to get existing cache data as fallback
    try {
      const existingFollowerData = await cacheManager.getCache('follower_count')
      const existingPostsData = await cacheManager.getCache('posts')
      
      if (existingFollowerData || existingPostsData) {
        fallbackData = {
          follower_count: existingFollowerData?.content,
          posts: existingPostsData?.content,
          last_updated: existingFollowerData?.last_updated || existingPostsData?.last_updated
        }
        logger.info('Retrieved existing cache data as fallback', {
          hasFollowerData: !!existingFollowerData,
          hasPostsData: !!existingPostsData
        })
      }
    } catch (error) {
      logger.warn('Failed to retrieve fallback cache data', error)
    }

    logger.info('Starting Instagram data fetch process')

    // Clean up old cache entries with error handling
    try {
      const cleanupResult = await cacheManager.cleanupOldCacheAdvanced({
        maxEntriesPerType: 3,
        maxAgeHours: 72, // 3 days
        dryRun: false
      })
      logger.info('Advanced cache cleanup completed successfully', cleanupResult)
    } catch (error) {
      logger.warn('Advanced cache cleanup failed, continuing with main process', error)
    }

    // Fetch follower count with enhanced error handling
    let followerData: InstagramAccountResponse
    try {
      logger.info('Fetching Instagram follower count')
      const followerResponse = await fetchWithRetry(
        `https://graph.facebook.com/v18.0/${requiredEnvVars.INSTAGRAM_BUSINESS_ACCOUNT_ID}?fields=followers_count,follows_count,media_count,username,name,profile_picture_url&access_token=${requiredEnvVars.INSTAGRAM_ACCESS_TOKEN}`,
        logger
      )

      if (!followerResponse.ok) {
        const errorText = await followerResponse.text().catch(() => 'Unknown error')
        throw new InstagramAPIError(
          `Failed to fetch follower count: ${followerResponse.status} ${followerResponse.statusText}`,
          followerResponse.status,
          errorText
        )
      }

      followerData = await followerResponse.json()
      
      // Validate follower data structure
      if (typeof followerData.followers_count !== 'number') {
        throw new ValidationError('Invalid follower count data received from Instagram API', followerData)
      }

      logger.info('Successfully fetched follower count', {
        followers_count: followerData.followers_count
      })
    } catch (error) {
      if (fallbackData?.follower_count) {
        logger.warn('Using fallback follower data due to API error', error)
        followerData = {
          followers_count: fallbackData.follower_count.followers_count,
          id: requiredEnvVars.INSTAGRAM_BUSINESS_ACCOUNT_ID!
        }
      } else {
        throw error
      }
    }

    // Fetch recent posts with enhanced error handling
    let validPosts: InstagramPost[]
    try {
      logger.info('Fetching Instagram posts')
      const postsResponse = await fetchWithRetry(
        `https://graph.facebook.com/v18.0/${requiredEnvVars.INSTAGRAM_BUSINESS_ACCOUNT_ID}/media?fields=id,media_url,thumbnail_url,permalink,caption,media_type,timestamp&limit=6&access_token=${requiredEnvVars.INSTAGRAM_ACCESS_TOKEN}`,
        logger
      )

      if (!postsResponse.ok) {
        const errorText = await postsResponse.text().catch(() => 'Unknown error')
        throw new InstagramAPIError(
          `Failed to fetch posts: ${postsResponse.status} ${postsResponse.statusText}`,
          postsResponse.status,
          errorText
        )
      }

      const postsData: InstagramGraphAPIResponse = await postsResponse.json()
      
      // Validate posts data structure
      if (!Array.isArray(postsData.data)) {
        throw new ValidationError('Invalid posts data received from Instagram API', postsData)
      }

      logger.info('Successfully fetched posts from Instagram API', {
        total_posts: postsData.data.length
      })

      // Filter out non-image posts and posts without media_url with detailed logging
      validPosts = postsData.data.filter(post => {
        const isValid = (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM' || post.media_type === 'VIDEO') && 
                       post.permalink &&
                       post.id &&
                       post.timestamp

        if (!isValid) {
          logger.warn('Filtering out invalid post', {
            post_id: post.id,
            media_type: post.media_type,
            has_media_url: !!post.media_url,
            has_permalink: !!post.permalink
          })
        }

        return isValid
      })

      logger.info('Filtered posts for valid image content', {
        original_count: postsData.data.length,
        filtered_count: validPosts.length
      })
    } catch (error) {
      if (fallbackData?.posts) {
        logger.warn('Using fallback posts data due to API error', error)
        validPosts = fallbackData.posts
      } else {
        throw error
      }
    }

    // Store data in cache with comprehensive error handling
    const cacheOperations = []
    
    try {
      const followerCacheData: InstagramFollowerData = {
        followers_count: followerData.followers_count,
        follows_count: followerData.follows_count,
        media_count: followerData.media_count,
        username: followerData.username,
        name: followerData.name,
        profile_picture_url: followerData.profile_picture_url,
        last_updated: new Date().toISOString()
      }

      cacheOperations.push(
        cacheManager.storeCache('follower_count', followerCacheData)
          .then(() => logger.info('Successfully cached follower count'))
          .catch(error => {
            logger.error('Failed to cache follower count', error)
            throw new DatabaseError('Failed to store follower count in cache', error)
          })
      )

      cacheOperations.push(
        cacheManager.storeCache('posts', validPosts)
          .then(() => logger.info('Successfully cached posts data'))
          .catch(error => {
            logger.error('Failed to cache posts data', error)
            throw new DatabaseError('Failed to store posts in cache', error)
          })
      )

      // Wait for all cache operations to complete
      await Promise.all(cacheOperations)
      logger.info('All cache operations completed successfully')
    } catch (error) {
      // If caching fails but we have the data, we can still return success
      // but log the caching failure for monitoring
      logger.error('Cache storage failed, but data was fetched successfully', error)
      
      // Don't throw here - we can still return the fetched data
      // The next scheduled run will attempt to cache again
    }

    // Get cache statistics for monitoring
    let cacheStats = {}
    try {
      cacheStats = await cacheManager.getCacheStats()
      logger.info('Retrieved cache statistics', cacheStats)
    } catch (error) {
      logger.warn('Failed to retrieve cache statistics', error)
    }

    const executionTime = Date.now() - startTime
    logger.info('Function execution completed successfully', {
      execution_time_ms: executionTime,
      followers_count: followerData.followers_count,
      posts_count: validPosts.length
    })

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Instagram data cached successfully',
        data: {
          followers_count: followerData.followers_count,
          posts_count: validPosts.length,
          last_updated: new Date().toISOString(),
          cache_stats: cacheStats,
          execution_time_ms: executionTime
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    const executionTime = Date.now() - startTime
    
    // Enhanced error logging with categorization
    const errorDetails: any = {
      error_type: error.name || 'UnknownError',
      error_message: error.message,
      execution_time_ms: executionTime,
      has_fallback_data: !!fallbackData,
      stack_trace: error.stack
    }

    if (error instanceof InstagramAPIError) {
      errorDetails.status_code = error.statusCode
      errorDetails.api_response = error.response
    } else if (error instanceof DatabaseError) {
      errorDetails.original_error = error.originalError?.message
    } else if (error instanceof ValidationError) {
      errorDetails.validation_data = error.data
    }

    logger.error('Function execution failed', error, errorDetails)

    // Determine appropriate response based on error type and fallback availability
    let statusCode = 500
    let responseMessage = 'Internal server error'

    if (error instanceof ConfigurationError) {
      statusCode = 503
      responseMessage = 'Service configuration error'
    } else if (error instanceof InstagramAPIError) {
      statusCode = 502
      responseMessage = 'Instagram API error'
      
      // If we have fallback data and it's an API error, we might still return partial success
      if (fallbackData) {
        logger.info('Returning fallback data due to API error')
        return new Response(
          JSON.stringify({
            success: true,
            message: 'Using cached data due to API unavailability',
            warning: 'Data may be stale due to Instagram API issues',
            data: {
              followers_count: fallbackData.follower_count?.followers_count || 0,
              posts_count: Array.isArray(fallbackData.posts) ? fallbackData.posts.length : 0,
              last_updated: fallbackData.last_updated || new Date().toISOString(),
              is_fallback: true,
              execution_time_ms: executionTime
            }
          }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
          }
        )
      }
    } else if (error instanceof DatabaseError) {
      statusCode = 503
      responseMessage = 'Database service error'
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: responseMessage,
        error_type: error.name || 'UnknownError',
        timestamp: new Date().toISOString(),
        execution_time_ms: executionTime,
        ...(process.env.NODE_ENV === 'development' && { 
          debug_info: {
            message: error.message,
            stack: error.stack
          }
        })
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: statusCode,
      }
    )
  }
})

// Helper function to implement retry logic with exponential backoff and enhanced logging
async function fetchWithRetry(url: string, logger: Logger, maxRetries = 3): Promise<Response> {
  let lastError: Error | null = null

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      logger.info(`Making API request (attempt ${attempt}/${maxRetries})`, {
        url: url.replace(/access_token=[^&]+/, 'access_token=***'),
        attempt,
        max_retries: maxRetries
      })

      const response = await fetch(url)
      
      logger.info(`API request completed`, {
        status: response.status,
        status_text: response.statusText,
        attempt,
        headers: Object.fromEntries(response.headers.entries())
      })
      
      // If rate limited, wait and retry
      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After')
        const waitTime = retryAfter ? parseInt(retryAfter) * 1000 : Math.pow(2, attempt) * 1000
        
        logger.warn(`Rate limited by Instagram API`, {
          retry_after_header: retryAfter,
          wait_time_ms: waitTime,
          attempt,
          max_retries: maxRetries
        })
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, waitTime))
          continue
        }
      }

      // If we get a successful response or a client error (4xx), return it
      // Don't retry on client errors as they won't resolve with retries
      if (response.status < 500 || response.ok) {
        return response
      }

      // For server errors (5xx), continue to retry
      if (attempt < maxRetries) {
        const waitTime = Math.pow(2, attempt) * 1000
        logger.warn(`Server error, retrying`, {
          status: response.status,
          wait_time_ms: waitTime,
          attempt,
          max_retries: maxRetries
        })
        await new Promise(resolve => setTimeout(resolve, waitTime))
        continue
      }

      return response

    } catch (error) {
      lastError = error as Error
      logger.warn(`Network error during API request`, error, {
        attempt,
        max_retries: maxRetries,
        error_message: error.message
      })
      
      if (attempt < maxRetries) {
        const waitTime = Math.pow(2, attempt) * 1000
        logger.info(`Waiting before retry`, {
          wait_time_ms: waitTime,
          next_attempt: attempt + 1
        })
        await new Promise(resolve => setTimeout(resolve, waitTime))
      }
    }
  }

  const finalError = lastError || new Error('Max retries exceeded')
  logger.error('All retry attempts failed', finalError, {
    max_retries: maxRetries,
    final_error: finalError.message
  })
  
  throw finalError
}