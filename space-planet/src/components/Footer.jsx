export default function Footer() {
  return (
    <footer className="relative border-t border-purple-900/50 py-16 px-4" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full"
                style={{ background: 'radial-gradient(circle at 35% 35%, #c4b5fd, #7c3aed, #4c1d95)' }} />
              <span className="font-['Orbitron'] font-bold text-white text-lg tracking-widest">COSMOVIS</span>
            </div>
            <p className="text-purple-500 text-sm leading-relaxed max-w-xs">
              Exploring the infinite cosmos, one discovery at a time. Your gateway to the universe.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-['Orbitron'] text-purple-300 text-xs tracking-[0.3em] uppercase mb-4">Explore</h4>
            <ul className="space-y-2">
              {['Planets', 'Solar System', 'Facts', 'Gallery'].map(link => (
                <li key={link}>
                  <a href={`#${link.toLowerCase().replace(' ', '')}`}
                    className="text-purple-500 hover:text-purple-300 text-sm transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-4 h-px group-hover:w-8 transition-all duration-300"
                      style={{ background: 'linear-gradient(90deg, #7c3aed, transparent)' }} />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Space quote */}
          <div>
            <h4 className="font-['Orbitron'] text-purple-300 text-xs tracking-[0.3em] uppercase mb-4">Cosmic Thought</h4>
            <blockquote className="border-l-2 border-purple-700 pl-4">
              <p className="text-purple-400 text-sm leading-relaxed italic">
                "The cosmos is within us. We are made of star-stuff. We are a way for the universe to know itself."
              </p>
              <cite className="text-purple-600 text-xs mt-2 block not-italic font-['Orbitron'] tracking-wider">
                — Carl Sagan
              </cite>
            </blockquote>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-purple-900/30 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-purple-700 text-xs font-['Orbitron'] tracking-wider">
            © 2026 COSMOVIS — All Rights Reserved
          </p>
          <div className="flex gap-2">
            {['✦', '●', '✦'].map((s, i) => (
              <span key={i} className="text-purple-800 text-xs">{s}</span>
            ))}
          </div>
          <p className="text-purple-700 text-xs tracking-wider">
            Made with ❤️ for the cosmos
          </p>
        </div>
      </div>
    </footer>
  );
}
