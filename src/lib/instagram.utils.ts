import type { InstagramPost, InstagramFollowerData } from '@/types/instagram'

export function formatFollowerCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
  }
  return count.toString();
}

export function extractTitle(caption?: string): string | null {
  if (!caption) return null;
  
  const firstLine = caption.split('\n')[0];
  const cleanedLine = firstLine.replace(/#[\w\u0590-\u05ff]+/g, '').trim();
  
  if (!cleanedLine) return null;
  
  return cleanedLine.length > 50 
    ? cleanedLine.substring(0, 50) + '...' 
    : cleanedLine;
}

export function isInstagramUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname === 'www.instagram.com' || urlObj.hostname === 'instagram.com';
  } catch {
    return false;
  }
}

/**
 * Validate Instagram post data structure
 */
export function validateInstagramPost(post: any): post is InstagramPost {
  return (
    typeof post === 'object' &&
    post !== null &&
    typeof post.id === 'string' &&
    typeof post.permalink === 'string' &&
    ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(post.media_type) &&
    typeof post.timestamp === 'string' &&
    isInstagramUrl(post.permalink)
  )
}

/**
 * Validate Instagram follower data structure
 */
export function validateInstagramFollowerData(data: any): data is InstagramFollowerData {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.followers_count === 'number' &&
    data.followers_count >= 0 &&
    typeof data.last_updated === 'string' &&
    !isNaN(Date.parse(data.last_updated))
  )
}

/**
 * Filter and sort Instagram posts for display
 */
export function processInstagramPosts(posts: InstagramPost[], maxCount: number = 6): InstagramPost[] {
  return posts
    .filter(post =>
      ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(post.media_type) &&
      (post.media_url || post.thumbnail_url) &&
      post.permalink &&
      validateInstagramPost(post)
    )
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, maxCount)
}

/**
 * Get relative time string for Instagram post
 */
export function getRelativeTime(timestamp: string): string {
  try {
    const postDate = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - postDate.getTime()
    const diffMinutes = Math.floor(diffMs / (1000 * 60))
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffWeeks = Math.floor(diffDays / 7)

    if (diffMinutes < 1) return 'just now'
    if (diffMinutes < 60) return `${diffMinutes}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffWeeks < 4) return `${diffWeeks}w ago`
    
    return postDate.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: postDate.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    })
  } catch {
    return 'unknown'
  }
}

/**
 * Check if cached data is fresh (within threshold)
 */
export function isCacheFresh(lastUpdated: string, thresholdMinutes: number = 60): boolean {
  try {
    const cacheTime = new Date(lastUpdated).getTime()
    const now = new Date().getTime()
    const ageMinutes = (now - cacheTime) / (1000 * 60)
    return ageMinutes <= thresholdMinutes
  } catch {
    return false
  }
}

/**
 * Get cache age in minutes
 */
export function getCacheAgeMinutes(lastUpdated: string): number {
  try {
    const cacheTime = new Date(lastUpdated).getTime()
    const now = new Date().getTime()
    return Math.floor((now - cacheTime) / (1000 * 60))
  } catch {
    return Infinity
  }
}

/**
 * Format cache age for display
 */
export function formatCacheAge(lastUpdated: string): string {
  const ageMinutes = getCacheAgeMinutes(lastUpdated)
  
  if (ageMinutes === Infinity) return 'unknown'
  if (ageMinutes < 1) return 'just updated'
  if (ageMinutes < 60) return `${ageMinutes}m ago`
  
  const ageHours = Math.floor(ageMinutes / 60)
  if (ageHours < 24) return `${ageHours}h ago`
  
  const ageDays = Math.floor(ageHours / 24)
  return `${ageDays}d ago`
}

/**
 * Generate Instagram post alt text for accessibility
 */
export function generatePostAltText(post: InstagramPost): string {
  const title = extractTitle(post.caption)
  const timeAgo = getRelativeTime(post.timestamp)
  
  if (title) {
    return `Instagram post: ${title} (${timeAgo})`
  }
  
  return `Instagram post from ${timeAgo}`
}

/**
 * Sanitize Instagram caption for safe display
 */
export function sanitizeCaption(caption?: string): string {
  if (!caption) return ''
  
  // Remove potentially harmful content while preserving basic formatting
  return caption
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: URLs
    .trim()
}

/**
 * Check if Instagram post is recent (within last 7 days)
 */
export function isRecentPost(timestamp: string): boolean {
  try {
    const postDate = new Date(timestamp)
    const now = new Date()
    const diffDays = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24)
    return diffDays <= 7
  } catch {
    return false
  }
}

/**
 * Get Instagram post engagement metrics placeholder
 * (For future use if engagement data becomes available)
 */
export function getEngagementLevel(post: InstagramPost): 'low' | 'medium' | 'high' {
  // Placeholder implementation - could be enhanced with actual engagement data
  const isRecent = isRecentPost(post.timestamp)
  const hasCaption = Boolean(post.caption && post.caption.length > 10)
  
  if (isRecent && hasCaption) return 'high'
  if (isRecent || hasCaption) return 'medium'
  return 'low'
}