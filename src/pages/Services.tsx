import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Music, Calendar, Guitar, Star, Mic, MicVocal, Heart, ArrowRight, MessageCircle } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Music,
    title: 'Live Music',
    slug: 'live-music',
    description: 'Electrifying live performances featuring bands, solo artists, and DJs for unforgettable musical experiences.',
    features: ['Live Bands', 'Solo Performers', 'DJ Sets', 'Acoustic Sessions'],
  },
  {
    icon: Calendar,
    title: 'Events',
    slug: 'events',
    description: 'Complete event management solutions from conceptualization to flawless execution.',
    features: ['Corporate Events', 'Product Launches', 'Award Ceremonies', 'Private Parties'],
  },
  {
    icon: Guitar,
    title: 'Instrumentalists',
    slug: 'instrumentalists',
    description: 'World-class instrumentalists adding sophistication and elegance to your special occasions.',
    features: ['Classical Musicians', 'Jazz Artists', 'Fusion Performers', 'Session Musicians'],
  },
  {
    icon: Star,
    title: 'Celebrity Concerts',
    slug: 'celebrity',
    description: 'Access to top celebrities and renowned artists for spectacular concert experiences.',
    features: ['Bollywood Stars', 'Playback Singers', 'Stand-up Comedians', 'International Artists'],
  },
  {
    icon: Mic,
    title: 'Open Mics',
    slug: 'openmic',
    description: 'Platform for emerging talent to showcase their skills in professionally organized events.',
    features: ['Comedy Nights', 'Poetry Slams', 'Music Open Mics', 'Talent Shows'],
  },
  {
    icon: MicVocal,
    title: 'Karaoke Nights',
    slug: 'karaoke',
    description: 'Fun-filled karaoke experiences with professional equipment and curated song libraries.',
    features: ['Private Karaoke', 'Corporate Fun', 'Birthday Parties', 'Team Building'],
  },
  {
    icon: Heart,
    title: 'Bandhan',
    slug: 'bandhan',
    description: 'Comprehensive wedding entertainment including sangeet, mehendi, and reception performances.',
    features: ['Sangeet Night', 'Wedding Bands', 'Mehendi Artists', 'Reception Entertainment'],
  },
];

const Services = () => {
  const formRef = useRef(null);
  const isFormInView = useInView(formRef, { once: true });

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <PageLayout>
      <PageHero 
        title="Our Services"
        subtitle="Comprehensive entertainment solutions tailored to make your events extraordinary"
      />

      {/* Services Grid */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid gap-8">
            {services.map((service, index) => (
              <Link key={service.slug} to={service.slug === 'bandhan' ? '/bandhan' : `/services/${service.slug}`}>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="glass-card p-8 hover:border-gold/30 transition-all duration-500 cursor-pointer"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex items-start gap-6 flex-1">
                      <div className="w-16 h-16 rounded-lg bg-gold/10 flex items-center justify-center shrink-0">
                        <service.icon size={28} className="text-gold-light" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl font-semibold text-foreground mb-2">
                          {service.title}
                        </h3>
                        <p className="text-body mb-4">{service.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-3 py-1 text-xs uppercase tracking-wide bg-secondary/50 text-muted-foreground rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
                      <Button variant="hero" className="w-full sm:w-auto" onClick={(e) => e.preventDefault()}>
                        <span>Learn More</span>
                        <ArrowRight size={16} className="ml-2" />
                      </Button>
                      <Button 
                        variant="heroFilled" 
                        className="w-full sm:w-auto"
                        onClick={(e) => {
                          e.preventDefault();
                          scrollToForm();
                        }}
                      >
                        <MessageCircle size={16} className="mr-2" />
                        <span>Contact</span>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section ref={formRef} className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
                Get In Touch
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Have a Question?
              </h2>
              <p className="text-body mb-8">
                Whether you're planning a grand celebration or an intimate gathering, 
                we're here to help you create the perfect entertainment experience. 
                Fill out the form and our team will get back to you within 24 hours.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-gold font-semibold">1</span>
                  </div>
                  <p className="text-body">Submit your inquiry with event details</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-gold font-semibold">2</span>
                  </div>
                  <p className="text-body">Our team reviews and prepares options</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="text-gold font-semibold">3</span>
                  </div>
                  <p className="text-body">We connect you with the perfect entertainment</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isFormInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <InquiryForm />
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
