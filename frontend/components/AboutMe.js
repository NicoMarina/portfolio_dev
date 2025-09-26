"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import { useLanguage } from "@/context/LanguageContext";

const AboutMe = forwardRef((props, ref) => {
  const { lang } = useLanguage();
  const [content, setContent] = useState(""); // Empty by default
  const [error, setError] = useState(false);
  const [fade, setFade] = useState(false);

  // Expose fetchContent for LanguageSelector
  useImperativeHandle(ref, () => ({
    fetchContent: async (newLang) => {
      try {
        const res = await fetch(`/api/about?lang=${newLang}`);
        if (!res.ok) throw new Error("Error fetching content");
        const data = await res.json();

        setFade(true);
        setTimeout(() => setFade(false), 500);
        setContent(data.content);
        setError(false);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    },
  }));

  // Initial load in default language (English)
  useEffect(() => {
    let isCancelled = false;

    async function fetchInitial() {
      try {
        const res = await fetch(`/api/about?lang=en`);
        if (!res.ok) throw new Error("Error fetching content");
        const data = await res.json();
        if (!isCancelled) {
          setContent(data.content);
          setFade(false);
        }
      } catch (err) {
        console.error(err);
        if (!isCancelled) setError(true);
      }
    }

    fetchInitial();

    return () => { isCancelled = true; };
  }, []);

  if (error) return <div id="about">Error loading content.</div>;

  return (
    <div id="about" className="max-w-5xl mx-auto px-6 py-16">
      <div
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
});

export default AboutMe;
