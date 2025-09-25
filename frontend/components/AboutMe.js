"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function AboutMe() {
  const { lang } = useLanguage();
  const [content, setContent] = useState("Loading...");
  const [error, setError] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function fetchContent() {
      try {
        const res = await fetch(`/api/about?lang=${lang}`);
        if (!res.ok) throw new Error("Error fetching content");

        const data = await res.json();
        if (!isCancelled) {
          setContent(data.content);
          setError(false);
        }
      } catch (err) {
        console.error(err);
        if (!isCancelled) setError(true);
      }
    }

    fetchContent();

    return () => {
      isCancelled = true;
    };
  }, [lang]);

  if (error) return <div id="about">Error loading content.</div>;

  return (
    <div id="about" className="">
      <div
        className="text-gray-800 max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
