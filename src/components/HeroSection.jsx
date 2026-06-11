import { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 96;

export default function HeroSection() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const framesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Preload all frames
  useEffect(() => {
    const images = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i).padStart(3, '0');
      img.src = `/captures/ezgif-frame-${num}.jpg`;
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) setLoaded(true);
      };
      images.push(img);
    }
    framesRef.current = images;
  }, []);

  // Draw first frame on canvas once loaded
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawFrame = (index) => {
      const img = framesRef.current[index];
      if (!img || !img.complete) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    drawFrame(0);

    const handleResize = () => drawFrame(currentFrameRef.current);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [loaded]);

  // Scroll-driven frame update
  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const containerHeight = container.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(scrolled / containerHeight, 1);
      const frameIndex = Math.min(
        Math.floor(progress * (TOTAL_FRAMES - 1)),
        TOTAL_FRAMES - 1
      );

      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        const img = framesRef.current[frameIndex];
        if (img && img.complete) {
          canvas.width = canvas.offsetWidth;
          canvas.height = canvas.offsetHeight;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loaded]);

  return (
    <section
      ref={containerRef}
      className="hero-scroll-container relative"
      style={{ height: `${TOTAL_FRAMES * 12}px` }}
      id="home"
    >
      {/* Loading screen */}
      {!loaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #020008 0%, #060015 100%)' }}>
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full border-2 border-purple-900 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-2 border-purple-700 flex items-center justify-center"
                style={{ animation: 'ring-rotate 3s linear infinite' }}>
                <div className="w-16 h-16 rounded-full"
                  style={{ background: 'radial-gradient(circle, #7c3aed, #4c1d95)', animation: 'pulse-glow 2s ease-in-out infinite' }} />
              </div>
            </div>
          </div>
          <p className="font-['Orbitron'] text-purple-400 text-sm tracking-[0.3em] uppercase mb-4">
            Loading Universe
          </p>
          <div className="w-64 h-1 bg-purple-950 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${loadProgress}%`,
                background: 'linear-gradient(90deg, #7c3aed, #a855f7, #f0abfc)',
              }}
            />
          </div>
          <p className="text-purple-600 text-xs mt-2 font-['Orbitron'] tracking-widest">
            {loadProgress}%
          </p>
        </div>
      )}

      {/* Sticky canvas wrapper */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          id="hero-canvas"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Gradient overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(2,0,8,0.3) 0%, transparent 30%, transparent 60%, rgba(2,0,8,0.8) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(2,0,8,0.5) 100%)',
          }}
        />

        {/* Hero text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
          <div className="text-center max-w-5xl mx-auto" style={{ opacity: loaded ? 1 : 0, transition: 'opacity 1s ease' }}>
            <p className="font-['Orbitron'] text-purple-400 text-xs sm:text-sm tracking-[0.5em] uppercase mb-4 animate-[fade-up_1s_ease_0.2s_both]">
              ✦ Welcome to the Cosmos ✦
            </p>
            <h1 className="font-['Orbitron'] font-black text-5xl sm:text-7xl lg:text-8xl xl:text-9xl mb-6 leading-none tracking-tight gradient-text-white animate-[fade-up_1s_ease_0.4s_both]">
              EXPLORE
              <br />
              <span className="gradient-text">THE UNIVERSE</span>
            </h1>
            <p className="text-purple-300 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-[fade-up_1s_ease_0.6s_both]">
              Journey through the cosmos. Discover planets, nebulae, and the infinite wonders of deep space.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fade-up_1s_ease_0.8s_both]">
              <a href="#planets"
                className="group relative px-8 py-4 rounded-full font-semibold text-sm tracking-widest uppercase overflow-hidden transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #a855f7)' }}>
                <span className="relative z-10 text-white">Start Journey</span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: 'linear-gradient(135deg, #6d28d9, #9333ea)' }} />
              </a>
              <a href="#facts"
                className="glass px-8 py-4 rounded-full font-semibold text-sm tracking-widest uppercase text-purple-300 hover:text-white border border-purple-700 hover:border-purple-400 transition-all duration-300">
                Discover Facts
              </a>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
            <span className="font-['Orbitron'] text-purple-500 text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-px h-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500 to-transparent animate-[fade-up_1.5s_ease_infinite]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
