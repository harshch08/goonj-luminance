import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Phone, Clock, CheckCircle, Mail } from 'lucide-react';

const features = [
  { icon: Clock, text: 'Quick Response Time' },
  { icon: CheckCircle, text: 'Direct Wedding Booking' },
  { icon: Phone, text: 'Instant Quotations' },
];

const BandhanWhatsAppSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const handleWhatsApp = () => {
    const msg = 'Hi Bandhan! I would like to inquire about wedding planning services.';
    window.open('https://wa.me/919897642145?text=' + encodeURIComponent(msg), '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:bandhan.cr@gmail.com?subject=Wedding Planning Inquiry';
  };

  return (
    <section
      ref={ref}
      className="py-16 md:py-32 bg-gradient-to-b from-secondary/30 via-accent/5 to-background relative overflow-hidden"
    >
      {/* Soft blur orbs — matches Bandhan ServiceCTA */}
      <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl" />

      {/* Decorative floral — top right */}
      <div className="absolute top-12 right-8 opacity-25 pointer-events-none hidden md:block">
        <svg width="120" height="140" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="30" r="15" fill="#D4AF37" opacity="0.3" />
          <circle cx="65" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <circle cx="35" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <path d="M50 50 L50 110" stroke="#8B7355" strokeWidth="2" />
        </svg>
      </div>

      {/* Decorative floral — bottom left */}
      <div className="absolute bottom-12 left-8 opacity-20 pointer-events-none hidden md:block">
        <svg width="80" height="100" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="30" r="15" fill="#D4AF37" opacity="0.3" />
          <circle cx="65" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <circle cx="35" cy="40" r="12" fill="#D4AF37" opacity="0.35" />
          <path d="M50 50 L50 110" stroke="#8B7355" strokeWidth="2" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center animate-fade-in"
        >
          {/* Gold divider — matches Bandhan section headers */}
          <div className="inline-block mb-6">
            <div className="w-16 h-1 bg-accent mx-auto mb-6" />
          </div>

          {/* WhatsApp icon badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.15, type: 'spring' }}
            className="w-20 h-20 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto mb-8 shadow-soft"
          >
            <MessageCircle size={36} className="text-accent" />
          </motion.div>

          <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-3 md:mb-4 tracking-tight">
            Book on WhatsApp
          </h2>
          <p className="text-sm md:text-xl text-muted-foreground mb-7 md:mb-10 leading-relaxed max-w-xs md:max-w-2xl mx-auto">
            Get instant responses, personalised wedding recommendations, and quick quotations directly on WhatsApp. Our team is available 24/7 to assist you.
          </p>

          {/* Feature pills — 3 in a row on mobile */}
          <div className="grid grid-cols-3 sm:flex sm:flex-wrap justify-center gap-2 md:gap-8 mb-8 md:mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-2 rounded-xl sm:rounded-full bg-accent/10 border border-accent/20 text-center"
              >
                <feature.icon size={14} className="text-accent flex-shrink-0" />
                <span className="text-[10px] sm:text-sm text-primary font-medium leading-tight">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA buttons — side by side on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex flex-row gap-3 justify-center items-center sm:gap-4"
          >
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-5 sm:px-10 py-3 sm:py-4 rounded-xl shadow-elegant hover:shadow-soft transition-all duration-300 hover:scale-105 group text-sm sm:text-base"
            >
              <MessageCircle size={18} className="group-hover:scale-110 transition-transform flex-shrink-0" />
              <span>Chat Now</span>
            </button>
            <button
              onClick={handleEmail}
              className="flex items-center gap-2 border border-accent/40 hover:border-accent text-primary hover:bg-accent/10 font-semibold px-5 sm:px-10 py-3 sm:py-4 rounded-xl shadow-soft transition-all duration-300 hover:scale-105 group text-sm sm:text-base"
            >
              <Mail size={18} className="group-hover:scale-110 transition-transform text-accent flex-shrink-0" />
              <span>Email Us</span>
            </button>
          </motion.div>

          {/* Contact info */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8 text-sm text-muted-foreground">
            <p>Call us: <span className="text-primary font-medium">+91 98976 42145</span></p>
            <span className="hidden sm:inline text-accent/40">•</span>
            <p>Email: <span className="text-primary font-medium">bandhan.cr@gmail.com</span></p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BandhanWhatsAppSection;
