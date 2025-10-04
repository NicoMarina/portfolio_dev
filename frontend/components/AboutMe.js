"use client";

import { useState, useEffect, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

const AboutMe = forwardRef((props, ref) => {
  const { lang, translations } = useLanguage();
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);
  const [fade, setFade] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useImperativeHandle(ref, () => ({
    fetchContent: async (newLang) => {
      try {
        setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    },
  }));

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
          setIsLoading(false);
        }
      } catch (err) {
        console.error(err);
        if (!isCancelled) setError(true);
        setIsLoading(false);
      }
    }

    fetchInitial();
    return () => { isCancelled = true; };
  }, []);

  if (error) return <section id="about">Error loading content.</section>;

  return (
    <section id="about" className={`about-section ${fade ? "fade" : ""}`}>
      <h2>
        <span>{translations.menu.about}</span>
      </h2>

      {isLoading ? (
        <div className="space-y-4 animate-pulse">
          <div className="h-4 bg-white/20 rounded w-11/12"></div>
          <div className="h-4 bg-white/20 rounded w-full"></div>
          <div className="h-4 bg-white/20 rounded w-5/6"></div>
          <div className="h-4 bg-white/20 rounded w-4/6"></div>
        </div>
      ) : (
        <div
          id="about">
          <div className="grid md:grid-cols-2 items-center">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/me.png"
                alt="About me"
                width={400}
                height={400}
                className="w-full max-w-sm md:max-w-md object-cover"
              />
            </div>

            {/* Dinamic text */}
            <div
              className="about-content"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      )}
    </section>
  );
});

AboutMe.displayName = "AboutMe";
export default AboutMe;
