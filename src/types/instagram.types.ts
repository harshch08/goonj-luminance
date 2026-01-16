export interface InstagramConfig {
  accessToken: string;
  userId: string;
  apiVersion: string;
}

export interface InstagramMediaItem {
  id: string;
  mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  mediaUrl: string;
  permalink: string;
  caption?: string;
  timestamp: string;
  thumbnailUrl?: string;
}

export interface InstagramUserProfile {
  id: string;
  username: string;
  followersCount: number;
  mediaCount: number;
}

export interface CachedData<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export interface InstagramImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  permalink: string;
  caption: string;
  tags: string[];
  timestamp: Date;
  source: 'instagram';
}

export interface GalleryItem {
  id: string | number;
  image: string;
  category: string;
  title: string;
  source: 'local' | 'instagram';
  tags?: string[];
  permalink?: string;
}

export interface InstagramStats {
  followersCount: number;
  username: string;
  lastUpdated: Date;
}

export class InstagramAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'InstagramAPIError';
  }
}

export class InstagramAuthError extends InstagramAPIError {
  constructor(message: string = 'Instagram authentication failed') {
    super(message, 401);
    this.name = 'InstagramAuthError';
  }
}

export class InstagramRateLimitError extends InstagramAPIError {
  constructor(message: string = 'Instagram API rate limit exceeded') {
    super(message, 429);
    this.name = 'InstagramRateLimitError';
  }
}

export const ERROR_MESSAGES = {
  NETWORK: 'Unable to connect to Instagram. Showing cached data.',
  AUTH: 'Instagram connection expired. Please contact administrator.',
  RATE_LIMIT: 'Instagram rate limit reached. Data will refresh shortly.',
  GENERIC: 'Unable to load Instagram content. Please try again later.',
};
