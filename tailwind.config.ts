import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        noble: {
          cream: '#FAFAF8',
          white: '#FFFFFF',
          gold: '#B8924A',
          'gold-light': '#D4B070',
          'gold-dark': '#96722E',
          charcoal: '#0D0D0D',
          'gray-1': '#1A1A1A',
          'gray-2': '#4A4A4A',
          'gray-3': '#6B6B6B',
          'gray-4': '#9A9A9A',
          'gray-5': '#D4D4D4',
          'gray-6': '#F0EFED',
        },
      },
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'Georgia', 'serif'],
        inter: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(3.5rem, 9vw, 8rem)',
        'hero-sub': 'clamp(1rem, 2vw, 1.375rem)',
        'section': 'clamp(2.5rem, 5vw, 4.5rem)',
        'card': 'clamp(1.25rem, 2.5vw, 1.75rem)',
      },
      spacing: {
        'section': 'clamp(5rem, 10vw, 10rem)',
        'section-sm': 'clamp(3rem, 6vw, 6rem)',
      },
      backgroundImage: {
        'noble-gradient': 'linear-gradient(135deg, #FAFAF8 0%, #F5F3EF 50%, #FAFAF8 100%)',
        'gold-gradient': 'linear-gradient(135deg, #B8924A 0%, #D4B070 50%, #B8924A 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.5) 100%)',
        'hero-radial': 'radial-gradient(ellipse 80% 80% at 50% -10%, rgba(184,146,74,0.08) 0%, transparent 70%)',
        'fog-bottom': 'linear-gradient(to top, rgba(250,250,248,1) 0%, rgba(250,250,248,0.8) 30%, transparent 100%)',
        'fog-top': 'linear-gradient(to bottom, rgba(250,250,248,1) 0%, rgba(250,250,248,0.6) 30%, transparent 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.06), 0 1px 0 rgba(255,255,255,0.8) inset',
        'glass-lg': '0 24px 64px rgba(0,0,0,0.08), 0 1px 0 rgba(255,255,255,0.9) inset',
        'card': '0 4px 24px rgba(0,0,0,0.06)',
        'card-hover': '0 20px 60px rgba(0,0,0,0.12)',
        'gold': '0 8px 32px rgba(184,146,74,0.25)',
        'noble': '0 32px 80px rgba(0,0,0,0.08)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-gold': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(184,146,74,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(184,146,74,0)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'noble': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
        '1200': '1200ms',
      },
    },
  },
  plugins: [],
};

export default config;
