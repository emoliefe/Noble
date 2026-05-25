'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { img } from '@/lib/paths';

// Local review photos — mapped by index to match reviews array order
const reviewPhotos: (string | null)[] = [
  img('/images/IMG-20250517-WA0008.jpg'),  // 0 James Thornton
  img('/images/IMG-20250422-WA0056.jpg'),  // 1 Monika Schreiber
  img('/images/IMG-20250422-WA0054.jpg'),  // 2 Anastasia Volkov
  img('/images/IMG-20250422-WA0053.jpg'),  // 3 Sophie Laurent
  img('/images/IMG-20250422-WA0051.jpg'),  // 4 Mehmet Yıldız
  img('/images/IMG-20250422-WA0052.jpg'),  // 5 David Okafor
  img('/images/IMG-20250422-WA0049.jpg'),  // 6 Isabella Rossi
  img('/images/transfer-22.jpeg'),         // 7 Henrik Larsson
];

const frostedBorder: React.CSSProperties = {
  borderRadius: 'inherit',
  background: [
    'linear-gradient(to right, rgba(255,255,255,0.45) 0%, transparent 14%, transparent 86%, rgba(255,255,255,0.45) 100%)',
    'linear-gradient(to bottom, rgba(255,255,255,0.45) 0%, transparent 14%, transparent 86%, rgba(255,255,255,0.45) 100%)',
  ].join(', '),
};

interface Review {
  name: string;
  country: string;
  flag: string;
  rating: number;
  text: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={i < rating ? '#B8924A' : 'none'}
          stroke="#B8924A"
          strokeWidth="2"
          className="flex-shrink-0"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, photoSrc }: { review: Review; photoSrc: string | null }) {
  return (
    <div
      className="flex-shrink-0 w-72 sm:w-80 md:w-96 card-glass rounded-2xl overflow-hidden mx-3"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      {/* Photo area — full width, above text */}
      <div className="relative h-48 w-full overflow-hidden">
        {photoSrc ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photoSrc}
              alt={review.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="lazy"
            />
            {/* Frosted glass border on photo */}
            <div className="absolute inset-0 pointer-events-none z-10" style={frostedBorder} />
          </>
        ) : (
          <div className="w-full h-full bg-noble-gold/10 flex items-center justify-center">
            <span className="font-cormorant text-6xl font-light text-noble-gold">
              {review.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Stars */}
        <StarRating rating={review.rating} />

        {/* Review text */}
        <p className="font-inter text-sm text-noble-gray-2 leading-relaxed mt-3 mb-4 line-clamp-4">
          &ldquo;{review.text}&rdquo;
        </p>

        {/* Author */}
        <div className="flex items-center gap-2 pt-3 border-t border-noble-gray-5/60">
          <div className="flex-1 min-w-0">
            <div className="font-inter text-sm font-semibold text-noble-charcoal leading-tight truncate">
              {review.name}
            </div>
            <div className="font-inter text-xs text-noble-gray-3 flex items-center gap-1 mt-0.5">
              <span>{review.flag}</span>
              <span className="truncate">{review.country}</span>
            </div>
          </div>
          {/* Quote icon */}
          <div className="opacity-20 flex-shrink-0">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#B8924A">
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const t = useTranslations('testimonials');
  const reviews: Review[] = t.raw('reviews') as Review[];

  // Double for infinite loop
  const doubled = [...reviews, ...reviews];

  return (
    <section id="testimonials" className="section-padding bg-noble-cream overflow-hidden">
      <div className="section-container mb-14">
        <div className="text-center">
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
            className="font-inter text-noble-gray-2 max-w-md mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      {/* Marquee — full width */}
      <div className="relative">
        {/* Edge fade left */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #F5F3EF 0%, transparent 100%)' }}
        />
        {/* Edge fade right */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 md:w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #F5F3EF 0%, transparent 100%)' }}
        />

        {/* Marquee track */}
        <div className="overflow-hidden py-4">
          <div className="animate-marquee flex w-max">
            {doubled.map((review, i) => (
              <ReviewCard
                key={i}
                review={review}
                photoSrc={reviewPhotos[i % reviewPhotos.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
