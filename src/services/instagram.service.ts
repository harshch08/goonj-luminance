import { supabase } from '@/lib/supabase'
import type { InstagramPost, InstagramFollowerData, InstagramCacheRow } from '@/types/instagram'
import { isInstagramFollowerData, isInstagramPostArray } from '@/types/instagram'

export class InstagramService {
  /**
   * Fetch cached Instagram follower count from Supabase
   */
  static async getFollowerCount(): Promise<InstagramFollowerData | null> {
    try {
      const { data, error } = await supabase
        .from('instagram_cache')
        .select('*')
        .eq('data_type', 'follower_count')
        .order('last_updated', { ascending: false })
        .limit(1)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No data found
          console.warn('No cached follower count found')
          return null
        }
        console.error('Error fetching follower count:', error)
        throw new Error(`Failed to fetch follower count: ${error.message}`)
      }

      // Validate data structure
      if (!isInstagramFollowerData(data.content)) {
        console.error('Invalid follower data structure:', data.content)
        throw new Error('Invalid follower data structure received from cache')
      }

      return data.content as InstagramFollowerData
    } catch (error) {
      console.error('InstagramService.getFollowerCount error:', error)
      throw error
    }
  }

  /**
   * Fetch cached Instagram posts from Supabase
   */
  static async getPosts(): Promise<InstagramPost[]> {
    try {
      const { data, error } = await supabase
        .from('instagram_cache')
        .select('*')
        .eq('data_type', 'posts')
        .order('last_updated', { ascending: false })
        .limit(1)
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No data found
          console.warn('No cached posts found')
          return []
        }
        console.error('Error fetching posts:', error)
        throw new Error(`Failed to fetch posts: ${error.message}`)
      }

      // Validate data structure
      if (!isInstagramPostArray(data.content)) {
        console.error('Invalid posts data structure:', data.content)
        throw new Error('Invalid posts data structure received from cache')
      }

      return data.content as InstagramPost[]
    } catch (error) {
      console.error('InstagramService.getPosts error:', error)
      throw error
    }
  }

  /**
   * Get both follower count and posts in a single call
   */
  static async getInstagramData(): Promise<{
    followerData: InstagramFollowerData | null
    posts: InstagramPost[]
  }> {
    try {
      const [followerData, posts] = await Promise.all([
        this.getFollowerCount(),
        this.getPosts()
      ])

      return { followerData, posts }
    } catch (error) {
      console.error('InstagramService.getInstagramData error:', error)
      throw error
    }
  }

  /**
   * Check if cached data is stale (older than specified minutes)
   */
  static async getCacheAge(): Promise<{
    followerCountAge?: number
    postsAge?: number
  }> {
    try {
      const { data, error } = await supabase
        .from('instagram_cache')
        .select('data_type, last_updated')
        .order('last_updated', { ascending: false })

      if (error) {
        console.error('Error fetching cache timestamps:', error)
        return {}
      }

      if (!data || data.length === 0) {
        return {}
      }

      const now = new Date().getTime()
      const result: { followerCountAge?: number; postsAge?: number } = {}

      for (const entry of data) {
        const ageMinutes = (now - new Date(entry.last_updated).getTime()) / (1000 * 60)
        
        if (entry.data_type === 'follower_count' && !result.followerCountAge) {
          result.followerCountAge = Math.round(ageMinutes)
        } else if (entry.data_type === 'posts' && !result.postsAge) {
          result.postsAge = Math.round(ageMinutes)
        }
      }

      return result
    } catch (error) {
      console.error('InstagramService.getCacheAge error:', error)
      return {}
    }
  }

  /**
   * Check if cache is stale based on age threshold
   */
  static isCacheStale(ageMinutes: number | undefined, thresholdMinutes: number = 60): boolean {
    return ageMinutes === undefined || ageMinutes > thresholdMinutes
  }

  /**
   * Get cache health status
   */
  static async getCacheHealth(): Promise<{
    isHealthy: boolean
    followerCountStale: boolean
    postsStale: boolean
    lastUpdate?: string
  }> {
    try {
      const cacheAge = await this.getCacheAge()
      const followerCountStale = this.isCacheStale(cacheAge.followerCountAge)
      const postsStale = this.isCacheStale(cacheAge.postsAge)
      
      // Get the most recent update timestamp
      const { data } = await supabase
        .from('instagram_cache')
        .select('last_updated')
        .order('last_updated', { ascending: false })
        .limit(1)
        .single()

      return {
        isHealthy: !followerCountStale && !postsStale,
        followerCountStale,
        postsStale,
        lastUpdate: data?.last_updated
      }
    } catch (error) {
      console.error('InstagramService.getCacheHealth error:', error)
      return {
        isHealthy: false,
        followerCountStale: true,
        postsStale: true
      }
    }
  }
}