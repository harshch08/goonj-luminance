import { ServiceOption } from "@/components/bandhan/data/services/types";

interface ServiceGridProps {
  title: string;
  options: ServiceOption[];
}

const ServiceGrid = ({ title, options }: ServiceGridProps) => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-block mb-6">
              <div className="w-16 h-1 bg-accent mx-auto mb-6" />
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight">
              {title}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {options.map((option, index) => (
              <div
                key={option.title}
                className="animate-fade-in-up group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="polaroid-frame mb-6 hover:scale-105 hover:rotate-0 transition-all duration-500">
                  <img
                    src={option.image.src}
                    alt={option.image.alt}
                    className="w-full h-64 object-cover rounded"
                  />
                </div>
                <h3 className="text-xl md:text-2xl font-heading font-semibold text-primary text-center mb-3 group-hover:text-accent transition-colors duration-300">
                  {option.title}
                </h3>
                {option.description && (
                  <p className="text-muted-foreground text-center text-sm md:text-base leading-relaxed">
                    {option.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
