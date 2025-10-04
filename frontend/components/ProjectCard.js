"use client";

import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { transformJiraContent } from "@/utils/transformJiraContent";

export default function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, translations } = useLanguage();

  if (!project) return null;

// Parse HTML to extract title, short description, and full content
const parser = new DOMParser();
const doc = parser.parseFromString(project.content, "text/html");

const h2Element = doc.querySelector("h2");
const title = h2Element ? h2Element.textContent : project.title;

// Split content into two parts: before and after the <hr>
const rawHTML = doc.body.innerHTML;
const [beforeHR, afterHR] = rawHTML.split(/<hr\s*\/?>/i);

// Short description: what's in "beforeHR" without the <h2>
let shortDesc = beforeHR || "";
if (h2Element) {
// remove the h2 from the short block
  shortDesc = shortDesc.replace(h2Element.outerHTML, "");
}

// Long content: after the <hr>
const longContent = afterHR || "";

  return (
    <>
      <li className="bg-gray-800 bg-opacity-40 backdrop-blur-lg w-full border border-gray-700 rounded-lg p-4 sm:p-6 flex flex-col gap-4">
        {/* terminal type header */}
        <div className="flex flex-col gap-2 border-b border-gray-700 pb-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500"></span>
            <span className="h-3 w-3 rounded-full bg-yellow-400"></span>
            <span className="h-3 w-3 rounded-full bg-green-400"></span>
          </div>
          <h4 className="text-white font-semibold text-lg sm:text-md">{title}</h4>
        </div>

        {/* short description */}
        {shortDesc && (
          <div
            className="text-gray-300 text-sm sm:text-sm leading-relaxed overflow-hidden"
            dangerouslySetInnerHTML={{ __html: transformJiraContent(shortDesc) }}
          />
        )}

        <div className="mt-auto flex justify-end">
          <button
            onClick={() => setIsOpen(true)}
            className="cta-btn"
          >
            {translations.readMore}
          </button>
        </div>
      </li>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0f0f0f] text-gray-200 rounded-2xl shadow-2xl max-w-4xl w-full p-8 relative overflow-y-auto max-h-[80vh] border border-gray-800">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
              {title}
            </h3>
            {project.date && <p className="text-gray-400 mb-4">{project.date}</p>}
            <div
              className="prose prose-invert max-w-none leading-relaxed"
              dangerouslySetInnerHTML={{ __html: transformJiraContent(longContent) }}
            />
          </div>
        </div>
      )}
    </>
  );
}
