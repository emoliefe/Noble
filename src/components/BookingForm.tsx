'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, User, Phone, Users, Calendar, MapPin, Car, Send } from 'lucide-react';
import { pricingData, getWhatsAppURL } from '@/lib/pricing';

export default function BookingForm() {
  const t = useTranslations('bookingForm');

  const [form, setForm] = useState({
    name: '',
    phone: '',
    passengers: '',
    date: '',
    dropoff: '',
  });

  const [error, setError] = useState('');

  const selectedPrice = form.dropoff
    ? pricingData.find((d) => d.destination === form.dropoff)?.price ?? null
    : null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.passengers || !form.date || !form.dropoff) {
      setError(t('fill_all'));
      return;
    }
    const msg = [
      `${t('msg_name')}: ${form.name}`,
      `${t('msg_phone')}: ${form.phone}`,
      `${t('msg_passengers')}: ${form.passengers}`,
      `${t('msg_date')}: ${form.date}`,
      `${t('msg_vehicle')}: Mercedes Vito VIP`,
      `${t('msg_pickup')}: Antalya Airport`,
      `${t('msg_dropoff')}: ${form.dropoff}`,
      `${t('msg_price')}: €${selectedPrice}`,
    ].join('\n');
    window.open(getWhatsAppURL(msg), '_blank', 'noopener,noreferrer');
  };

  const inputClass =
    'w-full bg-white/60 backdrop-blur-sm border border-noble-gold/20 rounded-xl px-4 py-3 font-inter text-sm text-noble-charcoal placeholder-noble-gray-4 focus:outline-none focus:border-noble-gold/60 focus:ring-2 focus:ring-noble-gold/10 transition-all duration-200';

  const labelClass = 'block font-inter text-xs font-semibold tracking-[0.08em] uppercase text-noble-gray-3 mb-2';

  const iconWrapClass =
    'absolute left-3.5 top-1/2 -translate-y-1/2 text-noble-gold/60 pointer-events-none';

  return (
    <section id="booking-form" className="section-padding bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(184,146,74,0.05) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      <div className="section-container relative">
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

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          <div className="card-glass rounded-3xl p-8 md:p-10 shadow-glass-lg">
            {/* Fixed fields row */}
            <div className="grid sm:grid-cols-2 gap-5 mb-5">
              {/* Vehicle — fixed */}
              <div>
                <label className={labelClass}>{t('vehicle')}</label>
                <div className="relative">
                  <span className={iconWrapClass}>
                    <Car size={15} />
                  </span>
                  <input
                    type="text"
                    value="Mercedes Vito VIP"
                    readOnly
                    className={`${inputClass} pl-10 bg-noble-gold/5 text-noble-gray-3 cursor-not-allowed`}
                  />
                </div>
              </div>

              {/* Pickup — fixed */}
              <div>
                <label className={labelClass}>{t('pickup')}</label>
                <div className="relative">
                  <span className={iconWrapClass}>
                    <MapPin size={15} />
                  </span>
                  <input
                    type="text"
                    value="Antalya Airport"
                    readOnly
                    className={`${inputClass} pl-10 bg-noble-gold/5 text-noble-gray-3 cursor-not-allowed`}
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="grid sm:grid-cols-2 gap-5 mb-5">
                {/* Name */}
                <div>
                  <label htmlFor="bf-name" className={labelClass}>
                    {t('name')}
                  </label>
                  <div className="relative">
                    <span className={iconWrapClass}>
                      <User size={15} />
                    </span>
                    <input
                      id="bf-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder={t('name_ph')}
                      value={form.name}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="bf-phone" className={labelClass}>
                    {t('phone')}
                  </label>
                  <div className="relative">
                    <span className={iconWrapClass}>
                      <Phone size={15} />
                    </span>
                    <input
                      id="bf-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder={t('phone_ph')}
                      value={form.phone}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Passengers */}
                <div>
                  <label htmlFor="bf-passengers" className={labelClass}>
                    {t('passengers')}
                  </label>
                  <div className="relative">
                    <span className={iconWrapClass}>
                      <Users size={15} />
                    </span>
                    <input
                      id="bf-passengers"
                      name="passengers"
                      type="number"
                      min="1"
                      max="7"
                      placeholder={t('passengers_ph')}
                      value={form.passengers}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div>
                  <label htmlFor="bf-date" className={labelClass}>
                    {t('date')}
                  </label>
                  <div className="relative">
                    <span className={iconWrapClass}>
                      <Calendar size={15} />
                    </span>
                    <input
                      id="bf-date"
                      name="date"
                      type="datetime-local"
                      value={form.date}
                      onChange={handleChange}
                      className={`${inputClass} pl-10`}
                    />
                  </div>
                </div>

                {/* Dropoff */}
                <div className="sm:col-span-2">
                  <label htmlFor="bf-dropoff" className={labelClass}>
                    {t('dropoff')}
                  </label>
                  <div className="relative">
                    <span className={iconWrapClass}>
                      <MapPin size={15} />
                    </span>
                    <select
                      id="bf-dropoff"
                      name="dropoff"
                      value={form.dropoff}
                      onChange={handleChange}
                      className={`${inputClass} pl-10 appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>
                        {t('select_dest')}
                      </option>
                      {pricingData.map((entry) => (
                        <option key={entry.destination} value={entry.destination}>
                          {entry.destination} — €{entry.price}
                        </option>
                      ))}
                    </select>
                    {/* Chevron */}
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-noble-gold/60">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>

              {/* Price display */}
              {selectedPrice !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-6 flex items-center justify-between glass-gold rounded-xl px-5 py-4"
                >
                  <div>
                    <p className="font-inter text-xs font-semibold uppercase tracking-[0.1em] text-noble-gray-3 mb-0.5">
                      {t('price_label')}
                    </p>
                    <p className="font-cormorant text-3xl font-light text-noble-charcoal leading-none">
                      €{selectedPrice}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-noble-gold/15 flex items-center justify-center">
                    <span className="text-noble-gold text-sm font-bold">★</span>
                  </div>
                </motion.div>
              )}

              {/* Error */}
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 font-inter text-sm text-red-500/80"
                >
                  {error}
                </motion.p>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="w-full btn-gold flex items-center justify-center gap-2 text-base py-4"
              >
                <Send size={16} />
                {t('submit')}
                <ArrowRight size={15} />
              </motion.button>

              <p className="mt-4 text-center font-inter text-xs text-noble-gray-4">
                {t('privacy_note')}
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
