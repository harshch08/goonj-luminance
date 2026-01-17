import { useEffect } from 'react';
import { BandhanNav } from '@/components/layout/BandhanNav';
import { BandhanCategoryNav } from '@/components/layout/BandhanCategoryNav';
import { Footer } from '@/components/sections/Footer';
import HeroSection from '@/components/bandhan/home/HeroSection';
import IntroSection from '@/components/bandhan/home/IntroSection';
import TestimonialSection from '@/components/bandhan/home/TestimonialSection';
import PartnersSection from '@/components/bandhan/home/PartnersSection';
import '@/components/bandhan/bandhan-theme.css';

const Bandhan = () => {
  useEffect(() => {
    const handleScroll = () => {
      const bandhanElement = document.querySelector('.bandhan-theme');
      if (bandhanElement) {
        if (window.scrollY > 100) {
          bandhanElement.classList.add('scrolled');
        } else {
          bandhanElement.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bandhan-theme">
      <BandhanNav />
      <BandhanCategoryNav />
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

