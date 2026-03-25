import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import BandhanPageTransition from '@/components/bandhan/BandhanPageTransition';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import ServiceHero from '@/components/bandhan/services/ServiceHero';
import DecorPortfolio from '@/components/bandhan/services/DecorPortfolio';
import WhatsIncluded from '@/components/bandhan/services/WhatsIncluded';
import ServiceCTA from '@/components/bandhan/services/ServiceCTA';
import ServiceEnquiryForm from '@/components/bandhan/services/ServiceEnquiryForm';
import { servicesData } from '@/components/bandhan/data/servicesData';
import '@/components/bandhan/bandhan-theme.css';

const Catering = () => {
  const service = servicesData.catering;
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
        <DecorPortfolio />
        <WhatsIncluded />
        <ServiceEnquiryForm
          serviceName="Catering & Decor"
          extraFields={[
            { name: 'eventType', label: 'Event Type', options: ['Wedding', 'Sangeet', 'Haldi', 'Reception', 'Corporate', 'Other'] },
            { name: 'guestCount', label: 'Approximate Guest Count' },
            { name: 'cuisinePreference', label: 'Cuisine Preference', options: ['Indian', 'Continental', 'Multi-Cuisine', 'Custom'] },
          ]}
        />
        <ServiceCTA />
      </main>
      <BandhanFooter />
    </div>
    </BandhanPageTransition>
  );
};
export default Catering;
