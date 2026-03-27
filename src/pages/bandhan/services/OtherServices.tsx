import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import BandhanPageTransition from '@/components/bandhan/BandhanPageTransition';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import ServiceCTA from '@/components/bandhan/services/ServiceCTA';
import ServiceEnquiryForm from '@/components/bandhan/services/ServiceEnquiryForm';
import OtherServicesShowcase from '@/components/bandhan/services/OtherServicesShowcase';
import '@/components/bandhan/bandhan-theme.css';

const OtherServices = () => (
  <BandhanPageTransition>
    <div className="min-h-screen bandhan-theme" style={{ backgroundColor: 'hsl(40, 40%, 97%)' }}>
      <BandhanNav />
      <BandhanCategoryNav />
      <FloatingFlowers />

      <main className="relative -mt-[140px] pt-[140px]">

        {/* Hero */}
        <section className="relative h-[60vh] min-h-[440px] flex items-center justify-center overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&h=900&fit=crop&q=80"
            alt="Other Services"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 gradient-hero" />
          <div className="relative z-10 text-center px-4 animate-fade-in">
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-4 tracking-tight">
              Other Services
            </h1>
            <p className="text-xl md:text-2xl text-white/85 max-w-2xl mx-auto font-body">
              Every detail that makes your celebration truly complete
            </p>
          </div>
        </section>

        {/* Showcase */}
        <OtherServicesShowcase />

        {/* Enquiry */}
        <ServiceEnquiryForm
          serviceName="Other Services"
          extraFields={[
            {
              name: 'serviceRequired',
              label: 'Service Required',
              multiSelect: true,
              options: [
                'Sangeet',
                'Pyrodry / Fireworks',
                'Jaimala Fireworks',
                'Live Music',
                'Mehendi Artist',
                'Makeup Artist',
                'Anchoring',
                'Haldi Mehendi',
                'Entrance Selfie Point',
                'Pre Wedding Shoot',
                'Wedding Stationary',
                'Multiple Services',
              ],
            },
            { name: 'eventDate', label: 'Event Date' },
            { name: 'guestCount', label: 'Approximate Guest Count' },
          ]}
        />

        <ServiceCTA />
      </main>

      <BandhanFooter />
    </div>
  </BandhanPageTransition>
);

export default OtherServices;
