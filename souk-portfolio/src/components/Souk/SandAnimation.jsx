import { useMemo } from 'react';
import { motion } from 'framer-motion';

/* ============================================ */
/* Terraria Sand Texture                        */
/* Uniform golden base + random speckles        */
/* + visible flying sand particles              */
/* ============================================ */

// Single sand grain speckle
function Grain({ x, y, size, color }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      pointerEvents: 'none',
    }} />
  );
}

// Flying sand particle — bright and visible
function SandParticle({ left, delay, duration, size, bottom }) {
  return (
    <motion.div
      initial={{ x: 0, y: 0, opacity: 0 }}
      animate={{
        x: [0, 30 + Math.random() * 40, 70 + Math.random() * 60],
        y: [0, -(15 + Math.random() * 30), -(5 + Math.random() * 15)],
        opacity: [0, 0.85, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
      style={{
        position: 'absolute',
        left: `${left}%`,
        bottom: `${bottom}px`,
        width: `${size}px`,
        height: `${size}px`,
        background: '#F5E6A3',
        borderRadius: '1px',
        boxShadow: '0 0 2px rgba(245,230,163,0.6)',
        pointerEvents: 'none',
        zIndex: 5,
      }}
    />
  );
}

// Seeded pseudo-random for consistent grain placement
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function SandAnimation({ height = 160 }) {
  // Generate sand grain speckles
  const grains = useMemo(() => {
    const rand = seededRandom(42);
    const result = [];
    const colors = [
      '#BFA458', '#C4A95C', '#CBB062',
      '#DEC776', '#E2CC7C', '#A89248',
      '#9C8740', '#E8D484',
    ];
    const w = 2000;
    const h = height;
    for (let i = 0; i < 800; i++) {
      const x = Math.floor(rand() * w);
      const y = Math.floor(rand() * h);
      const size = rand() < 0.3 ? 3 : 2;
      const color = colors[Math.floor(rand() * colors.length)];
      result.push({ id: i, x, y, size, color });
    }
    return result;
  }, [height]);

  // Flying sand particles — 25 particles, 3-4px, bright
  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 92 + 2,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 2.5,
      size: i % 3 === 0 ? 4 : 3,
      bottom: 10 + Math.random() * (height - 30),
    })),
  [height]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: `${height}px`,
      overflow: 'hidden',
      imageRendering: 'pixelated',
      background: '#D4B86A',
    }}>
      {/* Sand grain speckles */}
      {grains.map((g) => (
        <Grain key={`g-${g.id}`} x={g.x} y={g.y} size={g.size} color={g.color} />
      ))}

      {/* Darker bottom edge for footer transition */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '12px',
        background: 'linear-gradient(180deg, transparent 0%, rgba(26,26,46,0.4) 100%)',
        zIndex: 4,
      }} />

      {/* Flying sand particles */}
      {particles.map((p) => (
        <SandParticle key={`particle-${p.id}`} {...p} />
      ))}
    </div>
  );
}
