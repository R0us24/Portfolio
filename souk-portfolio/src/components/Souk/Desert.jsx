import { useMemo } from 'react';

/* ============================================================= */
/* PIXEL 2D DESERT - Sits above the footer                        */
/* ============================================================= */

// Cactus pixel art component
function Cactus({ x, scale = 1, variant = 0 }) {
  const colors = {
    body: '#2D6B22',
    dark: '#1B4D14',
    light: '#4A9E3A',
  };

  const height = variant === 0 ? 40 : 30;
  const armOffset = variant === 0 ? 12 : 8;

  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: `${x}%`,
      transform: `scale(${scale})`,
      transformOrigin: 'bottom center',
      zIndex: 2,
      imageRendering: 'pixelated',
    }}>
      {/* Main trunk */}
      <div style={{
        width: '8px',
        height: `${height}px`,
        backgroundColor: colors.body,
        position: 'relative',
        borderLeft: `2px solid ${colors.dark}`,
        borderRight: `2px solid ${colors.light}`,
      }}>
        {/* Left arm */}
        <div style={{
          position: 'absolute',
          left: '-10px',
          bottom: `${armOffset + 8}px`,
          width: '10px',
          height: '4px',
          backgroundColor: colors.body,
          borderTop: `2px solid ${colors.light}`,
          borderBottom: `2px solid ${colors.dark}`,
        }} />
        <div style={{
          position: 'absolute',
          left: '-10px',
          bottom: `${armOffset + 12}px`,
          width: '4px',
          height: '8px',
          backgroundColor: colors.body,
          borderLeft: `2px solid ${colors.dark}`,
        }} />
        {/* Right arm */}
        {variant === 0 && (
          <>
            <div style={{
              position: 'absolute',
              right: '-10px',
              bottom: `${armOffset + 16}px`,
              width: '10px',
              height: '4px',
              backgroundColor: colors.body,
              borderTop: `2px solid ${colors.light}`,
              borderBottom: `2px solid ${colors.dark}`,
            }} />
            <div style={{
              position: 'absolute',
              right: '-10px',
              bottom: `${armOffset + 20}px`,
              width: '4px',
              height: '10px',
              backgroundColor: colors.body,
              borderRight: `2px solid ${colors.light}`,
            }} />
          </>
        )}
      </div>
    </div>
  );
}

// Small rock/stone
function Rock({ x, size = 1 }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '2px',
      left: `${x}%`,
      zIndex: 2,
      imageRendering: 'pixelated',
    }}>
      <div style={{
        width: `${12 * size}px`,
        height: `${6 * size}px`,
        backgroundColor: '#8B7355',
        borderRadius: '2px 2px 0 0',
        borderTop: `2px solid #A0896B`,
        borderBottom: `2px solid #6B5842`,
        boxShadow: `${2 * size}px 0 0 #6B5842`,
      }} />
    </div>
  );
}

// Skull decoration (small pixel)
function Skull({ x }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: '4px',
      left: `${x}%`,
      zIndex: 2,
      imageRendering: 'pixelated',
    }}>
      <div style={{
        width: '8px',
        height: '8px',
        backgroundColor: '#E8DCC8',
        borderRadius: '2px 2px 0 0',
        position: 'relative',
        border: '1px solid #C4B8A4',
      }}>
        <div style={{
          position: 'absolute',
          top: '2px',
          left: '1px',
          width: '2px',
          height: '2px',
          backgroundColor: '#2C3E50',
        }} />
        <div style={{
          position: 'absolute',
          top: '2px',
          right: '1px',
          width: '2px',
          height: '2px',
          backgroundColor: '#2C3E50',
        }} />
      </div>
    </div>
  );
}

export default function Desert() {
  // Generate sand dunes as pixel layers
  const duneData = useMemo(() => {
    const layers = [];
    // Multiple layers of sand dunes with different heights
    for (let i = 0; i < 60; i++) {
      layers.push({
        x: (i / 60) * 100,
        height: Math.sin(i * 0.3) * 12 + Math.sin(i * 0.15) * 8 + 28,
      });
    }
    return layers;
  }, []);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '120px',
      overflow: 'hidden',
      zIndex: 5,
      marginBottom: '-4px',
      background: 'linear-gradient(180deg, #C4A87C 0%, #A88B5A 100%)',
    }}>
      {/* Back dune layer (lighter, further away) */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '100%',
      }}>
        {/* Back dunes - stepped pixel look */}
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 200 40" style={{
          position: 'absolute',
          bottom: 0,
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}>
          <path
            d={`M0,40 L0,28 ${Array.from({ length: 40 }, (_, i) => {
              const x = i * 5;
              const y = Math.round(28 - Math.sin(i * 0.4) * 6 - Math.sin(i * 0.2) * 4);
              return `L${x},${y}`;
            }).join(' ')} L200,30 L200,40 Z`}
            fill="#D4B896"
          />
        </svg>

        {/* Front dunes - darker, closer */}
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 200 40" style={{
          position: 'absolute',
          bottom: 0,
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}>
          <path
            d={`M0,40 L0,30 ${Array.from({ length: 40 }, (_, i) => {
              const x = i * 5;
              const y = Math.round(30 - Math.sin(i * 0.35 + 1) * 5 - Math.sin(i * 0.18 + 0.5) * 3);
              return `L${x},${y}`;
            }).join(' ')} L200,32 L200,40 Z`}
            fill="#C4A87C"
          />
        </svg>

        {/* Main sand ground */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: 'linear-gradient(180deg, #C4A87C 0%, #B89968 40%, #A88B5A 100%)',
        }} />

        {/* Sand pixel texture overlay */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50px',
          background: `repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 4px,
            rgba(0,0,0,0.03) 4px,
            rgba(0,0,0,0.03) 8px
          ), repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 4px,
            rgba(0,0,0,0.02) 4px,
            rgba(0,0,0,0.02) 8px
          )`,
          imageRendering: 'pixelated',
        }} />

        {/* Sand grain dots */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={`grain-${i}`}
            style={{
              position: 'absolute',
              bottom: `${Math.random() * 45 + 2}px`,
              left: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              backgroundColor: i % 3 === 0 ? '#D4B896' : i % 3 === 1 ? '#A88B5A' : '#B89968',
              opacity: 0.6,
            }}
          />
        ))}
      </div>

      {/* Decorative elements */}
      <Cactus x={8} scale={1.1} variant={0} />
      <Cactus x={85} scale={0.8} variant={1} />
      <Cactus x={55} scale={0.6} variant={1} />
      <Rock x={20} size={1} />
      <Rock x={45} size={0.7} />
      <Rock x={72} size={1.2} />
      <Rock x={92} size={0.8} />
      <Skull x={35} />
      <Skull x={78} />
    </div>
  );
}
