import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import BandhanPageTransition from '@/components/bandhan/BandhanPageTransition';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import ServiceHero from '@/components/bandhan/services/ServiceHero';
import ServiceGrid from '@/components/bandhan/services/ServiceGrid';
import ServicePortfolio from '@/components/bandhan/services/ServicePortfolio';
import ConceptShowcase from '@/components/bandhan/services/ConceptShowcase';
import ServiceDetails from '@/components/bandhan/services/ServiceDetails';
import ServiceCTA from '@/components/bandhan/services/ServiceCTA';
import DestinationWeddingEnquiryForm from '@/components/bandhan/services/DestinationWeddingEnquiryForm';
import { servicesData } from '@/components/bandhan/data/servicesData';
import '@/components/bandhan/bandhan-theme.css';

const DestinationWeddings = () => {
  const service = servicesData.destinationWeddings;
  return (
    <BandhanPageTransition><div className="min-h-screen bandhan-theme" style={{ backgroundColor: 'hsl(40, 40%, 97%)' }}>
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
        {service.options && (
          <ServiceGrid
            title="TYPES OF WEDDINGS AVAILABLE"
            options={service.options}
          />
        )}
        {service.portfolio && <ServicePortfolio portfolio={service.portfolio} />}
        {service.conceptShowcase && (
          <ConceptShowcase
            title={service.conceptShowcase.title}
            subtitle={service.conceptShowcase.subtitle}
            images={service.conceptShowcase.images}
            layout={service.conceptShowcase.layout}
          />
        )}
        <ServiceDetails features={service.features} benefits={service.benefits} />
        <DestinationWeddingEnquiryForm />
        <ServiceCTA />
      </main>
      <BandhanFooter />
    </div>
    </BandhanPageTransition>
  );
};
export default DestinationWeddings;
