import { createContext, useContext, useState, useCallback } from 'react';
import { ru } from '../i18n/ru';
import { en } from '../i18n/en';

const translations = { ru, en };
const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('toma-lang') || 'ru');

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'ru' ? 'en' : 'ru';
      localStorage.setItem('toma-lang', next);
      return next;
    });
  }, []);

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
