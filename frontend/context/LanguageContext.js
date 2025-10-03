"use client";

import { createContext, useContext, useState } from "react";
import en from "@/locales/en";
import es from "@/locales/es";
import ca from "@/locales/ca";

const translationsMap = { en, es, ca };
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");
  const [isLoading, setIsLoading] = useState(false);

  // Change language only after AboutMe content is loaded
  const changeLanguage = async (newLang, fetchAboutMe) => {
    if (isLoading) return; // prevent multiple clicks
    setIsLoading(true);
    try {
      // await fetchAboutMe(newLang); // fetch AboutMe content first
      setLang(newLang);            // update global language only after fetch
    } catch (err) {
      console.error("Error loading language content:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LanguageContext.Provider
      value={{ lang, translations: translationsMap[lang], changeLanguage, isLoading }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
