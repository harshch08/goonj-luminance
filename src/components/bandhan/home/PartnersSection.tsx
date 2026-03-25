const partners = [
  { name: "Brand Partner A", logo: "/Brands/a.png" },
  { name: "Brand Partner B", logo: "/Brands/b.jpeg" },
  { name: "Brand Partner C", logo: "/Brands/c.png" },
  { name: "Brand Partner D", logo: "/Brands/d.png" },
  { name: "Brand Partner E", logo: "/Brands/e.png" },
  { name: "Brand Partner F", logo: "/Brands/f.png" },
  { name: "Brand Partner G", logo: "/Brands/g.png" },
  { name: "Brand Partner H", logo: "/Brands/h.png" },
  { name: "Brand Partner I", logo: "/Brands/i.png" },
  { name: "Brand Partner J", logo: "/Brands/j.png" },
  { name: "Brand Partner K", logo: "/Brands/k.png" },
  { name: "Brand Partner L", logo: "/Brands/l.png" },
  { name: "Brand Partner M", logo: "/Brands/m.png" },
  { name: "Brand Partner N", logo: "/Brands/n.png" },
  { name: "Brand Partner O", logo: "/Brands/o.png" },
  { name: "Brand Partner P", logo: "/Brands/p.png" },
  { name: "Brand Partner Q", logo: "/Brands/q.png" },
  { name: "Brand Partner R", logo: "/Brands/r.png" },
  { name: "Brand Partner S", logo: "/Brands/s.png" },
  { name: "Brand Partner T", logo: "/Brands/t.png" },
];

const PartnersSection = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-secondary/20 to-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-heading text-foreground mb-4">OUR PARTNERS</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto"></div>
        </div>

        <div className="relative -mx-4 overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-r from-background via-background/90 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-32 md:w-40 bg-gradient-to-l from-background via-background/90 to-transparent z-10"></div>

          <div
            style={{
              display: 'flex',
              width: 'max-content',
              animation: 'bandhan-partners-infinite 60s linear infinite',
            }}
            className="items-center hover:[animation-play-state:paused]"
          >
            {partners.map((partner, index) => (
              <div key={`a-${index}`} className="flex-shrink-0 mx-6 sm:mx-8 md:mx-12">
                <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center group">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-w-[85%] max-h-[85%] object-contain opacity-95 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
            {partners.map((partner, index) => (
              <div key={`b-${index}`} className="flex-shrink-0 mx-6 sm:mx-8 md:mx-12">
                <div className="w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center group">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-w-[85%] max-h-[85%] object-contain opacity-95 group-hover:opacity-100 transition-all duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm md:text-base animate-fade-in">
          Trusted by leading brands to deliver exceptional experiences
        </p>
      </div>

      <style>{`
        @keyframes bandhan-partners-infinite {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;

