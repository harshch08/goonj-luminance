// Instagram data types for the homepage section

export interface InstagramPost {
  id: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  timestamp: string;
}

export interface InstagramFollowerData {
  followers_count: number;
  follows_count?: number;
  media_count?: number;
  username?: string;
  name?: string;
  profile_picture_url?: string;
  last_updated: string;
}

export interface InstagramCacheRow {
  id: number;
  data_type: 'follower_count' | 'posts';
  content: InstagramFollowerData | InstagramPost[];
  last_updated: string;
  created_at: string;
}

// API response types for Instagram Graph API
export interface InstagramGraphAPIResponse {
  data: InstagramPost[];
  paging?: {
    cursors: {
      before: string;
      after: string;
    };
    next?: string;
  };
}

export interface InstagramAccountResponse {
  followers_count: number;
  follows_count?: number;
  username?: string;
  name?: string;
  profile_picture_url?: string;
  id: string;
}

// Type guards for runtime type checking
export function isInstagramFollowerData(content: any): content is InstagramFollowerData {
  return (
    typeof content === 'object' &&
    content !== null &&
    typeof content.followers_count === 'number' &&
    typeof content.last_updated === 'string'
    // username, name, and profile_picture_url are optional
  );
}

export function isInstagramPostArray(content: any): content is InstagramPost[] {
  return (
    Array.isArray(content) &&
    content.every((item) =>
      typeof item === 'object' &&
      item !== null &&
      typeof item.id === 'string' &&
      typeof item.permalink === 'string' &&
      ['IMAGE', 'VIDEO', 'CAROUSEL_ALBUM'].includes(item.media_type) &&
      typeof item.timestamp === 'string'
    )
  );
}