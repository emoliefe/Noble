import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BookingForm from '@/components/BookingForm';
import Testimonials from '@/components/Testimonials';
import Destinations from '@/components/Destinations';
import TrustBar from '@/components/TrustBar';
import About from '@/components/About';
import Vehicle from '@/components/Vehicle';
import Pricing from '@/components/Pricing';
import BookingCTA from '@/components/BookingCTA';
import Footer from '@/components/Footer';

export default function HomePage({ params }: { params: { locale: string } }) {
  // Required for static rendering with next-intl
  setRequestLocale(params.locale);

  return (
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <BookingForm />
      <Testimonials />
      <Destinations />
      <TrustBar />
      <About />
      <Vehicle />
      <Pricing />
      <BookingCTA />
      <Footer />
    </main>
  );
}
