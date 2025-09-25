"use client";

import { useLanguage } from "@/context/LanguageContext";
import AboutMe from "@/components/AboutMe";

export default function UnderConstruction() {
  const { lang, translations } = useLanguage();

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Under Construction Notice */}
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">{translations.underConstruction}</h1>
        {/* About Me section */}
        <div className="py-8 px-4">
          <AboutMe lang={lang} />
        </div>
        <p className="text-gray-600 max-w-xl">
          {translations.description}
        </p>
        <a
          href="https://github.com/NicoMarina/portfolio_dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-300 mb-6"
        >
          {translations.viewRepo}
        </a>

      </div>

    </main>
  );
}