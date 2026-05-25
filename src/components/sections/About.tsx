"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { User, Sliders, Code2, Cpu, ShieldCheck } from "lucide-react";

// CountUp component to animate stats
const StatCard = ({ targetVal, label, suffix = "", delay = 0 }: { targetVal: number; label: string; suffix?: string; delay?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const end = targetVal;
    
    if (end === 0) return;
    
    const stepTime = Math.max(Math.floor(duration / end), 15);
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / stepTime));
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, targetVal]);

  return (
    <motion.div
      ref={ref}
      className="p-6 rounded-lg glass-panel text-center relative overflow-hidden group border border-white/5"
      initial={{ y: 30, opacity: 0 }}
      animate={isInView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6, delay }}
    >
      {/* Background glow hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/0 to-neon-purple/0 group-hover:from-neon-blue/5 group-hover:to-neon-purple/5 transition-all duration-500" />
      
      {/* Stat Value */}
      <div className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight mb-2 flex justify-center items-baseline gap-0.5">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400">
          {count}
        </span>
        <span className="text-neon-blue font-bold font-display">{suffix}</span>
      </div>
      
      {/* Label */}
      <div className="text-xxs md:text-xs font-mono text-zinc-500 uppercase tracking-widest font-semibold">
        {label}
      </div>
    </motion.div>
  );
};

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const bioWords = "I am a Full Stack Developer and Systems Architect dedicated to constructing scalable web applications and high-performance software. With experience building projects like Nigris, my focus is designing robust, resilient, and production-grade software architectures. I strive for pixel-perfect UI/UX design and highly structured backend data layouts.".split(" ");

  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6 md:px-12 relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center" ref={containerRef}>
        
        {/* Left Side: Tech Profile Card / HUD visual */}
        <motion.div
          className="lg:col-span-5 w-full"
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="rounded-xl border border-white/5 bg-cyber-gray/80 p-8 glass-panel relative overflow-hidden group">
            {/* Ambient light streak */}
            <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-neon-purple/5 blur-[80px] rounded-full group-hover:bg-neon-purple/10 transition-all duration-500" />
            
            {/* Hologram Scanner Line */}
            <div className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent top-0 animate-[scanline_4s_linear_infinite]" />

            <div className="relative z-10 flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg border border-neon-blue/20 bg-neon-blue/5 flex items-center justify-center text-neon-blue">
                  <User size={24} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-wide">Developer Dossier</h3>
                  <span className="font-mono text-xs text-zinc-500">SYS_ID: #09224_NR</span>
                </div>
              </div>

              <div className="h-[1px] bg-white/5 w-full" />

              <div className="flex flex-col gap-4 font-mono text-xs text-zinc-400">
                <div className="flex items-center gap-3">
                  <Code2 size={14} className="text-neon-blue" />
                  <span className="w-24 text-zinc-500">Core:</span>
                  <span className="text-white">Full Stack Engineering</span>
                </div>
                <div className="flex items-start gap-3">
                  <Sliders size={14} className="text-neon-blue mt-0.5" />
                  <span className="w-24 text-zinc-500">Interests:</span>
                  <span className="text-white">Distributed Systems, API Design, Performance Engineering</span>
                </div>
                <div className="flex items-start gap-3">
                  <Cpu size={14} className="text-neon-blue mt-0.5" />
                  <span className="w-24 text-zinc-500">Architectures:</span>
                  <span className="text-white">Microservices, Distributed Caching, Event loops</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck size={14} className="text-neon-blue" />
                  <span className="w-24 text-zinc-500">Philosophy:</span>
                  <span className="text-white">Clean Code & Aesthetic UX</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Text reveal Bio */}
        <motion.div
          className="lg:col-span-7 flex flex-col gap-6"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-1">
            <span className="font-mono text-xs tracking-widest text-neon-purple font-semibold uppercase">01 // Background</span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold text-white tracking-tight">
              Engineering High-Performance Web
            </h2>
          </div>

          {/* Word-by-word reveal text */}
          <div className="flex flex-wrap gap-x-1.5 gap-y-2 text-sm md:text-base text-zinc-400 leading-relaxed font-sans max-w-2xl">
            {bioWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0.15, y: 5 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.3,
                  delay: i * 0.02 + 0.3,
                }}
                className={
                  word === "Full" || word === "Stack" || word === "Nigris" || word === "scalable" || word === "performance" || word === "robust"
                    ? "text-white font-semibold"
                    : ""
                }
              >
                {word}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Statistics Cards Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
        <StatCard targetVal={15} label="Projects Built" suffix="+" delay={0} />
        <StatCard targetVal={24} label="Technologies Used" suffix="+" delay={0.15} />
        <StatCard targetVal={800} label="GitHub Contributions" suffix="+" delay={0.3} />
        <StatCard targetVal={5} label="Users Served" suffix="k+" delay={0.45} />
      </div>
    </section>
  );
}
