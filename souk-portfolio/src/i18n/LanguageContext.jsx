import { createContext, useContext, useState, useCallback } from 'react';
import { fr } from './fr';
import { en } from './en';

const translations = { fr, en };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === 'fr' ? 'en' : 'fr'));
  }, []);

  const t = useCallback(
    (key) => {
      const keys = key.split('.');
      let val = translations[lang];
      for (const k of keys) {
        val = val?.[k];
      }
      return val ?? key;
    },
    [lang]
  );

  // For arrays
  const tArray = useCallback(
    (key) => {
      const keys = key.split('.');
      let val = translations[lang];
      for (const k of keys) {
        val = val?.[k];
      }
      return Array.isArray(val) ? val : [];
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');
  return ctx;
}
