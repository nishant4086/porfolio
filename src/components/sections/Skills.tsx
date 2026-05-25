"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Monitor, Server, Cloud, Cpu } from "lucide-react";

interface Skill {
  name: string;
  level: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  color: string;
  skills: Skill[];
}

export default function Skills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const skillData: SkillCategory[] = [
    {
      title: "Frontend Development",
      icon: <Monitor size={18} />,
      color: "text-neon-blue border-neon-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]",
      skills: [
        { name: "React", level: "Expert" },
        { name: "Next.js", level: "Expert" },
        { name: "Tailwind CSS", level: "Expert" },
        { name: "Redux", level: "Advanced" },
        { name: "Framer Motion", level: "Advanced" },
      ],
    },
    {
      title: "Backend & Cache",
      icon: <Server size={18} />,
      color: "text-neon-purple border-neon-purple/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]",
      skills: [
        { name: "Node.js", level: "Expert" },
        { name: "Express.js", level: "Expert" },
        { name: "MongoDB", level: "Advanced" },
        { name: "Redis", level: "Advanced" },
        { name: "PostgreSQL", level: "Advanced" },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud size={18} />,
      color: "text-cyan-400 border-cyan-400/30 shadow-[0_0_15px_rgba(34,211,238,0.1)]",
      skills: [
        { name: "AWS", level: "Advanced" },
        { name: "Docker", level: "Advanced" },
        { name: "Kubernetes", level: "Intermediate" },
        { name: "Firebase", level: "Expert" },
        { name: "CI/CD", level: "Advanced" },
      ],
    },
    {
      title: "Programming & Tools",
      icon: <Cpu size={18} />,
      color: "text-emerald-400 border-emerald-400/30 shadow-[0_0_15px_rgba(52,211,153,0.1)]",
      skills: [
        { name: "Python", level: "Expert" },
        { name: "Go Lang", level: "Advanced" },
        { name: "Bash Scripting", level: "Advanced" },
        { name: "Git & GitHub", level: "Expert" },
        { name: "System Design", level: "Advanced" },
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden" ref={containerRef}>
      
      {/* Title */}
      <div className="flex flex-col items-start gap-2 mb-16">
        <span className="font-mono text-xs tracking-widest text-neon-blue font-semibold uppercase">02 // Tech Stack</span>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          Capabilities & Toolkit
        </h2>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {skillData.map((category, catIndex) => (
          <motion.div
            key={catIndex}
            className="rounded-xl border border-white/5 bg-cyber-gray/70 p-6 flex flex-col gap-6 glass-panel relative group overflow-hidden"
            initial={{ y: 50, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: catIndex * 0.15 }}
          >
            {/* Hologram scan laser line */}
            <div 
              className={`absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 group-hover:animate-scanline pointer-events-none z-20 ${
                catIndex === 0
                  ? "bg-neon-blue shadow-[0_0_8px_#00f0ff]"
                  : catIndex === 1
                  ? "bg-neon-purple shadow-[0_0_8px_#a855f7]"
                  : catIndex === 2
                  ? "bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                  : "bg-emerald-400 shadow-[0_0_8px_#34d399]"
              }`} 
            />

            {/* Category Header */}
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg border flex items-center justify-center ${category.color}`}>
                {category.icon}
              </div>
              <h3 className="font-display font-bold text-sm tracking-wide text-white">
                {category.title}
              </h3>
            </div>

            <div className="h-[1px] bg-white/5 w-full" />

            {/* Skills List as high-tech badges */}
            <div className="flex flex-wrap gap-2.5">
              {category.skills.map((skill, skillIndex) => {
                let badgeColor = "";
                let dotColor = "";
                if (catIndex === 0) {
                  badgeColor = "border-neon-blue/20 bg-neon-blue/5 text-neon-blue hover:border-neon-blue/40";
                  dotColor = "bg-neon-blue";
                } else if (catIndex === 1) {
                  badgeColor = "border-neon-purple/20 bg-neon-purple/5 text-neon-purple hover:border-neon-purple/40";
                  dotColor = "bg-neon-purple";
                } else if (catIndex === 2) {
                  badgeColor = "border-cyan-500/20 bg-cyan-500/5 text-cyan-400 hover:border-cyan-500/40";
                  dotColor = "bg-cyan-400";
                } else {
                  badgeColor = "border-emerald-500/20 bg-emerald-500/5 text-emerald-400 hover:border-emerald-500/40";
                  dotColor = "bg-emerald-400";
                }

                return (
                  <div
                    key={skillIndex}
                    className={`px-2.5 py-1 rounded border ${badgeColor} transition-all duration-300 flex items-center gap-1.5 text-xs font-mono select-none`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
                    <span>{skill.name}</span>
                    <span className="opacity-40 text-[9px] uppercase tracking-wider font-semibold">
                      ({skill.level.substring(0, 3)})
                    </span>
                  </div>
                );
              })}
            </div>

          </motion.div>
        ))}
      </div>
    </section>
  );
}
