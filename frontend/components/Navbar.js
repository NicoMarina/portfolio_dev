"use client";

import Link from "next/link";
import LanguageSelector from "./LanguageSelector";

export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-gray-800">
        Marina Nicolau
      </Link>

      {/* <div className="flex space-x-8">
        <a href="#hero" className="hover:text-blue-600 transition-colors duration-300">Home</a>
        <a href="#about" className="hover:text-blue-600 transition-colors duration-300">About</a>
        <a href="#projects" className="hover:text-blue-600 transition-colors duration-300">Projects</a>
        <a href="#contact" className="hover:text-blue-600 transition-colors duration-300">Contact</a>
      </div> */}

      <LanguageSelector />
    </nav>
  );
}
