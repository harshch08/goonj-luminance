import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { BandhanFooter } from '@/components/bandhan/BandhanFooter';
import BandhanPageTransition from '@/components/bandhan/BandhanPageTransition';
import FloatingFlowers from '@/components/bandhan/decorative/FloatingFlowers';
import ServiceHero from '@/components/bandhan/services/ServiceHero';
import ServiceDetails from '@/components/bandhan/services/ServiceDetails';
import ConceptShowcase from '@/components/bandhan/services/ConceptShowcase';
import ServiceCTA from '@/components/bandhan/services/ServiceCTA';
import ServiceEnquiryForm from '@/components/bandhan/services/ServiceEnquiryForm';
import '@/components/bandhan/bandhan-theme.css';

const service = {
  title: 'TALENT SHOWS & FASHION EVENTS',
  subtitle: 'Where creativity meets the spotlight',
  description:
    'We produce electrifying talent shows, fashion showcases, and cultural events that captivate audiences and celebrate artistry. From runway productions and college fests to open-mic nights and cultural galas, we create stages where talent shines and memories are made.',
  heroImages: [
    { src: '/gallery/Fashion/fashion-1.jpg', alt: 'Fashion show' },
    { src: '/gallery/Fashion/fashion-2.jpg', alt: 'Fashion event' },
    { src: '/gallery/Fest/Fest-design.png', alt: 'Talent show stage' },
  ],
  features: [
    'Full event production and stage design',
    'Runway setup and lighting for fashion shows',
    'Talent coordination and scheduling',
    'Professional sound and AV systems',
    'Backstage management and artist support',
    'Audience engagement and hosting',
    'Photography and videography coverage',
    'Sponsorship branding and activation',
  ],
  benefits: [
    'Experienced team with deep roots in live entertainment',
    'Creative stage concepts tailored to your theme',
    'Seamless coordination between performers and production',
    'High-energy atmosphere that keeps audiences engaged',
    'Flexible packages for college fests, brand events, and private shows',
  ],
  conceptShowcase: {
    title: 'OUR PORTFOLIO',
    subtitle: 'TALENT & FASHION EVENT SETUPS\nCAN BE RECREATED',
    images: [
      { src: '/gallery/Fashion/fashion-1.jpg', alt: 'Fashion show 1' },
      { src: '/gallery/Fashion/fashion-2.jpg', alt: 'Fashion show 2' },
      { src: '/gallery/Fashion/fashion-3.jpg', alt: 'Fashion show 3' },
      { src: '/gallery/Fest/Fest-design.png', alt: 'Fest stage design' },
      { src: '/gallery/Fest/Fest-design-2.png', alt: 'Fest design 2' },
      { src: '/gallery/Concert/University-fest.png', alt: 'University fest' },
    ],
  },
};
const TalentFashion = () => (
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
      <ConceptShowcase
        title={service.conceptShowcase.title}
        subtitle={service.conceptShowcase.subtitle}
        images={service.conceptShowcase.images}
      />
      <ServiceDetails features={service.features} benefits={service.benefits} />
      <ServiceEnquiryForm
        serviceName="Talent Shows & Fashion Events"
        extraFields={[
          { name: 'eventType', label: 'Event Type', options: ['Fashion Show', 'Talent Show', 'College Fest', 'Cultural Gala', 'Open Mic', 'Other'] },
          { name: 'audienceSize', label: 'Expected Audience Size' },
          { name: 'theme', label: 'Event Theme / Concept' },
        ]}
      />
      <ServiceCTA />
    </main>
    <BandhanFooter />
  </div>
  </BandhanPageTransition>
);
export default TalentFashion;
