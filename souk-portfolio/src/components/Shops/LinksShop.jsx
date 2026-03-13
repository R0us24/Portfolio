import { useState } from 'react';
import { motion } from 'framer-motion';
import { Carpet } from '../Souk/Decorations';
import { useLanguage } from '../../i18n/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, x: -40, scaleX: 0.8 },
  visible: { opacity: 1, x: 0, scaleX: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function LinkedInIcon() {
  return <div aria-hidden="true" style={{ width: '32px', height: '32px', backgroundColor: '#0077B5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Press Start 2P", monospace', fontSize: '0.65rem', color: '#fff', fontWeight: 'bold', boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>in</div>;
}

function GitHubIcon() {
  return <img src="/images/git.png" alt="" draggable="false" style={{ width: '32px', height: '32px', imageRendering: 'pixelated', userSelect: 'none' }} />;
}

function EmailIcon() {
  return <div aria-hidden="true" style={{ width: '32px', height: '32px', backgroundColor: '#D4A017', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"Press Start 2P", monospace', fontSize: '0.8rem', color: '#1A1A2E', boxShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>@</div>;
}

function LinkCard({ icon, label, url, displayUrl, color }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.a href={url} target="_blank" rel="noopener noreferrer" variants={cardVariants} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', backgroundColor: isHovered ? `${color}22` : 'rgba(26,26,46,0.7)', border: `3px solid ${color}`, textDecoration: 'none', color: '#E8D5B7', transition: 'all 0.2s', position: 'relative', transform: isHovered ? 'translateX(6px)' : 'none', boxShadow: isHovered ? `4px 4px 0 0 ${color}66` : '3px 3px 0 0 rgba(0,0,0,0.3)', cursor: 'pointer' }}>
      <div aria-hidden="true" style={{ position: 'absolute', left: '-22px', top: '50%', width: '22px', height: '3px', backgroundColor: color, transform: `translateY(-50%) scaleX(${isHovered ? 1.3 : 1})`, transformOrigin: 'right center', transition: 'transform 0.2s' }} />
      <div aria-hidden="true" style={{ position: 'absolute', left: '-26px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', backgroundColor: color, border: '2px solid rgba(255,255,255,0.3)' }} />
      {icon}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.55rem', color, marginBottom: '4px', lineHeight: 1.4 }}>{label}</div>
        <div style={{ fontFamily: '"VT323", monospace', fontSize: '0.95rem', color: '#C4A882', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayUrl}</div>
      </div>
      <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.6rem', color, transition: 'transform 0.2s', transform: isHovered ? 'translateX(4px)' : 'none' }} aria-hidden="true">{'>'}</div>
    </motion.a>
  );
}

export default function LinksShop() {
  const { t } = useLanguage();

  const links = [
    { icon: <LinkedInIcon />, label: 'LinkedIn', url: 'https://www.linkedin.com/in/roustom-abdeldjalel-cherir-819170356/', displayUrl: 'linkedin.com/in/roustom-abdeldjalel-cherir', color: '#0077B5' },
    { icon: <GitHubIcon />, label: 'GitHub', url: 'https://github.com/R0us24', displayUrl: 'github.com/R0us24', color: '#333333' },
    { icon: <EmailIcon />, label: 'Email', url: 'mailto:roustom235@gmail.com', displayUrl: 'roustom235@gmail.com', color: '#D4A017' },
  ];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ padding: '8px 4px', position: 'relative' }}>
      <motion.div variants={cardVariants} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '20px' }}>
        <Carpet variant={2} width={80} height={30} style={{ marginBottom: '12px' }} />
        <h3 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.6rem', color: '#D4A017', margin: 0, textAlign: 'center', lineHeight: 1.6 }}>
          {t('linksShop.title')}
        </h3>
      </motion.div>

      <div aria-hidden="true" style={{ position: 'absolute', left: '16px', top: '60px', bottom: '20px', width: '3px', background: 'repeating-linear-gradient(0deg, #0077B5 0px, #0077B5 8px, #333 8px, #333 16px, #D4A017 16px, #D4A017 24px)', opacity: 0.5 }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', paddingLeft: '30px' }}>
        {links.map((link) => <LinkCard key={link.label} {...link} />)}
      </div>

      <motion.div variants={cardVariants} aria-hidden="true" style={{ marginTop: '24px', height: '8px', background: 'repeating-linear-gradient(90deg, #0077B5 0px, #0077B5 8px, transparent 8px, transparent 12px, #333 12px, #333 20px, transparent 20px, transparent 24px, #D4A017 24px, #D4A017 32px, transparent 32px, transparent 36px)', opacity: 0.6 }} />
    </motion.div>
  );
}
