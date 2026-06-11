// Solar system orbital visualization
import { useEffect, useRef } from 'react';

const solarPlanets = [
  { name: 'Mercury', color: '#b5b5b5', size: 6, orbitRadius: 90, speed: 0.047, moons: 0 },
  { name: 'Venus', color: '#e8c56d', size: 11, orbitRadius: 130, speed: 0.035, moons: 0 },
  { name: 'Earth', color: '#4a9eff', size: 12, orbitRadius: 175, speed: 0.029, moons: 1 },
  { name: 'Mars', color: '#c1440e', size: 8, orbitRadius: 220, speed: 0.024, moons: 2 },
  { name: 'Jupiter', color: '#c88b3a', size: 28, orbitRadius: 290, speed: 0.013, moons: 95 },
  { name: 'Saturn', color: '#a855f7', size: 24, orbitRadius: 360, speed: 0.009, moons: 146, hasRing: true },
  { name: 'Uranus', color: '#4fd1c5', size: 18, orbitRadius: 420, speed: 0.006, moons: 28 },
  { name: 'Neptune', color: '#3b82f6', size: 17, orbitRadius: 475, speed: 0.005, moons: 16 },
];

export default function SolarSection() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const anglesRef = useRef(solarPlanets.map((_, i) => (i * Math.PI * 2) / solarPlanets.length));

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let containerWidth;
    let scale;
    let cx, cy;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      containerWidth = rect.width;
      scale = containerWidth < 600 ? containerWidth / 1000 : 1;
      canvas.height = Math.min(containerWidth, 1000);
      cx = canvas.width / 2;
      cy = canvas.height / 2;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const s = scale || 1;

      // Draw orbits
      solarPlanets.forEach(p => {
        ctx.beginPath();
        ctx.arc(cx, cy, p.orbitRadius * s, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(124, 58, 237, 0.15)';
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.stroke();
        ctx.setLineDash([]);
      });

      // Draw sun
      const sunGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 28 * s);
      sunGrad.addColorStop(0, '#fff9a0');
      sunGrad.addColorStop(0.4, '#ffd700');
      sunGrad.addColorStop(0.8, '#ff8800');
      sunGrad.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 28 * s, 0, Math.PI * 2);
      ctx.fillStyle = sunGrad;
      ctx.fill();

      // Sun glow
      const sunGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 * s);
      sunGlow.addColorStop(0, 'rgba(255,200,0,0.2)');
      sunGlow.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.arc(cx, cy, 60 * s, 0, Math.PI * 2);
      ctx.fillStyle = sunGlow;
      ctx.fill();

      // Draw planets
      solarPlanets.forEach((p, i) => {
        anglesRef.current[i] += p.speed * 0.02;
        const px = cx + Math.cos(anglesRef.current[i]) * p.orbitRadius * s;
        const py = cy + Math.sin(anglesRef.current[i]) * p.orbitRadius * s;

        // Planet glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, p.size * s * 2.5);
        glow.addColorStop(0, `${p.color}60`);
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(px, py, p.size * s * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Ring for Saturn
        if (p.hasRing) {
          ctx.save();
          ctx.translate(px, py);
          ctx.scale(1, 0.3);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size * s * 2.2, p.size * s * 2.2, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `${p.color}80`;
          ctx.lineWidth = 3 * s;
          ctx.stroke();
          ctx.restore();
        }

        // Planet
        const grad = ctx.createRadialGradient(
          px - p.size * s * 0.3, py - p.size * s * 0.3,
          0, px, py, p.size * s
        );
        grad.addColorStop(0, `${p.color}ff`);
        grad.addColorStop(0.6, `${p.color}cc`);
        grad.addColorStop(1, `${p.color}44`);
        ctx.beginPath();
        ctx.arc(px, py, p.size * s, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Label
        if (s > 0.5) {
          ctx.fillStyle = 'rgba(196, 181, 253, 0.7)';
          ctx.font = `${10 * s}px Orbitron, sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText(p.name, px, py + p.size * s + 14 * s);
        }
      });

      animRef.current = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', () => { resize(); });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section id="solar" className="relative py-32 px-4 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Nebula */}
      <div className="nebula-blob absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] opacity-10"
        style={{ background: 'radial-gradient(circle, #7c3aed, #3b82f6, transparent)', animation: 'pulse-glow 8s ease-in-out infinite' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-['Orbitron'] text-purple-500 text-xs tracking-[0.5em] uppercase mb-4">
            ✦ Interactive Model ✦
          </p>
          <h2 className="font-['Orbitron'] font-black text-4xl sm:text-5xl lg:text-6xl gradient-text-white mb-6">
            Solar System <span className="gradient-text">Orbit</span>
          </h2>
          <p className="text-purple-400 max-w-xl mx-auto text-lg">
            A real-time animated model of our solar system, showing each planet in its orbital dance around the Sun.
          </p>
        </div>

        {/* Canvas */}
        <div className="glass-card rounded-3xl overflow-hidden p-4">
          <canvas ref={canvasRef} className="w-full" />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {solarPlanets.map(p => (
            <div key={p.name} className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: p.color, boxShadow: `0 0 8px ${p.color}` }} />
              <span className="text-purple-300 text-xs font-['Orbitron'] tracking-wider">{p.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
