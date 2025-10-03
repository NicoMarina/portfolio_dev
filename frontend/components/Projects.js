"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import ProjectCard from "./ProjectCard";

const Projects = forwardRef(({ lang }, ref) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Exponer fetchContent para LanguageSelector
  useImperativeHandle(ref, () => ({
    fetchContent: async (newLang) => {
      try {
        setLoading(true);
        const res = await fetch("/api/projects?lang=" + newLang);
        if (!res.ok) throw new Error("Error fetching projects");
        const data = await res.json();
        setProjects(Array.isArray(data) ? data : []);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    },
  }));

  // Carga inicial
  useEffect(() => {
    let isCancelled = false;
    async function fetchInitial() {
      try {
        setLoading(true);
        const res = await fetch("/api/projects?lang=" + lang);
        if (!res.ok) throw new Error("Error fetching projects");
        const data = await res.json();
        if (!isCancelled) setProjects(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (!isCancelled) setError(true);
      } finally {
        if (!isCancelled) setLoading(false);
      }
    }
    fetchInitial();
    return () => { isCancelled = true; };
  }, [lang]);

  if (loading) return <p className="text-center text-gray-500">Loading projects...</p>;
  if (error) return <p className="text-center text-red-500">Error loading projects.</p>;
  if (!projects.length) return <p className="text-center text-gray-500">No projects found.</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map(proj => <ProjectCard key={proj.id} project={proj} />)}
    </div>
  );
});

Projects.displayName = "Projects";

export default Projects;
