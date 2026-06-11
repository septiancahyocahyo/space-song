import { useEffect, useRef } from 'react';

export default function StarField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];
    let meteors = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 3000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.2,
          alpha: Math.random(),
          alphaDir: Math.random() > 0.5 ? 1 : -1,
          speed: Math.random() * 0.005 + 0.002,
          color: getStarColor(),
        });
      }
    };

    const getStarColor = () => {
      const colors = [
        'rgba(255,255,255,',
        'rgba(196,181,253,',
        'rgba(129,140,248,',
        'rgba(240,171,252,',
        'rgba(255,220,200,',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const spawnMeteor = () => {
      if (meteors.length < 4 && Math.random() < 0.004) {
        const x = Math.random() * canvas.width + 300;
        const y = Math.random() * canvas.height * 0.5;
        meteors.push({
          x, y,
          len: Math.random() * 180 + 80,
          speed: Math.random() * 10 + 8,
          alpha: 1,
          thickness: Math.random() * 1.5 + 0.5,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        star.alpha += star.speed * star.alphaDir;
        if (star.alpha >= 1) { star.alpha = 1; star.alphaDir = -1; }
        if (star.alpha <= 0.1) { star.alpha = 0.1; star.alphaDir = 1; }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${star.alpha})`;
        ctx.fill();
      });

      // Draw meteors
      spawnMeteor();
      meteors.forEach((m, i) => {
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.len, m.y + m.len);
        grad.addColorStop(0, `rgba(255,255,255,${m.alpha})`);
        grad.addColorStop(0.3, `rgba(196,181,253,${m.alpha * 0.5})`);
        grad.addColorStop(1, 'rgba(196,181,253,0)');

        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.len, m.y + m.len);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.thickness;
        ctx.stroke();

        m.x -= m.speed;
        m.y += m.speed;
        m.alpha -= 0.015;

        if (m.alpha <= 0) meteors.splice(i, 1);
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="stars-canvas"
      style={{ zIndex: 0 }}
    />
  );
}
