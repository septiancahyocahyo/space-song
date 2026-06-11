import './index.css';
import StarField from './components/StarField';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PlanetsSection from './components/PlanetsSection';
import SolarSection from './components/SolarSection';
import FactsSection from './components/FactsSection';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="relative min-h-screen" style={{ background: 'var(--color-void)' }}>
      {/* Persistent star field background */}
      <StarField />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative" style={{ zIndex: 1 }}>
        {/* Hero - scroll-driven animation */}
        <HeroSection />

        {/* Planets grid */}
        <PlanetsSection />

        {/* Animated solar system */}
        <SolarSection />

        {/* Facts & stats */}
        <FactsSection />

        {/* Gallery */}
        <GallerySection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
