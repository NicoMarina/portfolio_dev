"use client";

import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSelector({ fetchAboutMe }) {
  const { lang, changeLanguage, isLoading } = useLanguage();

  const languages = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
    { code: "ca", label: "CA" },
  ];

  return (
    <div className="flex gap-2">
      {languages.map((l) => (
        <button
          key={l.code}
          onClick={() => !isLoading && changeLanguage(l.code, fetchAboutMe)}
          disabled={isLoading}
          className={`lang-btn ${lang === l.code ? "active" : "inactive"}`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
