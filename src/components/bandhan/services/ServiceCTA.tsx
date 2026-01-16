const ServiceCTA = () => {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-secondary/30 via-accent/5 to-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />
      
      {/* Decorative floral - top right */}
      <div className="absolute top-12 right-8 opacity-30 pointer-events-none hidden md:block">
        <svg width="100" height="120" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="30" r="15" fill="#D4AF37" opacity="0.3" />
          <circle cx="65" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <circle cx="35" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <path d="M50 50 L50 110" stroke="#8B7355" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-block mb-6">
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
          </div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-6 tracking-tight">
            Ready to Get Started?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
            Let's create something extraordinary together. Contact us today for a consultation 
            and let us bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-block bg-accent hover:bg-accent/90 text-white font-semibold px-10 py-5 rounded-xl shadow-elegant hover:shadow-soft transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 cursor-pointer text-center"
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
