'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Search, ArrowRight, ChevronDown } from 'lucide-react';
import { pricingData, getWhatsAppURL } from '@/lib/pricing';

export default function Pricing() {
  const t = useTranslations('pricing');
  const tWhatsapp = useTranslations();
  const [search, setSearch] = useState('');
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!search.trim()) return pricingData;
    const q = search.toLowerCase();
    return pricingData.filter((p) =>
      p.destination.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q)
    );
  }, [search]);

  // Group by region
  const grouped = useMemo(() => {
    return filtered.reduce<Record<string, typeof filtered>>((acc, item) => {
      if (!acc[item.region]) acc[item.region] = [];
      acc[item.region].push(item);
      return acc;
    }, {});
  }, [filtered]);

  const regions = Object.keys(grouped);

  return (
    <section
      id="pricing"
      className="section-padding"
      style={{ background: 'linear-gradient(175deg, #F5F3EF 0%, #FAFAF8 100%)' }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
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
            className="font-inter text-noble-gray-2 max-w-lg mx-auto mb-8"
          >
            {t('subtitle')}
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative max-w-md mx-auto"
          >
            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-noble-gray-3 pointer-events-none"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t('search_placeholder')}
              className="w-full glass rounded-xl pl-11 pr-4 py-3.5 font-inter text-sm text-noble-charcoal placeholder:text-noble-gray-3 outline-none focus:ring-1 focus:ring-noble-gold/30 transition-all"
            />
          </motion.div>
        </div>

        {/* Pricing Table */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <p className="font-cormorant text-2xl text-noble-gray-3">{t('no_results')}</p>
            </motion.div>
          ) : (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* DESKTOP TABLE */}
              <div className="hidden md:block card-glass overflow-hidden shadow-glass">
                {/* Table header */}
                <div className="grid grid-cols-12 bg-noble-charcoal/3 border-b border-noble-gray-5 px-6 py-3.5">
                  <div className="col-span-1 font-inter text-xs font-semibold tracking-[0.15em] uppercase text-noble-gray-3">
                    #
                  </div>
                  <div className="col-span-6 font-inter text-xs font-semibold tracking-[0.15em] uppercase text-noble-gray-3">
                    {t('destination')}
                  </div>
                  <div className="col-span-2 font-inter text-xs font-semibold tracking-[0.15em] uppercase text-noble-gray-3">
                    Region
                  </div>
                  <div className="col-span-2 font-inter text-xs font-semibold tracking-[0.15em] uppercase text-noble-gray-3 text-right">
                    {t('price')}
                  </div>
                  <div className="col-span-1" />
                </div>

                {/* Table rows */}
                <div className="divide-y divide-noble-gray-5/60">
                  <AnimatePresence>
                    {filtered.map((item, i) => {
                      const waMsg = `Hello, I would like to book a VIP transfer to ${item.destination} for €${item.price}.`;
                      return (
                        <motion.div
                          key={item.destination}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 12 }}
                          transition={{ duration: 0.3, delay: Math.min(i * 0.03, 0.3) }}
                          className="grid grid-cols-12 px-6 py-4 items-center group hover:bg-noble-gold/[0.03] transition-colors duration-150"
                        >
                          <div className="col-span-1 font-inter text-xs text-noble-gray-4">
                            {i + 1}
                          </div>
                          <div className="col-span-6">
                            <span className="font-inter text-[0.9375rem] font-medium text-noble-charcoal">
                              {item.destination}
                            </span>
                          </div>
                          <div className="col-span-2">
                            <span className="font-inter text-xs font-medium text-noble-gray-3 bg-noble-gray-6 rounded-full px-2.5 py-1">
                              {item.region}
                            </span>
                          </div>
                          <div className="col-span-2 text-right">
                            <span className="font-cormorant text-2xl font-light text-noble-charcoal">
                              €{item.price}
                            </span>
                          </div>
                          <div className="col-span-1 flex justify-end">
                            <a
                              href={getWhatsAppURL(waMsg)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1 font-inter text-xs font-medium text-noble-gold hover:text-noble-gold-dark"
                            >
                              {t('book')} <ArrowRight size={12} />
                            </a>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* MOBILE ACCORDION */}
              <div className="md:hidden space-y-3">
                {regions.map((region) => (
                  <div key={region} className="card-glass overflow-hidden">
                    <button
                      onClick={() =>
                        setExpandedMobile(expandedMobile === region ? null : region)
                      }
                      className="w-full flex items-center justify-between px-5 py-4"
                    >
                      <span className="font-cormorant text-xl font-light text-noble-charcoal">
                        {region}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`text-noble-gray-3 transition-transform duration-200 ${
                          expandedMobile === region ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedMobile === region && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-noble-gray-5/60 divide-y divide-noble-gray-5/60">
                            {grouped[region].map((item) => {
                              const waMsg = `Hello, I would like to book a VIP transfer to ${item.destination} for €${item.price}.`;
                              return (
                                <div
                                  key={item.destination}
                                  className="flex items-center justify-between px-5 py-3.5"
                                >
                                  <span className="font-inter text-sm text-noble-charcoal">
                                    {item.destination}
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <span className="font-cormorant text-xl text-noble-charcoal">
                                      €{item.price}
                                    </span>
                                    <a
                                      href={getWhatsAppURL(waMsg)}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-8 h-8 rounded-full bg-noble-gold/10 flex items-center justify-center"
                                    >
                                      <ArrowRight size={14} className="text-noble-gold" />
                                    </a>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center font-inter text-xs text-noble-gray-3 mt-8"
        >
          {t('all_prices')}
        </motion.p>
      </div>
    </section>
  );
}
