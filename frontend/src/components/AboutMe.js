"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

export default function AboutMe() {
  const { lang } = useLanguage();
  const [content, setContent] = useState("Loading...");

  useEffect(() => {
    async function fetchContent() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/about?lang=${lang}`,
          {
            headers: {
              "x-api-key": process.env.NEXT_PUBLIC_FRONTEND_API_KEY,
            },
          }
        );
        if (!res.ok) throw new Error("Error fetching content");
        const data = await res.json();
        setContent(data.content);
      } catch (err) {
        console.error(err);
        setContent("Error loading content.");
      }
    }
    fetchContent();
  }, [lang]);

  return (
    <div id="about" className="">
      <div
        className="text-gray-800 max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
