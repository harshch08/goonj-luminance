import { useState, useEffect, useCallback, useMemo } from 'react';
import { instagramService } from '@/services/instagram.service';
import { instagramConfig } from '@/config/instagram.config';
import type { InstagramMediaItem } from '@/types/instagram.types';

export interface InstagramMediaWithTags extends InstagramMediaItem {
  tags: string[];
}

interface UseInstagramMediaResult {
  media: InstagramMediaWithTags[];
  allTags: string[];
  isLoading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
}

export function useInstagramMedia(
  limit: number = instagramConfig.mediaLimit,
  refreshInterval: number = instagramConfig.refreshInterval
): UseInstagramMediaResult {
  const [media, setMedia] = useState<InstagramMediaWithTags[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchMedia = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const mediaItems = await instagramService.getMediaItems(limit);
      
      const mediaWithTags: InstagramMediaWithTags[] = mediaItems.map(item => ({
        ...item,
        tags: instagramService.extractHashtags(item.caption || ''),
      }));
      
      setMedia(mediaWithTags);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch media'));
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchMedia();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchMedia, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchMedia, refreshInterval]);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    media.forEach(item => {
      item.tags.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [media]);

  return {
    media,
    allTags,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchMedia,
  };
}
