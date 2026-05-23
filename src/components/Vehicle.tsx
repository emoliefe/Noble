'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getWhatsAppURL } from '@/lib/pricing';

export default function Vehicle() {
  const t = useTranslations('vehicle');
  const tWhatsapp = useTranslations();

  const specs = [
    t('spec_1'),
    t('spec_2'),
    t('spec_3'),
    t('spec_4'),
    t('spec_5'),
    t('spec_6'),
  ];

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #F5F3EF 0%, #FAFAF8 60%, #F8F6F2 100%)' }}
    >
      {/* Decorative bg element */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 70% at 100% 50%, rgba(184,146,74,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="section-container relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-label block mb-4"
          >
            {t('label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="section-title"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-cormorant italic text-xl text-noble-gold mt-3"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Vehicle showcase */}
        <div className="grid lg:grid-cols-5 gap-12 xl:gap-16 items-center">
          {/* Car image — takes 3 cols */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1549317661-bd32c8ce0105?auto=format&fit=crop&w=1400&q=85"
                alt="Mercedes Vito VIP"
                width={1400}
                height={800}
                className="w-full h-auto object-cover"
                sizes="(max-width: 1024px) 100vw, 60vw"
              />
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)',
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.15)',
                }}
              />
            </div>
          </motion.div>

          {/* Specs — takes 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 mt-8 lg:mt-0"
          >
            <p className="font-inter text-noble-gray-2 leading-relaxed text-[1.05rem] mb-8">
              {t('body')}
            </p>

            {/* Spec items */}
            <div className="space-y-3 mb-10">
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-noble-gold/10 flex items-center justify-center flex-shrink-0">
                    <div className="w-1.5 h-1.5 rounded-full bg-noble-gold" />
                  </div>
                  <span className="font-inter text-sm text-noble-gray-2">{spec}</span>
                </motion.div>
              ))}
            </div>

            {/* Gold badge */}
            <div className="glass-gold rounded-xl px-5 py-4 mb-8 inline-flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-noble-gold flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">★</span>
              </div>
              <div>
                <div className="font-cormorant text-xl font-medium text-noble-charcoal leading-none">
                  Mercedes Vito VIP
                </div>
                <div className="font-inter text-xs text-noble-gray-3 mt-0.5">Premium Transfer Vehicle</div>
              </div>
            </div>

            <div className="block">
              <a
                href={getWhatsAppURL(tWhatsapp('whatsapp_message'))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2"
              >
                {t('cta')}
                <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
