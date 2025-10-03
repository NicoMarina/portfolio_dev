"use client";

import { SiPython, SiSqlite, SiPhp, SiJavascript, SiHtml5, SiCss3, SiDjango, SiFastapi, SiLaravel, SiMysql, SiPostgresql, SiMongodb, SiGithub, SiPostman, SiJira, SiTrello, SiLinux } from "react-icons/si";
import { FaWindows } from "react-icons/fa";

const techList = [
  { name: "Python", icon: SiPython },
  { name: "SQL", icon: SiSqlite },
  { name: "PHP", icon: SiPhp },
  { name: "JavaScript", icon: SiJavascript },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS", icon: SiCss3 },
  { name: "Django", icon: SiDjango },
  { name: "FastAPI", icon: SiFastapi },
  { name: "Laravel", icon: SiLaravel },
  { name: "MySQL", icon: SiMysql },
  { name: "PostgreSQL", icon: SiPostgresql },
  { name: "MongoDB", icon: SiMongodb },
  { name: "GitHub", icon: SiGithub },
  { name: "Postman", icon: SiPostman },
  { name: "Jira", icon: SiJira },
  { name: "Trello", icon: SiTrello },
  { name: "Linux", icon: SiLinux },
  { name: "Windows", icon: FaWindows },
];

export default function TechMarquee() {
  return (
    <div className="w-full py-6">
      <div className="flex animate-marquee whitespace-nowrap">
        {techList.map((tech) => (
          <TechItem key={tech.name} tech={tech} />
        ))}
        {techList.map((tech) => (
          <TechItem key={tech.name + "-duplicate"} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function TechItem({ tech }) {
  const Icon = tech.icon;
  return (
    <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg border border-gray-700 mx-2 shrink-0">
      {Icon && <Icon className="w-8 h-8 text-blue-400" />}
      <span className="text-gray-200 font-medium">{tech.name}</span>
    </div>
  );
}
