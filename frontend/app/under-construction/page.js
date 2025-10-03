"use client";

import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { FaGithub } from "react-icons/fa";

export default function UnderConstruction() {
  const { lang, translations } = useLanguage();

  return (
    <main className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 text-white px-6 md:px-12">
    {/* Navbar */}
    <Navbar />

    {/* Contenido principal centrado */}
    <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-6xl w-full mx-auto">
      
      {/* Under Construction Notice */}
      <h1 className="relative text-2xl sm:text-4xl md:text-5xl font-extrabold text-white text-center mb-8">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-700 rounded-lg transform -skew-y-2 opacity-70 z-0"></span>
        <span className="relative z-10 px-4 py-2 inline-block bg-gray-900/20 backdrop-blur-sm rounded-lg">
          {translations.underConstruction}
        </span>
      </h1>

      {/* Hero */}
      <div className="w-full max-w-4xl -mt-2 mx-auto">
        <Hero />
      </div>

      {/* Description */}
      <p className="max-w-xl mx-auto font-semibold text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed mb-8 animate-fadeIn mt-20">
        {translations.description}
      </p>

      {/* GitHub Button */}
      <a
        href="https://github.com/NicoMarina/portfolio_dev"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg transform transition-all duration-300"
      >
        <FaGithub className="text-xl" />
        {translations.viewRepo}
      </a>

    </div>
  </main>
  );
}
