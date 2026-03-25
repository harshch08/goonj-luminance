export interface CelebrityArtist {
  id: number;
  name: string;
  package: string;
  niche: string;
  tier: 'green' | 'yellow' | 'red';
  image_url?: string;
  bio?: string;
  created_at?: string;
  updated_at?: string;
}
