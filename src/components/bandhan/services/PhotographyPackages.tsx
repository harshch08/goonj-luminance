import { Check, Star, Sparkles } from 'lucide-react';

const packages = [
  {
    tier: 'Silver',
    label: 'Silver Package',
    duration: '2 Days',
    badge: null,
    price: '₹80,000 – ₹1,20,000',
    accent: 'from-slate-400 to-slate-300',
    borderColor: 'border-slate-300/60',
    badgeBg: 'bg-slate-100 text-slate-600',
    items: [
      '2 Reels',
      '4-5 Minute Wedding Cinematic',
      '1 Hour + Long Wedding Video',
      "300 Edited Photo's For Album",
      "50 Edited Photo's For Instagram",
      '1 Album Gloss/Matt Sheet',
      'Videos Will Be In Full HD, 1080P',
    ],
  },
  {
    tier: 'Gold',
    label: 'Gold Package',
    duration: '2 Days',
    badge: 'Most Popular',
    price: '₹1,50,000 – ₹2,00,000',
    accent: 'from-amber-500 to-yellow-300',
    borderColor: 'border-amber-400/60',
    badgeBg: 'bg-amber-50 text-amber-700',
    items: [
      '3 Reels',
      '1 Wedding Teaser',
      '4-5 Minute Wedding Cinematic',
      '12-15 Minute Wedding Film in 4K Resolution',
      '1 Hour + Long Wedding Video',
      '300+ Edited Photos For Album',
      'Upto 100 Edited Photos For Instagram',
      '1 Album Non-Tearable Sheet',
      'Cinematic Video Will Be In 4K Resolution',
      "Candid Photo's Of The Entire Marriage Project",
    ],
  },
];

const PhotographyPackages = () => {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(160deg, hsl(40,40%,95%) 0%, hsl(40,30%,98%) 100%)' }}>
      {/* Background decorative blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-300/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-semibold mb-6">
              <Sparkles size={12} />
              Delivery Within 30–45 Days
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-primary tracking-tight">
              Photography Services
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto mt-6" />
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.tier}
                className={`relative rounded-3xl border ${pkg.borderColor} bg-white/70 backdrop-blur-sm shadow-xl overflow-hidden animate-fade-in-up transition-transform duration-300 hover:-translate-y-1`}
              >
                {/* Top gradient bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${pkg.accent}`} />

                {/* Most Popular badge */}
                {pkg.badge && (
                  <div className="absolute top-5 right-5">
                    <span className="flex items-center gap-1 bg-amber-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      <Star size={10} fill="white" /> {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Package title */}
                  <div className="mb-6">
                    <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">{pkg.duration}</p>
                    <h3 className={`text-2xl font-heading font-bold bg-gradient-to-r ${pkg.accent} bg-clip-text text-transparent`}>
                      {pkg.label}
                    </h3>
                    <p className="text-sm font-semibold text-foreground/70 mt-1">{pkg.price}</p>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full bg-gradient-to-r ${pkg.accent} opacity-30 mb-6`} />

                  {/* Items */}
                  <ul className="space-y-3">
                    {pkg.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${pkg.accent} flex items-center justify-center shadow-sm`}>
                          <Check size={11} className="text-white" strokeWidth={3} />
                        </span>
                        <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default PhotographyPackages;
