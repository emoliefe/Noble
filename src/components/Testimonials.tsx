'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

const avatarUrls = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/women/17.jpg',
  'https://randomuser.me/api/portraits/men/54.jpg',
  'https://randomuser.me/api/portraits/men/75.jpg',
  'https://randomuser.me/api/portraits/women/91.jpg',
  'https://randomuser.me/api/portraits/men/22.jpg',
];

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

function ReviewCard({ review, avatarUrl }: { review: Review; avatarUrl: string }) {
  return (
    <div
      className="flex-shrink-0 w-80 md:w-96 card-glass rounded-2xl p-6 mx-3"
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}
    >
      {/* Stars */}
      <StarRating rating={review.rating} />

      {/* Text */}
      <p className="font-inter text-sm text-noble-gray-2 leading-relaxed mt-4 mb-5 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-noble-gray-5/60">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-noble-gold/20">
          <Image
            src={avatarUrl}
            alt={review.name}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
        <div>
          <div className="font-inter text-sm font-semibold text-noble-charcoal leading-tight">
            {review.name}
          </div>
          <div className="font-inter text-xs text-noble-gray-3 flex items-center gap-1 mt-0.5">
            <span>{review.flag}</span>
            <span>{review.country}</span>
          </div>
        </div>
        {/* Quote icon */}
        <div className="ml-auto opacity-20">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#B8924A">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
            <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
          </svg>
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
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #FAFAF8 0%, transparent 100%)',
          }}
        />
        {/* Edge fade right */}
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #FAFAF8 0%, transparent 100%)',
          }}
        />

        {/* Marquee track */}
        <div className="overflow-hidden py-4">
          <div className="animate-marquee flex w-max">
            {doubled.map((review, i) => (
              <ReviewCard
                key={i}
                review={review}
                avatarUrl={avatarUrls[i % avatarUrls.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
