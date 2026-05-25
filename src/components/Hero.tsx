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
  show: { transition: { staggerChildren: 0.13, delayChildren: 0.4 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
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

  /* Subtle Ken Burns parallax on background image */
  useEffect(() => {
    if (reducedMotion || !heroRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { scale: 1.06, y: '0%' },
        {
          scale: 1.0,
          y: '-4%',
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2,
          },
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    /* h-[100svh] + overflow-hidden → true full-screen, zero bleed */
    <section
      ref={heroRef}
      className="relative h-[100svh] min-h-[580px] overflow-hidden"
    >

      {/* ── Full-bleed background image ── */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={img('/images/vito-hero.jpg')}
        alt="Noble VIP Transfer — Mercedes Vito"
        className="absolute inset-0 w-full h-full object-cover object-center"
        fetchPriority="high"
      />

      {/* ── Cinematic gradient overlays ── */}

      {/* Main overlay — bottom-heavy so text reads clearly */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(4,3,2,0.88) 0%, rgba(4,3,2,0.55) 38%, rgba(4,3,2,0.18) 65%, transparent 100%)',
        }}
      />

      {/* Left vignette — keeps focus on text column */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(4,3,2,0.35) 0%, transparent 55%)',
        }}
      />

      {/* Top vignette — navbar legibility */}
      <div
        className="absolute top-0 left-0 right-0 h-36 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(4,3,2,0.45) 0%, transparent 100%)',
        }}
      />

      {/* ── Content — anchored to viewport bottom ── */}
      <div className="relative z-10 h-full flex flex-col justify-end">
        <div className="section-container pb-14 md:pb-20">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="max-w-2xl"
          >

            {/* Eyebrow */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-noble-gold" style={{ opacity: 0.75 }} />
              <span
                className="font-inter font-medium tracking-[0.2em] uppercase"
                style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.65)' }}
              >
                {t('tagline')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="font-cormorant font-light text-white leading-[0.88] mb-6"
              style={{
                fontSize: 'clamp(3.75rem, 9vw, 9rem)',
                letterSpacing: '-0.025em',
              }}
            >
              <span className="block">Noble</span>
              <span
                className="block italic"
                style={{ fontSize: '0.82em', color: '#D4AA6A' }}
              >
                VIP Transfer
              </span>
            </motion.h1>

            {/* Gold rule */}
            <motion.div
              variants={itemVariants}
              className="mb-6"
              style={{
                width: '3rem',
                height: '1px',
                background: 'linear-gradient(90deg, #B8924A, transparent)',
              }}
            />

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="font-inter font-light leading-relaxed mb-9"
              style={{
                fontSize: 'clamp(0.9375rem, 1.7vw, 1.0625rem)',
                color: 'rgba(255,255,255,0.68)',
                maxWidth: '30rem',
              }}
            >
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-10"
            >
              {/* Primary — gold */}
              <motion.button
                onClick={() =>
                  document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-gold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {t('cta_book')}
                <ArrowRight size={15} />
              </motion.button>

              {/* Secondary — glass on dark */}
              <motion.button
                onClick={() =>
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="flex items-center justify-center gap-2 font-inter font-medium rounded-lg transition-all duration-300"
                style={{
                  fontSize: '0.9375rem',
                  letterSpacing: '0.04em',
                  padding: '1rem 2.5rem',
                  color: 'rgba(255,255,255,0.82)',
                  border: '1px solid rgba(255,255,255,0.22)',
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(8px)',
                }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255,255,255,0.12)',
                  borderColor: 'rgba(255,255,255,0.38)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                {t('cta_prices')}
              </motion.button>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-7 flex-wrap"
            >
              {trustStats.map((stat, i) => (
                <div key={i} className="flex items-center gap-3.5">
                  {i > 0 && (
                    <div
                      className="w-px h-7 flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.15)' }}
                    />
                  )}
                  <div>
                    <div
                      className="font-cormorant font-light text-white leading-none"
                      style={{ fontSize: '1.25rem' }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="font-inter tracking-[0.12em] uppercase mt-0.5"
                      style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.45)' }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </div>
      </div>

    </section>
  );
}
