import SandAnimation from '../Souk/SandAnimation';
import { useLanguage } from '../../i18n/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer style={{
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Sand animation with chameau on top */}
      <div style={{ position: 'relative' }}>
        <SandAnimation height={160} />
        <img
          src="/images/chameau.png"
          alt="Chameau"
          draggable="false"
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(150px, 30vw, 300px)',
            height: 'auto',
            objectFit: 'contain',
            imageRendering: 'pixelated',
            userSelect: 'none',
            WebkitUserDrag: 'none',
            zIndex: 6,
          }}
        />
      </div>

      {/* Footer text */}
      <div style={{
        background: '#1A1A2E',
        borderTop: '4px solid #2C3E50',
        padding: '24px',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.55rem',
          color: '#D4A017',
          margin: '0 0 8px 0',
          letterSpacing: '1px',
        }}>
          {t('footer.name')}
        </p>
        <p style={{
          fontFamily: '"VT323", monospace',
          fontSize: '1rem',
          color: '#C4A882',
          margin: 0,
        }}>
          &copy; {new Date().getFullYear()} &mdash; {t('footer.location')}
        </p>
      </div>
    </footer>
  );
}
