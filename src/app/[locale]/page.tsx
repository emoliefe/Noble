import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import About from '@/components/About';
import Vehicle from '@/components/Vehicle';
import Destinations from '@/components/Destinations';
import Pricing from '@/components/Pricing';
import Testimonials from '@/components/Testimonials';
import BookingCTA from '@/components/BookingCTA';
import Footer from '@/components/Footer';

export default function HomePage({ params }: { params: { locale: string } }) {
  // Required for static rendering with next-intl
  setRequestLocale(params.locale);

  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <TrustBar />
      <About />
      <Vehicle />
      <Destinations />
      <Pricing />
      <Testimonials />
      <BookingCTA />
      <Footer />
    </main>
  );
}
