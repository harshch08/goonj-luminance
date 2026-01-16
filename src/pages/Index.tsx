import { MainNav } from '@/components/layout/MainNav';
import { CategoryNav } from '@/components/layout/CategoryNav';
import { HeroSlider } from '@/components/sections/HeroSlider';
import { IntroSection } from '@/components/sections/IntroSection';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { SocialProofSection } from '@/components/sections/SocialProofSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { WhatsAppSection } from '@/components/sections/WhatsAppSection';
import { Footer } from '@/components/sections/Footer';
import { PartnersSection } from '@/components/sections/PartnersSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <MainNav />
      <CategoryNav />
      <main>
        <HeroSlider />
        <IntroSection />
        <ServicesSection />
        <SocialProofSection />
        <TestimonialsSection />
        <PartnersSection />
        <WhatsAppSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
