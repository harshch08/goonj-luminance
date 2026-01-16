import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { InstagramFollowerWidget } from '@/components/sections/InstagramFollowerWidget';

export const IntroSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 lg:py-32 bg-background" id="about">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-block text-xs uppercase tracking-luxury text-gold-light mb-6"
          >
            About Goonj Entertainment
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-8 leading-tight"
          >
            Crafting Extraordinary
            <br />
            <span className="text-gradient-gold">Entertainment Experiences</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="section-divider mb-8"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="text-lg text-body leading-relaxed mb-6"
          >
            India's premier event management and live entertainment company, 
            we blend artistic excellence with flawless execution to create 
            moments that resonate long after the applause fades.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
            className="text-body leading-relaxed mb-8"
          >
            From intimate gatherings to grand celebrations, celebrity concerts 
            to corporate galas — we transform your vision into unforgettable reality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="flex justify-center"
          >
            <InstagramFollowerWidget className="max-w-sm" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
