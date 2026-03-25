import { ServiceImage } from "@/components/bandhan/data/services/types";
import FloralDecor from "./FloralDecor";

interface ServiceHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  images: ServiceImage[];
}

const ServiceHero = ({ title, subtitle, description, images }: ServiceHeroProps) => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left: Title and Description */}
            <div className="animate-fade-in">
              <div className="inline-block mb-6">
                <div className="w-16 h-1 bg-accent mb-6" />
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary mb-6 tracking-tight leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-lg md:text-xl text-accent mb-8 font-medium">{subtitle}</p>
              )}
              <p className="text-foreground/90 leading-relaxed text-lg md:text-xl">
                {description}
              </p>
            </div>

            {/* Right: Image Collage */}
            <div className="relative animate-fade-in-up">
              {images.length === 1 && (
                <div className="polaroid-frame hover:scale-105 transition-transform duration-500">
                  <img
                    src={images[0].src}
                    alt={images[0].alt}
                    className="w-full h-[400px] object-cover rounded"
                  />
                </div>
              )}

              {images.length === 2 && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="polaroid-frame -rotate-2 hover:rotate-0 hover:scale-105 transition-all duration-500">
                    <img
                      src={images[0].src}
                      alt={images[0].alt}
                      className="w-full h-64 object-cover rounded"
                    />
                  </div>
                  <div className="polaroid-frame rotate-2 mt-8 hover:rotate-0 hover:scale-105 transition-all duration-500">
                    <img
                      src={images[1].src}
                      alt={images[1].alt}
                      className="w-full h-64 object-cover rounded"
                    />
                  </div>
                </div>
              )}

              {images.length >= 3 && (
                <div className="relative">
                  {/* Main large image */}
                  <div className="polaroid-frame mb-6 hover:scale-105 transition-transform duration-500">
                    <img
                      src={images[0].src}
                      alt={images[0].alt}
                      className="w-full h-80 object-cover rounded"
                    />
                  </div>
                  
                  {/* Smaller images grid */}
                  <div className="grid grid-cols-2 gap-6">
                    {images.slice(1, 3).map((image, index) => (
                      <div 
                        key={index} 
                        className={`polaroid-frame hover:rotate-0 hover:scale-105 transition-all duration-500 ${index === 0 ? '-rotate-1' : 'rotate-1'}`}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-48 object-cover rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <FloralDecor />
    </section>
  );
};

export default ServiceHero;
