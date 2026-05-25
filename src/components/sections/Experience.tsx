"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Trophy, Terminal, Award } from "lucide-react";

interface TimelineItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  icon: React.ReactNode;
}

interface Achievement {
  title: string;
  issuer: string;
  detail: string;
  metric: string;
}

export default function Experience() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const timelineData: TimelineItem[] = [
    {
      role: "Software Engineer Intern",
      company: "Coozmoo Digital Solutions",
      period: "Dec 2025 - Present",
      description: [
        "Architecting scalable automated workflows using Node.js and Redis messaging queues.",
        "Developing high-fidelity responsive user interfaces in Next.js 15 and Tailwind CSS.",
        "Deploying Docker containers and maintaining service tasks on cloud infrastructures.",
      ],
      icon: <Briefcase size={16} />,
    },
    {
      role: "Freelance Full Stack Developer",
      company: "Independent Contracts",
      period: "Jun 2024 - Present",
      description: [
        "Crafted custom corporate websites and automation dashboards for international clients.",
        "Engineered secure PostgreSQL schemas and optimized database search query latency.",
        "Configured robust authentication gates using JWT and Firebase Security Rules.",
      ],
      icon: <Terminal size={16} />,
    },
    {
      role: "Systems & Backend Developer",
      company: "Open Source / Personal Projects",
      period: "Jan 2024 - Present",
      description: [
        "Built and optimized image processing components and client-side computer vision interfaces.",
        "Established search and retrieval indices using custom database caching and schema indexing.",
        "Authored custom distributed workflow orchestrators under project Nigris codebase.",
      ],
      icon: <Briefcase size={16} />,
    },
  ];

  const achievements: Achievement[] = [
    {
      title: "Nigris Engine V1 Release",
      issuer: "Product Hunt / GitHub",
      detail: "Deployed distributed workflow orchestration libraries to open-source.",
      metric: "500+ Stars",
    },
    {
      title: "Speed Optimization Commendation",
      issuer: "Coozmoo Lead Architect",
      detail: "Redesigned Redis lookup filters, reducing API response latencies.",
      metric: "-40% Latency",
    },
  ];

  return (
    <section id="experience" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden" ref={containerRef}>
      
      {/* Background visual light streak */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      {/* Grid: Left Column Timeline, Right Column Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Side: Timeline (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col items-start gap-2">
            <span className="font-mono text-xs tracking-widest text-neon-blue font-semibold uppercase">04 // Logbook</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
              Experience Timeline
            </h2>
          </div>

          {/* Timeline track */}
          <div className="relative pl-8 md:pl-10 border-l border-white/10 flex flex-col gap-12">
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ x: -30, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                {/* Node icon indicator */}
                <div className="absolute -left-[45px] md:-left-[53px] top-1.5 w-8 h-8 rounded-full border border-white/10 bg-cyber-black flex items-center justify-center text-zinc-400 group-hover:text-neon-blue group-hover:border-neon-blue/30 transition-all duration-300">
                  <div className="w-6 h-6 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-neon-blue">
                    {item.icon}
                  </div>
                </div>

                {/* Content Box */}
                <div className="p-6 rounded-lg bg-cyber-gray/70 border border-white/5 glass-panel relative group">
                  <span className="font-mono text-[10px] text-neon-blue tracking-wider font-semibold block mb-1">
                    {item.period}
                  </span>
                  <h3 className="text-lg font-display font-bold text-white group-hover:text-neon-blue transition-colors">
                    {item.role}
                  </h3>
                  <span className="font-mono text-xs text-zinc-500 mb-4 block">
                    {item.company}
                  </span>
                  
                  <ul className="flex flex-col gap-2 font-sans text-xs md:text-sm text-zinc-400">
                    {item.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-neon-purple mt-1 select-none text-[10px]">•</span>
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Achievements & commendations (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col items-start gap-2">
            <span className="font-mono text-xs tracking-widest text-neon-purple font-semibold uppercase">05 // Milestones</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
              Achievements
            </h2>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-6">
            {achievements.map((ach, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-cyber-gray/80 border border-white/5 glass-panel flex flex-col gap-3 group relative overflow-hidden"
                initial={{ y: 35, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              >
                {/* Micro scanning beam */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-[scanline_3s_linear_infinite]" />

                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded bg-neon-purple/5 border border-neon-purple/20 flex items-center justify-center text-neon-purple">
                    <Trophy size={18} />
                  </div>
                  <span className="font-mono text-xs font-bold text-neon-purple bg-neon-purple/5 border border-neon-purple/25 px-2 py-0.5 rounded shadow-[0_0_8px_rgba(168,85,247,0.1)]">
                    {ach.metric}
                  </span>
                </div>
                
                <div className="mt-1">
                  <h3 className="font-display font-bold text-white text-base">
                    {ach.title}
                  </h3>
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">
                    {ach.issuer}
                  </span>
                  <p className="font-sans text-xs text-zinc-400 mt-2 leading-relaxed">
                    {ach.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
