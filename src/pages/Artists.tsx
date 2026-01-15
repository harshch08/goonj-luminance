import { motion } from 'framer-motion';
import { Music, Star, Award, Users } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { PageHero } from '@/components/sections/PageHero';
import { InquiryForm } from '@/components/forms/InquiryForm';
import { Button } from '@/components/ui/button';

const artistCategories = [
  {
    title: 'Vocalists',
    count: '50+',
    description: 'Trained singers across genres from classical to contemporary',
  },
  {
    title: 'Bands',
    count: '30+',
    description: 'Professional bands for rock, pop, jazz, and fusion performances',
  },
  {
    title: 'DJs',
    count: '25+',
    description: 'Top DJs specializing in EDM, Bollywood, and commercial music',
  },
  {
    title: 'Instrumentalists',
    count: '40+',
    description: 'Skilled musicians playing traditional and western instruments',
  },
  {
    title: 'Celebrities',
    count: '100+',
    description: 'Network of Bollywood singers, actors, and famous personalities',
  },
  {
    title: 'Comedians',
    count: '20+',
    description: 'Stand-up comedians for corporate and private events',
  },
];

const features = [
  { icon: Star, title: 'Verified Artists', description: 'Every artist is personally vetted for quality and professionalism' },
  { icon: Award, title: 'Experienced Performers', description: 'Artists with proven track records and extensive stage experience' },
  { icon: Users, title: 'Pan-India Network', description: 'Access to talent from across the country for any location' },
  { icon: Music, title: 'All Genres', description: 'From classical to contemporary, we cover every musical genre' },
];

const Artists = () => {
  return (
    <PageLayout>
      <PageHero 
        title="Our Artists"
        subtitle="A curated network of India's finest entertainers and performers"
      />

      {/* Artist Categories */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
              Our Network
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              Artist Categories
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artistCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-8 text-center group hover:border-gold/30 transition-all duration-500"
              >
                <span className="font-display text-4xl font-bold text-gold-light block mb-2">
                  {category.count}
                </span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                <p className="text-body text-sm">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Our Artists */}
      <section className="py-20 lg:py-28 bg-secondary/30">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
              Why Choose Us
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              The Goonj Difference
            </h2>
            <div className="section-divider" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={28} className="text-gold-light" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-body text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Book an Artist */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-luxury text-gold-light mb-4 block">
                Book Now
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Looking for the Perfect Artist?
              </h2>
              <p className="text-body mb-6">
                Tell us about your event and we'll recommend the ideal artists from our 
                extensive network. Whether you need a solo performer or a full band, 
                we'll find the perfect match for your occasion.
              </p>
              <p className="text-body">
                Our team handles everything from artist selection to coordination, 
                ensuring a seamless experience for you and a stellar performance for your guests.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <InquiryForm serviceType="Artist Booking" />
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Artists;
