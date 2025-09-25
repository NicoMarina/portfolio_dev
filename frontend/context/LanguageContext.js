"use client";

import { createContext, useContext, useState } from "react";
import en from "../locales/en";
import es from "../locales/es";
import ca from "../locales/ca";

const translationsMap = { en, es, ca };

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  return (
    <LanguageContext.Provider value={{ lang, setLang, translations: translationsMap[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to consume the context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
