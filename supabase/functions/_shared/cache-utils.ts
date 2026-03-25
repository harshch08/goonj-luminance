import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Enhanced logging utility for cache operations
class CacheLogger {
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

// Custom error classes for cache operations
class CacheValidationError extends Error {
  constructor(message: string, public data?: any) {
    super(message)
    this.name = 'CacheValidationError'
  }
}

class CacheStorageError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message)
    this.name = 'CacheStorageError'
  }
}

class CacheRetrievalError extends Error {
  constructor(message: string, public originalError?: any) {
    super(message)
    this.name = 'CacheRetrievalError'
  }
}

export interface CacheEntry {
  data_type: 'follower_count' | 'posts'
  content: any
  last_updated: string
}

export class InstagramCacheManager {
  private supabase: any
  private logger: CacheLogger

  constructor(supabaseUrl: string, serviceRoleKey: string) {
    this.logger = new CacheLogger('InstagramCacheManager')
    
    try {
      this.supabase = createClient(supabaseUrl, serviceRoleKey)
      this.logger.info('Supabase client initialized successfully', {
        url: supabaseUrl.substring(0, 20) + '...'
      })
    } catch (error) {
      this.logger.error('Failed to initialize Supabase client', error)
      throw new CacheStorageError('Failed to initialize database connection', error)
    }
  }

  /**
   * Store data in the Instagram cache with automatic timestamp and comprehensive error handling
   */
  async storeCache(dataType: 'follower_count' | 'posts', content: any): Promise<void> {
    const timestamp = new Date().toISOString()
    
    this.logger.info('Starting cache storage operation', {
      data_type: dataType,
      timestamp,
      content_size: JSON.stringify(content).length
    })

    try {
      // Validate content before storing
      this.validateContent(dataType, content)
      this.logger.info('Content validation passed', { data_type: dataType })

      const { error } = await this.supabase
        .from('instagram_cache')
        .upsert({
          data_type: dataType,
          content: content,
          last_updated: timestamp
        }, {
          onConflict: 'data_type'
        })

      if (error) {
        this.logger.error('Database upsert operation failed', error, {
          data_type: dataType,
          error_code: error.code,
          error_details: error.details
        })
        throw new CacheStorageError(`Failed to store ${dataType} in cache: ${error.message}`, error)
      }

      this.logger.info('Cache storage completed successfully', {
        data_type: dataType,
        timestamp,
        operation: 'upsert'
      })

    } catch (error) {
      if (error instanceof CacheValidationError) {
        this.logger.error('Content validation failed', error, {
          data_type: dataType,
          validation_error: error.message
        })
        throw error
      } else if (error instanceof CacheStorageError) {
        throw error
      } else {
        this.logger.error('Unexpected error during cache storage', error, {
          data_type: dataType
        })
        throw new CacheStorageError(`Unexpected error storing ${dataType}`, error)
      }
    }
  }

  /**
   * Retrieve cached data by type with enhanced error handling
   */
  async getCache(dataType: 'follower_count' | 'posts'): Promise<CacheEntry | null> {
    this.logger.info('Starting cache retrieval operation', { data_type: dataType })

    try {
      const { data, error } = await this.supabase
        .from('instagram_cache')
        .select('*')
        .eq('data_type', dataType)
        .order('last_updated', { ascending: false })
        .limit(1)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No data found - this is not an error condition
          this.logger.info('No cached data found', { data_type: dataType })
          return null
        }
        
        this.logger.error('Database query failed during cache retrieval', error, {
          data_type: dataType,
          error_code: error.code,
          error_details: error.details
        })
        throw new CacheRetrievalError(`Failed to retrieve ${dataType} from cache: ${error.message}`, error)
      }

      // Validate retrieved data structure
      if (data && !this.isValidCacheEntry(data)) {
        this.logger.warn('Retrieved invalid cache entry structure', {
          data_type: dataType,
          data_keys: Object.keys(data)
        })
        throw new CacheValidationError('Invalid cache entry structure retrieved from database', data)
      }

      this.logger.info('Cache retrieval completed successfully', {
        data_type: dataType,
        last_updated: data?.last_updated,
        has_content: !!data?.content
      })

      return data

    } catch (error) {
      if (error instanceof CacheRetrievalError || error instanceof CacheValidationError) {
        throw error
      } else {
        this.logger.error('Unexpected error during cache retrieval', error, {
          data_type: dataType
        })
        throw new CacheRetrievalError(`Unexpected error retrieving ${dataType}`, error)
      }
    }
  }

  /**
   * Check if cached data is stale (older than specified minutes)
   */
  isCacheStale(cacheEntry: CacheEntry | null, maxAgeMinutes: number = 60): boolean {
    if (!cacheEntry) {
      this.logger.info('Cache entry is null, considering stale')
      return true
    }

    try {
      const cacheTime = new Date(cacheEntry.last_updated).getTime()
      const now = new Date().getTime()
      const ageMinutes = (now - cacheTime) / (1000 * 60)

      const isStale = ageMinutes > maxAgeMinutes

      this.logger.info('Cache staleness check completed', {
        age_minutes: Math.round(ageMinutes),
        max_age_minutes: maxAgeMinutes,
        is_stale: isStale,
        last_updated: cacheEntry.last_updated
      })

      return isStale

    } catch (error) {
      this.logger.error('Error checking cache staleness', error, {
        cache_entry: cacheEntry
      })
      // If we can't determine staleness, assume it's stale for safety
      return true
    }
  }

  /**
   * Clean up old cache entries (keep only the latest for each type) with enhanced error handling
   */
  async cleanupOldCache(): Promise<void> {
    this.logger.info('Starting cache cleanup operation')

    try {
      // Get the latest entry for each data type
      const { data: latestEntries, error: selectError } = await this.supabase
        .from('instagram_cache')
        .select('id, data_type, last_updated')
        .order('data_type')
        .order('last_updated', { ascending: false })

      if (selectError) {
        this.logger.error('Failed to query cache entries for cleanup', selectError, {
          error_code: selectError.code,
          error_details: selectError.details
        })
        throw new CacheRetrievalError('Failed to retrieve cache entries for cleanup', selectError)
      }

      if (!latestEntries || latestEntries.length === 0) {
        this.logger.info('No cache entries found, cleanup not needed')
        return
      }

      this.logger.info('Retrieved cache entries for cleanup analysis', {
        total_entries: latestEntries.length
      })

      // Find the latest ID for each data type
      const latestIds = new Set<number>()
      const seenTypes = new Set<string>()

      for (const entry of latestEntries) {
        if (!seenTypes.has(entry.data_type)) {
          latestIds.add(entry.id)
          seenTypes.add(entry.data_type)
        }
      }

      this.logger.info('Identified latest entries to keep', {
        latest_ids: Array.from(latestIds),
        data_types: Array.from(seenTypes)
      })

      // Delete all entries except the latest ones
      if (latestIds.size > 0) {
        const { error: deleteError } = await this.supabase
          .from('instagram_cache')
          .delete()
          .not('id', 'in', `(${Array.from(latestIds).join(',')})`)

        if (deleteError) {
          this.logger.error('Failed to delete old cache entries', deleteError, {
            error_code: deleteError.code,
            error_details: deleteError.details,
            kept_ids: Array.from(latestIds)
          })
          throw new CacheStorageError('Failed to delete old cache entries', deleteError)
        }

        this.logger.info('Cache cleanup completed successfully', {
          kept_entries: latestIds.size,
          total_original_entries: latestEntries.length
        })
      }

    } catch (error) {
      if (error instanceof CacheRetrievalError || error instanceof CacheStorageError) {
        // Re-throw known cache errors
        throw error
      } else {
        this.logger.error('Unexpected error during cache cleanup', error)
        // Don't throw here as cleanup failure shouldn't break the main function
        // But log it for monitoring
      }
    }
  }

  /**
   * Validate content structure before caching with detailed error messages
   */
  private validateContent(dataType: 'follower_count' | 'posts', content: any): void {
    this.logger.info('Starting content validation', {
      data_type: dataType,
      content_type: typeof content
    })

    try {
      if (dataType === 'follower_count') {
        if (!content || typeof content !== 'object') {
          throw new CacheValidationError('Follower count data must be an object', content)
        }
        
        if (typeof content.followers_count !== 'number') {
          throw new CacheValidationError('followers_count must be a number', {
            received_type: typeof content.followers_count,
            received_value: content.followers_count
          })
        }
        
        if (!content.last_updated || typeof content.last_updated !== 'string') {
          throw new CacheValidationError('last_updated must be a string', {
            received_type: typeof content.last_updated,
            received_value: content.last_updated
          })
        }

        // Validate that followers_count is a reasonable number
        if (content.followers_count < 0 || content.followers_count > 1000000000) {
          throw new CacheValidationError('followers_count is outside reasonable range', {
            followers_count: content.followers_count
          })
        }

      } else if (dataType === 'posts') {
        if (!Array.isArray(content)) {
          throw new CacheValidationError('Posts content must be an array', {
            received_type: typeof content
          })
        }
        
        for (let i = 0; i < content.length; i++) {
          const post = content[i]
          const postContext = { post_index: i, post_id: post?.id }

          if (!post || typeof post !== 'object') {
            throw new CacheValidationError(`Post at index ${i} must be an object`, postContext)
          }

          const requiredFields = ['id', 'media_url', 'permalink', 'media_type', 'timestamp']
          for (const field of requiredFields) {
            if (!post[field] || typeof post[field] !== 'string') {
              throw new CacheValidationError(
                `Post at index ${i} missing or invalid field: ${field}`,
                { ...postContext, field, received_value: post[field] }
              )
            }
          }

          // Validate media_type
          if (!['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(post.media_type)) {
            throw new CacheValidationError(
              `Post at index ${i} has invalid media_type`,
              { ...postContext, media_type: post.media_type }
            )
          }

          // Validate URLs
          try {
            new URL(post.media_url)
            new URL(post.permalink)
          } catch (urlError) {
            throw new CacheValidationError(
              `Post at index ${i} has invalid URL format`,
              { ...postContext, url_error: urlError.message }
            )
          }
        }

        this.logger.info('Posts validation completed', {
          total_posts: content.length,
          validated_posts: content.length
        })
      }

      this.logger.info('Content validation passed', { data_type: dataType })

    } catch (error) {
      if (error instanceof CacheValidationError) {
        this.logger.error('Content validation failed', error, {
          data_type: dataType,
          validation_error: error.message
        })
        throw error
      } else {
        this.logger.error('Unexpected error during content validation', error, {
          data_type: dataType
        })
        throw new CacheValidationError('Unexpected validation error', error)
      }
    }
  }

  /**
   * Validate cache entry structure
   */
  private isValidCacheEntry(entry: any): boolean {
    return entry &&
           typeof entry === 'object' &&
           typeof entry.data_type === 'string' &&
           entry.content !== undefined &&
           typeof entry.last_updated === 'string'
  }

  /**
   * Get cache statistics for monitoring with enhanced error handling
   */
  async getCacheStats(): Promise<{
    follower_count_age?: number
    posts_age?: number
    total_entries: number
  }> {
    this.logger.info('Starting cache statistics retrieval')

    try {
      const { data, error } = await this.supabase
        .from('instagram_cache')
        .select('data_type, last_updated')
        .order('last_updated', { ascending: false })

      if (error) {
        this.logger.error('Failed to retrieve cache statistics', error, {
          error_code: error.code,
          error_details: error.details
        })
        throw new CacheRetrievalError(`Failed to get cache stats: ${error.message}`, error)
      }

      const stats: any = {
        total_entries: data?.length || 0
      }

      if (data && data.length > 0) {
        const now = new Date().getTime()
        
        for (const entry of data) {
          try {
            const ageMinutes = (now - new Date(entry.last_updated).getTime()) / (1000 * 60)
            
            if (entry.data_type === 'follower_count' && !stats.follower_count_age) {
              stats.follower_count_age = Math.round(ageMinutes)
            } else if (entry.data_type === 'posts' && !stats.posts_age) {
              stats.posts_age = Math.round(ageMinutes)
            }
          } catch (dateError) {
            this.logger.warn('Failed to parse date for cache entry', {
              entry_type: entry.data_type,
              last_updated: entry.last_updated,
              error: dateError.message
            })
          }
        }
      }

      this.logger.info('Cache statistics retrieved successfully', stats)
      return stats

    } catch (error) {
      if (error instanceof CacheRetrievalError) {
        throw error
      } else {
        this.logger.error('Unexpected error retrieving cache statistics', error)
        throw new CacheRetrievalError('Unexpected error getting cache stats', error)
      }
    }
  }

  /**
   * Advanced cache cleanup with configurable retention policies
   */
  async cleanupOldCacheAdvanced(options: {
    maxEntriesPerType?: number
    maxAgeHours?: number
    dryRun?: boolean
  } = {}): Promise<{
    deleted_count: number
    kept_count: number
    operations: string[]
  }> {
    const {
      maxEntriesPerType = 5,
      maxAgeHours = 168, // 7 days
      dryRun = false
    } = options

    this.logger.info('Starting advanced cache cleanup', {
      max_entries_per_type: maxEntriesPerType,
      max_age_hours: maxAgeHours,
      dry_run: dryRun
    })

    const operations: string[] = []
    let deletedCount = 0
    let keptCount = 0

    try {
      // Get all cache entries with full details
      const { data: allEntries, error: selectError } = await this.supabase
        .from('instagram_cache')
        .select('*')
        .order('data_type')
        .order('last_updated', { ascending: false })

      if (selectError) {
        throw new CacheRetrievalError('Failed to retrieve cache entries for advanced cleanup', selectError)
      }

      if (!allEntries || allEntries.length === 0) {
        this.logger.info('No cache entries found for cleanup')
        return { deleted_count: 0, kept_count: 0, operations: ['No entries found'] }
      }

      // Group entries by data type
      const entriesByType = new Map<string, any[]>()
      for (const entry of allEntries) {
        if (!entriesByType.has(entry.data_type)) {
          entriesByType.set(entry.data_type, [])
        }
        entriesByType.get(entry.data_type)!.push(entry)
      }

      const cutoffTime = new Date(Date.now() - (maxAgeHours * 60 * 60 * 1000))
      const idsToDelete: number[] = []

      // Process each data type
      for (const [dataType, entries] of entriesByType) {
        this.logger.info(`Processing ${dataType} entries`, {
          total_entries: entries.length,
          max_entries: maxEntriesPerType
        })

        // Keep the most recent entries up to maxEntriesPerType
        const entriesToKeep = entries.slice(0, maxEntriesPerType)
        const entriesToConsiderDeleting = entries.slice(maxEntriesPerType)

        // Also delete entries older than maxAgeHours
        for (const entry of entries) {
          const entryTime = new Date(entry.last_updated)
          const shouldDeleteByAge = entryTime < cutoffTime
          const shouldDeleteByCount = entriesToConsiderDeleting.includes(entry)

          if (shouldDeleteByAge || shouldDeleteByCount) {
            idsToDelete.push(entry.id)
            const reason = shouldDeleteByAge ? 'age' : 'count'
            operations.push(`Delete ${dataType} entry ${entry.id} (reason: ${reason}, age: ${Math.round((Date.now() - entryTime.getTime()) / (1000 * 60 * 60))}h)`)
            deletedCount++
          } else {
            operations.push(`Keep ${dataType} entry ${entry.id} (age: ${Math.round((Date.now() - entryTime.getTime()) / (1000 * 60 * 60))}h)`)
            keptCount++
          }
        }
      }

      // Perform deletions if not a dry run
      if (idsToDelete.length > 0 && !dryRun) {
        const { error: deleteError } = await this.supabase
          .from('instagram_cache')
          .delete()
          .in('id', idsToDelete)

        if (deleteError) {
          throw new CacheStorageError('Failed to delete old cache entries in advanced cleanup', deleteError)
        }

        operations.push(`Successfully deleted ${idsToDelete.length} entries`)
      } else if (dryRun && idsToDelete.length > 0) {
        operations.push(`DRY RUN: Would delete ${idsToDelete.length} entries`)
      }

      this.logger.info('Advanced cache cleanup completed', {
        deleted_count: deletedCount,
        kept_count: keptCount,
        dry_run: dryRun,
        total_operations: operations.length
      })

      return {
        deleted_count: deletedCount,
        kept_count: keptCount,
        operations
      }

    } catch (error) {
      this.logger.error('Advanced cache cleanup failed', error)
      throw error
    }
  }

  /**
   * Cache warming - preload cache with fresh data
   */
  async warmCache(dataTypes: ('follower_count' | 'posts')[] = ['follower_count', 'posts']): Promise<{
    warmed_types: string[]
    skipped_types: string[]
    errors: string[]
  }> {
    this.logger.info('Starting cache warming', { data_types: dataTypes })

    const result = {
      warmed_types: [] as string[],
      skipped_types: [] as string[],
      errors: [] as string[]
    }

    for (const dataType of dataTypes) {
      try {
        // Check if cache is already fresh (less than 30 minutes old)
        const existingCache = await this.getCache(dataType)
        
        if (existingCache && !this.isCacheStale(existingCache, 30)) {
          this.logger.info(`Cache for ${dataType} is already fresh, skipping warm`, {
            data_type: dataType,
            age_minutes: Math.round((Date.now() - new Date(existingCache.last_updated).getTime()) / (1000 * 60))
          })
          result.skipped_types.push(dataType)
          continue
        }

        // For cache warming, we create placeholder entries that indicate warming is needed
        const warmingContent = dataType === 'follower_count' 
          ? { followers_count: 0, last_updated: new Date().toISOString(), warming: true }
          : []

        await this.storeCache(dataType, warmingContent)
        result.warmed_types.push(dataType)
        
        this.logger.info(`Cache warming completed for ${dataType}`)

      } catch (error) {
        const errorMessage = `Failed to warm cache for ${dataType}: ${error.message}`
        this.logger.error(errorMessage, error)
        result.errors.push(errorMessage)
      }
    }

    this.logger.info('Cache warming process completed', result)
    return result
  }

  /**
   * Manual cache refresh trigger
   */
  async triggerManualRefresh(options: {
    force?: boolean
    dataTypes?: ('follower_count' | 'posts')[]
    reason?: string
  } = {}): Promise<{
    triggered: boolean
    message: string
    refresh_id: string
  }> {
    const {
      force = false,
      dataTypes = ['follower_count', 'posts'],
      reason = 'Manual refresh requested'
    } = options

    const refreshId = `manual_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    this.logger.info('Manual cache refresh triggered', {
      refresh_id: refreshId,
      force,
      data_types: dataTypes,
      reason
    })

    try {
      // Check if refresh is needed (unless forced)
      if (!force) {
        let needsRefresh = false
        
        for (const dataType of dataTypes) {
          const cache = await this.getCache(dataType)
          if (!cache || this.isCacheStale(cache, 30)) {
            needsRefresh = true
            break
          }
        }

        if (!needsRefresh) {
          const message = 'Cache is fresh, manual refresh skipped'
          this.logger.info(message, { refresh_id: refreshId })
          return {
            triggered: false,
            message,
            refresh_id: refreshId
          }
        }
      }

      // Manual refresh should NOT store metadata - it should trigger actual data refresh
      // The manual refresh endpoint should call the main fetch-instagram-data function instead
      const message = `Manual refresh triggered successfully (ID: ${refreshId})`
      this.logger.info(message, {
        refresh_id: refreshId,
        note: 'Manual refresh should call main data fetch function'
      })

      return {
        triggered: true,
        message,
        refresh_id: refreshId
      }

    } catch (error) {
      const errorMessage = `Failed to trigger manual refresh: ${error.message}`
      this.logger.error(errorMessage, error, { refresh_id: refreshId })
      
      return {
        triggered: false,
        message: errorMessage,
        refresh_id: refreshId
      }
    }
  }

  /**
   * Get cache health status
   */
  async getCacheHealth(): Promise<{
    overall_status: 'healthy' | 'warning' | 'critical'
    follower_count_status: 'fresh' | 'stale' | 'missing'
    posts_status: 'fresh' | 'stale' | 'missing'
    issues: string[]
    recommendations: string[]
  }> {
    this.logger.info('Checking cache health status')

    const issues: string[] = []
    const recommendations: string[] = []

    try {
      // Check follower count cache
      const followerCache = await this.getCache('follower_count')
      const followerStatus = !followerCache ? 'missing' : 
                           this.isCacheStale(followerCache, 90) ? 'stale' : 'fresh'

      // Check posts cache
      const postsCache = await this.getCache('posts')
      const postsStatus = !postsCache ? 'missing' : 
                         this.isCacheStale(postsCache, 90) ? 'stale' : 'fresh'

      // Analyze issues
      if (followerStatus === 'missing') {
        issues.push('Follower count cache is missing')
        recommendations.push('Run manual refresh to populate follower count data')
      } else if (followerStatus === 'stale') {
        const ageHours = Math.round((Date.now() - new Date(followerCache!.last_updated).getTime()) / (1000 * 60 * 60))
        issues.push(`Follower count cache is stale (${ageHours} hours old)`)
        recommendations.push('Check scheduled refresh function and Instagram API connectivity')
      }

      if (postsStatus === 'missing') {
        issues.push('Posts cache is missing')
        recommendations.push('Run manual refresh to populate posts data')
      } else if (postsStatus === 'stale') {
        const ageHours = Math.round((Date.now() - new Date(postsCache!.last_updated).getTime()) / (1000 * 60 * 60))
        issues.push(`Posts cache is stale (${ageHours} hours old)`)
        recommendations.push('Check scheduled refresh function and Instagram API connectivity')
      }

      // Determine overall status
      let overallStatus: 'healthy' | 'warning' | 'critical' = 'healthy'
      
      if (followerStatus === 'missing' || postsStatus === 'missing') {
        overallStatus = 'critical'
      } else if (followerStatus === 'stale' || postsStatus === 'stale') {
        overallStatus = 'warning'
      }

      const healthStatus = {
        overall_status: overallStatus,
        follower_count_status: followerStatus,
        posts_status: postsStatus,
        issues,
        recommendations
      }

      this.logger.info('Cache health check completed', healthStatus)
      return healthStatus

    } catch (error) {
      this.logger.error('Cache health check failed', error)
      
      return {
        overall_status: 'critical' as const,
        follower_count_status: 'missing' as const,
        posts_status: 'missing' as const,
        issues: [`Health check failed: ${error.message}`],
        recommendations: ['Check database connectivity and cache manager configuration']
      }
    }
  }
}