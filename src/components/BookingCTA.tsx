'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, MessageCircle, Shield, Clock, Plane, Tag } from 'lucide-react';
import { getWhatsAppURL } from '@/lib/pricing';

export default function BookingCTA() {
  const t = useTranslations('booking');
  const tWhatsapp = useTranslations();

  const features = [
    { icon: MessageCircle, label: t('feature_1') },
    { icon: Shield, label: t('feature_2') },
    { icon: Plane, label: t('feature_3') },
    { icon: Tag, label: t('feature_4') },
  ];

  return (
    <section
      id="booking"
      className="relative section-padding overflow-hidden"
      style={{ background: '#0D0D0D' }}
    >
      {/* Decorative background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,146,74,0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-1/2 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(184,146,74,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Label */}
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="block font-inter text-[0.6875rem] font-medium tracking-[0.18em] uppercase text-noble-gold mb-5"
          >
            {t('label')}
          </motion.span>

          {/* Vehicle badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-noble-gold/25 px-4 py-2 mb-6"
          >
            <div className="w-2 h-2 rounded-full bg-noble-gold animate-pulse" />
            <span className="font-inter text-sm font-medium text-white/70">{t('vehicle')}</span>
            <span className="font-inter text-xs text-noble-gold/60">— {t('vehicle_sub')}</span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light text-white leading-tight mb-5"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)' }}
          >
            {t('title')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-inter text-white/50 text-[1.0625rem] leading-relaxed mb-10 max-w-xl mx-auto"
          >
            {t('subtitle')}
          </motion.p>

          {/* Feature pills */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 mb-10"
          >
            {features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2"
              >
                <feature.icon size={13} className="text-noble-gold flex-shrink-0" />
                <span className="font-inter text-xs font-medium text-white/60">
                  {feature.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-3"
          >
            <motion.a
              href={getWhatsAppURL(tWhatsapp('whatsapp_message'))}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold text-base px-10 py-4 animate-pulse-gold"
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {t('cta')}
              <ArrowRight size={18} />
            </motion.a>
            <p className="font-inter text-xs text-white/30">
              {t('cta_sub')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
