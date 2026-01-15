import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Award, Users, Music, Star, Target, Heart } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';

const stats = [
  { number: '500+', label: 'Events Completed' },
  { number: '200+', label: 'Artists Network' },
  { number: '50+', label: 'Cities Covered' },
  { number: '10+', label: 'Years Experience' },
];

const values = [
  {
    icon: Award,
    title: 'Excellence',
    description: 'We deliver nothing short of extraordinary experiences that exceed expectations.',
  },
  {
    icon: Users,
    title: 'Collaboration',
    description: 'Working closely with clients and artists to create perfect harmony.',
  },
  {
    icon: Heart,
    title: 'Passion',
    description: 'Music and entertainment run through our veins; it\'s not just work, it\'s our calling.',
  },
  {
    icon: Target,
    title: 'Precision',
    description: 'Meticulous attention to detail ensures flawless event execution.',
  },
];

const About = () => {
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const isStatsInView = useInView(statsRef, { once: true });
  const isValuesInView = useInView(valuesRef, { once: true });

  return (
    <PageLayout>
      <PageHero 
        title="About Us"
        subtitle="Crafting unforgettable entertainment experiences since 2014"
      />

      {/* Story Section */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
                Our Story
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Where Music Meets Magic
              </h2>
              <div className="space-y-4 text-body">
                <p>
                  Goonj Entertainment was born from a simple yet powerful vision: to transform 
                  ordinary events into extraordinary memories. What started as a passionate 
                  endeavor has evolved into one of India's most trusted entertainment companies.
                </p>
                <p>
                  Our journey began with a small team of music enthusiasts who believed that 
                  every celebration deserves world-class entertainment. Today, we've grown into 
                  a comprehensive event solutions provider, connecting the finest artists with 
                  audiences across the nation.
                </p>
                <p>
                  From intimate gatherings to grand celebrations, from corporate events to 
                  celebrity concerts, we bring the same level of dedication and excellence 
                  to every project we undertake.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="glass-card p-8 lg:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
                    <Music size={32} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-semibold text-foreground">Our Mission</h3>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">What Drives Us</p>
                  </div>
                </div>
                <p className="text-body leading-relaxed">
                  To elevate every event with unparalleled entertainment, connecting talented 
                  artists with appreciative audiences while creating moments that resonate 
                  for a lifetime.
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border border-gold/20 rounded-lg -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isStatsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <span className="font-display text-4xl lg:text-5xl font-bold text-gold-light">
                  {stat.number}
                </span>
                <p className="text-body text-sm mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
              Our Values
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              What We Stand For
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card p-6 text-center group hover:border-gold/30 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-lg bg-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-gold/20 transition-colors">
                  <value.icon size={24} className="text-gold-light" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-body text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default About;
