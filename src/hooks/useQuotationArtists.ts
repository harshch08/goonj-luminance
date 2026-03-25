import { useQuery } from '@tanstack/react-query';
import { CelebrityService } from '@/services/celebrity.service';
import type { QuotationArtist, QuotationCategory } from '@/data/quotationData';
import { staticQuotationCategories } from '@/data/quotationData';
import { supabase } from '@/lib/supabase';

function parsePackagePrice(pkg: string): number {
  // handles "50K + GST", "6Lacs + GST", "60Lacs + GST"
  const lacMatch = pkg.match(/([\d.]+)\s*Lac/i);
  if (lacMatch) return parseFloat(lacMatch[1]) * 100000;
  const kMatch = pkg.match(/([\d.]+)\s*K/i);
  if (kMatch) return parseFloat(kMatch[1]) * 1000;
  return 999;
}

async function fetchCelebrityForQuotation() {
  const { data, error } = await supabase
    .from('celebrity_artists')
    .select('id, name, package, niche, tier, image_url, price, bio')
    .order('price', { ascending: true });
  if (error) throw new Error(error.message);
  return data || [];
}

export function useQuotationArtists() {
  const { data: celebrityDB, isLoading: loadingCelebrity } = useQuery({
    queryKey: ['celebrity', 'artists', 'quotation', 'v2'],
    queryFn: fetchCelebrityForQuotation,
    staleTime: 5 * 60 * 1000,
  });

  const { data: liveDB, isLoading: loadingLive } = useQuery({
    queryKey: ['live', 'artists'],
    queryFn: CelebrityService.getLiveArtists,
    staleTime: 10 * 60 * 1000,
  });

  const { data: eventsDB, isLoading: loadingEvents } = useQuery({
    queryKey: ['event', 'services'],
    queryFn: CelebrityService.getEventServices,
    staleTime: 10 * 60 * 1000,
  });

  const isLoading = loadingCelebrity || loadingLive || loadingEvents;

  const buildCategories = (): QuotationCategory[] => {
    const categories: QuotationCategory[] = [];

    // 1. Live Music
    if (liveDB && liveDB.length > 0) {
      const liveMusic: QuotationArtist[] = liveDB
        .filter(a => a.category === 'Live Music')
        .map(a => ({ id: `lm-db-${a.id}`, name: a.name, description: a.description, price: a.price, category: 'Live Music', image: a.image_url || undefined }));
      if (liveMusic.length > 0) categories.push({ id: 'live-music', label: 'Live Music', icon: '🎵', artists: liveMusic });
    } else if (!loadingLive) {
      const cat = staticQuotationCategories.find(c => c.id === 'live-music');
      if (cat) categories.push(cat);
    }

    // 2. Celebrity Artists — ALL from celebrity_artists table
    if (celebrityDB && celebrityDB.length > 0) {
      const celebrity: QuotationArtist[] = celebrityDB.map(a => ({
        id: `ca-db-${a.id}`,
        name: a.name,
        description: a.niche,
        detailDescription: a.bio || undefined,
        price: (a.price && a.price > 999) ? a.price : parsePackagePrice(a.package),
        category: 'Celebrity Artists',
        image: a.image_url || undefined,
      }));
      categories.push({ id: 'celebrity-artists', label: 'Celebrity Artists', icon: '⭐', artists: celebrity });
    }

    // 3. Second Performers
    if (liveDB && liveDB.length > 0) {
      const secondPerformers: QuotationArtist[] = liveDB
        .filter(a => a.category === 'Second Performers')
        .map(a => ({ id: `sp-db-${a.id}`, name: a.name, description: a.description, price: a.price, category: 'Second Performers', image: a.image_url || undefined }));
      const djServices: QuotationArtist[] = liveDB
        .filter(a => a.category === 'DJ Services')
        .map(a => ({ id: `dj-db-${a.id}`, name: a.name, description: a.description, price: a.price, category: 'DJ Services', image: a.image_url || undefined }));

      if (secondPerformers.length > 0) categories.push({ id: 'second-performers', label: 'Second Performers', icon: '🎸', artists: secondPerformers });
      if (djServices.length > 0) categories.push({ id: 'dj', label: 'DJ Services', icon: '🎧', artists: djServices });
    } else if (!loadingLive) {
      const cat = staticQuotationCategories.find(c => c.id === 'dj');
      if (cat) categories.push(cat);
    }

    // 4. Event Services
    if (eventsDB && eventsDB.length > 0) {
      const eventServices: QuotationArtist[] = eventsDB.map(a => ({
        id: `es-db-${a.id}`, name: a.name, description: a.description, price: a.price, category: 'Event Services', image: a.image_url || undefined,
      }));
      categories.push({ id: 'event-services', label: 'Event Services', icon: '🎪', artists: eventServices });
    } else if (!loadingEvents) {
      const cat = staticQuotationCategories.find(c => c.id === 'event-services');
      if (cat) categories.push(cat);
    }

    return categories;
  };

  return { categories: buildCategories(), isLoading };
}
