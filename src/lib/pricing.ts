export interface PriceEntry {
  destination: string;
  price: number;
  region: string;
}

export const WHATSAPP_NUMBER = '905336561788';
export const INSTAGRAM_URL = 'https://www.instagram.com/nobleviptransfer?utm_source=qr&igsh=ZDV6bmdqM2w4M3Rx';

export function getWhatsAppURL(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const pricingData: PriceEntry[] = [
  { destination: 'Antalya City Center', price: 40, region: 'Antalya' },
  { destination: 'Lara', price: 40, region: 'Antalya' },
  { destination: 'Kundu', price: 40, region: 'Antalya' },
  { destination: 'Kaleiçi', price: 40, region: 'Antalya' },
  { destination: 'Konyaaltı', price: 40, region: 'Antalya' },
  { destination: 'Belek', price: 45, region: 'Belek' },
  { destination: 'Boğazkent', price: 45, region: 'Belek' },
  { destination: 'Denizyaka', price: 55, region: 'Side' },
  { destination: 'Kumköy', price: 55, region: 'Side' },
  { destination: 'Gündoğdu', price: 55, region: 'Side' },
  { destination: 'Çolaklı', price: 55, region: 'Side' },
  { destination: 'Evrenseki', price: 55, region: 'Side' },
  { destination: 'Side', price: 55, region: 'Side' },
  { destination: 'Sorgun', price: 55, region: 'Side' },
  { destination: 'Manavgat', price: 55, region: 'Side' },
  { destination: 'Titreyengöl', price: 55, region: 'Side' },
  { destination: 'Beldibi', price: 55, region: 'Kemer' },
  { destination: 'Göynük', price: 55, region: 'Kemer' },
  { destination: 'Kemer', price: 55, region: 'Kemer' },
  { destination: 'Kızılot', price: 65, region: 'Alanya' },
  { destination: 'Kızılağaç', price: 65, region: 'Alanya' },
  { destination: 'Çamyuva', price: 60, region: 'Kemer' },
  { destination: 'Kiriş', price: 60, region: 'Kemer' },
  { destination: 'Tekirova', price: 65, region: 'Kemer' },
  { destination: 'Okurcalar', price: 75, region: 'Alanya' },
  { destination: 'Avsallar', price: 75, region: 'Alanya' },
  { destination: 'İncekum', price: 75, region: 'Alanya' },
  { destination: 'Çenger', price: 75, region: 'Alanya' },
  { destination: 'Konaklı', price: 80, region: 'Alanya' },
  { destination: 'Türkler', price: 80, region: 'Alanya' },
  { destination: 'Alanya', price: 80, region: 'Alanya' },
  { destination: 'Mahmutlar', price: 85, region: 'Alanya' },
  { destination: 'Kargıcak', price: 85, region: 'Alanya' },
  { destination: 'Kestel', price: 85, region: 'Alanya' },
  { destination: 'Olimpos', price: 85, region: 'Kemer' },
  { destination: 'Adrasan', price: 95, region: 'Kemer' },
];
