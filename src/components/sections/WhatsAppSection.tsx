import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { MessageCircle, Phone, Clock, CheckCircle, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const WhatsAppSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const features = [
    { icon: Clock, text: 'Quick Response Time' },
    { icon: CheckCircle, text: 'Direct Artist Booking' },
    { icon: Phone, text: 'Instant Quotations' },
  ];

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/919897642145?text=Hi%20Goonj%20Entertainment!%20I%20would%20like%20to%20inquire%20about%20your%20services.', '_blank');
  };

  const handleEmailClick = () => {
    window.location.href = 'mailto:goonjentertainment3@gmail.com?subject=Inquiry%20about%20Services&body=Hi%20Goonj%20Entertainment,%0D%0A%0D%0AI%20would%20like%20to%20inquire%20about%20your%20services.';
  };

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-gradient-to-b from-background to-secondary/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#25D366]/30 blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 md:p-12 lg:p-16 text-center border-[#25D366]/20 hover:border-[#25D366]/40 transition-all duration-500">
            {/* WhatsApp Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring' }}
              className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#25D366]/20 flex items-center justify-center mx-auto mb-8"
            >
              <MessageCircle size={40} className="text-[#25D366]" />
            </motion.div>

            {/* Heading */}
            <span className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-4">
              Quick Connect
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Book on WhatsApp
            </h2>
            <p className="text-body text-lg mb-8 max-w-2xl mx-auto">
              Get instant responses, personalized recommendations, and quick quotations directly on WhatsApp. Our team is available 24/7 to assist you.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <feature.icon size={18} className="text-[#25D366]" />
                  <span className="text-body text-sm">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] hover:bg-[#20BD5C] text-white px-8 py-6 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <MessageCircle size={22} className="mr-3 group-hover:scale-110 transition-transform" />
                Chat with Us Now
              </Button>
              
              <Button
                onClick={handleEmailClick}
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Mail size={22} className="mr-3 group-hover:scale-110 transition-transform" />
                Email Us
              </Button>
            </motion.div>

            {/* Contact info display */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-6 text-muted-foreground text-sm">
              <p>
                Call us at: <span className="text-foreground font-medium">+91 98976 42145</span>
              </p>
              <span className="hidden sm:inline">•</span>
              <p>
                Email: <span className="text-foreground font-medium">goonjentertainment3@gmail.com</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
