"use client";

import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutMe from "@/components/AboutMe";
import Projects from "@/components/Projects";

export default function Home() {
  const { lang, translations } = useLanguage();

  const aboutRef = useRef();
  const projectsRef = useRef();

  const fetchAboutMe = (newLang) => aboutRef.current?.fetchContent(newLang);
  const fetchProjects = (newLang) => projectsRef.current?.fetchContent(newLang);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar fetchAboutMe={fetchAboutMe} fetchProjects={fetchProjects} />

      {/* Hero Section */}
      <div id="home">
      <Hero />
      </div>
      {/* About Me Section */}
      <div id="about">
        <AboutMe ref={aboutRef} />
      </div>
      {/* Projects Section */}
      <div id="projects" className="projects-section animate-fadeIn">
        <Projects ref={projectsRef} lang={lang || "en"} />
      </div>
    </div>
  );
}
