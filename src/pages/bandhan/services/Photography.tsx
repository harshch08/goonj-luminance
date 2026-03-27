import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import BandhanPageTransition from '@/components/bandhan/BandhanPageTransition';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import ServiceHero from '@/components/bandhan/services/ServiceHero';
import PhotographyServices from '@/components/bandhan/services/PhotographyServices';
import PhotographyPackages from '@/components/bandhan/services/PhotographyPackages';
import ServiceCTA from '@/components/bandhan/services/ServiceCTA';
import ServiceEnquiryForm from '@/components/bandhan/services/ServiceEnquiryForm';
import { servicesData } from '@/components/bandhan/data/servicesData';
import '@/components/bandhan/bandhan-theme.css';

const Photography = () => {
  const service = servicesData.photography;
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
        <PhotographyServices />
        <PhotographyPackages />
        <ServiceEnquiryForm
          serviceName="Photography & Videography"
          extraFields={[
            { name: 'package', label: 'Package', options: ['Silver Package (2 Days)', 'Gold Package (2 Days)', 'Custom / Not Sure'] },
            { name: 'shootType', label: 'Shoot Type', options: ['Wedding Photography', 'Pre-Wedding Shoot', 'Cinematic Film', 'Drone Coverage', 'Full Package'] },
            { name: 'duration', label: 'Event Duration', options: ['1 Day', '2 Days', '3 Days', '4 Days'] },
          ]}
        />
        <ServiceCTA />
      </main>
      <BandhanFooter />
    </div>
    </BandhanPageTransition>
  );
};
export default Photography;
