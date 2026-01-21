import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { Footer } from '@/components/sections/Footer';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import ServiceHero from '@/components/bandhan/services/ServiceHero';
import PhotographyServices from '@/components/bandhan/services/PhotographyServices';
import PhotographyInclusions from '@/components/bandhan/services/PhotographyInclusions';
import ServiceCTA from '@/components/bandhan/services/ServiceCTA';
import { servicesData } from '@/components/bandhan/data/servicesData';
import '@/components/bandhan/bandhan-theme.css';

const Photography = () => {
  const service = servicesData.photography;

  return (
    <div className="min-h-screen bandhan-theme">
      <BandhanNav />
      <BandhanCategoryNav />
      <FloatingFlowers />
      
      <main className="relative -mt-[140px] pt-[140px]">
        <ServiceHero
          title={service.title}
          subtitle={service.subtitle}
          description={service.description}
          images={service.heroImages}
        />

        <PhotographyServices />

        <PhotographyInclusions />

        <ServiceCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Photography;

