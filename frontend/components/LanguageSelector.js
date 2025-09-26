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
          className={`px-4 py-2 md:px-3 md:py-1 rounded-lg text-sm font-semibold transition-all duration-300 transform
            ${
              lang === l.code
                ? "bg-[#358FAB] text-white scale-105 shadow-md"
                : "bg-white/70 text-gray-800 hover:bg-[#358FAB]/80 hover:text-white"
            }
            ${isLoading ? "opacity-50 cursor-not-allowed" : ""}
          `}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
