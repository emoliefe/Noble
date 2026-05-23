'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Phone, Instagram, MapPin } from 'lucide-react';
import { getWhatsAppURL, INSTAGRAM_URL } from '@/lib/pricing';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tWhatsapp = useTranslations();

  const quickLinks = [
    { label: tNav('destinations'), href: '#destinations' },
    { label: tNav('pricing'), href: '#pricing' },
    { label: tNav('about'), href: '#about' },
    { label: tNav('testimonials'), href: '#testimonials' },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-noble-charcoal border-t border-white/5">
      {/* Main footer content */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand — 4 cols */}
          <div className="md:col-span-4">
            <div className="mb-4">
              <span className="font-cormorant text-2xl font-light tracking-[0.2em] text-white uppercase">
                Noble
              </span>
              <br />
              <span className="font-inter text-[0.5rem] font-medium tracking-[0.3em] text-noble-gold uppercase">
                VIP Transfer
              </span>
            </div>
            <p className="font-inter text-sm text-white/40 leading-relaxed max-w-xs">
              {t('tagline')}
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 mt-6">
              <MapPin size={14} className="text-noble-gold flex-shrink-0" />
              <span className="font-inter text-xs text-white/40">Antalya, Turkey</span>
            </div>
          </div>

          {/* Quick Links — 2 cols */}
          <div className="md:col-span-2 md:col-start-6">
            <h4 className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
              {t('links_title')}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="font-inter text-sm text-white/50 hover:text-noble-gold transition-colors duration-200"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact — 3 cols */}
          <div className="md:col-span-3">
            <h4 className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
              {t('contact_title')}
            </h4>
            <div className="space-y-3">
              <a
                href={getWhatsAppURL(tWhatsapp('whatsapp_message'))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                  <Phone size={13} className="text-[#25D366]" />
                </div>
                <span className="font-inter text-sm text-white/50 group-hover:text-white/70 transition-colors">
                  {t('phone')}
                </span>
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 group"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                  <Instagram size={13} className="text-purple-400" />
                </div>
                <span className="font-inter text-sm text-white/50 group-hover:text-white/70 transition-colors">
                  @nobleviptransfer
                </span>
              </a>
            </div>
          </div>

          {/* Legal — 3 cols */}
          <div className="md:col-span-3">
            <h4 className="font-inter text-xs font-semibold tracking-[0.15em] uppercase text-white/30 mb-5">
              {t('legal_title')}
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="#" className="font-inter text-sm text-white/50 hover:text-noble-gold transition-colors duration-200">
                  {t('privacy')}
                </a>
              </li>
              <li>
                <a href="#" className="font-inter text-sm text-white/50 hover:text-noble-gold transition-colors duration-200">
                  {t('terms')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-white/25">
            {t('rights')}
          </p>
          <div className="flex items-center gap-1">
            <span className="font-inter text-xs text-white/20">Crafted with</span>
            <span className="text-noble-gold text-xs mx-0.5">♥</span>
            <span className="font-inter text-xs text-white/20">for Antalya</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
