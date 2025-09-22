"use client";

export default function ProjectCard({ project }) {
  return (
    <div className="border rounded-lg shadow p-4 hover:shadow-lg transition">
      <h3 className="font-bold text-lg mb-2">{project.name}</h3>
      <p className="text-gray-600 mb-2">{project.description}</p>
      <div className="flex space-x-4 mt-2">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
