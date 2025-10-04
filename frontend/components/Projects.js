"use client";

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import ProjectCard from "./ProjectCard";
import { useLanguage } from "@/context/LanguageContext";

const Projects = forwardRef(({ lang }, ref) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { translations } = useLanguage();

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

  return (
    <section id="projects" className="py-20 px-6 md:px-12 max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center">
        {translations.some} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">{translations.someProjects}</span>
      </h2>

      {loading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-white/20 rounded w-11/12"></div>
          <div className="h-4 bg-white/20 rounded w-full"></div>
          <div className="h-4 bg-white/20 rounded w-5/6"></div>
          <div className="h-4 bg-white/20 rounded w-4/6"></div>
        </div>
      ) : error ? (
        <p className="text-center text-red-500">Error loading projects.</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-400">No projects found.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </ul>
      )}
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
