import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/bandhan/hero-wedding.jpg";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury wedding setup"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 gradient-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white mb-6">
            Crafting Timeless Wedding Experiences
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 font-body">
            Celebrating love, culture, and unforgettable moments with precision and passion
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-primary font-semibold px-8 py-6 text-lg shadow-elegant transition-smooth"
              onClick={() => {
                // Scroll to services section
                setTimeout(() => {
                  const sections = document.querySelectorAll('section');
                  const servicesSection = Array.from(sections).find(section => 
                    section.textContent?.includes('Your Dream Wedding Begins Here')
                  );
                  servicesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
            >
              Explore Services
              <ArrowRight className="ml-2" size={20} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm px-8 py-6 text-lg transition-smooth"
              onClick={() => {
                // Scroll to services section
                setTimeout(() => {
                  const sections = document.querySelectorAll('section');
                  const servicesSection = Array.from(sections).find(section => 
                    section.textContent?.includes('Your Dream Wedding Begins Here')
                  );
                  servicesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
              }}
            >
              View Our Work
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

