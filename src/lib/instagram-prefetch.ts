import { QueryClient } from '@tanstack/react-query'
import { InstagramService } from '@/services/instagram.service'
import { INSTAGRAM_QUERY_KEYS } from '@/hooks/useInstagram'

/**
 * Prefetch Instagram data for improved user experience
 */
export class InstagramPrefetch {
  /**
   * Prefetch Instagram follower count
   */
  static async prefetchFollowerCount(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
      queryKey: INSTAGRAM_QUERY_KEYS.followerCount,
      queryFn: InstagramService.getFollowerCount,
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  }

  /**
   * Prefetch Instagram posts
   */
  static async prefetchPosts(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
      queryKey: INSTAGRAM_QUERY_KEYS.posts,
      queryFn: InstagramService.getPosts,
      staleTime: 5 * 60 * 1000, // 5 minutes
    })
  }

  /**
   * Prefetch all Instagram data
   */
  static async prefetchAllData(queryClient: QueryClient) {
    await Promise.allSettled([
      this.prefetchFollowerCount(queryClient),
      this.prefetchPosts(queryClient),
    ])
  }

  /**
   * Prefetch Instagram cache health
   */
  static async prefetchCacheHealth(queryClient: QueryClient) {
    await queryClient.prefetchQuery({
      queryKey: INSTAGRAM_QUERY_KEYS.cacheHealth,
      queryFn: InstagramService.getCacheHealth,
      staleTime: 2 * 60 * 1000, // 2 minutes
    })
  }

  /**
   * Invalidate Instagram cache to force refresh
   */
  static async invalidateInstagramCache(queryClient: QueryClient) {
    await queryClient.invalidateQueries({
      queryKey: ['instagram'],
    })
  }

  /**
   * Remove Instagram data from cache
   */
  static removeInstagramCache(queryClient: QueryClient) {
    queryClient.removeQueries({
      queryKey: ['instagram'],
    })
  }

  /**
   * Check if Instagram data is stale and needs refresh
   */
  static isInstagramDataStale(queryClient: QueryClient): boolean {
    const followerQuery = queryClient.getQueryState(INSTAGRAM_QUERY_KEYS.followerCount)
    const postsQuery = queryClient.getQueryState(INSTAGRAM_QUERY_KEYS.posts)
    
    const now = Date.now()
    const staleTime = 5 * 60 * 1000 // 5 minutes
    
    const followerStale = !followerQuery?.dataUpdatedAt || (now - followerQuery.dataUpdatedAt) > staleTime
    const postsStale = !postsQuery?.dataUpdatedAt || (now - postsQuery.dataUpdatedAt) > staleTime
    
    return followerStale || postsStale
  }

  /**
   * Warm up Instagram cache on app initialization
   */
  static async warmUpCache(queryClient: QueryClient) {
    // Only prefetch if data is stale or doesn't exist
    if (this.isInstagramDataStale(queryClient)) {
      await this.prefetchAllData(queryClient)
    }
  }
}