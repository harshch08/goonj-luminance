import { useQuery } from '@tanstack/react-query';
import { CelebrityService } from '@/services/celebrity.service';

export const CELEBRITY_QUERY_KEYS = {
  all: ['celebrity', 'artists'] as const,
  byId: (id: number) => ['celebrity', 'artists', id] as const,
} as const;

/**
 * Hook to fetch all celebrity artists
 */
export function useCelebrityArtists() {
  return useQuery({
    queryKey: CELEBRITY_QUERY_KEYS.all,
    queryFn: CelebrityService.getAllArtists,
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

/**
 * Hook to fetch a single celebrity artist
 */
export function useCelebrityArtist(id: number) {
  return useQuery({
    queryKey: CELEBRITY_QUERY_KEYS.byId(id),
    queryFn: () => CelebrityService.getArtistById(id),
    staleTime: 10 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    enabled: id > 0,
  });
}
