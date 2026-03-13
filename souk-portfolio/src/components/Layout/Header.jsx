import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'linear-gradient(180deg, rgba(26,26,46,0.95) 0%, rgba(26,26,46,0.8) 80%, transparent 100%)',
        padding: '8px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        pointerEvents: 'none',
      }}
    >
      <div style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Tea logo image */}
        <img
          src="/images/tea.png"
          alt="Qasantini Logo"
          draggable="false"
          style={{
            height: '32px',
            width: 'auto',
            objectFit: 'contain',
            imageRendering: 'pixelated',
            userSelect: 'none',
            WebkitUserDrag: 'none',
          }}
        />
        <h1 style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.55rem',
          color: '#E8D5B7',
          margin: 0,
          letterSpacing: '1px',
        }}>
          {t('header.title')}
        </h1>
      </div>
      <nav style={{ pointerEvents: 'auto', display: 'flex', gap: '16px', alignItems: 'center' }}>
        {/* FR/EN toggle button */}
        <button
          onClick={toggleLang}
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '0.5rem',
            color: '#FFD700',
            backgroundColor: 'rgba(255, 215, 0, 0.1)',
            border: '2px solid #FFD700',
            padding: '5px 10px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            lineHeight: 1,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.25)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 215, 0, 0.1)';
          }}
        >
          {lang === 'fr' ? 'FR / EN' : 'EN / FR'}
        </button>
      </nav>
    </motion.header>
  );
}
