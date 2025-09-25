"use client";

import { useLanguage } from "../context/LanguageContext";

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

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
          onClick={() => setLang(l.code)}
          className={`px-3 py-1 rounded-lg text-sm font-medium transition ${
            lang === l.code
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
