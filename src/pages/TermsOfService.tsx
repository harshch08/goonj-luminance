import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, CheckCircle, DollarSign } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';

const TermsOfService = () => {
  return (
    <PageLayout>
      <PageHero 
        title="Terms of Service"
        subtitle="Please read these terms carefully before using our services"
      />

      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Last Updated */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="glass-card p-6 mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle size={24} className="text-gold" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Last Updated
                </h2>
              </div>
              <p className="text-body">
                These Terms of Service were last updated on January 2026.
              </p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Agreement to Terms
                </h2>
              </div>
              <p className="text-body mb-4">
                These Terms of Service ("Terms") govern your use of Goonj Entertainment's website and services. By accessing our website or using our services, you agree to be bound by these Terms.
              </p>
              <p className="text-body">
                If you do not agree to these Terms, please do not use our services.
              </p>
            </motion.div>

            {/* Services Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Our Services
                </h2>
              </div>
              
              <p className="text-body mb-4">
                Goonj Entertainment provides professional entertainment services including:
              </p>
              
              <ul className="list-disc list-inside text-body space-y-2 ml-4">
                <li>Live music performances and DJ services</li>
                <li>Event planning and management</li>
                <li>Artist booking and coordination</li>
                <li>Wedding entertainment (Bandhan services)</li>
                <li>Corporate event entertainment</li>
                <li>Photography and videography services</li>
                <li>Stage setup and technical services</li>
              </ul>
            </motion.div>

            {/* Booking and Payment Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <DollarSign size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Booking and Payment Terms
                </h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Booking Process
                  </h3>
                  <ul className="list-disc list-inside text-body space-y-2 ml-4">
                    <li>All bookings must be confirmed in writing</li>
                    <li>A signed contract and advance payment are required to secure your booking</li>
                    <li>Event details must be finalized at least 7 days before the event</li>
                    <li>Changes to bookings may incur additional charges</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Payment Terms
                  </h3>
                  <ul className="list-disc list-inside text-body space-y-2 ml-4">
                    <li>50% advance payment required at the time of booking</li>
                    <li>Remaining balance due 24 hours before the event</li>
                    <li>Additional services requested on-site will be charged separately</li>
                    <li>All payments are subject to applicable taxes</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Scale size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Responsibilities
                </h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Our Responsibilities
                  </h3>
                  <ul className="list-disc list-inside text-body space-y-2 ml-4">
                    <li>Provide professional entertainment services as agreed</li>
                    <li>Arrive on time and prepared for the event</li>
                    <li>Maintain professional standards and conduct</li>
                    <li>Provide backup plans for technical issues</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Client Responsibilities
                  </h3>
                  <ul className="list-disc list-inside text-body space-y-2 ml-4">
                    <li>Provide accurate event information and requirements</li>
                    <li>Ensure venue access and necessary permissions</li>
                    <li>Provide adequate power supply and space for equipment</li>
                    <li>Make timely payments as per agreed terms</li>
                    <li>Inform us of any changes or special requirements</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Limitation of Liability
                </h2>
              </div>
              
              <p className="text-body mb-4">
                Goonj Entertainment's liability is limited to the total amount paid for our services. We are not liable for:
              </p>
              
              <ul className="list-disc list-inside text-body space-y-2 ml-4">
                <li>Indirect, incidental, or consequential damages</li>
                <li>Issues arising from venue-related problems</li>
                <li>Third-party equipment failures</li>
                <li>Weather-related cancellations or delays</li>
                <li>Guest behavior or venue policies</li>
              </ul>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Intellectual Property
                </h2>
              </div>
              
              <p className="text-body mb-4">
                All content on our website, including text, graphics, logos, and images, is the property of Goonj Entertainment and is protected by copyright laws.
              </p>
              
              <p className="text-body">
                We may use photos and videos from your event for promotional purposes unless you specifically request otherwise in writing.
              </p>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="glass-card p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Contact Us
                </h2>
              </div>
              
              <p className="text-body mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              
              <div className="space-y-2 text-body">
                <p><strong>Email:</strong> goonjentertainment3@gmail.com</p>
                <p><strong>Phone:</strong> +91 9897642145</p>
                <p><strong>Address:</strong> 78/2 Chukhuwala Behind GPO, Near Madhav Niwas, Dehradun, Uttarakhand 248001</p>
              </div>
              
              <p className="text-body mt-4 text-sm text-muted-foreground">
                These terms are governed by the laws of India. Any disputes will be resolved in the courts of Dehradun, Uttarakhand.
              </p>
            </motion.div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default TermsOfService;