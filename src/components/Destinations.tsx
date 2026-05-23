'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { getWhatsAppURL } from '@/lib/pricing';

const destinationImages: Record<string, { src: string; price: number }> = {
  // Lara — luxury beach resort east of Antalya city
  lara: {
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=85',
    price: 40,
  },
  // Belek — world-famous golf & luxury resort area
  belek: {
    src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=85',
    price: 45,
  },
  // Kemer — marina & Taurus mountain coastline
  kemer: {
    src: 'https://images.unsplash.com/photo-1596386461350-326ccb383e9f?auto=format&fit=crop&w=800&q=85',
    price: 55,
  },
  // Side — ancient ruins & turquoise coast
  side: {
    src: 'https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=85',
    price: 55,
  },
  // Alanya — castle fortress & Mediterranean coast
  alanya: {
    src: 'https://images.unsplash.com/photo-1602264189346-8e5e3b8a78e5?auto=format&fit=crop&w=800&q=85',
    price: 80,
  },
  // Adrasan — secluded turquoise bay near Olympos
  adrasan: {
    src: 'https://images.unsplash.com/photo-1439066290691-dbe9ad1b0290?auto=format&fit=crop&w=800&q=85',
    price: 95,
  },
  // Kaleiçi — Antalya old town, Roman harbor, Ottoman architecture
  'kaleiçi': {
    src: 'https://images.unsplash.com/photo-1601059823836-b82dab78e3af?auto=format&fit=crop&w=800&q=85',
    price: 40,
  },
  // Konyaaltı — pebble beach & city coast west of Antalya
  'konyaaltı': {
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=85',
    price: 40,
  },
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

                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(to top, rgba(13,13,13,0.85) 0%, rgba(13,13,13,0.2) 50%, transparent 100%)',
                    }}
                  />

                  {/* Price badge top-right */}
                  <div className="absolute top-4 right-4 glass rounded-full px-3 py-1">
                    <span className="font-inter text-xs font-semibold text-noble-gold">
                      {t('price_from')} €{dest.price}
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-inter text-xs text-white/60 tracking-[0.1em] uppercase mb-1">
                      {t('from')}
                    </p>
                    <h3 className="font-cormorant text-2xl font-light text-white leading-tight mb-3">
                      {destName}
                    </h3>

                    {/* Book button — appears on hover */}
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 0 }}
                      className="group-hover:opacity-100 transition-opacity duration-300 opacity-0"
                    >
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
                    </motion.div>
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
