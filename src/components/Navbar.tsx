'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import LanguageSelector from './LanguageSelector';
import { getWhatsAppURL } from '@/lib/pricing';

export default function Navbar() {
  const t = useTranslations('nav');
  const tBooking = useTranslations('booking');
  const tWhatsapp = useTranslations();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'destinations', href: '#destinations' },
    { key: 'pricing', href: '#pricing' },
    { key: 'about', href: '#about' },
    { key: 'testimonials', href: '#testimonials' },
  ] as const;

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/88 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="flex flex-col leading-none group"
            >
              <span className="font-cormorant text-xl md:text-2xl font-light tracking-[0.2em] text-noble-charcoal uppercase group-hover:text-noble-gold transition-colors duration-300">
                Noble
              </span>
              <span className="font-inter text-[0.5rem] md:text-[0.55rem] font-medium tracking-[0.3em] text-noble-gold uppercase mt-px">
                VIP Transfer
              </span>
            </a>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.key}
                  onClick={() => scrollToSection(link.href)}
                  className="font-inter text-sm font-medium text-noble-gray-2 hover:text-noble-charcoal tracking-wide transition-colors duration-200 relative group"
                >
                  {t(link.key)}
                  <span className="absolute -bottom-px left-0 w-0 h-px bg-noble-gold transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3 md:gap-4">
              <LanguageSelector />

              <a
                href={getWhatsAppURL(tWhatsapp('whatsapp_message'))}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex btn-primary text-sm py-2.5 px-5"
              >
                {t('book')}
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-noble-gray-6 transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-2xl flex flex-col pt-20"
          >
            <div className="section-container py-8 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => scrollToSection(link.href)}
                  className="font-cormorant text-4xl font-light text-left py-4 border-b border-noble-gray-5 text-noble-charcoal hover:text-noble-gold transition-colors duration-200"
                >
                  {t(link.key)}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="mt-8"
              >
                <a
                  href={getWhatsAppURL(tWhatsapp('whatsapp_message'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-gold w-full justify-center text-base"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('book')}
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
