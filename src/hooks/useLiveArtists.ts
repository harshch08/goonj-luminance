import { useQuery } from '@tanstack/react-query';
import { CelebrityService } from '@/services/celebrity.service';
import type { LiveArtist } from '@/components/artists/LiveArtistCard';

export function useLiveArtists() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['live', 'artists'],
    queryFn: CelebrityService.getLiveArtists,
    staleTime: 10 * 60 * 1000,
  });

  const liveMusicArtists: LiveArtist[] = (data ?? [])
    .filter(a => a.category === 'Live Music')
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(a => ({
      id: a.id,
      name: a.name,
      genre: a.genre,
      tag: a.tag,
      bio: a.bio,
      image: a.image_url ?? '',
    }));

  return { liveMusicArtists, isLoading, error };
}
