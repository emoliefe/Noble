'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';

export default function TrustBar() {
  const t = useTranslations('trust');

  const stats = [
    { value: t('trips'), label: t('trips_label') },
    { value: t('rating'), label: t('rating_label') },
    { value: t('years'), label: t('years_label') },
    { value: t('countries'), label: t('countries_label') },
  ];

  return (
    <section id="trust" className="bg-noble-charcoal">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center py-10 px-6 text-center"
            >
              <span
                className="font-cormorant font-light text-white leading-none mb-2"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                {stat.value}
              </span>
              <span className="font-inter text-xs font-medium tracking-[0.15em] uppercase text-white/40">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
