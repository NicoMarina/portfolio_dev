"use client";

import { useState, useEffect } from "react";
import LanguageSelector from "./LanguageSelector";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar({ fetchAboutMe }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { translations } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { id: "home", label: translations.menu.home },
    { id: "about", label: translations.menu.about },
    { id: "projects", label: translations.menu.projects },
    // { id: "contact", label: translations.menu.contact },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <div className="font-extrabold text-xl">
          {/* Logo */}
          <a
            href="/"
            className="text-white cursor-pointer"
          >
            Marina
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-700">
                  {" "}Nicolau
              </span>
          </a>
        </div>
        {/* Desktop menu */}
        <div className="menu hidden md:flex space-x-8 items-center">
          {menuItems.map((item) => (
            <a key={item.id} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
          <LanguageSelector fetchAboutMe={fetchAboutMe} />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <LanguageSelector fetchAboutMe={fetchAboutMe} />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <span className="sr-only">Open menu</span>
            <div
              className={`w-6 h-0.5 bg-gray-800 mb-1 transition-all ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-gray-800 mb-1 transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            />
            <div
              className={`w-6 h-0.5 bg-gray-800 transition-all ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          {menuItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
