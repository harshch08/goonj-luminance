import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import ServiceHero from '@/components/bandhan/services/ServiceHero';
import ServiceDetails from '@/components/bandhan/services/ServiceDetails';
import ConceptShowcase from '@/components/bandhan/services/ConceptShowcase';
import ServiceCTA from '@/components/bandhan/services/ServiceCTA';
import ServiceEnquiryForm from '@/components/bandhan/services/ServiceEnquiryForm';
import '@/components/bandhan/bandhan-theme.css';

const service = {
  title: 'CORPORATE EVENTS & CONFERENCES',
  subtitle: 'Elevating professional gatherings with precision and elegance',
  description:
    'From high-profile conferences and product launches to award ceremonies and corporate galas, we deliver seamless, impactful events that reflect your brand\'s prestige. Our team handles every detail — venue, production, catering, and entertainment — so you can focus on what matters.',
  heroImages: [
    { src: '/gallery/Corporate/corporate-1.jpg', alt: 'Corporate event setup' },
    { src: '/gallery/Corporate/corporate-2.jpg', alt: 'Conference hall' },
    { src: '/gallery/Corporate/corporate-3.jpg', alt: 'Corporate gala' },
  ],
  features: [
    'End-to-end event planning and coordination',
    'Venue selection and setup management',
    'Professional AV and stage production',
    'Corporate branding and signage',
    'Guest management and registration',
    'Catering and hospitality services',
    'Live entertainment and anchoring',
    'Post-event reporting and feedback',
  ],
  benefits: [
    'Dedicated event manager assigned to your project',
    'Seamless execution with zero disruption to your schedule',
    'Premium vendor network for best-in-class services',
    'Customised themes aligned with your brand identity',
    'Pan-India execution capability',
  ],
  conceptShowcase: {
    title: 'OUR PORTFOLIO',
    subtitle: 'CORPORATE EVENT SETUPS\nCAN BE RECREATED',
    images: [
      { src: '/gallery/Corporate/corporate-1.jpg', alt: 'Corporate event 1' },
      { src: '/gallery/Corporate/corporate-2.jpg', alt: 'Corporate event 2' },
      { src: '/gallery/Corporate/corporate-3.jpg', alt: 'Corporate event 3' },
      { src: '/gallery/Fest/Fest-design.png', alt: 'Event design' },
      { src: '/gallery/Fest/Fest-design-2.png', alt: 'Event setup' },
      { src: '/gallery/Concert/Fest.png', alt: 'Corporate fest' },
    ],
  },
};

const CorporateEvents = () => (
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

      <ConceptShowcase
        title={service.conceptShowcase.title}
        subtitle={service.conceptShowcase.subtitle}
        images={service.conceptShowcase.images}
      />

      <ServiceDetails features={service.features} benefits={service.benefits} />
      <ServiceEnquiryForm
        serviceName="Corporate Events & Conferences"
        extraFields={[
          { name: 'eventType', label: 'Event Type', options: ['Conference', 'Product Launch', 'Award Ceremony', 'Corporate Gala', 'Team Building', 'Other'] },
          { name: 'attendees', label: 'Number of Attendees' },
          { name: 'companyName', label: 'Company / Organisation Name' },
        ]}
      />
      <ServiceCTA />
    </main>
    <BandhanFooter />
  </div>
);

export default CorporateEvents;
