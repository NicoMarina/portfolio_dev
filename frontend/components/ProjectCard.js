"use client";

import { useState } from "react";

export default function ProjectCard({ project }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!project) return null;

  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col justify-between transition hover:shadow-xl">
        <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
          {project.title}
        </h3>
        <button
          onClick={() => setIsOpen(true)}
          className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Leer más
        </button>
      </div>

      {/* Modal / Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg max-w-3xl w-full p-6 relative overflow-y-auto max-h-[80vh]">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: project.content }}
            />
          </div>
        </div>
      )}
    </>
  );
}
