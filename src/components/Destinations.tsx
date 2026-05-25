'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getWhatsAppURL } from '@/lib/pricing';

const destinationImages: Record<string, { src: string; price: number }> = {
  lara:        { src: '/images/dest-lara.jpg',      price: 40 },
  belek:       { src: '/images/dest-belek.jpg',     price: 45 },
  kemer:       { src: '/images/dest-kemer.jpg',     price: 55 },
  // Side: local photo not uploaded — CDN fallback
  side:        { src: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=85', price: 55 },
  alanya:      { src: '/images/dest-alanya.jpg',    price: 80 },
  adrasan:     { src: '/images/dest-adrasan.jpg',   price: 95 },
  'kaleiçi':   { src: '/images/dest-kaleici.jpg',   price: 40 },
  'konyaaltı': { src: '/images/dest-konyaalti.jpg', price: 40 },
};

// Frosted glass border overlay — applied on each card image
const frostedBorder: React.CSSProperties = {
  borderRadius: 'inherit',
  background: [
    'linear-gradient(to right, rgba(13,13,13,0.3) 0%, transparent 12%, transparent 88%, rgba(13,13,13,0.3) 100%)',
    'linear-gradient(to bottom, rgba(13,13,13,0.3) 0%, transparent 12%, transparent 88%, rgba(13,13,13,0.3) 100%)',
  ].join(', '),
};

const destinationKeys = ['lara', 'belek', 'kemer', 'side', 'alanya', 'adrasan', 'kaleiçi', 'konyaaltı'] as const;

export default function Destinations() {
  const t = useTranslations('destinations');
  const tWhatsapp = useTranslations();

  return (
    <section id="destinations" className="section-padding bg-noble-cream">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
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
            className="section-title mb-4"
          >
            {t('title')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-inter text-noble-gray-2 max-w-lg mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {destinationKeys.map((key, i) => {
            const dest = destinationImages[key];
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const destName = t(key as any);
            const waMsg = `Hello, I would like to book a VIP transfer to ${destName}.`;

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="group relative rounded-2xl overflow-hidden aspect-[3/4] cursor-pointer shadow-card hover:shadow-card-hover transition-shadow duration-500"
                >
                  {/* Image */}
                  <Image
                    src={dest.src}
                    alt={destName}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />

                  {/* Dark gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.2) 50%, transparent 100%)',
                    }}
                  />

                  {/* Frosted glass border */}
                  <div className="absolute inset-0 pointer-events-none z-10" style={frostedBorder} />

                  {/* Price badge top-right */}
                  <div className="absolute top-4 right-4 z-20 glass rounded-full px-3 py-1">
                    <span className="font-inter text-xs font-semibold text-noble-gold">
                      {t('price_from')} €{dest.price}
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
                    <p className="font-inter text-xs text-white/60 tracking-[0.1em] uppercase mb-1">
                      {t('from')}
                    </p>
                    <h3 className="font-cormorant text-2xl font-light text-white leading-tight mb-3">
                      {destName}
                    </h3>

                    {/* Book button — appears on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <a
                        href={getWhatsAppURL(waMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-inter text-xs font-medium text-white border border-white/30 rounded-full px-4 py-2 hover:bg-white/15 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {t('book')}
                        <ArrowRight size={12} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
