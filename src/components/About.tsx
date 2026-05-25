'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { CheckCircle } from 'lucide-react';
import { img } from '@/lib/paths';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function About() {
  const t = useTranslations('about');

  const features = [
    { title: t('feature_1_title'), body: t('feature_1_body') },
    { title: t('feature_2_title'), body: t('feature_2_body') },
    { title: t('feature_3_title'), body: t('feature_3_body') },
    { title: t('feature_4_title'), body: t('feature_4_body') },
  ];

  return (
    <section id="about" className="section-padding bg-noble-cream">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img('/images/about-driver.jpg')}
                alt="Luxury VIP Transfer Service"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to bottom, transparent 50%, rgba(13,13,13,0.3) 100%)',
                }}
              />
              {/* Frosted glass border */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  borderRadius: 'inherit',
                  background: [
                    'linear-gradient(to right, rgba(250,250,248,0.45) 0%, transparent 11%, transparent 89%, rgba(250,250,248,0.45) 100%)',
                    'linear-gradient(to bottom, rgba(250,250,248,0.45) 0%, transparent 11%, transparent 89%, rgba(250,250,248,0.45) 100%)',
                  ].join(', '),
                }}
              />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-6 -right-4 md:-right-8 card-glass p-5 shadow-glass-lg"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-noble-gold/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-noble-gold text-lg">★</span>
                </div>
                <div>
                  <div className="font-cormorant text-2xl font-light text-noble-charcoal leading-none">4.9</div>
                  <div className="font-inter text-xs text-noble-gray-3 mt-0.5 whitespace-nowrap">Average Rating</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="order-1 lg:order-2"
          >
            <motion.span variants={itemVariants} className="section-label block mb-4">
              {t('label')}
            </motion.span>
            <motion.h2 variants={itemVariants} className="section-title mb-6">
              {t('title')}
            </motion.h2>
            <motion.div variants={itemVariants} className="divider-gold" />
            <motion.p variants={itemVariants} className="font-inter text-noble-gray-2 leading-relaxed text-[1.0625rem] mb-10">
              {t('body')}
            </motion.p>

            {/* Feature list */}
            <div className="grid sm:grid-cols-2 gap-5">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex gap-3"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle size={18} className="text-noble-gold" />
                  </div>
                  <div>
                    <h4 className="font-inter text-sm font-semibold text-noble-charcoal mb-1">
                      {feature.title}
                    </h4>
                    <p className="font-inter text-sm text-noble-gray-2 leading-relaxed">
                      {feature.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
