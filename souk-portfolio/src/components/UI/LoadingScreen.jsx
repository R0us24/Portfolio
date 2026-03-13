import { useState, useEffect, useCallback } from 'react';

/* ===== GameBoy-style Loading Screen ===== */
const LOADING_STYLE_ID = 'loading-screen-styles';

function injectLoadingStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(LOADING_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = LOADING_STYLE_ID;
  style.textContent = `
    @keyframes blink-start {
      0%, 100% { opacity: 1; }
      50% { opacity: 0; }
    }
    @keyframes title-appear {
      0% {
        transform: scale(0.1);
        opacity: 0;
        letter-spacing: 20px;
      }
      60% {
        transform: scale(1.15);
        opacity: 1;
        letter-spacing: 8px;
      }
      80% {
        transform: scale(0.95);
        letter-spacing: 4px;
      }
      100% {
        transform: scale(1);
        opacity: 1;
        letter-spacing: 6px;
      }
    }
    @keyframes title-glow {
      0%, 100% {
        text-shadow: 0 0 10px rgba(255,215,0,0.5), 0 0 20px rgba(255,215,0,0.3);
      }
      50% {
        text-shadow: 0 0 20px rgba(255,215,0,0.8), 0 0 40px rgba(255,215,0,0.5), 0 0 60px rgba(255,215,0,0.2);
      }
    }
    @keyframes scanline {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }
    @keyframes fadeOutScreen {
      0% { opacity: 1; }
      100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);
}

export default function LoadingScreen({ onComplete }) {
  const [phase, setPhase] = useState('press-start'); // press-start -> title -> fade-out -> done
  const [fadeOut, setFadeOut] = useState(false);

  injectLoadingStyles();

  const handleClick = useCallback(() => {
    if (phase === 'press-start') {
      setPhase('title');
      // After title animation, fade out
      setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => {
          onComplete();
        }, 600);
      }, 2000);
    }
  }, [phase, onComplete]);

  useEffect(() => {
    const handleKey = (e) => {
      if (phase === 'press-start') {
        handleClick();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [phase, handleClick]);

  return (
    <div
      onClick={handleClick}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 10000,
        backgroundColor: '#0F0F0F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: phase === 'press-start' ? 'pointer' : 'default',
        animation: fadeOut ? 'fadeOutScreen 0.6s ease-out forwards' : undefined,
        overflow: 'hidden',
      }}
    >
      {/* Scanline effect */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Subtle vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {phase === 'press-start' && (
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 'clamp(0.8rem, 3vw, 1.4rem)',
            color: '#E8D5B7',
            animation: 'blink-start 1.2s ease-in-out infinite',
            textAlign: 'center',
            zIndex: 2,
            textShadow: '0 0 10px rgba(232,213,183,0.3)',
          }}
        >
          PRESS START
        </div>
      )}

      {phase === 'title' && (
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: 'clamp(1.5rem, 6vw, 3.5rem)',
            color: '#FFD700',
            animation: 'title-appear 1s ease-out forwards, title-glow 2s ease-in-out 1s infinite',
            textAlign: 'center',
            zIndex: 2,
            lineHeight: 1.4,
          }}
        >
          QASANTINI
        </div>
      )}

      {/* Small pixel decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          fontFamily: '"VT323", monospace',
          fontSize: '1rem',
          color: '#555',
          zIndex: 2,
          textAlign: 'center',
        }}
      >
        {phase === 'press-start' && '2026'}
      </div>
    </div>
  );
}
