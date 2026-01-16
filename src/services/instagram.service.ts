import { instagramConfig } from '@/config/instagram.config';
import type {
  InstagramConfig,
  InstagramMediaItem,
  InstagramUserProfile,
  CachedData,
} from '@/types/instagram.types';
import {
  InstagramAPIError,
  InstagramAuthError,
  InstagramRateLimitError,
} from '@/types/instagram.types';

class InstagramService {
  private config: InstagramConfig;
  private baseUrl: string;
  private cachePrefix: string = 'instagram_cache_';

  constructor(config: InstagramConfig) {
    this.config = config;
    this.baseUrl = `https://graph.instagram.com/${config.apiVersion}`;
  }

  private async makeRequest<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    url.searchParams.append('access_token', this.config.accessToken);
    
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value);
    });

    try {
      const response = await fetch(url.toString());

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new InstagramAuthError();
        }
        if (response.status === 429) {
          throw new InstagramRateLimitError();
        }
        const errorData = await response.json().catch(() => ({}));
        throw new InstagramAPIError(
          errorData.error?.message || 'Instagram API request failed',
          response.status,
          errorData
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof InstagramAPIError) {
        throw error;
      }
      throw new InstagramAPIError(
        error instanceof Error ? error.message : 'Network error occurred'
      );
    }
  }

  async getUserProfile(): Promise<InstagramUserProfile> {
    const cacheKey = `${this.cachePrefix}profile`;
    const cached = this.getCachedData<InstagramUserProfile>(cacheKey);
    
    if (cached && this.isCacheValid(cached)) {
      return cached.data;
    }

    const data = await this.makeRequest<any>(`/${this.config.userId}`, {
      fields: 'username,followers_count,media_count',
    });

    const profile: InstagramUserProfile = {
      id: data.id,
      username: data.username,
      followersCount: data.followers_count,
      mediaCount: data.media_count,
    };

    this.setCachedData(cacheKey, profile, instagramConfig.cacheExpiry);
    return profile;
  }

  async getMediaItems(limit: number = instagramConfig.mediaLimit): Promise<InstagramMediaItem[]> {
    const cacheKey = `${this.cachePrefix}media`;
    const cached = this.getCachedData<InstagramMediaItem[]>(cacheKey);
    
    if (cached && this.isCacheValid(cached)) {
      return cached.data;
    }

    const data = await this.makeRequest<any>(`/${this.config.userId}/media`, {
      fields: 'id,media_type,media_url,permalink,caption,timestamp,thumbnail_url',
      limit: limit.toString(),
    });

    const mediaItems: InstagramMediaItem[] = data.data
      .filter((item: any) => item.media_type === 'IMAGE')
      .map((item: any) => ({
        id: item.id,
        mediaType: item.media_type,
        mediaUrl: item.media_url,
        permalink: item.permalink,
        caption: item.caption,
        timestamp: item.timestamp,
        thumbnailUrl: item.thumbnail_url || item.media_url,
      }));

    this.setCachedData(cacheKey, mediaItems, instagramConfig.cacheExpiry);
    return mediaItems;
  }

  extractHashtags(caption: string): string[] {
    if (!caption) return [];
    const hashtagRegex = /#[\w\u0590-\u05ff]+/g;
    const matches = caption.match(hashtagRegex);
    return matches ? matches.map(tag => tag.toLowerCase()) : [];
  }

  private getCachedData<T>(key: string): CachedData<T> | null {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;
      return JSON.parse(cached) as CachedData<T>;
    } catch {
      return null;
    }
  }

  private setCachedData<T>(key: string, data: T, ttlMinutes: number): void {
    try {
      const now = Date.now();
      const cachedData: CachedData<T> = {
        data,
        timestamp: now,
        expiresAt: now + ttlMinutes * 60 * 1000,
      };
      localStorage.setItem(key, JSON.stringify(cachedData));
    } catch (error) {
      console.warn('Failed to cache Instagram data:', error);
    }
  }

  private isCacheValid(cachedData: CachedData<any>): boolean {
    return Date.now() < cachedData.expiresAt;
  }
}

export const instagramService = new InstagramService(instagramConfig);
