import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';

/* ===== La Cuisine -- Cook / Kitchen Style ===== */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

/* Inline pixel link button -- wooden spoon style */
function RecipeLink({ href, children, variant = 'primary' }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const colors = {
    primary: { bg: '#C67B4B', bgHover: '#B5693D', border: '#8B5E3C', shadow: '#6B4226', text: '#FFF8F0' },
    secondary: { bg: '#2E86C1', bgHover: '#2471A3', border: '#1A5276', shadow: '#0E3450', text: '#FFF8F0' },
  };

  const c = colors[variant] || colors.primary;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setIsPressed(false); }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      style={{
        fontFamily: '"Press Start 2P", monospace',
        fontSize: '0.45rem',
        lineHeight: 1.6,
        padding: '6px 12px',
        color: c.text,
        backgroundColor: isHovered ? c.bgHover : c.bg,
        border: `3px solid ${c.border}`,
        boxShadow: isPressed
          ? 'none'
          : isHovered
            ? `0px 0px 0 0 ${c.shadow}, 1px 1px 0 0 rgba(0,0,0,0.2)`
            : `3px 3px 0 0 ${c.shadow}, 4px 4px 0 0 rgba(0,0,0,0.15)`,
        transform: isPressed
          ? 'translate(2px, 2px)'
          : isHovered
            ? 'translate(0, 0)'
            : 'translate(-2px, -2px)',
        transition: 'all 0.1s ease',
        textDecoration: 'none',
        display: 'inline-block',
        imageRendering: 'pixelated',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      {children}
    </a>
  );
}

/* Recipe card for each project */
function RecipeCard({ project }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardColor = project.color || '#C67B4B';

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `linear-gradient(
          160deg,
          #FFF8F0 0%,
          #F5E6D3 30%,
          #EDD9C0 60%,
          #F5E6D3 100%
        )`,
        border: `4px solid ${isHovered ? cardColor : '#C4A882'}`,
        padding: '16px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
        boxShadow: isHovered
          ? `0 0 20px ${cardColor}33, 0 0 40px ${cardColor}15, 4px 4px 0 rgba(0,0,0,0.2)`
          : '4px 4px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
      }}
    >
      {/* Parchment texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: `repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 6px,
            rgba(139, 94, 60, 0.03) 6px,
            rgba(139, 94, 60, 0.03) 7px
          )`,
          pointerEvents: 'none',
        }}
      />

      {/* Title -- recipe name */}
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px', position: 'relative', zIndex: 1 }}>
        {/* Cooking icon */}
        <div
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: '20px',
            height: '20px',
            position: 'relative',
            marginTop: '2px',
          }}
        >
          {/* Pot body */}
          <div style={{
            position: 'absolute',
            bottom: '0',
            left: '2px',
            width: '16px',
            height: '10px',
            backgroundColor: '#6B4226',
            borderRadius: '0 0 4px 4px',
            border: '2px solid #4A2E18',
          }} />
          {/* Pot rim */}
          <div style={{
            position: 'absolute',
            bottom: '9px',
            left: '0px',
            width: '20px',
            height: '3px',
            backgroundColor: '#8B5E3C',
            border: '1px solid #4A2E18',
          }} />
          {/* Steam */}
          <div style={{
            position: 'absolute',
            top: '0px',
            left: '6px',
            width: '2px',
            height: '6px',
            backgroundColor: cardColor,
            opacity: isHovered ? 0.6 : 0.3,
            borderRadius: '2px',
            transition: 'opacity 0.3s ease',
          }} />
          <div style={{
            position: 'absolute',
            top: '1px',
            left: '11px',
            width: '2px',
            height: '5px',
            backgroundColor: cardColor,
            opacity: isHovered ? 0.5 : 0.2,
            borderRadius: '2px',
            transition: 'opacity 0.3s ease',
          }} />
        </div>

        <h4
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '0.55rem',
            color: isHovered ? cardColor : '#4A2E18',
            lineHeight: 1.6,
            transition: 'color 0.3s ease',
          }}
        >
          {project.title}
        </h4>
      </div>

      {/* Period */}
      <div
        style={{
          fontFamily: '"VT323", monospace',
          fontSize: '0.9rem',
          color: '#8B7355',
          marginBottom: '8px',
          paddingLeft: '28px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {project.period}
      </div>

      {/* Description -- recipe instructions */}
      <p
        style={{
          fontFamily: '"VT323", monospace',
          fontSize: '1.05rem',
          color: '#5D4037',
          lineHeight: 1.4,
          marginBottom: '12px',
          position: 'relative',
          zIndex: 1,
          borderLeft: `3px solid ${cardColor}44`,
          paddingLeft: '10px',
        }}
      >
        {project.description}
      </p>

      {/* Tech tags -- ingredient labels */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          marginBottom: '14px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {project.tech.map((tech) => (
          <span
            key={tech}
            style={{
              fontFamily: '"VT323", monospace',
              fontSize: '0.9rem',
              color: '#4A2E18',
              backgroundColor: 'rgba(196, 168, 130, 0.35)',
              border: '2px solid #C4A882',
              padding: '1px 8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 1px 1px 0 rgba(0,0,0,0.08)',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: '6px',
                height: '6px',
                backgroundColor: cardColor,
                borderRadius: '50%',
                opacity: 0.7,
              }}
            />
            {tech}
          </span>
        ))}
      </div>

      {/* Action links */}
      <div
        style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {project.github && (
          <RecipeLink href={project.github} variant="secondary">
            GitHub
          </RecipeLink>
        )}
        {project.demo && (
          <RecipeLink href={project.demo} variant="primary">
            Demo
          </RecipeLink>
        )}
      </div>

      {/* Warm glow bar at bottom on hover */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: isHovered ? '3px' : '0px',
          background: `linear-gradient(90deg, transparent, ${cardColor}, #FFD700, ${cardColor}, transparent)`,
          transition: 'height 0.3s ease',
        }}
      />
    </motion.div>
  );
}

export default function ProjectsShop() {
  const { t, tArray } = useLanguage();
  const projects = tArray('projects');

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ padding: '4px 0' }}
    >
      {/* Section title */}
      <motion.h3
        variants={cardVariants}
        style={{
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.6rem',
          color: '#FFD700',
          textAlign: 'center',
          marginBottom: '8px',
          lineHeight: 1.6,
          textShadow: '0 0 8px rgba(255, 215, 0, 0.3)',
        }}
      >
        {t('projectsShop.title')}
      </motion.h3>

      {/* Subtitle */}
      <motion.p
        variants={cardVariants}
        style={{
          fontFamily: '"VT323", monospace',
          fontSize: '1.05rem',
          color: '#C4A882',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        {t('projectsShop.subtitle')}
      </motion.p>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
        <img
          src="/images/atay.png"
          alt=""
          aria-hidden="true"
          style={{
            width: '50px',
            height: '50px',
            objectFit: 'contain',
            imageRendering: 'pixelated',
          }}
        />
      </div>

      {/* Projects grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px',
        }}
      >
        {projects.map((project) => (
          <RecipeCard key={project.id} project={project} />
        ))}
      </div>

      {/* Kitchen bottom decoration -- spice line */}
      <motion.div
        variants={cardVariants}
        aria-hidden="true"
        style={{
          marginTop: '16px',
          height: '4px',
          background: `linear-gradient(
            90deg,
            transparent 0%,
            #C67B4B 15%,
            #FFD700 35%,
            #E67E22 50%,
            #FFD700 65%,
            #C67B4B 85%,
            transparent 100%
          )`,
          opacity: 0.5,
        }}
      />
    </motion.div>
  );
}
