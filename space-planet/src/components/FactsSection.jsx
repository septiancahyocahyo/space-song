import { useEffect, useRef, useState } from 'react';

const stats = [
  { label: 'Planets', value: 8, suffix: '', icon: '🪐' },
  { label: 'Moons', value: 290, suffix: '+', icon: '🌙' },
  { label: 'Asteroids', value: 1.3, suffix: 'M+', icon: '☄️' },
  { label: 'Light Years Wide', value: 120, suffix: 'K', icon: '✨' },
];

const facts = [
  {
    icon: '🌌',
    title: 'Observable Universe',
    body: 'The observable universe spans about 93 billion light-years in diameter, containing over 2 trillion galaxies.',
  },
  {
    icon: '⭐',
    title: 'Stars in the Milky Way',
    body: 'Our Milky Way galaxy is estimated to contain between 100 to 400 billion stars, and we orbit one of them.',
  },
  {
    icon: '🕳️',
    title: 'Black Holes',
    body: 'Supermassive black holes exist at the center of most large galaxies. Sagittarius A* at our galaxy\'s core is 4 million solar masses.',
  },
  {
    icon: '🚀',
    title: 'Speed of Light',
    body: 'Light travels at 299,792 km/s. Sunlight takes about 8 minutes and 20 seconds to reach Earth from the Sun.',
  },
  {
    icon: '🌊',
    title: 'Dark Energy',
    body: '68% of the universe is dark energy — a mysterious force causing the universe\'s expansion to accelerate.',
  },
  {
    icon: '💫',
    title: 'Cosmic Age',
    body: 'The universe is approximately 13.8 billion years old, originating from the Big Bang — the most explosive event in history.',
  },
];

function CounterNumber({ target, suffix, started }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const isDecimal = target % 1 !== 0;
    const steps = 60;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplay(target);
        clearInterval(timer);
      } else {
        setDisplay(isDecimal ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [started, target]);

  return (
    <span>
      {display}{suffix}
    </span>
  );
}

export default function FactsSection() {
  const statsRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="facts" className="relative py-32 px-4 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Nebula blobs */}
      <div className="nebula-blob absolute top-20 right-10 w-72 h-72 opacity-15"
        style={{ background: 'radial-gradient(circle, #a855f7, transparent)', animation: 'pulse-glow 5s ease-in-out infinite' }} />
      <div className="nebula-blob absolute bottom-20 left-10 w-96 h-96 opacity-10"
        style={{ background: 'radial-gradient(circle, #818cf8, transparent)', animation: 'pulse-glow 7s ease-in-out infinite 1s' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-['Orbitron'] text-purple-500 text-xs tracking-[0.5em] uppercase mb-4">
            ✦ Space Data ✦
          </p>
          <h2 className="font-['Orbitron'] font-black text-4xl sm:text-5xl lg:text-6xl gradient-text-white mb-6">
            Mind-Blowing <span className="gradient-text">Facts</span>
          </h2>
          <p className="text-purple-400 max-w-2xl mx-auto text-lg">
            Numbers that make you realize just how vast and magnificent our universe truly is.
          </p>
        </div>

        {/* Stats counter */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat) => (
            <div key={stat.label}
              className="glass-card rounded-2xl p-8 text-center group hover:border-purple-500/50 transition-all duration-300">
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="font-['Orbitron'] font-black text-4xl sm:text-5xl gradient-text mb-2">
                <CounterNumber target={stat.value} suffix={stat.suffix} started={started} />
              </div>
              <p className="text-purple-400 text-sm tracking-wider uppercase font-['Orbitron'] text-xs">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-16">
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed50)' }} />
          <span className="font-['Orbitron'] text-purple-600 text-xs tracking-widest uppercase">Cosmic Knowledge</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, #7c3aed50, transparent)' }} />
        </div>

        {/* Facts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facts.map((fact, i) => (
            <div
              key={fact.title}
              className="glass-card rounded-2xl p-6 group hover:border-purple-500/50 transition-all duration-400 cursor-default"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {fact.icon}
                </div>
                <div>
                  <h3 className="font-['Orbitron'] font-bold text-white text-sm mb-2 tracking-wide">
                    {fact.title}
                  </h3>
                  <p className="text-purple-400 text-sm leading-relaxed">
                    {fact.body}
                  </p>
                </div>
              </div>
              {/* Bottom accent */}
              <div className="mt-4 h-0.5 w-0 group-hover:w-full transition-all duration-500 rounded-full"
                style={{ background: 'linear-gradient(90deg, #7c3aed, #f0abfc)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
