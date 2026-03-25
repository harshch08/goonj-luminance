import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { InstagramService } from '@/services/instagram.service'
import type { InstagramPost, InstagramFollowerData } from '@/types/instagram'

// Query keys for React Query
export const INSTAGRAM_QUERY_KEYS = {
  followerCount: ['instagram', 'follower-count'] as const,
  posts: ['instagram', 'posts'] as const,
  all: ['instagram', 'all'] as const,
  cacheHealth: ['instagram', 'cache-health'] as const,
} as const

/**
 * Hook to fetch Instagram follower count
 */
export function useInstagramFollowerCount() {
  return useQuery({
    queryKey: INSTAGRAM_QUERY_KEYS.followerCount,
    queryFn: InstagramService.getFollowerCount,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes (formerly cacheTime)
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
}

/**
 * Hook to fetch Instagram posts
 */
export function useInstagramPosts() {
  return useQuery({
    queryKey: INSTAGRAM_QUERY_KEYS.posts,
    queryFn: InstagramService.getPosts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
}

/**
 * Hook to fetch all Instagram data (follower count and posts)
 */
export function useInstagramData() {
  return useQuery({
    queryKey: INSTAGRAM_QUERY_KEYS.all,
    queryFn: InstagramService.getInstagramData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  })
}

/**
 * Hook to check Instagram cache health
 */
export function useInstagramCacheHealth() {
  return useQuery({
    queryKey: INSTAGRAM_QUERY_KEYS.cacheHealth,
    queryFn: InstagramService.getCacheHealth,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false, // Don't fetch on mount for health checks
  })
}

/**
 * Combined hook that provides all Instagram data with loading states
 */
export function useInstagramSection() {
  const followerQuery = useInstagramFollowerCount()
  const postsQuery = useInstagramPosts()
  const healthQuery = useInstagramCacheHealth()

  return {
    // Data
    followerData: followerQuery.data,
    posts: postsQuery.data || [],
    cacheHealth: healthQuery.data,

    // Loading states
    isLoading: followerQuery.isLoading || postsQuery.isLoading,
    isLoadingFollowers: followerQuery.isLoading,
    isLoadingPosts: postsQuery.isLoading,
    isLoadingHealth: healthQuery.isLoading,

    // Error states
    error: followerQuery.error || postsQuery.error,
    followerError: followerQuery.error,
    postsError: postsQuery.error,
    healthError: healthQuery.error,

    // Status flags
    isError: followerQuery.isError || postsQuery.isError,
    isSuccess: followerQuery.isSuccess && postsQuery.isSuccess,
    
    // Refetch functions
    refetch: () => {
      followerQuery.refetch()
      postsQuery.refetch()
    },
    refetchFollowers: followerQuery.refetch,
    refetchPosts: postsQuery.refetch,
    refetchHealth: healthQuery.refetch,

    // Individual query objects for advanced usage
    queries: {
      follower: followerQuery,
      posts: postsQuery,
      health: healthQuery,
    }
  }
}

/**
 * Type definitions for hook return values
 */
export type UseInstagramFollowerCountResult = UseQueryResult<InstagramFollowerData | null, Error>
export type UseInstagramPostsResult = UseQueryResult<InstagramPost[], Error>
export type UseInstagramDataResult = UseQueryResult<{
  followerData: InstagramFollowerData | null
  posts: InstagramPost[]
}, Error>

export type UseInstagramSectionResult = ReturnType<typeof useInstagramSection>