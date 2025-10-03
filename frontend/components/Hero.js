"use client";

import TechBadges from "./TechBadges";
import { FaLinkedin } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
    const { lang, translations } = useLanguage();

  return (
    <section
      id="hero">
        <h2 className="text-white text-center md:text-xl mb-10 select-none">
            {translations.welcome}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-700">
                {translations.webPortfolio}
            </span>{" "}
            {translations.of}
        </h2>

        {/* Nombre */}
        <h1 className="text-white text-6xl xs:text-8xl font-extrabold leading-none sm:whitespace-nowrap tracking-tight md:text-7xl lg:text-8xl select-none">
            Marina
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-700">
                {" "}Nicolau
            </span>
        </h1>

        {/* Tagline */}
        <h2 className="text-lg md:text-2xl text-blue-300 font-medium mb-4">
            {translations.rol}
        </h2>

        {/* Descripción */}
        <p className="text-gray-400 max-w-2xl text-base md:text-lg leading-relaxed mb-6">
            {translations.heroText}
        </p>
        <div className="text-gray-300 space-y-4">

            <a
            href="https://www.linkedin.com/in/marina-nicolau-valls-a43422146/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-blue-600 hover:bg-blue-700 transition shadow-lg"
            >
            <FaLinkedin className="text-xl" />
            {translations.linkedin}
            </a>
        </div>

        {/* Carrusel de badges */}
        <div className="marquee mt-12">
            <div className="marquee-content">
            <TechBadges />
            </div>
        </div>
    </section>
  );
}
