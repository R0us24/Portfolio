import { motion } from 'framer-motion';
import { Lantern } from '../Souk/Decorations';
import { useLanguage } from '../../i18n/LanguageContext';
import { fr } from '../../i18n/fr';
import { en } from '../../i18n/en';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const shelfVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const SKILL_COLORS = {
  Java: '#E76F00', TypeScript: '#3178C6', Python: '#FFD43B', 'C++': '#00599C', JavaScript: '#F7DF1E',
  'HTML/CSS': '#E34F26', C: '#555555', React: '#61DAFB', 'Next.js': '#EEEEEE', Streamlit: '#FF4B4B',
  'Tailwind CSS': '#06B6D4', PixiJS: '#E91E63', Git: '#F05032', 'VS Code': '#007ACC', IntelliJ: '#FE315D',
  Quartus: '#2E86C1', Excel: '#217346', Vercel: '#EEEEEE', Figma: '#A259FF', Photoshop: '#31A8FF',
  'Adobe Premiere Pro': '#9999FF', 'After Effects': '#9999FF',
  'Claude Code': '#D4A017', Cursor: '#FFD700', 'GitHub Copilot': '#EEEEEE', n8n: '#FF6D5A',
  LangChain: '#1ABC9C', RAG: '#2E86C1',
  Francais: '#0055A4', Anglais: '#C0392B', Arabe: '#006233',
  French: '#0055A4', English: '#C0392B', Arabic: '#006233',
};

const CATEGORY_ICONS = {
  languages: (<span aria-hidden="true" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.5rem', color: '#2E86C1' }}>{'<>'}</span>),
  frameworks: (<span aria-hidden="true" style={{ display: 'inline-block', width: '14px', height: '14px', position: 'relative' }}><span style={{ display: 'block', width: '10px', height: '10px', border: '3px solid #1ABC9C', borderRadius: '50%', position: 'absolute', top: '2px', left: '2px' }} /></span>),
  tools: (<span aria-hidden="true" style={{ display: 'inline-block', width: '14px', height: '14px', position: 'relative' }}><span style={{ display: 'block', width: '4px', height: '10px', backgroundColor: '#8E44AD', position: 'absolute', bottom: '0px', left: '5px', transform: 'rotate(-30deg)' }} /></span>),
  aiTools: (<span aria-hidden="true" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.45rem', color: '#E67E22' }}>AI</span>),
  aiMl: (<span aria-hidden="true" style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.45rem', color: '#9B59B6' }}>ML</span>),
  libraries: (<span aria-hidden="true" style={{ display: 'inline-block', width: '14px', height: '14px', position: 'relative' }}><span style={{ display: 'block', width: '10px', height: '12px', backgroundColor: '#E67E22', position: 'absolute', top: '1px', left: '2px' }} /></span>),
  design: (<span aria-hidden="true" style={{ display: 'inline-block', width: '14px', height: '14px', position: 'relative' }}><span style={{ display: 'block', width: '12px', height: '10px', backgroundColor: '#A259FF', borderRadius: '6px 6px 2px 2px', position: 'absolute', top: '0px', left: '1px' }} /></span>),
  spokenLanguages: (<span aria-hidden="true" style={{ display: 'inline-block', width: '14px', height: '14px', position: 'relative' }}><span style={{ display: 'block', width: '12px', height: '8px', backgroundColor: '#D4A017', borderRadius: '4px', position: 'absolute', top: '0px', left: '1px' }} /></span>),
};

const CATEGORY_COLORS = {
  languages: '#2E86C1', frameworks: '#1ABC9C', tools: '#8E44AD', aiTools: '#E67E22',
  aiMl: '#9B59B6', libraries: '#E67E22', design: '#A259FF', spokenLanguages: '#D4A017',
};

const CATEGORY_KEYS = ['languages', 'frameworks', 'aiMl', 'aiTools', 'tools', 'libraries', 'design', 'spokenLanguages'];

function SkillChip({ name, categoryColor }) {
  const dotColor = SKILL_COLORS[name] || categoryColor;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 10px', backgroundColor: 'rgba(26,26,46,0.6)', border: '2px solid rgba(232,213,183,0.15)', fontFamily: '"VT323", monospace', fontSize: '1.05rem', color: '#E8D5B7', whiteSpace: 'nowrap', transition: 'border-color 0.2s, background-color 0.2s' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = dotColor; e.currentTarget.style.backgroundColor = `${dotColor}15`; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(232,213,183,0.15)'; e.currentTarget.style.backgroundColor = 'rgba(26,26,46,0.6)'; }}>
      <span aria-hidden="true" style={{ display: 'inline-block', width: '8px', height: '8px', backgroundColor: dotColor, flexShrink: 0, boxShadow: `0 0 4px ${dotColor}44` }} />
      {name}
    </span>
  );
}

function BookshelfSection({ categoryKey, label, skills }) {
  const color = CATEGORY_COLORS[categoryKey] || '#2E86C1';
  const icon = CATEGORY_ICONS[categoryKey];
  if (!skills || skills.length === 0) return null;

  return (
    <motion.div variants={shelfVariants} style={{ marginBottom: '20px', padding: '12px', position: 'relative', backgroundColor: 'rgba(26,26,46,0.5)', borderLeft: `4px solid ${color}`, borderBottom: '3px solid #5C3A1E' }}>
      <div aria-hidden="true" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: 'linear-gradient(90deg, #8B6914, #A0762C, #8B6914)' }} />
      <h4 style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.5rem', color, marginBottom: '12px', lineHeight: 1.6, display: 'flex', alignItems: 'center', gap: '8px' }}>
        {icon} {label}
      </h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {skills.map((skill) => <SkillChip key={skill.name} name={skill.name} categoryColor={color} />)}
      </div>
    </motion.div>
  );
}

export default function SkillsShop() {
  const { t, lang } = useLanguage();

  // Get skills from i18n
  const getSkills = (key) => {
    const data = lang === 'fr' ? fr : en;
    return data.skills?.[key] || [];
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" style={{ padding: '4px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '16px' }}>
        <Lantern pixelSize={2} style={{ animationDelay: '0s' }} />
        <motion.h3 variants={shelfVariants} style={{ fontFamily: '"Press Start 2P", monospace', fontSize: '0.6rem', color: '#FFD700', textAlign: 'center', lineHeight: 1.6, margin: 0 }}>
          {t('skillsShop.title')}
        </motion.h3>
        <Lantern pixelSize={2} style={{ animationDelay: '1s' }} />
      </div>

      {CATEGORY_KEYS.map((key) => (
        <BookshelfSection
          key={key}
          categoryKey={key}
          label={t(`skillsShop.categories.${key}`)}
          skills={getSkills(key)}
        />
      ))}
    </motion.div>
  );
}
