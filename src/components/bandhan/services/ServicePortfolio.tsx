import { ServicePortfolioItem } from "@/data/services/types";

interface ServicePortfolioProps {
  portfolio: ServicePortfolioItem[];
}

const ServicePortfolio = ({ portfolio }: ServicePortfolioProps) => {
  return (
    <section className="py-14 md:py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        {portfolio.map((item, sectionIndex) => (
          <div key={sectionIndex} className="max-w-6xl mx-auto mb-10 md:mb-16">
            {item.title && (
              <div className="mb-6 md:mb-12 animate-fade-in">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-2">
                  {item.title}
                </h2>
                {item.subtitle && (
                  <p className="text-sm md:text-lg text-muted-foreground whitespace-pre-line">
                    {item.subtitle}
                  </p>
                )}
              </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
              {item.images.map((image, index) => (
                <div
                  key={index}
                  className="polaroid-frame animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-36 md:h-80 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicePortfolio;
