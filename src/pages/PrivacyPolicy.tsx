import { motion } from 'framer-motion';
import { Shield, Eye, Lock, UserCheck, FileText, AlertCircle } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';

const PrivacyPolicy = () => {
  return (
    <PageLayout>
      <PageHero 
        title="Privacy Policy"
        subtitle="Your privacy is important to us. Learn how we protect and handle your information."
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
                <AlertCircle size={24} className="text-gold" />
                <h2 className="font-display text-xl font-semibold text-foreground">
                  Last Updated
                </h2>
              </div>
              <p className="text-body">
                This Privacy Policy was last updated on January 2026.
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
                <Shield size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Introduction
                </h2>
              </div>
              <p className="text-body mb-4">
                At Goonj Entertainment, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p className="text-body">
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </motion.div>

            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Eye size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Information We Collect
                </h2>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Personal Information
                  </h3>
                  <ul className="list-disc list-inside text-body space-y-2 ml-4">
                    <li>Name and contact information (phone number, email address)</li>
                    <li>Event details and preferences</li>
                    <li>Communication history with our team</li>
                    <li>Payment information (processed securely through third-party providers)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">
                    Automatically Collected Information
                  </h3>
                  <ul className="list-disc list-inside text-body space-y-2 ml-4">
                    <li>IP address and browser information</li>
                    <li>Website usage patterns and preferences</li>
                    <li>Device information and operating system</li>
                    <li>Cookies and similar tracking technologies</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <UserCheck size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  How We Use Your Information
                </h2>
              </div>
              
              <ul className="list-disc list-inside text-body space-y-3 ml-4">
                <li>To provide and maintain our entertainment services</li>
                <li>To communicate with you about your events and bookings</li>
                <li>To process payments and manage transactions</li>
                <li>To improve our website and services</li>
                <li>To send you updates about our services (with your consent)</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>
            </motion.div>

            {/* Information Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lock size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Information Sharing and Disclosure
                </h2>
              </div>
              
              <p className="text-body mb-4">
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              
              <ul className="list-disc list-inside text-body space-y-3 ml-4">
                <li>With service providers who assist us in operating our business</li>
                <li>With artists and vendors necessary to fulfill your event requirements</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In connection with a business transfer or merger</li>
                <li>With your explicit consent</li>
              </ul>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Shield size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Data Security
                </h2>
              </div>
              
              <p className="text-body mb-4">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
              
              <ul className="list-disc list-inside text-body space-y-2 ml-4">
                <li>Secure data transmission using SSL encryption</li>
                <li>Regular security assessments and updates</li>
                <li>Limited access to personal information on a need-to-know basis</li>
                <li>Secure storage of physical and electronic records</li>
              </ul>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-card p-8 mb-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <FileText size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Your Rights
                </h2>
              </div>
              
              <p className="text-body mb-4">
                You have the following rights regarding your personal information:
              </p>
              
              <ul className="list-disc list-inside text-body space-y-3 ml-4">
                <li>Right to access your personal information</li>
                <li>Right to correct inaccurate or incomplete information</li>
                <li>Right to delete your personal information</li>
                <li>Right to restrict processing of your information</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent at any time</li>
              </ul>
              
              <p className="text-body mt-4">
                To exercise these rights, please contact us using the information provided below.
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
                <AlertCircle size={28} className="text-gold" />
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Contact Us
                </h2>
              </div>
              
              <p className="text-body mb-4">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              
              <div className="space-y-2 text-body">
                <p><strong>Email:</strong> goonjentertainment3@gmail.com</p>
                <p><strong>Phone:</strong> +91 9897642145</p>
                <p><strong>Address:</strong> 78/2 Chukhuwala Behind GPO, Near Madhav Niwas, Dehradun, Uttarakhand 248001</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default PrivacyPolicy;