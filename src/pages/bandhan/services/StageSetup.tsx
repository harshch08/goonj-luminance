import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import ServiceHero from '@/components/bandhan/services/ServiceHero';
import ConceptShowcase from '@/components/bandhan/services/ConceptShowcase';
import ServiceDetails from '@/components/bandhan/services/ServiceDetails';
import ServiceCTA from '@/components/bandhan/services/ServiceCTA';
import ServiceEnquiryForm from '@/components/bandhan/services/ServiceEnquiryForm';
import { servicesData } from '@/components/bandhan/data/servicesData';
import '@/components/bandhan/bandhan-theme.css';

const StageSetup = () => {
  const service = servicesData.stageSetup;

  return (
    <div className="min-h-screen bandhan-theme" style={{ backgroundColor: 'hsl(40, 40%, 97%)' }}>
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

        {service.conceptShowcase && (
          <ConceptShowcase
            title={service.conceptShowcase.title}
            subtitle={service.conceptShowcase.subtitle}
            images={service.conceptShowcase.images}
            layout={service.conceptShowcase.layout}
          />
        )}

        <ServiceDetails features={service.features} benefits={service.benefits} />
        <ServiceEnquiryForm
          serviceName="Stage Setup & Lighting / Sound"
          extraFields={[
            { name: 'eventType', label: 'Event Type', options: ['Wedding', 'Concert', 'Corporate Event', 'Fest', 'Private Party', 'Other'] },
            { name: 'stageSize', label: 'Expected Stage Size', options: ['Small (up to 20ft)', 'Medium (20–40ft)', 'Large (40ft+)', 'Not Sure'] },
            { name: 'guestCount', label: 'Approximate Guest Count' },
          ]}
        />
        <ServiceCTA />
      </main>
      <BandhanFooter />
    </div>
  );
};

export default StageSetup;

