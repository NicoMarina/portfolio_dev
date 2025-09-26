"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import AboutMe from "@/components/AboutMe";
import Navbar from "@/components/Navbar";

export default function UnderConstruction() {
  const { lang, translations } = useLanguage();
  const aboutRef = useRef();

  // Function to fetch AboutMe content in the new language
  const fetchAboutMe = (lang) => aboutRef.current.fetchContent(lang);

  return (
    <main
      className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 text-white"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: "url('/background-2.png')" }
      }
      ></div>

      {/* Navbar */}
      <Navbar fetchAboutMe={fetchAboutMe} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center w-full max-w-5xl space-y-6">
        {/* Under Construction Notice */}
        <h1 className="relative text-3xl md:text-5xl font-extrabold mb-6 text-white text-center">
          <span className="relative z-10"> {translations.underConstruction} </span>
          <span className="absolute inset-0 bg-[#358fab] rounded-lg transform -skew-y-2 opacity-70 z-0"></span>
        </h1>

        {/* About Me section */}
        <div className="w-full py-8 px-4 animate-fadeIn">
          <AboutMe ref={aboutRef} />
        </div>

        {/* Description */}
        <p className="max-w-xl mx-auto font-bold animate-fadeIn">
          {translations.description}
        </p>

        {/* GitHub Button */}
        <a
          href="https://github.com/NicoMarina/portfolio_dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fadeIn"
          style={{
            backgroundColor: "#358FAB",
            color: "#ffffff",
          }}
        >
          {translations.viewRepo}
        </a>
      </div>
    </main>
  );
}
