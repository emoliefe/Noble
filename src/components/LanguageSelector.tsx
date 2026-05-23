'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Globe } from 'lucide-react';

const languages = [
  { code: 'en', label: 'English', flag: '🇬🇧', short: 'EN' },
  { code: 'tr', label: 'Türkçe', flag: '🇹🇷', short: 'TR' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', short: 'DE' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', short: 'RU' },
] as const;

export default function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === locale) ?? languages[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const switchLocale = (newLocale: string) => {
    setOpen(false);
    // Replace locale in pathname
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-noble-gray-6 transition-all duration-200 group"
        aria-label="Select language"
      >
        <Globe size={14} className="text-noble-gray-3 group-hover:text-noble-gold transition-colors" />
        <span className="text-sm font-medium">{currentLang.flag}</span>
        <span className="font-inter text-xs font-medium text-noble-gray-2 hidden sm:block tracking-wide">
          {currentLang.short}
        </span>
        <ChevronDown
          size={12}
          className={`text-noble-gray-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-full right-0 mt-2 w-44 glass rounded-xl shadow-glass-lg overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLocale(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-150 ${
                  lang.code === locale
                    ? 'bg-noble-gold/8 text-noble-gold'
                    : 'hover:bg-noble-gray-6 text-noble-charcoal'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <div className="flex flex-col">
                  <span className="font-inter text-sm font-medium leading-tight">{lang.label}</span>
                  <span className="font-inter text-xs text-noble-gray-3">{lang.short}</span>
                </div>
                {lang.code === locale && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-noble-gold" />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
