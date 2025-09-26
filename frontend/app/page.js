"use client";

import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";

export default function Home() {
  const [projects, setProjects] = useState([]);

  // Load demo projects when component mounts
  useEffect(() => {
    setProjects([
      { id: 1, name: "Demo Project 1", description: "Example project 1", github: "#" },
      { id: 2, name: "Demo Project 2", description: "Example project 2", github: "#" },
      { id: 3, name: "Demo Project 3", description: "Example project 3", github: "#" },
    ]);
  }, []);

  // Hook for scroll animation: add 'visible' class when section is in viewport
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    sections.forEach(section => observer.observe(section));
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section id="hero" className="flex flex-col items-center justify-center min-h-screen bg-gray-100 pt-24 opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <h1 className="text-5xl font-bold text-blue-600 mb-4">Marina Nicolau Valls</h1>
        <h2 className="text-xl text-gray-700 mb-2">Backend Engineer | Project Manager</h2>
        <p className="text-gray-600">Sabadell, Barcelona</p>
      </section>

      {/* About Section */}
      <section id="about" className="p-8 bg-white opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-gray-700">Software developer specialized in backend with Django, Laravel, SQL, APIs...</p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="p-8 bg-gray-50 opacity-0 translate-y-8 transition-all duration-700 ease-out">
        <h2 className="text-3xl font-bold mb-6">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="p-8 bg-white opacity-0 translate-y-8 transition-all duration-700 ease-out">
        {/* Contact info can be added here */}
        {/* <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <p>Email: mnicolauvalls@hotmail.com</p>
        <p>Phone: 611797153</p> */}
      </section>
    </div>
  );
}
