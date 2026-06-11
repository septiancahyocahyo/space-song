// Gallery section using the scroll animation frames as gallery images
const galleryFrames = [1, 12, 24, 36, 48, 60, 72, 84, 96].map(n => ({
  id: n,
  src: `/captures/ezgif-frame-${String(n).padStart(3, '0')}.jpg`,
  label: `Frame ${n}`,
}));

export default function GallerySection() {
  return (
    <section id="gallery" className="relative py-32 px-4 overflow-hidden" style={{ zIndex: 1 }}>
      {/* Nebula */}
      <div className="nebula-blob absolute bottom-20 right-1/4 w-80 h-80 opacity-15"
        style={{ background: 'radial-gradient(circle, #f0abfc, transparent)', animation: 'pulse-glow 6s ease-in-out infinite' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-['Orbitron'] text-purple-500 text-xs tracking-[0.5em] uppercase mb-4">
            ✦ Visual Archive ✦
          </p>
          <h2 className="font-['Orbitron'] font-black text-4xl sm:text-5xl lg:text-6xl gradient-text-white mb-6">
            Cosmic <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-purple-400 max-w-xl mx-auto text-lg">
            A visual journey through the rotation of our mysterious ringed world, captured frame by frame.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryFrames.map((frame, i) => (
            <div
              key={frame.id}
              className="relative overflow-hidden rounded-2xl group cursor-pointer break-inside-avoid"
              style={{ marginBottom: '1rem' }}
            >
              <img
                src={frame.src}
                alt={`Planet - ${frame.label}`}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                style={{ height: i % 3 === 0 ? '280px' : i % 3 === 1 ? '220px' : '260px' }}
              />
              {/* Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4"
                style={{ background: 'linear-gradient(to top, rgba(6,0,21,0.9) 0%, transparent 60%)' }}>
                <div>
                  <p className="font-['Orbitron'] text-white text-xs tracking-widest uppercase">Purple Planet</p>
                  <p className="text-purple-300 text-xs">{frame.label}</p>
                </div>
              </div>
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-purple-500/50 transition-all duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
