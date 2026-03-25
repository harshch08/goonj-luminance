import { ServicePortfolioItem } from "@/data/services/types";

interface ServicePortfolioProps {
  portfolio: ServicePortfolioItem[];
}

const ServicePortfolio = ({ portfolio }: ServicePortfolioProps) => {
  return (
    <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4">
        {portfolio.map((item, sectionIndex) => (
          <div key={sectionIndex} className="max-w-6xl mx-auto mb-16">
            {item.title && (
              <div className="mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-2">
                  {item.title}
                </h2>
                {item.subtitle && (
                  <p className="text-lg text-muted-foreground whitespace-pre-line">
                    {item.subtitle}
                  </p>
                )}
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-8">
              {item.images.map((image, index) => (
                <div
                  key={index}
                  className="polaroid-frame animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-80 object-cover rounded"
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
