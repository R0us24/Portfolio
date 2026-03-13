import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { useLanguage } from '../../i18n/LanguageContext';

/* ===== Le Pigeon Voyageur -- Messenger Pigeon Style ===== */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const fieldVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/* Inject pigeon fly animation keyframes */
const PIGEON_STYLE_ID = 'contact-pigeon-styles';

function injectPigeonStyles() {
  if (typeof document === 'undefined') return;
  if (document.getElementById(PIGEON_STYLE_ID)) return;

  const style = document.createElement('style');
  style.id = PIGEON_STYLE_ID;
  style.textContent = `
    @keyframes pigeonFly {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 1;
      }
      30% {
        transform: translate(40px, -50px) rotate(-10deg);
        opacity: 1;
      }
      60% {
        transform: translate(100px, -120px) rotate(-5deg);
        opacity: 0.8;
      }
      100% {
        transform: translate(200px, -250px) rotate(-15deg);
        opacity: 0;
      }
    }

    @keyframes pigeonWingFlap {
      0%, 100% { transform: scaleY(1); }
      50% { transform: scaleY(0.6); }
    }
  `;
  document.head.appendChild(style);
}

/* Small pixel pigeon icon (CSS art) */
function PigeonIcon({ animate = false }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: 'inline-block',
        position: 'relative',
        width: '24px',
        height: '20px',
        animation: animate ? 'pigeonFly 1.2s ease-in forwards' : undefined,
      }}
    >
      {/* Body */}
      <span
        style={{
          position: 'absolute',
          bottom: '2px',
          left: '4px',
          width: '14px',
          height: '10px',
          backgroundColor: '#C4A882',
          borderRadius: '50% 50% 40% 40%',
        }}
      />
      {/* Head */}
      <span
        style={{
          position: 'absolute',
          top: '4px',
          right: '2px',
          width: '8px',
          height: '8px',
          backgroundColor: '#9B8B6E',
          borderRadius: '50%',
        }}
      />
      {/* Beak */}
      <span
        style={{
          position: 'absolute',
          top: '7px',
          right: '0px',
          width: '4px',
          height: '3px',
          backgroundColor: '#D4A017',
        }}
      />
      {/* Wing */}
      <span
        style={{
          position: 'absolute',
          top: '0px',
          left: '6px',
          width: '10px',
          height: '8px',
          backgroundColor: '#E8D5B7',
          borderRadius: '50% 50% 0 0',
          transformOrigin: 'bottom center',
          animation: animate ? 'pigeonWingFlap 0.3s ease-in-out infinite' : undefined,
        }}
      />
    </span>
  );
}

/* Pixel-styled input field */
function PixelInput({ label, name, type = 'text', value, onChange, error, required, isTextarea = false }) {
  const inputStyle = {
    fontFamily: '"VT323", monospace',
    fontSize: '1.1rem',
    color: '#E8D5B7',
    backgroundColor: '#1A1A2E',
    border: '4px solid #2C3E50',
    padding: '8px 12px',
    width: '100%',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    borderRadius: 0,
    resize: isTextarea ? 'vertical' : undefined,
    minHeight: isTextarea ? '100px' : undefined,
  };

  const handleFocus = (e) => {
    e.currentTarget.style.borderColor = '#D4A017';
    e.currentTarget.style.boxShadow = 'inset 0 0 10px rgba(212, 160, 23, 0.1)';
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderColor = error ? '#C0392B' : '#2C3E50';
    e.currentTarget.style.boxShadow = 'none';
  };

  return (
    <motion.div variants={fieldVariants} style={{ marginBottom: '14px' }}>
      <label
        htmlFor={`contact-${name}`}
        style={{
          display: 'block',
          fontFamily: '"Press Start 2P", monospace',
          fontSize: '0.45rem',
          color: '#D4A017',
          marginBottom: '6px',
          lineHeight: 1.6,
        }}
      >
        {label} {required && <span style={{ color: '#C0392B' }}>*</span>}
      </label>

      {isTextarea ? (
        <textarea
          id={`contact-${name}`}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          style={{ ...inputStyle, borderColor: error ? '#C0392B' : '#2C3E50' }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      ) : (
        <input
          id={`contact-${name}`}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          style={{ ...inputStyle, borderColor: error ? '#C0392B' : '#2C3E50' }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${name}-error` : undefined}
        />
      )}

      {error && (
        <div
          id={`${name}-error`}
          role="alert"
          style={{
            fontFamily: '"VT323", monospace',
            fontSize: '0.95rem',
            color: '#C0392B',
            marginTop: '4px',
          }}
        >
          {error}
        </div>
      )}
    </motion.div>
  );
}

export default function ContactShop() {
  injectPigeonStyles();

  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isFlying, setIsFlying] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contactShop.errors.name');
    if (!formData.email.trim()) {
      newErrors.email = t('contactShop.errors.email');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('contactShop.errors.emailInvalid');
    }
    if (!formData.subject.trim()) newErrors.subject = t('contactShop.errors.subject');
    if (!formData.message.trim()) newErrors.message = t('contactShop.errors.message');
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsFlying(true);

    emailjs.send(
      'service_yi7ecp9',
      'template_qg03mmm',
      {
        name: formData.name,
        email: formData.email,
        title: formData.subject,
        message: formData.message,
      },
      'Gd3mCyno_vhb9lGHG'
    ).then(() => {
      setIsFlying(false);
      setIsSubmitted(true);
    }).catch(() => {
      setIsFlying(false);
      setErrors({ message: t('contactShop.errors.sendFailed') || 'Failed to send message. Please try again.' });
    });
  };

  const handleReset = () => {
    setFormData({ name: '', email: '', subject: '', message: '' });
    setErrors({});
    setIsSubmitted(false);
  };

  /* Success state */
  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        style={{
          textAlign: 'center',
          padding: '40px 20px',
        }}
      >
        <div
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '0.65rem',
            color: '#1ABC9C',
            marginBottom: '16px',
            lineHeight: 1.8,
          }}
        >
          {t('contactShop.sent')}
        </div>
        <div
          style={{
            fontFamily: '"VT323", monospace',
            fontSize: '1.15rem',
            color: '#E8D5B7',
            marginBottom: '24px',
            lineHeight: 1.5,
          }}
        >
          {t('contactShop.sentDesc')}
        </div>

        <div
          aria-hidden="true"
          style={{
            marginBottom: '20px',
          }}
        >
          <img
            src="/images/travel.png"
            alt=""
            style={{
              width: '64px',
              height: '64px',
              imageRendering: 'pixelated',
            }}
          />
        </div>

        <button
          onClick={handleReset}
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '0.5rem',
            color: '#E8D5B7',
            backgroundColor: '#1E6091',
            border: '4px solid #17507A',
            padding: '10px 20px',
            cursor: 'pointer',
            boxShadow: '3px 3px 0 0 #0E3450',
            transition: 'all 0.1s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#17507A';
            e.currentTarget.style.transform = 'translate(1px, 1px)';
            e.currentTarget.style.boxShadow = '1px 1px 0 0 #0E3450';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#1E6091';
            e.currentTarget.style.transform = 'translate(0, 0)';
            e.currentTarget.style.boxShadow = '3px 3px 0 0 #0E3450';
          }}
        >
          {t('contactShop.newMessage')}
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ padding: '4px 0' }}
    >
      {/* Title */}
      <motion.div
        variants={fieldVariants}
        style={{
          textAlign: 'center',
          marginBottom: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <img
            src="/images/travel.png"
            alt=""
            draggable="false"
            style={{
              width: '40px',
              height: '40px',
              objectFit: 'contain',
              imageRendering: 'pixelated',
              userSelect: 'none',
              WebkitUserDrag: 'none',
            }}
          />
          <h3
            style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '0.55rem',
              color: '#D4A017',
              lineHeight: 1.6,
            }}
          >
            {t('contactShop.title')}
          </h3>
        </div>
        <p
          style={{
            fontFamily: '"VT323", monospace',
            fontSize: '1rem',
            color: '#C4A882',
            marginTop: '6px',
          }}
        >
          {t('contactShop.subtitle')}
        </p>
      </motion.div>

      {/* Contact form */}
      <form ref={formRef} onSubmit={handleSubmit} noValidate>
        <PixelInput
          label={t('contactShop.name')}
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />

        <PixelInput
          label={t('contactShop.email')}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />

        <PixelInput
          label={t('contactShop.subject')}
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={errors.subject}
          required
        />

        <PixelInput
          label={t('contactShop.message')}
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={errors.message}
          required
          isTextarea
        />

        {/* Submit button */}
        <motion.div variants={fieldVariants} style={{ textAlign: 'center', marginTop: '8px' }}>
          <button
            type="submit"
            disabled={isFlying}
            style={{
              fontFamily: '"Press Start 2P", monospace',
              fontSize: '0.5rem',
              color: '#1A1A2E',
              backgroundColor: isFlying ? '#B8890F' : '#D4A017',
              border: '4px solid #B8890F',
              padding: '12px 24px',
              cursor: isFlying ? 'wait' : 'pointer',
              boxShadow: isFlying
                ? 'none'
                : '4px 4px 0 0 #8A650A, 6px 6px 0 0 rgba(0,0,0,0.15)',
              transform: isFlying ? 'translate(2px, 2px)' : 'translate(-2px, -2px)',
              transition: 'all 0.1s ease',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              lineHeight: 1.6,
              position: 'relative',
              overflow: 'visible',
            }}
            onMouseEnter={(e) => {
              if (isFlying) return;
              e.currentTarget.style.backgroundColor = '#B8890F';
              e.currentTarget.style.transform = 'translate(0, 0)';
              e.currentTarget.style.boxShadow = '1px 1px 0 0 #8A650A';
            }}
            onMouseLeave={(e) => {
              if (isFlying) return;
              e.currentTarget.style.backgroundColor = '#D4A017';
              e.currentTarget.style.transform = 'translate(-2px, -2px)';
              e.currentTarget.style.boxShadow = '4px 4px 0 0 #8A650A, 6px 6px 0 0 rgba(0,0,0,0.15)';
            }}
          >
            {/* Flying pigeon animation on send */}
            {isFlying && (
              <span
                style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                }}
              >
                <PigeonIcon animate />
              </span>
            )}
            {isFlying ? t('contactShop.sending') : t('contactShop.send')}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
}
