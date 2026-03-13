import { useState, useMemo, useEffect, useRef, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Boutique from './Boutique';
import { Cloud } from './Decorations';
import PixelModal from '../UI/PixelModal';
import DialogBox from '../UI/DialogBox';
import { useLanguage } from '../../i18n/LanguageContext';

/* Lazy-load shop interiors */
const CVShop = lazy(() => import('../Shops/CVShop'));
const LinksShop = lazy(() => import('../Shops/LinksShop'));
const ProjectsShop = lazy(() => import('../Shops/ProjectsShop'));
const SkillsShop = lazy(() => import('../Shops/SkillsShop'));
const ContactShop = lazy(() => import('../Shops/ContactShop'));
const CTFShop = lazy(() => import('../Shops/CTFShop'));
const GalleryShop = lazy(() => import('../Shops/GalleryShop'));

/* ============================================================= */
/* SHOPS CONFIG                                                    */
/* ============================================================= */
const SHOP_COMPONENTS = {
  cv: { component: CVShop, color: '#C67B4B', modalVariant: 'parchment', image: '/images/ecrivant.png' },
  links: { component: LinksShop, color: '#1E6091', modalVariant: 'night', image: '/images/tisserant.png' },
  projects: { component: ProjectsShop, color: '#C0392B', modalVariant: 'wood', image: '/images/cuisine.png' },
  skills: { component: SkillsShop, color: '#6C3483', modalVariant: 'night', image: '/images/biblio.png' },
  contact: { component: ContactShop, color: '#D4A017', modalVariant: 'parchment', image: '/images/piegeon.png' },
  ctf: { component: CTFShop, color: '#C0392B', modalVariant: 'wood', image: '/images/drapeau.png' },
  gallery: { component: GalleryShop, color: '#1ABC9C', modalVariant: 'night', image: '/images/art.png' },
};

const SHOP_IDS = ['cv', 'links', 'projects', 'skills', 'contact', 'ctf', 'gallery'];

/* ============================================================= */
/* STARS (night sky)                                                */
/* ============================================================= */
function Stars({ count = 40 }) {
  const stars = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 40,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 4,
      duration: Math.random() * 2 + 2,
    })),
    [count]
  );

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: '#FFD700',
            animation: `twinkle ${star.duration}s ease-in-out ${star.delay}s infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

/* ============================================================= */
/* PARTICLES (dust / incense)                                      */
/* ============================================================= */
function Particles({ count = 15 }) {
  const particles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 40 + Math.random() * 50,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 6,
      duration: Math.random() * 4 + 4,
      driftX: (Math.random() - 0.5) * 80,
      driftY: -(Math.random() * 80 + 40),
      color: ['#FFD700', '#E8D5B7', '#D4A017', '#C4A882'][Math.floor(Math.random() * 4)],
    })),
    [count]
  );

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            opacity: 0.6,
            animation: `particleDrift ${p.duration}s ease-out ${p.delay}s infinite`,
            '--drift-x': `${p.driftX}px`,
            '--drift-y': `${p.driftY}px`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

/* ============================================================= */
/* SMOOTH DAY/NIGHT CYCLE with gradient sky                        */
/* ============================================================= */
function useSmoothDayNightCycle(cycleDuration = 120000) {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    let rafId;
    const tick = () => {
      const elapsed = (Date.now() - startTimeRef.current) % cycleDuration;
      setProgress(elapsed / cycleDuration);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [cycleDuration]);

  const getTimeOfDay = useCallback(() => {
    if (progress < 0.25) return 'morning';
    if (progress < 0.5) return 'day';
    if (progress < 0.75) return 'evening';
    return 'night';
  }, [progress]);

  const getSkyColors = useCallback(() => {
    // Define color stops for top and bottom of sky for gradient effect
    const topStops = [
      { at: 0,    r: 100, g: 180, b: 230 },  // morning top - lighter blue
      { at: 0.15, r: 80,  g: 160, b: 220 },
      { at: 0.25, r: 50,  g: 130, b: 200 },  // day top - deeper blue
      { at: 0.45, r: 50,  g: 130, b: 200 },
      { at: 0.55, r: 200, g: 100, b: 20  },  // evening top - orange
      { at: 0.65, r: 140, g: 50,  b: 30  },  // deep sunset
      { at: 0.75, r: 20,  g: 20,  b: 50  },  // night top - dark
      { at: 0.95, r: 8,   g: 8,   b: 25  },
      { at: 1,    r: 100, g: 180, b: 230 },
    ];

    const bottomStops = [
      { at: 0,    r: 170, g: 220, b: 245 },  // morning bottom - light
      { at: 0.15, r: 150, g: 210, b: 240 },
      { at: 0.25, r: 120, g: 190, b: 230 },  // day bottom
      { at: 0.45, r: 120, g: 190, b: 230 },
      { at: 0.55, r: 240, g: 160, b: 60  },  // evening bottom - warm orange/yellow
      { at: 0.65, r: 210, g: 110, b: 40  },  // sunset bottom
      { at: 0.75, r: 30,  g: 30,  b: 55  },  // night bottom
      { at: 0.95, r: 15,  g: 15,  b: 35  },
      { at: 1,    r: 170, g: 220, b: 245 },
    ];

    function interpolate(stops) {
      let from = stops[0], to = stops[1];
      for (let i = 0; i < stops.length - 1; i++) {
        if (progress >= stops[i].at && progress <= stops[i + 1].at) {
          from = stops[i];
          to = stops[i + 1];
          break;
        }
      }
      const range = to.at - from.at;
      const t = range === 0 ? 0 : (progress - from.at) / range;
      return {
        r: Math.round(from.r + (to.r - from.r) * t),
        g: Math.round(from.g + (to.g - from.g) * t),
        b: Math.round(from.b + (to.b - from.b) * t),
      };
    }

    const top = interpolate(topStops);
    const bottom = interpolate(bottomStops);

    return {
      skyTop: `rgb(${top.r}, ${top.g}, ${top.b})`,
      skyBottom: `rgb(${bottom.r}, ${bottom.g}, ${bottom.b})`,
    };
  }, [progress]);

  return {
    timeOfDay: getTimeOfDay(),
    progress,
    ...getSkyColors(),
  };
}

/* ============================================================= */
/* IMPROVED CLOUDS LAYER                                           */
/* ============================================================= */
function CloudsLayer({ count = 10 }) {
  const clouds = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 28 + 2,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 6) + 10,
      opacity: Math.random() * 0.35 + 0.4,
      duration: Math.random() * 60 + 80,
      delay: Math.random() * -80,
      variant: Math.floor(Math.random() * 3),
    })),
    [count]
  );

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {clouds.map((c) => (
        <motion.div
          key={c.id}
          initial={{ x: `${c.left}vw` }}
          animate={{ x: ['-20vw', '120vw'] }}
          transition={{
            duration: c.duration,
            repeat: Infinity,
            ease: 'linear',
            delay: c.delay,
          }}
          style={{
            position: 'absolute',
            top: `${c.top}%`,
            pointerEvents: 'auto',
          }}
          whileHover={{ y: -6, scale: 1.08 }}
        >
          <Cloud pixelSize={c.size} opacity={c.opacity} variant={c.variant} />
        </motion.div>
      ))}
    </div>
  );
}

/* ============================================================= */
/* SOUK ENTRANCE                                                   */
/* ============================================================= */
function SoukEntrance() {
  const { t } = useLanguage();
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      style={{
        textAlign: 'center',
        marginBottom: '32px',
      }}
    >
      <h2 style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize: 'clamp(0.8rem, 3vw, 1.4rem)',
        color: '#FFD700',
        margin: '0 0 12px 0',
        textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
        lineHeight: 1.4,
      }}>
        {t('souk.welcome')}
      </h2>
      <p style={{
        fontFamily: '"VT323", monospace',
        fontSize: 'clamp(1rem, 3vw, 1.6rem)',
        color: '#E8D5B7',
        margin: 0,
        textShadow: '1px 1px 0 rgba(0,0,0,0.3)',
      }}>
        {t('souk.subtitle')}
      </p>
    </motion.div>
  );
}

/* ============================================================= */
/* MINECRAFT IFRAME MODAL                                          */
/* ============================================================= */
function MinecraftModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0,0,0,0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '16px',
          right: '20px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.6rem',
          color: '#FFD700',
          backgroundColor: '#C0392B',
          border: '3px solid #922B21',
          padding: '8px 16px',
          cursor: 'pointer',
          zIndex: 10000,
        }}
      >
        X FERMER
      </button>
      <iframe
        src="https://classic.minecraft.net/"
        title="Minecraft Classic"
        style={{
          width: '90vw',
          height: '80vh',
          border: '4px solid #FFD700',
          boxShadow: '0 0 40px rgba(255,215,0,0.3)',
        }}
        allowFullScreen
      />
    </motion.div>
  );
}

/* ============================================================= */
/* MAIN SOUK SCENE                                                 */
/* ============================================================= */
export default function SoukScene() {
  const { t, tArray, lang } = useLanguage();
  const [openShop, setOpenShop] = useState(null);
  const [dialog, setDialog] = useState(null);
  const [carpetFlown, setCarpetFlown] = useState(false);
  const [minecraftOpen, setMinecraftOpen] = useState(false);
  const [carpetClickCount, setCarpetClickCount] = useState(0);
  const { timeOfDay, skyTop, skyBottom } = useSmoothDayNightCycle(120000);
  const dialogTimerRef = useRef(null);
  const carpetTimerRef = useRef(null);

  const isNight = timeOfDay === 'night' || timeOfDay === 'evening';

  // Build shops array from translations
  const SHOPS = useMemo(() => SHOP_IDS.map((id) => ({
    id,
    name: t(`shops.${id}.name`),
    description: t(`shops.${id}.description`),
    ...SHOP_COMPONENTS[id],
  })), [t]);

  const handleShopClick = useCallback((shop) => {
    if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current);
    const metaphor = t(`metaphors.${shop.id}`) || `${t('souk.welcome')} ${shop.name} !`;
    setDialog({
      text: metaphor,
      speaker: 'Qasantini',
    });
    dialogTimerRef.current = setTimeout(() => {
      setDialog(null);
      setOpenShop(shop);
    }, 3500);
  }, [t]);

  const handleCarpetSecret = useCallback(() => {
    setCarpetFlown(true);
    setDialog({ text: t('carpetSecret'), speaker: '???' });
    if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current);
    dialogTimerRef.current = setTimeout(() => {
      setDialog(null);
      setCarpetFlown(false);
    }, 3000);
  }, [t]);

  // Carpet click handler for Minecraft easter egg
  const handleCarpetClick = useCallback((index) => {
    if (carpetTimerRef.current) clearTimeout(carpetTimerRef.current);

    setCarpetClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        // Open Minecraft!
        setMinecraftOpen(true);
        return 0;
      }
      return next;
    });

    // Reset counter after 2 seconds of no clicks
    carpetTimerRef.current = setTimeout(() => {
      setCarpetClickCount(0);
    }, 2000);
  }, []);

  const handleQasantiniClick = useCallback(() => {
    const anecdotes = tArray('anecdotes');
    const randomAnecdote = anecdotes[Math.floor(Math.random() * anecdotes.length)];
    setDialog({
      text: randomAnecdote,
      speaker: 'Qasantini',
    });
    if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current);
    dialogTimerRef.current = setTimeout(() => {
      setDialog(null);
    }, 5000);
  }, [tArray]);

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current);
      if (carpetTimerRef.current) clearTimeout(carpetTimerRef.current);
    };
  }, []);

  const activeShop = SHOPS.find((s) => s.id === openShop?.id);
  const ShopComponent = activeShop?.component;

  return (
    <div
      id="souk"
      onDragStart={(e) => e.preventDefault()}
      style={{
        position: 'relative',
        minHeight: '100vh',
        paddingBottom: '60px',
        background: `linear-gradient(180deg, ${skyTop} 0%, ${skyBottom} 100%)`,
        transition: 'background 2s ease',
        overflow: 'hidden',
        padding: '80px 16px 40px',
      }}
    >
      {/* Sky elements */}
      <CloudsLayer count={10} />
      {isNight && <Stars count={50} />}
      <Particles count={18} />

      {/* Souk entrance title */}
      <SoukEntrance />

      {/* Qasantini character */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '24px',
        position: 'relative',
      }}>
        {/* Shadow under Qasantini */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          width: '240px',
          height: '24px',
          background: 'rgba(0,0,0,0.2)',
          borderRadius: '50%',
          filter: 'blur(4px)',
          pointerEvents: 'none',
          zIndex: 0,
        }} />
        <img
          src="/images/Qasantini.png"
          alt="Qasantini"
          draggable="false"
          onClick={handleQasantiniClick}
          style={{
            width: '440px',
            height: 'auto',
            cursor: 'pointer',
            userSelect: 'none',
            WebkitUserDrag: 'none',
            pointerEvents: 'auto',
            imageRendering: 'auto',
            transition: 'transform 0.2s ease',
            zIndex: 1,
            position: 'relative',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05) translateY(-4px)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; }}
        />
      </div>

      {/* Carpets (tapis images with Minecraft easter egg) */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '32px',
        marginBottom: '48px',
        flexWrap: 'wrap',
      }}>
        {[1, 2, 3].map((num) => (
          <img
            key={num}
            src={`/images/tapis${num}.png`}
            alt={`Tapis ${num}`}
            draggable="false"
            onClick={() => handleCarpetClick(num)}
            style={{
              width: '120px',
              height: '60px',
              objectFit: 'contain',
              cursor: 'pointer',
              imageRendering: 'pixelated',
              userSelect: 'none',
              WebkitUserDrag: 'none',
              transition: 'transform 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
          />
        ))}
      </div>

      {/* === SHOPS GRID === */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '24px',
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '0 40px',
        justifyContent: 'center',
      }}
        className="shops-grid"
      >
        {SHOPS.map((shop, index) => (
          <Boutique
            key={shop.id}
            name={shop.name}
            description={shop.description}
            color={shop.color}
            image={shop.image}
            onClick={() => handleShopClick(shop)}
            ariaLabel={`${shop.name} — ${shop.description}`}
            index={index}
          />
        ))}
      </div>


      {/* Dialog box */}
      {dialog && (
        <DialogBox
          text={dialog.text}
          speaker={dialog.speaker}
          speed={25}
        />
      )}

      {/* Shop modal */}
      <PixelModal
        isOpen={!!activeShop}
        onClose={() => setOpenShop(null)}
        title={activeShop?.name || ''}
        variant={activeShop?.modalVariant || 'parchment'}
      >
        <Suspense
          fallback={
            <div style={{
              textAlign: 'center',
              padding: '40px',
              fontFamily: '"VT323", monospace',
              fontSize: '1.5rem',
              color: '#D4A017',
            }}>
              {t('souk.loading')}
            </div>
          }
        >
          {ShopComponent && <ShopComponent />}
        </Suspense>
      </PixelModal>

      {/* Minecraft modal */}
      <AnimatePresence>
        {minecraftOpen && (
          <MinecraftModal isOpen={minecraftOpen} onClose={() => setMinecraftOpen(false)} />
        )}
      </AnimatePresence>

      {/* Easter egg notification */}
      <AnimatePresence>
        {carpetFlown && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            style={{
              position: 'fixed',
              top: '20%',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1A1A2E',
              border: '4px solid #FFD700',
              padding: '16px 32px',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '0.7rem',
              color: '#FFD700',
              zIndex: 300,
              textAlign: 'center',
              boxShadow: '0 0 20px rgba(255,215,0,0.4)',
            }}
          >
            {t('souk.easterEgg')}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
