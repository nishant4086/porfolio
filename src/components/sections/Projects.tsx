"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import Image from "next/image";

const GithubIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="currentColor"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
  featured?: boolean;
}

export default function Projects() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const projectsData: Project[] = [
    {
      title: "Nigris",
      description: "A state-of-the-art workflow orchestration platform for executing automated data pipelines, distributed task queues, and managing highly scalable backend nodes.",
      tech: ["Next.js 15", "gRPC", "Redis", "Docker", "PostgreSQL"],
      image: "/projects/nigris.png",
      demoUrl: "nigris.app",
      githubUrl: "https://github.com/nishant4086/Nigris",
      featured: true,
    },
    {
      title: "Naruto Ninjutsu Detection System",
      description: "A high-performance python application utilizing OpenCV and MediaPipe that recognizes hand gestures from webcam video streams in real-time, executing corresponding particle animation triggers.",
      tech: ["Python", "OpenCV", "MediaPipe", "Pygame", "Numpy"],
      image: "/projects/naruto.png",
      demoUrl: "#",
      githubUrl: "https://github.com/nishant4086/Naruto",
      featured: false,
    },
    {
      title: "Finance Management App",
      description: "A smart financial tracking and analysis platform that models budgeting targets, automatically categorizes transaction records, and forecasts wealth curves using predictive statistics.",
      tech: ["React", "Express.js", "MongoDB", "Tailwind CSS", "Chart.js"],
      image: "/projects/finance.png",
      demoUrl: "#",
      githubUrl: "https://github.com/nishant4086/Dashbord",
      featured: false,
    },
    {
      title: "School Management System",
      description: "A comprehensive administration platform designed to handle student enrollment, class scheduling, automated grading systems, and staff records inside a secure multi-role dashboard.",
      tech: ["Next.js", "React", "PostgreSQL", "Prisma", "Tailwind CSS"],
      image: "/projects/school.png",
      demoUrl: "#",
      githubUrl: "https://github.com/nishant4086/school-management-system",
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden" ref={containerRef}>

      {/* Header */}
      <div className="flex flex-col items-start gap-2 mb-16">
        <span className="font-mono text-xs tracking-widest text-neon-purple font-semibold uppercase">03 // Creations</span>
        <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
          Featured Engineering Projects
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projectsData.map((project, index) => (
          <motion.div
            key={index}
            className={`rounded-xl border border-white/5 bg-cyber-gray/70 overflow-hidden flex flex-col glass-panel relative group`}
            initial={{ y: 60, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: index * 0.15 }}
          >
            {/* Holographic Glowing borders */}
            <div className="absolute inset-0 border border-transparent group-hover:border-neon-blue/20 rounded-xl transition-all duration-500 pointer-events-none z-20" />
            <div className="absolute inset-0 border border-transparent group-hover:border-neon-purple/10 rounded-xl blur-[8px] transition-all duration-500 pointer-events-none z-20" />

            {/* Project Image Panel */}
            <div className="h-56 relative w-full overflow-hidden bg-cyber-black">
              {/* Fallback stylized canvas mesh while image generates */}
              <div className="absolute inset-0 bg-[#0a0a0f] flex items-center justify-center">
                <div className="absolute inset-0 cyber-grid opacity-10" />
                <div
                  className={`w-32 h-32 rounded-full blur-[60px] opacity-25 group-hover:opacity-40 transition-opacity duration-500 ${index % 2 === 0 ? "bg-neon-blue" : "bg-neon-purple"
                    }`}
                />
              </div>

              {/* Main Image */}
              <Image
                src={project.image}
                alt={`${project.title} Interface Preview`}
                fill
                className="object-cover opacity-60 group-hover:scale-105 group-hover:opacity-85 transition-all duration-700 ease-out"
                sizes="(max-w-768px) 100vw, 50vw"
                priority={index === 0}
              />

              {project.featured && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2.5 py-1 rounded bg-neon-blue/15 border border-neon-blue/30 text-[9px] uppercase tracking-wider text-neon-blue font-bold font-mono">
                  <Sparkles size={8} />
                  <span>Flagship</span>
                </div>
              )}
            </div>

            {/* Project Details Panel */}
            <div className="p-6 md:p-8 flex flex-col flex-1 gap-4 z-10 relative">
              <h3 className="text-xl font-display font-extrabold text-white group-hover:text-neon-blue transition-colors">
                {project.title}
              </h3>

              <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-sans flex-1">
                {project.description}
              </p>

              {/* Tech Badges */}
              <div className="flex flex-wrap gap-2 py-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded border border-white/5 bg-white/5 font-mono text-[9px] text-zinc-400 tracking-wider"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-2 border-t border-white/5">
                <a
                  href={project.demoUrl}
                  className="flex items-center gap-1 text-[11px] font-mono font-bold tracking-widest text-neon-blue hover:text-white transition-colors duration-200 uppercase"
                  data-clickable
                >
                  <ExternalLink size={12} />
                  <span>Live Launch</span>
                </a>
                <a
                  href={project.githubUrl}
                  className="flex items-center gap-1 text-[11px] font-mono font-bold tracking-widest text-zinc-400 hover:text-white transition-colors duration-200 uppercase ml-auto"
                  data-clickable
                >
                  <GithubIcon size={12} />
                  <span>Repository</span>
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
