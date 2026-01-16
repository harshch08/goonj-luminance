interface ServiceDetailsProps {
  features?: string[];
  benefits?: string[];
}

const ServiceDetails = ({ features, benefits }: ServiceDetailsProps) => {
  if (!features && !benefits) return null;

  return (
    <section className="py-24 bg-gradient-to-b from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {features && (
            <div className="mb-16 animate-fade-in">
              <div className="text-center mb-12">
                <div className="inline-block mb-6">
                  <div className="w-16 h-1 bg-accent mx-auto mb-6" />
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary tracking-tight">
                  What's Included
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 animate-fade-in-up group bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-accent mt-1 flex-shrink-0 text-xl group-hover:scale-125 transition-transform">•</span>
                    <p className="text-foreground/90 leading-relaxed">{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {benefits && (
            <div className="animate-fade-in">
              <div className="text-center mb-12">
                <div className="inline-block mb-6">
                  <div className="w-16 h-1 bg-accent mx-auto mb-6" />
                </div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary tracking-tight">
                  Why Choose This Service
                </h2>
              </div>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-4 animate-fade-in-up group bg-background/50 backdrop-blur-sm p-4 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-accent mt-1 flex-shrink-0 text-xl group-hover:scale-125 transition-transform">•</span>
                    <p className="text-foreground/90 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ServiceDetails;
