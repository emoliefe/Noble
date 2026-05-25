'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { img } from '@/lib/paths';

gsap.registerPlugin(ScrollTrigger);

/* ─── Framer Motion variants ─────────────────────────────────── */
const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.11, delayChildren: 0.1 },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
};

/* ─── Mini trust stats ───────────────────────────────────────── */
const trustStats = [
  { value: '4.9★', label: 'Rating' },
  { value: '5000+', label: 'Transfers' },
  { value: '7/24', label: 'Available' },
];

export default function Hero() {
  const t = useTranslations('hero');
  const reducedMotion = useReducedMotion();

  const heroRef    = useRef<HTMLDivElement>(null);
  const carRef     = useRef<HTMLDivElement>(null);
  const textRef    = useRef<HTMLDivElement>(null);

  /* ── GSAP scroll parallax (desktop only) ── */
  useEffect(() => {
    if (reducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Car drifts upward slowly as user scrolls away
      if (carRef.current) {
        gsap.to(carRef.current, {
          y: 55,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.6,
          },
        });
      }

      // Text block drifts and fades as hero exits viewport
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: 45,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '55% top',
            scrub: 1.1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    /*
     * overflow-x: hidden — prevents the atmospheric glow and decorative
     * layers from causing horizontal scroll on any screen size.
     * overflow-y is unrestricted so content can flow naturally on small screens.
     */
    <section
      ref={heroRef}
      className="relative min-h-[100svh] overflow-x-hidden"
      style={{
        background: 'linear-gradient(150deg, #FFFFFF 0%, #F7F5F1 45%, #FAFAF8 100%)',
      }}
    >
      {/* ── Background decorations (all inset, no overflow) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 70% at 15% 50%, rgba(184,146,74,0.07) 0%, transparent 62%)',
        }}
      />
      <div
        className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 85% 80% at 100% 35%, rgba(184,146,74,0.05) 0%, transparent 70%)',
        }}
      />
      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.013]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/*
       * ── Main layout ──────────────────────────────────────────────
       * Mobile  : flex-col   — text on top, car below
       * Desktop : flex-row   — text left (52%), car right (48%)
       *
       * The section-container keeps everything within max-w-[1280px]
       * with responsive horizontal padding — no 100vw tricks needed.
       */}
      <div className="section-container relative z-10 flex flex-col lg:flex-row lg:items-center min-h-[100svh] pt-24 pb-12 lg:py-0">

        {/* ── LEFT / TEXT BLOCK ── */}
        <motion.div
          ref={textRef}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="w-full lg:w-[52%] flex flex-col items-center lg:items-start text-center lg:text-left lg:pr-10 xl:pr-16"
        >
          {/* Eyebrow label */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 mb-5">
            <span className="w-6 h-px bg-noble-gold/60" />
            <span className="section-label">{t('tagline')}</span>
            {/* Right line — mobile only (for centred layout symmetry) */}
            <span className="w-6 h-px bg-noble-gold/60 lg:hidden" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="font-cormorant font-light text-noble-charcoal leading-[0.9] mb-5"
            style={{
              fontSize: 'clamp(3.25rem, 8vw, 8rem)',
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
          <motion.div variants={itemVariants} className="divider-gold mx-auto lg:mx-0 mb-5" />

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-inter font-light text-noble-gray-2 max-w-sm lg:max-w-md leading-relaxed mb-8 lg:mb-10"
            style={{ fontSize: 'clamp(0.9375rem, 1.6vw, 1.0625rem)' }}
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center lg:items-start gap-3 w-full sm:w-auto mb-10 lg:mb-12"
          >
            <motion.button
              onClick={() => scrollTo('booking-form')}
              className="btn-gold flex items-center gap-2 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {t('cta_book')}
              <ArrowRight size={15} />
            </motion.button>

            <motion.button
              onClick={() => scrollTo('pricing')}
              className="btn-ghost flex items-center gap-2 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {t('cta_prices')}
            </motion.button>
          </motion.div>

          {/* Mini trust stats */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center lg:justify-start"
          >
            {trustStats.map((stat, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div
                  className="w-px h-8 opacity-20"
                  style={{ background: '#B8924A', display: i === 0 ? 'none' : 'block' }}
                />
                <div>
                  <div className="font-cormorant text-[1.35rem] font-light text-noble-charcoal leading-none">
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

        {/* ── RIGHT / CAR IMAGE ── */}
        <motion.div
          initial={{ opacity: 0, x: 32, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.3, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:flex-1 flex items-center justify-center mt-10 lg:mt-0"
        >
          <div ref={carRef} className="relative w-full max-w-lg lg:max-w-none">

            {/* Atmospheric gold glow under car */}
            <div
              className="absolute inset-x-6 bottom-0 top-1/3 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 85% 55% at 50% 85%, rgba(184,146,74,0.18) 0%, transparent 70%)',
                filter: 'blur(28px)',
              }}
            />

            {/* Car image — plain <img> for reliable rendering in static export */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img('/images/vito-hero.jpg')}
              alt="Mercedes Vito VIP — Noble VIP Transfer"
              className="relative z-10 w-full h-auto object-contain"
              style={{
                filter:
                  'drop-shadow(0 20px 44px rgba(0,0,0,0.16)) drop-shadow(0 4px 10px rgba(0,0,0,0.09))',
                maxHeight: 'clamp(38vh, 45vw, 62vh)',
              }}
              fetchPriority="high"
            />

            {/* Elliptical ground shadow */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none z-0"
              style={{
                width: '72%',
                height: '18px',
                background:
                  'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, transparent 70%)',
                filter: 'blur(9px)',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── Bottom fade-out gradient ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(250,250,248,0.85) 0%, transparent 100%)',
        }}
      />

      {/* ── Scroll indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
        onClick={() => scrollTo('booking-form')}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 group cursor-pointer z-20"
        aria-label="Scroll to booking form"
      >
        <span className="font-inter text-[10px] tracking-[0.22em] uppercase text-noble-gray-4 group-hover:text-noble-gold transition-colors duration-200">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown
            size={13}
            className="text-noble-gray-4 group-hover:text-noble-gold transition-colors duration-200"
          />
        </motion.div>
      </motion.button>
    </section>
  );
}
