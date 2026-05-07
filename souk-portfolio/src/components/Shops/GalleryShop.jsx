import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const frameVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const galleryItems = [
  { id: 1, label: 'Wake Up', image: '/images/Wake up.png', description: 'Illustration originale' },
  { id: 2, label: 'Be Like They Where', image: '/images/beliketheywhere.png', description: 'Illustration originale' },
];

function Lightbox({ item, onClose, closeText }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '20px' }}>
      <div style={{ position: 'absolute', top: '16px', right: '20px', fontFamily: '"Press Start 2P", monospace', fontSize: '0.5rem', color: '#E8D5B7', opacity: 0.7 }}>{closeText}</div>
      <motion.img initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
        src={item.image} alt={item.label} draggable="false" onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '90vw', maxHeight: '80vh', objectFit: 'contain', border: '4px solid #C4A882', boxShadow: '0 0 40px rgba(0,0,0,0.5)', userSelect: 'none', cursor: 'default' }} />
      <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15 }}
        style={{ marginTop: '16px', fontFamily: '"Press Start 2P", monospace', fontSize: '0.55rem', color: '#FFD700', textAlign: 'center' }}>{item.label}</motion.div>
    </motion.div>
  );
}

function GalleryImageFrame({ item, index, onSelect, enlargeText }) {
  const [isHovered, setIsHovered] = useState(false);
  const accent = ['#D4A017', '#1ABC9C'][index % 2];
  return (
    <motion.div variants={frameVariants} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={() => onSelect(item)}
      style={{ backgroundColor: '#FAFAF5', border: `4px solid ${isHovered ? '#FFD700' : accent}`, padding: '6px', boxShadow: isHovered ? `6px 6px 0 rgba(0,0,0,0.2)` : '4px 4px 0 rgba(0,0,0,0.15)', transition: 'all 0.3s ease', transform: isHovered ? 'translateY(-3px)' : 'none', cursor: 'pointer' }}>
      <div style={{ border: '2px solid rgba(139,105,20,0.25)', padding: '4px' }}>
        <div style={{ backgroundColor: '#F0EDE4', minHeight: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
          <img src={item.image} alt={item.label} draggable="false" style={{ width: '100%', minHeight: '160px', objectFit: 'cover', transition: 'transform 0.3s', transform: isHovered ? 'scale(1.03)' : 'scale(1)' }} />
          {isHovered && <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.4rem', color: '#FFF', backgroundColor: 'rgba(0,0,0,0.5)', padding: '4px 10px' }}>{enlargeText}</div></div>}
        </div>
      </div>
      <div style={{ marginTop: '6px', textAlign: 'center' }}><div style={{ display: 'inline-block', backgroundColor: accent, padding: '2px 12px' }}><span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.3rem', color: '#1A1A2E' }}>{item.label}</span></div></div>
    </motion.div>
  );
}

function GalleryPlaceholderFrame({ label, index }) {
  const accent = ['#1ABC9C', '#D4A017'][index % 2];
  return (
    <motion.div variants={frameVariants} style={{ backgroundColor: '#FAFAF5', border: `4px solid ${accent}`, padding: '6px', boxShadow: '4px 4px 0 rgba(0,0,0,0.15)', opacity: 0.6 }}>
      <div style={{ border: '2px solid rgba(139,105,20,0.25)', padding: '4px' }}>
        <div style={{ backgroundColor: '#F0EDE4', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ fontFamily: '"VT323", monospace', fontSize: '1rem', color: '#999', fontStyle: 'italic' }}>{label}</div>
        </div>
      </div>
      <div style={{ marginTop: '6px', textAlign: 'center' }}><div style={{ display: 'inline-block', backgroundColor: accent, padding: '2px 12px', opacity: 0.5 }}><span style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.3rem', color: '#1A1A2E' }}>???</span></div></div>
    </motion.div>
  );
}

export default function GalleryShop() {
  const [selectedItem, setSelectedItem] = useState(null);
  const { t, tArray } = useLanguage();
  const placeholders = tArray('galleryShop.placeholders');

  return (
    <>
      <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ padding: '4px 0' }}>
        {/* Title - no Arch */}
        <motion.h3 variants={fadeUp} style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.6rem', color: '#1ABC9C', textAlign: 'center', marginBottom: '8px', lineHeight: 1.6 }}>
          {t('galleryShop.title')}
        </motion.h3>
        <motion.p variants={fadeUp} style={{ fontFamily: '"VT323", monospace', fontSize: '1.05rem', color: '#C4A882', textAlign: 'center', marginBottom: '20px' }}>
          {t('galleryShop.subtitle')}
        </motion.p>

        <motion.div variants={fadeUp} aria-hidden="true" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <div style={{ width: '40px', height: '1px', backgroundColor: '#1ABC9C', opacity: 0.4 }} />
          <div style={{ width: '8px', height: '8px', border: '2px solid #D4A017', transform: 'rotate(45deg)' }} />
          <div style={{ width: '40px', height: '1px', backgroundColor: '#1ABC9C', opacity: 0.4 }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          {galleryItems.map((item, i) => <GalleryImageFrame key={item.id} item={item} index={i} onSelect={setSelectedItem} enlargeText={t('galleryShop.enlarge')} />)}
          {placeholders.map((label, i) => <GalleryPlaceholderFrame key={`p-${i}`} label={label} index={galleryItems.length + i} />)}
        </div>

        <motion.div variants={fadeUp} aria-hidden="true" style={{ marginTop: '24px', position: 'relative', height: '20px' }}>
          <div style={{ position: 'absolute', top: '8px', left: '10%', right: '10%', height: '2px', background: 'repeating-linear-gradient(90deg, #D4A017 0px, #D4A017 6px, #8B6914 6px, #8B6914 12px)', opacity: 0.4 }} />
        </motion.div>

        <motion.div variants={fadeUp} style={{ marginTop: '8px', textAlign: 'center', fontFamily: '"VT323", monospace', fontSize: '0.95rem', color: '#666', fontStyle: 'italic' }}>
          {t('galleryShop.upcoming')}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedItem && <Lightbox item={selectedItem} onClose={() => setSelectedItem(null)} closeText={t('galleryShop.close')} />}
      </AnimatePresence>
    </>
  );
}
