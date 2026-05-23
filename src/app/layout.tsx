import type { Metadata } from 'next';
import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Noble VIP Transfer — Antalya Premium Airport Transfer',
  description: "Antalya's most refined VIP airport transfer service. Travel in absolute luxury with Noble VIP Transfer — Mercedes Vito, professional chauffeur, fixed Euro prices.",
  keywords: 'Antalya airport transfer, VIP transfer Antalya, Mercedes Vito transfer, luxury transfer Turkey, Noble VIP',
  openGraph: {
    title: 'Noble VIP Transfer — Antalya Premium Airport Transfer',
    description: "Antalya's most refined VIP airport transfer service.",
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-inter bg-noble-cream text-noble-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
