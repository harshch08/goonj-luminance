import { useState, useEffect, useCallback } from 'react';
import { instagramService } from '@/services/instagram.service';
import { instagramConfig } from '@/config/instagram.config';

interface UseInstagramFollowersResult {
  followersCount: number | null;
  username: string | null;
  isLoading: boolean;
  error: Error | null;
  lastUpdated: Date | null;
  refetch: () => Promise<void>;
}

export function useInstagramFollowers(
  refreshInterval: number = instagramConfig.refreshInterval
): UseInstagramFollowersResult {
  const [followersCount, setFollowersCount] = useState<number | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const fetchFollowers = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const profile = await instagramService.getUserProfile();
      setFollowersCount(profile.followersCount);
      setUsername(profile.username);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch followers'));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFollowers();

    if (refreshInterval > 0) {
      const interval = setInterval(fetchFollowers, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchFollowers, refreshInterval]);

  return {
    followersCount,
    username,
    isLoading,
    error,
    lastUpdated,
    refetch: fetchFollowers,
  };
}
