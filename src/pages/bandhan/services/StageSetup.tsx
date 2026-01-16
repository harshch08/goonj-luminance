import { MainNav } from '@/components/layout/MainNav';
import { CategoryNav } from '@/components/layout/CategoryNav';
import { Footer } from '@/components/sections/Footer';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import ServiceHero from '@/components/bandhan/services/ServiceHero';
import ConceptShowcase from '@/components/bandhan/services/ConceptShowcase';
import ServiceDetails from '@/components/bandhan/services/ServiceDetails';
import ServiceCTA from '@/components/bandhan/services/ServiceCTA';
import { servicesData } from '@/components/bandhan/data/servicesData';
import '@/components/bandhan/bandhan-theme.css';

const StageSetup = () => {
  const service = servicesData.stageSetup;

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

        {service.conceptShowcase && (
          <ConceptShowcase
            title={service.conceptShowcase.title}
            subtitle={service.conceptShowcase.subtitle}
            images={service.conceptShowcase.images}
            layout={service.conceptShowcase.layout}
          />
        )}

        <ServiceDetails features={service.features} benefits={service.benefits} />

        <ServiceCTA />
      </main>
      <Footer />
    </div>
  );
};

export default StageSetup;

