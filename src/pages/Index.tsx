import { MainNav } from '@/components/layout/MainNav';
import { CategoryNav } from '@/components/layout/CategoryNav';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { IntroSection } from '@/components/sections/IntroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { WhatsAppSection } from '@/components/sections/WhatsAppSection';
import { Footer } from '@/components/sections/Footer';
import { PartnersSection } from '@/components/sections/PartnersSection';
import { InstagramSection } from '@/components/sections/InstagramSection';
import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { InstagramPrefetch } from '@/lib/instagram-prefetch';

const Index = () => {
  const queryClient = useQueryClient();

  // Prefetch Instagram data when the homepage loads
  useEffect(() => {
    // Use a small delay to avoid blocking initial render
    const prefetchTimer = setTimeout(() => {
      InstagramPrefetch.warmUpCache(queryClient).catch(error => {
        console.warn('Failed to prefetch Instagram data:', error);
      });
    }, 100);

    return () => clearTimeout(prefetchTimer);
  }, [queryClient]);

  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <CategoryNav />
      <main>
        <HeroSlider />
        <IntroSection />
        <ServicesSection />
        <TestimonialsSection />
        <InstagramSection />
        <PartnersSection />
        <WhatsAppSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
