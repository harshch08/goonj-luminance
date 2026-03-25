import { useQuery } from '@tanstack/react-query';
import { CelebrityService } from '@/services/celebrity.service';
import type { Artist } from '@/components/artists/ArtistCard';

export function useFeaturedArtists() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['featured', 'artists'],
    queryFn: CelebrityService.getFeaturedArtists,
    staleTime: 10 * 60 * 1000,
  });

  const featuredArtists: Artist[] = (data ?? []).map(a => ({
    id: a.id,
    name: a.name,
    category: a.category,
    genre: a.genre,
    image: a.image,
    bio: a.bio,
    performances: a.performances,
    rating: a.rating,
  }));

  return { featuredArtists, isLoading, error };
}
