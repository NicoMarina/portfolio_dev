"use client";

import { useState } from "react";
import AboutMe from "@/components/AboutMe";

export default function UnderConstruction() {
  const [lang, setLang] = useState("en");

  return (
    <main className="min-h-screen bg-gray-50 text-gray-800">
      {/* Under Construction Notice */}
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">🚧 Portfolio under construction 🚧</h1>
        {/* About Me section */}
        <div className="py-8 px-4">
          <AboutMe lang={lang} />
        </div>
        <p className="text-gray-600 max-w-xl">
          While I build the portfolio, you can check the repository above.
        </p>
        <a
          href="https://github.com/marinanicolau/portfolio_dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition-colors duration-300 mb-6"
        >
          View Portfolio Repo
        </a>

      </div>

    </main>
  );
}