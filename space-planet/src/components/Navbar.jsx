import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Planets', href: '#planets' },
  { label: 'Solar System', href: '#solar' },
  { label: 'Facts', href: '#facts' },
  { label: 'Gallery', href: '#gallery' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'nav-scrolled' : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9">
            <div className="absolute inset-0 rounded-full"
              style={{ background: 'radial-gradient(circle at 35% 35%, #c4b5fd, #7c3aed, #4c1d95)' }} />
            <div className="absolute inset-0 rounded-full border border-purple-400 opacity-50"
              style={{ transform: 'scale(1.3)', animation: 'pulse-glow 3s ease-in-out infinite' }} />
          </div>
          <span className="font-['Orbitron'] font-bold text-white text-lg tracking-widest group-hover:text-purple-300 transition-colors duration-300">
            COSMOVIS
          </span>
        </a>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative font-['Space_Grotesk'] text-sm font-medium text-purple-300 hover:text-white tracking-wider transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300"
                  style={{ background: 'linear-gradient(90deg, #7c3aed, #f0abfc)' }} />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a href="#facts"
          className="hidden md:block px-5 py-2 rounded-full text-xs font-semibold tracking-widest uppercase transition-all duration-300 border border-purple-700 text-purple-300 hover:bg-purple-900/50 hover:border-purple-400 hover:text-white">
          Explore Now
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-purple-300 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-purple-300 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-purple-300 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden transition-all duration-400 overflow-hidden ${menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
        style={{ background: 'rgba(6, 0, 21, 0.95)', backdropFilter: 'blur(20px)' }}>
        <ul className="flex flex-col px-6 py-4 gap-4 border-t border-purple-900">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={() => setMenuOpen(false)}
                className="block text-purple-300 hover:text-white font-medium tracking-wider transition-colors duration-200 py-1">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
