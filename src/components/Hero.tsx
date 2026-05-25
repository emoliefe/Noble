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

export default function Hero() {
  const t = useTranslations('hero');
  const reducedMotion = useReducedMotion();

  const heroRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const reflectionRef = useRef<HTMLDivElement>(null);
  const bgLayer1Ref = useRef<HTMLDivElement>(null);
  const bgLayer2Ref = useRef<HTMLDivElement>(null);
  const fogRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !heroRef.current) return;

    const ctx = gsap.context(() => {
      // Car 3D rotation and depth shift on scroll
      if (carRef.current) {
        gsap.to(carRef.current, {
          rotateY: 8,
          rotateX: -2,
          scale: 0.94,
          y: 60,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.8,
          },
        });
      }

      // Reflection fade
      if (reflectionRef.current) {
        gsap.to(reflectionRef.current, {
          opacity: 0.3,
          y: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '60% top',
            scrub: 1,
          },
        });
      }

      // Background layer 1 parallax (faster)
      if (bgLayer1Ref.current) {
        gsap.to(bgLayer1Ref.current, {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }

      // Background layer 2 parallax (slower)
      if (bgLayer2Ref.current) {
        gsap.to(bgLayer2Ref.current, {
          y: -50,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.7,
          },
        });
      }

      // Text parallax
      if (textRef.current) {
        gsap.to(textRef.current, {
          y: 80,
          opacity: 0.2,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '70% top',
            scrub: 1.2,
          },
        });
      }

      // Fog intensity change
      if (fogRef.current) {
        gsap.to(fogRef.current, {
          opacity: 0.9,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: '40% top',
            end: 'bottom top',
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToNext = () => {
    const trustBar = document.getElementById('trust');
    if (trustBar) {
      trustBar.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-noble-cream"
      style={{ background: 'linear-gradient(160deg, #FFFFFF 0%, #F8F6F2 40%, #FAFAF8 100%)' }}
    >
      {/* Background layers for parallax depth */}
      <div
        ref={bgLayer1Ref}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 100% 80% at 50% 0%, rgba(184,146,74,0.07) 0%, transparent 65%)',
        }}
      />
      <div
        ref={bgLayer2Ref}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 70% 60%, rgba(184,146,74,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full section-container pt-28 pb-0 flex flex-col items-center">

        {/* Text Block */}
        <div ref={textRef} className="text-center mb-4 md:mb-6">
          {/* Eyebrow label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <span className="w-8 h-px bg-noble-gold opacity-60" />
            <span className="section-label">{t('tagline')}</span>
            <span className="w-8 h-px bg-noble-gold opacity-60" />
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-cormorant font-light text-noble-charcoal leading-[0.95] tracking-tight mb-6"
            style={{
              fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
              letterSpacing: '-0.02em',
            }}
          >
            <span className="block">Noble</span>
            <span className="block italic text-noble-gold" style={{ fontSize: '0.85em' }}>
              VIP Transfer
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-inter font-light text-noble-gray-2 max-w-xl mx-auto leading-relaxed text-balance"
            style={{ fontSize: 'clamp(0.9375rem, 2vw, 1.1875rem)' }}
          >
            {t('subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8 md:mt-10"
          >
            <motion.button
              onClick={() => {
                document.getElementById('booking-form')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-gold flex items-center gap-2 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {t('cta_book')}
              <ArrowRight size={16} />
            </motion.button>
            <motion.button
              onClick={() => {
                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-ghost flex items-center gap-2 w-full sm:w-auto justify-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              {t('cta_prices')}
            </motion.button>
          </motion.div>
        </div>

        {/* Car Section — full-bleed cinematic */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full"
          style={{
            width: '100vw',
            marginLeft: 'calc(-50vw + 50%)',
            perspective: '1200px',
          }}
        >
          {/* Car wrapper with 3D transform */}
          <div
            ref={carRef}
            className="relative"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Atmospheric glow behind car */}
            <div
              className="absolute inset-x-8 bottom-0 top-1/4 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(184,146,74,0.5) 0%, transparent 70%)',
              }}
            />

            {/* Car Image */}
            <div className="relative mx-auto max-w-5xl px-0 md:px-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img('/images/vito-hero.jpg')}
                alt="Mercedes Vito VIP — Noble VIP Transfer"
                className="w-full h-auto object-contain"
                style={{
                  filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.20)) drop-shadow(0 6px 16px rgba(0,0,0,0.12))',
                }}
                fetchPriority="high"
              />
              {/* Frosted glass border */}
              <div
                className="absolute inset-0 pointer-events-none z-10"
                style={{
                  background: [
                    'linear-gradient(to right, rgba(250,250,248,0.5) 0%, transparent 12%, transparent 88%, rgba(250,250,248,0.5) 100%)',
                    'linear-gradient(to bottom, rgba(250,250,248,0.5) 0%, transparent 12%, transparent 88%, rgba(250,250,248,0.5) 100%)',
                  ].join(', '),
                }}
              />

              {/* Road / ground reflection */}
              <div
                ref={reflectionRef}
                className="absolute inset-x-8 -bottom-4 h-16 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 100%)',
                  filter: 'blur(8px)',
                  transform: 'scaleY(-1) translateY(-100%)',
                  opacity: 0.55,
                  maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
                }}
              />
            </div>
          </div>

          {/* Ground shadow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-0 pointer-events-none"
            style={{
              width: '60%',
              height: '24px',
              background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, transparent 70%)',
              filter: 'blur(10px)',
            }}
          />
        </motion.div>
        <div className="pb-10 md:pb-16" />
      </div>

      {/* Bottom fog gradient */}
      <div
        ref={fogRef}
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, #FAFAF8 0%, rgba(250,250,248,0.6) 60%, transparent 100%)',
        }}
      />

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 group cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="font-inter text-xs tracking-[0.2em] uppercase text-noble-gray-3 group-hover:text-noble-gold transition-colors">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={16} className="text-noble-gray-4 group-hover:text-noble-gold transition-colors" />
        </motion.div>
      </motion.button>
    </section>
  );
}
