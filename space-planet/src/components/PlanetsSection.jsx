import { useEffect, useRef, useState } from 'react';

const planets = [
  {
    id: 'mercury',
    name: 'Mercury',
    subtitle: 'The Swift Planet',
    distance: '77.3M km',
    diameter: '4,879 km',
    moons: 0,
    dayLength: '58.6 Earth days',
    temp: '-180°C to 430°C',
    desc: 'The smallest planet in our solar system and nearest to the Sun. Mercury is a rocky body with a cratered surface similar to our moon.',
    color: '#b5b5b5',
    gradient: 'from-gray-600 to-gray-400',
    ring: false,
    size: 40,
  },
  {
    id: 'venus',
    name: 'Venus',
    subtitle: 'The Morning Star',
    distance: '261M km',
    diameter: '12,104 km',
    moons: 0,
    dayLength: '243 Earth days',
    temp: '465°C avg',
    desc: 'The hottest planet in our solar system, Venus has a thick atmosphere of carbon dioxide with clouds of sulfuric acid.',
    color: '#e8c56d',
    gradient: 'from-yellow-700 to-amber-400',
    ring: false,
    size: 70,
  },
  {
    id: 'earth',
    name: 'Earth',
    subtitle: 'Our Blue Home',
    distance: '384,400 km',
    diameter: '12,742 km',
    moons: 1,
    dayLength: '24 hours',
    temp: '15°C avg',
    desc: 'Our home planet is the only known place in the universe confirmed to host life. It is the fifth largest planet in the solar system.',
    color: '#4a9eff',
    gradient: 'from-blue-700 to-teal-400',
    ring: false,
    size: 72,
  },
  {
    id: 'mars',
    name: 'Mars',
    subtitle: 'The Red Planet',
    distance: '225M km',
    diameter: '6,779 km',
    moons: 2,
    dayLength: '24.6 hours',
    temp: '-153°C to 20°C',
    desc: 'Mars is a dusty, cold, desert world with a very thin atmosphere. It has the largest volcano and canyon in the solar system.',
    color: '#c1440e',
    gradient: 'from-red-900 to-orange-600',
    ring: false,
    size: 55,
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    subtitle: 'The Giant King',
    distance: '778.5M km',
    diameter: '139,820 km',
    moons: 95,
    dayLength: '9.9 hours',
    temp: '-108°C avg',
    desc: 'The largest planet in our solar system. Jupiter\'s iconic Great Red Spot is a massive storm that has raged for hundreds of years.',
    color: '#c88b3a',
    gradient: 'from-orange-900 to-amber-600',
    ring: false,
    size: 110,
  },
  {
    id: 'saturn',
    name: 'Saturn',
    subtitle: 'Lord of the Rings',
    distance: '1.4B km',
    diameter: '116,460 km',
    moons: 146,
    dayLength: '10.7 hours',
    temp: '-139°C avg',
    desc: 'Saturn is known for its stunning ring system. Its rings are made mostly of chunks of ice and rock, ranging from tiny grains to boulders.',
    color: '#a855f7',
    gradient: 'from-purple-900 to-purple-500',
    ring: true,
    size: 100,
  },
  {
    id: 'uranus',
    name: 'Uranus',
    subtitle: 'The Tilted Giant',
    distance: '2.87B km',
    diameter: '50,724 km',
    moons: 28,
    dayLength: '17.2 hours',
    temp: '-197°C avg',
    desc: 'Uranus has the coldest atmosphere of any planet and rotates on its side, likely due to a massive collision billions of years ago.',
    color: '#4fd1c5',
    gradient: 'from-teal-700 to-cyan-400',
    ring: true,
    size: 80,
  },
  {
    id: 'neptune',
    name: 'Neptune',
    subtitle: 'The Windy World',
    distance: '4.5B km',
    diameter: '49,244 km',
    moons: 16,
    dayLength: '16.1 hours',
    temp: '-214°C avg',
    desc: 'Neptune has the strongest winds in the solar system, reaching over 2,100 km/h. It was the first planet discovered through math.',
    color: '#3b82f6',
    gradient: 'from-blue-900 to-blue-500',
    ring: true,
    size: 78,
  },
];

function PlanetOrb({ planet }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: planet.size * 2 + 40, height: planet.size * 2 + 40 }}>
      {/* Glow */}
      <div className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, ${planet.color}, transparent 70%)`,
          filter: 'blur(20px)',
          transform: 'scale(1.5)',
          animation: 'pulse-glow 3s ease-in-out infinite',
        }} />

      {/* Ring */}
      {planet.ring && (
        <div className="absolute"
          style={{
            width: planet.size * 2.8,
            height: planet.size * 0.6,
            border: `2px solid ${planet.color}60`,
            borderRadius: '50%',
            transform: 'rotateX(70deg)',
            boxShadow: `0 0 20px ${planet.color}30`,
          }} />
      )}

      {/* Planet sphere */}
      <div
        className="rounded-full relative z-10 float-anim"
        style={{
          width: planet.size * 2,
          height: planet.size * 2,
          background: `radial-gradient(circle at 35% 30%, ${planet.color}dd, ${planet.color}88 40%, ${planet.color}33 80%, transparent)`,
          boxShadow: `inset -8px -8px 20px rgba(0,0,0,0.5), 0 0 30px ${planet.color}40`,
        }}
      >
        {/* Surface texture overlay */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-30"
          style={{
            background: `repeating-linear-gradient(0deg, transparent, transparent 8px, ${planet.color}20 8px, ${planet.color}20 9px)`,
          }} />
      </div>
    </div>
  );
}

export default function PlanetsSection() {
  const [active, setActive] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.animation = 'fade-up 0.7s ease forwards';
          }
        });
      },
      { threshold: 0.1 }
    );

    const cards = sectionRef.current?.querySelectorAll('.planet-card');
    cards?.forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="planets" ref={sectionRef} className="relative py-32 px-4 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Background nebula */}
      <div className="nebula-blob absolute -top-40 left-1/4 w-96 h-96 opacity-20"
        style={{ background: 'radial-gradient(circle, #7c3aed, transparent)', animation: 'pulse-glow 6s ease-in-out infinite' }} />
      <div className="nebula-blob absolute bottom-0 right-0 w-80 h-80 opacity-10"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', animation: 'pulse-glow 8s ease-in-out infinite 2s' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-['Orbitron'] text-purple-500 text-xs tracking-[0.5em] uppercase mb-4">
            ✦ Our Solar System ✦
          </p>
          <h2 className="font-['Orbitron'] font-black text-4xl sm:text-5xl lg:text-6xl gradient-text-white mb-6">
            The Eight <span className="gradient-text">Planets</span>
          </h2>
          <p className="text-purple-400 max-w-2xl mx-auto text-lg leading-relaxed">
            From the rocky terrain of Mercury to the icy winds of Neptune — each world is a unique story written in stardust.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {planets.map((planet, i) => (
            <div
              key={planet.id}
              className="planet-card glass-card rounded-2xl p-6 cursor-pointer group"
              style={{ opacity: 0, animationDelay: `${i * 0.1}s` }}
              onClick={() => setActive(active?.id === planet.id ? null : planet)}
            >
              {/* Planet visual */}
              <div className="flex justify-center mb-6">
                <PlanetOrb planet={planet} />
              </div>

              {/* Planet info */}
              <div className="text-center">
                <p className="font-['Orbitron'] text-purple-500 text-xs tracking-widest uppercase mb-1">
                  {planet.subtitle}
                </p>
                <h3 className="font-['Orbitron'] font-bold text-2xl text-white mb-2">
                  {planet.name}
                </h3>
                <p className="text-purple-400 text-sm leading-relaxed mb-4 line-clamp-2">
                  {planet.desc}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="glass rounded-xl p-2">
                    <p className="text-purple-500 text-[10px] uppercase tracking-wider">Distance</p>
                    <p className="text-white text-xs font-semibold">{planet.distance}</p>
                  </div>
                  <div className="glass rounded-xl p-2">
                    <p className="text-purple-500 text-[10px] uppercase tracking-wider">Moons</p>
                    <p className="text-white text-xs font-semibold">{planet.moons}</p>
                  </div>
                </div>
              </div>

              {/* Expanded info */}
              {active?.id === planet.id && (
                <div className="mt-4 pt-4 border-t border-purple-900/50 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-purple-500">Diameter</span>
                    <span className="text-white">{planet.diameter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-500">Day Length</span>
                    <span className="text-white">{planet.dayLength}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-500">Temperature</span>
                    <span className="text-white">{planet.temp}</span>
                  </div>
                </div>
              )}

              <div className="mt-4 text-center">
                <span className="text-purple-500 text-xs font-['Orbitron'] tracking-wider">
                  {active?.id === planet.id ? '↑ Less' : '↓ Details'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
