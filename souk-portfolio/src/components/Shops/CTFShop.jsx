import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lantern } from '../Souk/Decorations';
import { useLanguage } from '../../i18n/LanguageContext';

/* ===== L'Arene des Defis -- Arena / Battle Style ===== */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const slideFromLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const slideFromRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/* CSS flag/banner icon */
function FlagBanner() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: '28px',
        height: '32px',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      {/* Pole */}
      <div
        style={{
          position: 'absolute',
          left: '0',
          top: '0',
          width: '3px',
          height: '32px',
          backgroundColor: '#888',
        }}
      />
      {/* Flag */}
      <div
        style={{
          position: 'absolute',
          left: '3px',
          top: '2px',
          width: '20px',
          height: '14px',
          backgroundColor: '#C0392B',
          clipPath: 'polygon(0 0, 100% 10%, 85% 50%, 100% 90%, 0 100%)',
        }}
      />
      {/* Pole tip */}
      <div
        style={{
          position: 'absolute',
          left: '-2px',
          top: '-3px',
          width: '7px',
          height: '7px',
          backgroundColor: '#FFD700',
          borderRadius: '50%',
        }}
      />
    </div>
  );
}

/* Category tag colors */
const CATEGORY_COLORS = {
  'Web Exploitation': '#E74C3C',
  'Cryptographie': '#9B59B6',
  'Reverse Engineering': '#2ECC71',
  'Cybersecurite': '#E74C3C',
  'Analyse de vulnerabilites': '#F39C12',
  'Developpement de jeux': '#3498DB',
  'Programmation': '#2ECC71',
  'Design interactif': '#9B59B6',
  'Cybersecurity': '#E74C3C',
  'Vulnerability Analysis': '#F39C12',
  'Game Development': '#3498DB',
  'Programming': '#2ECC71',
  'Interactive Design': '#9B59B6',
  'Cryptography': '#9B59B6',
};

/* Diploma lightbox */
function DiplomaLightbox({ onClose, closeText }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        padding: '20px',
      }}
    >
      {/* Close hint */}
      <div
        style={{
          position: 'absolute',
          top: '16px',
          right: '20px',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.5rem',
          color: '#E8D5B7',
          opacity: 0.7,
        }}
      >
        {closeText}
      </div>

      {/* Enlarged image */}
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        src="/images/diplome.png"
        alt="Diploma"
        draggable="false"
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '90vw',
          maxHeight: '80vh',
          objectFit: 'contain',
          imageRendering: 'auto',
          border: '4px solid #C4A882',
          boxShadow: '0 0 40px rgba(0, 0, 0, 0.5)',
          userSelect: 'none',
          WebkitUserDrag: 'none',
          cursor: 'default',
        }}
      />
    </motion.div>
  );
}

/* CTF challenge card */
function CTFCard({ entry, index, t }) {
  const [showDiploma, setShowDiploma] = useState(false);
  const variants = index % 2 === 0 ? slideFromLeft : slideFromRight;

  return (
    <>
      <motion.div
        variants={variants}
        style={{
          background: `linear-gradient(
            145deg,
            #1A1A2E 0%,
            #16213E 50%,
            #1A1A2E 100%
          )`,
          border: '3px solid #C0392B',
          padding: '18px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '4px 4px 0 rgba(0,0,0,0.4), inset 0 0 20px rgba(192, 57, 43, 0.08)',
        }}
      >
        {/* Arena glow at top */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #C0392B, #FFD700, #C0392B, transparent)',
          }}
        />

        {/* Corner brackets for arena feel */}
        {[
          { top: '4px', left: '4px', borderTop: '3px solid #C0392B', borderLeft: '3px solid #C0392B' },
          { top: '4px', right: '4px', borderTop: '3px solid #C0392B', borderRight: '3px solid #C0392B' },
          { bottom: '4px', left: '4px', borderBottom: '3px solid #C0392B', borderLeft: '3px solid #C0392B' },
          { bottom: '4px', right: '4px', borderBottom: '3px solid #C0392B', borderRight: '3px solid #C0392B' },
        ].map((style, i) => (
          <div
            key={i}
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '12px',
              height: '12px',
              ...style,
              opacity: 0.5,
            }}
          />
        ))}

        {/* Header: flag + name + date */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
          <FlagBanner />
          <div style={{ flex: 1 }}>
            <h4
              style={{
                fontFamily: '"Press Start 2P", monospace',
                fontSize: '0.55rem',
                color: '#E8D5B7',
                marginBottom: '4px',
                lineHeight: 1.6,
              }}
            >
              {entry.name}
            </h4>
            <div
              style={{
                fontFamily: '"VT323", monospace',
                fontSize: '1rem',
                color: '#999',
              }}
            >
              {entry.date}
            </div>
          </div>

          {/* Type badge */}
          <span
            style={{
              fontFamily: '"VT323", monospace',
              fontSize: '0.9rem',
              color: '#FFD700',
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              border: '2px solid #FFD700',
              padding: '2px 8px',
              whiteSpace: 'nowrap',
            }}
          >
            {entry.type}
          </span>
        </div>

        {/* Categories as colored tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '12px',
          }}
        >
          {entry.categories.map((cat) => {
            const tagColor = CATEGORY_COLORS[cat] || '#C0392B';
            return (
              <span
                key={cat}
                style={{
                  fontFamily: '"VT323", monospace',
                  fontSize: '0.95rem',
                  color: tagColor,
                  backgroundColor: `${tagColor}15`,
                  border: `2px solid ${tagColor}`,
                  padding: '2px 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                {/* Small shield/diamond before each tag */}
                <span
                  aria-hidden="true"
                  style={{
                    display: 'inline-block',
                    width: '6px',
                    height: '6px',
                    backgroundColor: tagColor,
                    transform: 'rotate(45deg)',
                  }}
                />
                {cat}
              </span>
            );
          })}
        </div>

        {/* Description */}
        <p
          style={{
            fontFamily: '"VT323", monospace',
            fontSize: '1.1rem',
            color: '#C4A882',
            lineHeight: 1.4,
          }}
        >
          {entry.description}
        </p>

        {/* View diploma button for entries with hasImage */}
        {entry.hasImage && (
          <button
            onClick={() => setShowDiploma(true)}
            style={{
              marginTop: '12px',
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '0.45rem',
              color: '#FFD700',
              backgroundColor: 'rgba(255, 215, 0, 0.1)',
              border: '2px solid #FFD700',
              padding: '6px 14px',
              cursor: 'pointer',
              lineHeight: 1.6,
              transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '2px 2px 0 rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.25)';
              e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.3), 0 0 10px rgba(255, 215, 0, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
              e.currentTarget.style.boxShadow = '2px 2px 0 rgba(0,0,0,0.3)';
            }}
          >
            {t('ctfShop.viewDiploma')}
          </button>
        )}

        {/* Bottom glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, transparent, #C0392B, #FFD700, #C0392B, transparent)',
          }}
        />
      </motion.div>

      {/* Diploma lightbox */}
      <AnimatePresence>
        {showDiploma && (
          <DiplomaLightbox
            onClose={() => setShowDiploma(false)}
            closeText={t('ctfShop.closeDiploma')}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default function CTFShop() {
  const { t, tArray } = useLanguage();
  const ctfEntries = tArray('ctfEntries');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ padding: '4px 0' }}
    >
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
        <Lantern pixelSize={2} />
      </div>

      {/* Section title */}
      <motion.h3
        variants={fadeUp}
        style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.6rem',
          color: '#C0392B',
          textAlign: 'center',
          marginBottom: '8px',
          lineHeight: 1.6,
          textShadow: '0 0 10px rgba(192, 57, 43, 0.4)',
        }}
      >
        {t('ctfShop.title')}
      </motion.h3>

      {/* Subtitle */}
      <motion.p
        variants={fadeUp}
        style={{
          fontFamily: '"VT323", monospace',
          fontSize: '1.05rem',
          color: '#C4A882',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        {t('ctfShop.subtitle')}
      </motion.p>

      {/* Decorative swords divider */}
      <motion.div
        variants={fadeUp}
        aria-hidden="true"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '20px',
        }}
      >
        {/* Left sword */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '30px', height: '2px', backgroundColor: '#C0392B', opacity: 0.5 }} />
          <div style={{
            width: '0', height: '0',
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '6px solid #C0392B',
            opacity: 0.5,
          }} />
        </div>

        {/* Center diamond */}
        <div
          style={{
            width: '10px',
            height: '10px',
            backgroundColor: '#FFD700',
            transform: 'rotate(45deg)',
            boxShadow: '0 0 8px rgba(255, 215, 0, 0.4)',
          }}
        />

        {/* Right sword */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            width: '0', height: '0',
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderRight: '6px solid #C0392B',
            opacity: 0.5,
          }} />
          <div style={{ width: '30px', height: '2px', backgroundColor: '#C0392B', opacity: 0.5 }} />
        </div>
      </motion.div>

      {/* CTF entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {ctfEntries.map((entry, index) => (
          <CTFCard key={index} entry={entry} index={index} t={t} />
        ))}
      </div>

      {/* Future challenges placeholder */}
      <motion.div
        variants={fadeUp}
        style={{
          marginTop: '24px',
          padding: '16px',
          border: '2px dashed rgba(192, 57, 43, 0.3)',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '0.5rem',
            color: '#C0392B',
            marginBottom: '8px',
            lineHeight: 1.6,
            opacity: 0.7,
          }}
        >
          {t('ctfShop.upcoming')}
        </div>
        <div
          style={{
            fontFamily: '"VT323", monospace',
            fontSize: '1rem',
            color: '#666',
            lineHeight: 1.4,
          }}
        >
          {t('ctfShop.upcomingDesc')}
        </div>

        {/* Pulsing dots */}
        <div
          aria-hidden="true"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '12px',
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: '#C0392B',
                opacity: 0.4,
                animation: `pulse 1.5s ease-in-out ${i * 0.3}s infinite`,
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Bottom arena decoration */}
      <motion.div
        variants={fadeUp}
        aria-hidden="true"
        style={{
          marginTop: '20px',
          height: '4px',
          background: `linear-gradient(
            90deg,
            transparent 0%,
            #C0392B 20%,
            #FFD700 50%,
            #C0392B 80%,
            transparent 100%
          )`,
          opacity: 0.5,
        }}
      />
    </motion.div>
  );
}
