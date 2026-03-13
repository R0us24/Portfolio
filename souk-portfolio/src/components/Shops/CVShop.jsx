import { motion } from 'framer-motion';

import { useLanguage } from '../../i18n/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const unrollVariants = {
  hidden: { opacity: 0, y: -30, scaleY: 0.6 },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

function TimelineDot() {
  return <div aria-hidden="true" style={{ width: '12px', height: '12px', backgroundColor: '#D4A017', border: '3px solid #A0522D', flexShrink: 0 }} />;
}

export default function CVShop() {
  const { t, lang } = useLanguage();

  const profile = { name: t('profile.name'), title: t('profile.title'), bio: t('profile.bio'), location: t('profile.location') };

  const education = lang === 'fr'
    ? [
        { degree: 'Baccalaureat en informatique', school: 'Universite de Montreal', year: 'Septembre 2024 - Present', location: 'Montreal, QC' },
        { degree: 'DEC en gestion de commerces', school: 'Cegep Ahuntsic', year: 'Aout 2021 - Mai 2024', location: 'Montreal, QC' },
      ]
    : [
        { degree: "Bachelor's in Computer Science", school: 'Universite de Montreal', year: 'September 2024 - Present', location: 'Montreal, QC' },
        { degree: 'DEC in Commerce Management', school: 'Cegep Ahuntsic', year: 'August 2021 - May 2024', location: 'Montreal, QC' },
      ];

  const experience = lang === 'fr'
    ? [{ role: "Club d'intelligence artificielle de l'UdeM", company: 'Membre actif', period: 'Janvier 2025 - Present', description: "Membre actif du club d'IA de l'Universite de Montreal." }]
    : [{ role: 'UdeM Artificial Intelligence Club', company: 'Active Member', period: 'January 2025 - Present', description: 'Active member of the AI club at Universite de Montreal.' }];

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{
      background: 'linear-gradient(135deg, #f5e6c8 0%, #e8d5b7 25%, #dcc8a0 50%, #e8d5b7 75%, #f0dfc0 100%)',
      backgroundImage: 'linear-gradient(135deg, #f5e6c8 0%, #e8d5b7 25%, #dcc8a0 50%, #e8d5b7 75%, #f0dfc0 100%), repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(0,0,0,0.04) 28px, rgba(0,0,0,0.04) 29px)',
      color: '#2C3E50', padding: '8px', minHeight: '200px',
    }}>
      {/* Moon decoration */}
      <motion.div variants={unrollVariants} style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
        <img src="/images/moon.png" alt="" draggable="false" style={{ width: '60px', height: '60px', objectFit: 'contain', imageRendering: 'pixelated', userSelect: 'none', WebkitUserDrag: 'none' }} />
      </motion.div>

      <motion.h2 variants={unrollVariants} style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.85rem', textAlign: 'center', color: '#2C3E50', marginBottom: '4px', lineHeight: 1.6 }}>{profile.name}</motion.h2>
      <motion.p variants={unrollVariants} style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.55rem', textAlign: 'center', color: '#D4A017', marginBottom: '16px', lineHeight: 1.6 }}>{profile.title}</motion.p>
      <motion.p variants={unrollVariants} style={{ fontFamily: '"VT323", monospace', fontSize: '1.15rem', lineHeight: 1.5, textAlign: 'center', color: '#2C3E50', marginBottom: '24px', padding: '0 8px', borderBottom: '2px dashed rgba(164,82,45,0.3)', paddingBottom: '16px' }}>{profile.bio}</motion.p>

      {/* Formation */}
      <motion.h3 variants={unrollVariants} style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.6rem', color: '#A0522D', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#D4A017' }}>{'>'}</span> {t('cvShop.formation')}
      </motion.h3>

      <div style={{ position: 'relative', paddingLeft: '24px', marginBottom: '24px' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '5px', top: '6px', bottom: '6px', width: '2px', backgroundImage: 'repeating-linear-gradient(0deg, #A0522D 0px, #A0522D 6px, transparent 6px, transparent 12px)' }} />
        {education.map((edu, index) => (
          <motion.div key={index} variants={unrollVariants} style={{ position: 'relative', marginBottom: index < education.length - 1 ? '20px' : '0', paddingBottom: index < education.length - 1 ? '20px' : '0', borderBottom: index < education.length - 1 ? '1px dashed rgba(164,82,45,0.2)' : 'none' }}>
            <div style={{ position: 'absolute', left: '-24px', top: '4px' }}><TimelineDot /></div>
            <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.5rem', color: '#2C3E50', marginBottom: '4px', lineHeight: 1.6 }}>{edu.degree}</div>
            <div style={{ fontFamily: '"VT323", monospace', fontSize: '1.05rem', color: '#C67B4B', marginBottom: '4px', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{edu.school}</span>
              <span style={{ backgroundColor: 'rgba(160,82,45,0.15)', padding: '1px 8px', fontSize: '0.95rem', color: '#A0522D' }}>{edu.year}</span>
            </div>
            <div style={{ fontFamily: '"VT323", monospace', fontSize: '1rem', color: '#2C3E50', opacity: 0.7 }}>{edu.location}</div>
          </motion.div>
        ))}
      </div>

      {/* Parcours */}
      <motion.h3 variants={unrollVariants} style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.6rem', color: '#A0522D', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ color: '#D4A017' }}>{'>'}</span> {t('cvShop.parcours')}
      </motion.h3>

      <div style={{ position: 'relative', paddingLeft: '24px' }}>
        <div aria-hidden="true" style={{ position: 'absolute', left: '5px', top: '6px', bottom: '6px', width: '2px', backgroundImage: 'repeating-linear-gradient(0deg, #A0522D 0px, #A0522D 6px, transparent 6px, transparent 12px)' }} />
        {experience.map((exp, index) => (
          <motion.div key={index} variants={unrollVariants} style={{ position: 'relative', marginBottom: index < experience.length - 1 ? '20px' : '0' }}>
            <div style={{ position: 'absolute', left: '-24px', top: '4px' }}><TimelineDot /></div>
            <div style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.5rem', color: '#2C3E50', marginBottom: '4px', lineHeight: 1.6 }}>{exp.role}</div>
            <div style={{ fontFamily: '"VT323", monospace', fontSize: '1.05rem', color: '#C67B4B', display: 'flex', flexWrap: 'wrap', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold' }}>{exp.company}</span>
              <span style={{ backgroundColor: 'rgba(160,82,45,0.15)', padding: '1px 8px', fontSize: '0.95rem', color: '#A0522D' }}>{exp.period}</span>
            </div>
            <div style={{ fontFamily: '"VT323", monospace', fontSize: '1.05rem', color: '#2C3E50', lineHeight: 1.4, opacity: 0.85, marginTop: '4px' }}>{exp.description}</div>
          </motion.div>
        ))}
      </div>

      {/* CV Download */}
      <motion.div variants={unrollVariants} style={{ marginTop: '28px', textAlign: 'center' }}>
        <a href={t('cvShop.cvFile')} download style={{
          display: 'inline-block', fontFamily: '"Press Start 2P", monospace', fontSize: '0.55rem', lineHeight: 1.6, color: '#E8D5B7', backgroundColor: '#A0522D', border: '4px solid #D4A017', padding: '14px 28px', textDecoration: 'none', cursor: 'pointer',
          boxShadow: '4px 4px 0 0 #6B3410, 6px 6px 0 0 rgba(0,0,0,0.15)', transform: 'translate(-2px,-2px)', transition: 'all 0.1s ease',
        }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#8B4513'; e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '2px 2px 0 0 #6B3410'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#A0522D'; e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '4px 4px 0 0 #6B3410, 6px 6px 0 0 rgba(0,0,0,0.15)'; }}
        >
          <span aria-hidden="true" style={{ marginRight: '10px', fontSize: '0.7rem' }}>{'['}<span style={{ color: '#D4A017' }}>v</span>{']'}</span>
          {t('cvShop.download')}
        </a>
      </motion.div>

      <motion.div variants={unrollVariants} style={{ marginTop: '20px', paddingTop: '12px', borderTop: '2px dashed rgba(164,82,45,0.3)', textAlign: 'center', fontFamily: '"VT323", monospace', fontSize: '1rem', color: '#A0522D' }}>
        <span aria-hidden="true" style={{ marginRight: '6px' }}>&#9906;</span>{profile.location}
      </motion.div>
    </motion.div>
  );
}
