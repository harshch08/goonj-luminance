import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Button } from '@/components/ui/button';

const contactInfo = [
  {
    icon: Phone,
    title: 'CEO - Mr. Ayush Gupta',
    details: ['Personal: +91 9760813704', 'Office: +91 9897642145'],
  },
  {
    icon: Phone,
    title: 'Manager - Ms. Sapna Das',
    details: ['+91 8923192218'],
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['goonjentertainment3@gmail.com'],
  },
  {
    icon: MapPin,
    title: 'Office',
    details: ['78/2 Chukhuwala Behind GPO', 'Near Madhav Niwas Dehradun', 'Uttarakhand 248001'],
  },
  {
    icon: Clock,
    title: 'Working Hours',
    details: ['Mon - Sat: 10:00 AM - 8:00 PM', 'Sunday: By Appointment'],
  },
];

const Contact = () => {
  return (
    <PageLayout>
      <PageHero 
        title="Contact Us"
        subtitle="Let's create something extraordinary together"
      />

      {/* Contact Info Cards */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-6 text-center"
              >
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <info.icon size={24} className="text-gold-light" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-body text-sm">{detail}</p>
                ))}
              </motion.div>
            ))}
          </div>

          {/* Form Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
                Get In Touch
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Ready to Plan Your Event?
              </h2>
              <p className="text-body mb-8">
                Whether you have a specific vision in mind or need guidance on what 
                entertainment would work best for your occasion, we're here to help. 
                Our team of experts will work with you to create an unforgettable experience.
              </p>

              {/* WhatsApp CTA */}
              <div className="glass-card p-6 inline-block">
                <p className="text-body text-sm mb-4">For quick inquiries, reach us on WhatsApp:</p>
                <a 
                  href="https://wa.me/919897642145" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="heroFilled" size="lg">
                    <MessageCircle size={18} className="mr-2" />
                    Chat on WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <InquiryForm />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
              Find Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Visit Our Office
            </h2>
          </motion.div>

          <div className="glass-card p-4 rounded-lg overflow-hidden">
            <div className="aspect-[16/9] lg:aspect-[21/9] bg-secondary/50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="text-gold-light mx-auto mb-4" />
                <p className="text-body">Map integration coming soon</p>
                <p className="text-muted-foreground text-sm mt-2">
                  123 Entertainment Avenue, Mumbai, Maharashtra 400001
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
