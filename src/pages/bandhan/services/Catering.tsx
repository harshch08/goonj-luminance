import { MainNav } from '@/components/layout/MainNav';
import { CategoryNav } from '@/components/layout/CategoryNav';
import { Footer } from '@/components/sections/Footer';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import ServiceHero from '@/components/bandhan/services/ServiceHero';
import CuisineStations from '@/components/bandhan/services/CuisineStations';
import DecorPortfolio from '@/components/bandhan/services/DecorPortfolio';
import WhatsIncluded from '@/components/bandhan/services/WhatsIncluded';
import ServiceCTA from '@/components/bandhan/services/ServiceCTA';
import { servicesData } from '@/components/bandhan/data/servicesData';
import '@/components/bandhan/bandhan-theme.css';

const Catering = () => {
  const service = servicesData.catering;

  return (
    <div className="min-h-screen bandhan-theme">
      <MainNav />
      <CategoryNav />
      <FloatingFlowers />
      
      <main className="relative -mt-[140px] pt-[140px]">
        <ServiceHero
          title={service.title}
          subtitle={service.subtitle}
          description={service.description}
          images={service.heroImages}
        />

        <CuisineStations />

        <DecorPortfolio />

        <WhatsIncluded />

        <ServiceCTA />
      </main>
      <Footer />
    </div>
  );
};

export default Catering;

