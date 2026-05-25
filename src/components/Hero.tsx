'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { img } from '@/lib/paths';

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

const trustStats = [
  { value: '4.9★', label: 'Rating' },
  { value: '5000+', label: 'Transfers' },
  { value: '7/24', label: 'Available' },
];

export default function Hero() {
  const t = useTranslations('hero');
  const reducedMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef  = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (reducedMotion || !heroRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        y: '-5%',
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    /*
     * flex-col: text block on top, image below
     * min-h-[100svh]: section fills the full viewport
     * overflow-x-hidden: prevents any accidental horizontal scroll
     */
    <section
      ref={heroRef}
      className="flex flex-col min-h-[100svh] overflow-x-hidden"
      style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F7F5F1 55%, #F5F3EF 100%)' }}
    >

      {/* ── Subtle background texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.012]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ─────────────────────────────────────────────
          TEXT BLOCK — inside section-container
          (padded, centered, max-w-[1280px])
          ───────────────────────────────────────────── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="section-container relative z-10 flex flex-col items-center text-center pt-28 pb-6 md:pb-8"
      >

        {/* Eyebrow */}
        <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
          <span className="w-7 h-px bg-noble-gold/60" />
          <span className="section-label">{t('tagline')}</span>
          <span className="w-7 h-px bg-noble-gold/60" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={itemVariants}
          className="font-cormorant font-light text-noble-charcoal leading-[0.9] mb-5"
          style={{
            fontSize: 'clamp(3.5rem, 8.5vw, 9rem)',
            letterSpacing: '-0.025em',
          }}
        >
          <span className="block">Noble</span>
          <span
            className="block italic text-noble-gold"
            style={{ fontSize: '0.83em' }}
          >
            VIP Transfer
          </span>
        </motion.h1>

        {/* Gold divider */}
        <motion.div variants={itemVariants} className="divider-gold mb-5" />

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="font-inter font-light text-noble-gray-2 max-w-md leading-relaxed mb-8"
          style={{ fontSize: 'clamp(0.9375rem, 1.6vw, 1.0625rem)' }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center gap-3 mb-9 w-full sm:w-auto"
        >
          <motion.button
            onClick={() =>
              document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-gold flex items-center gap-2 w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {t('cta_book')}
            <ArrowRight size={15} />
          </motion.button>

          <motion.button
            onClick={() =>
              document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="btn-ghost flex items-center gap-2 w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            {t('cta_prices')}
          </motion.button>
        </motion.div>

        {/* Trust mini-stats */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-7 flex-wrap justify-center"
        >
          {trustStats.map((stat, i) => (
            <div key={i} className="flex items-center gap-3.5">
              {i > 0 && <div className="w-px h-7 bg-noble-gold/20" />}
              <div>
                <div className="font-cormorant text-xl font-light text-noble-charcoal leading-none">
                  {stat.value}
                </div>
                <div className="font-inter text-[10px] tracking-[0.12em] uppercase text-noble-gray-3 mt-0.5">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

      </motion.div>

      {/* ─────────────────────────────────────────────
          CAR IMAGE — full viewport width, NO padding
          Lives OUTSIDE section-container so it bleeds
          edge to edge. flex-1 fills remaining height.
          ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full flex-1 overflow-hidden"
        style={{ minHeight: '40vh', background: '#F5F3EF' }}
      >

        {/* Atmospheric gold glow behind the car */}
        <div
          className="absolute inset-x-0 bottom-0 h-3/4 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 100%, rgba(184,146,74,0.11) 0%, transparent 70%)',
            filter: 'blur(24px)',
          }}
        />

        {/* The car — w-full so it fills the entire viewport width */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={img('/images/vito-hero.jpg')}
          alt="Mercedes Vito VIP — Noble VIP Transfer"
          className="w-full h-full object-contain object-bottom block"
          fetchPriority="high"
          style={{
            filter: 'drop-shadow(0 -4px 24px rgba(0,0,0,0.07))',
          }}
        />

        {/* Bottom gradient — blends into the next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, #FAFAF8 0%, transparent 100%)',
          }}
        />

      </motion.div>

    </section>
  );
}
