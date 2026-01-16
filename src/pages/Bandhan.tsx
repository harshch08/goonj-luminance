import { MainNav } from '@/components/layout/MainNav';
import { CategoryNav } from '@/components/layout/CategoryNav';
import { Footer } from '@/components/sections/Footer';
import HeroSection from '@/components/bandhan/home/HeroSection';
import IntroSection from '@/components/bandhan/home/IntroSection';
import TestimonialSection from '@/components/bandhan/home/TestimonialSection';
import PartnersSection from '@/components/bandhan/home/PartnersSection';
import '@/components/bandhan/bandhan-theme.css';

const Bandhan = () => {
  return (
    <div className="min-h-screen bandhan-theme">
      <MainNav />
      <CategoryNav />
      <main>
        <HeroSection />
        <IntroSection />
        <TestimonialSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Bandhan;

