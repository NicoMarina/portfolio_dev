"use client";

// ProjectCard component to display individual project information
export default function ProjectCard({ project }) {
  return (
    // Card container with Tailwind classes for styling and hover effects
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-6
                    hover:shadow-2xl hover:-translate-y-2 hover:scale-105
                    transition transform duration-300 ease-in-out">
      {/* Project name */}
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{project.name}</h3>
      {/* Project description */}
      <p className="text-gray-600 mb-4">{project.description}</p>
      {/* Links container */}
      <div className="flex space-x-4 mt-2">
        {/* GitHub link */}
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-300"
        >
          GitHub
        </a>
        {/* Optional demo link, only rendered if project.demo exists */}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline font-medium transition-colors duration-300"
          >
            Demo
          </a>
        )}
      </div>
    </div>
  );
}
