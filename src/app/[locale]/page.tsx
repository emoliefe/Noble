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

export default function HomePage() {
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
