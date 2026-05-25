"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal as TermIcon, ArrowDown, Sparkles } from "lucide-react";

const FloatingTechIcon = ({ icon, color, delay, xOffset, yOffset }: { icon: string; color: string; delay: number; xOffset: number; yOffset: number }) => {
  return (
    <motion.div
      className={`absolute hidden md:flex items-center justify-center p-3 rounded-full border bg-cyber-black/80 backdrop-blur-md border-white/5 shadow-lg select-none`}
      style={{
        borderColor: `${color}20`,
        boxShadow: `0 0 15px ${color}10`,
      }}
      initial={{ x: xOffset, y: yOffset, opacity: 0 }}
      animate={{
        y: [yOffset - 10, yOffset + 10, yOffset - 10],
        opacity: [0.6, 0.9, 0.6],
      }}
      transition={{
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
        opacity: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay,
        },
      }}
    >
      <span className="font-mono text-xs font-semibold" style={{ color }}>{icon}</span>
    </motion.div>
  );
};

export default function Hero() {
  const [roleText, setRoleText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const roles = ["Software Engineer", "Full Stack Developer", "System Builder"];
  
  // Terminal states
  const [termHistory, setTermHistory] = useState<string[]>([
    "nishant_guest@guest-deck:~$ help",
    "Commands: 'about', 'projects', 'nigris'",
  ]);
  const [termInput, setTermInput] = useState("");
  const termEndRef = useRef<HTMLDivElement>(null);

  // Typing animation for roles
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullRole = roles[roleIndex];

    if (isDeleting) {
      timer = setTimeout(() => {
        setRoleText((prev) => prev.slice(0, -1));
      }, 50);
    } else {
      timer = setTimeout(() => {
        setRoleText((prev) => currentFullRole.slice(0, prev.length + 1));
      }, 100);
    }

    if (!isDeleting && roleText === currentFullRole) {
      timer = setTimeout(() => setIsDeleting(true), 2000); // Wait 2s before delete
    } else if (isDeleting && roleText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [roleText, isDeleting, roleIndex]);

  // Mini-terminal logic
  const handleTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = termInput.trim().toLowerCase();
    if (!cmd) return;

    let response = "";
    if (cmd === "help") {
      response = "Available queries: 'about', 'projects', 'nigris', 'clear'";
    } else if (cmd === "about") {
      response = "Full Stack Engineer passionate about building scalable, high-performance web apps.";
    } else if (cmd === "projects") {
      response = "Built Nigris, Naruto Hand-Sign Recognizer, Finance App, Social dashboard.";
    } else if (cmd === "nigris") {
      response = "ACCESS GRANTED. System trigger sequence activated...";
      // Dispatch a keydown event for the letter sequence 'nigris' to trigger the full terminal
      setTimeout(() => {
        const event = new KeyboardEvent("keydown", { key: "g" });
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "n" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "i" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "g" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "r" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "i" }));
        window.dispatchEvent(new KeyboardEvent("keydown", { key: "s" }));
      }, 500);
    } else if (cmd === "clear") {
      setTermHistory([]);
      setTermInput("");
      return;
    } else {
      response = `Command '${cmd}' not recognized. Type 'help'.`;
    }

    setTermHistory((prev) => [...prev, `nishant_guest@guest-deck:~$ ${termInput}`, response]);
    setTermInput("");
  };

  useEffect(() => {
    termEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [termHistory]);

  const scrollToSection = (id: string) => {
    const elem = document.getElementById(id);
    if (elem) {
      const offset = elem.offsetTop - 80;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center justify-center pt-24 pb-12 overflow-hidden px-6 md:px-12"
    >
      {/* Background radial spotlight */}
      <div className="absolute inset-0 z-0 bg-radial-gradient from-transparent to-[#030303]" />

      {/* Floating Tech Icons */}
      <FloatingTechIcon icon="Python" color="#3776AB" delay={0} xOffset={-260} yOffset={-140} />
      <FloatingTechIcon icon="React/Next.js" color="#61DAFB" delay={1.5} xOffset={300} yOffset={-120} />
      <FloatingTechIcon icon="Docker" color="#2496ED" delay={3} xOffset={-320} yOffset={100} />
      <FloatingTechIcon icon="AWS" color="#FF9900" delay={0.7} xOffset={320} yOffset={110} />
      <FloatingTechIcon icon="TensorFlow" color="#FF6F00" delay={2.2} xOffset={-100} yOffset={220} />

      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 relative">
        
        {/* Main Content Pane */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          {/* Tag */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/20 bg-neon-blue/5 text-[10px] uppercase tracking-widest text-neon-blue font-bold">
            <Sparkles size={10} className="animate-pulse" />
            <span>Full Stack Developer & System Builder</span>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-zinc-500 font-mono text-sm tracking-widest uppercase">system.log(name)</h2>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-display font-extrabold tracking-tight text-white leading-none">
              Nishant <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple drop-shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:drop-shadow-[0_0_30px_rgba(0,240,255,0.4)] transition-all duration-500">
                Rankawat
              </span>
            </h1>
          </div>

          {/* Role text cycler */}
          <div className="h-8 flex items-center">
            <span className="font-mono text-base md:text-xl text-zinc-300 font-semibold">
              {roleText}
              <span className="w-1.5 h-5 ml-1 bg-neon-blue inline-block animate-pulse" />
            </span>
          </div>

          {/* Intro description */}
          <p className="max-w-xl text-sm md:text-base text-zinc-400 leading-relaxed font-sans">
            Building scalable web applications, high-frequency digital workflows, and performant backend architectures. Passionate about marrying system performance with visual design excellence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => scrollToSection("projects")}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple text-xs font-mono font-bold tracking-widest text-white uppercase shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5"
              data-clickable
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="px-6 py-3 rounded-full border border-white/10 hover:border-neon-blue/30 bg-white/5 hover:bg-neon-blue/5 text-xs font-mono font-bold tracking-widest text-white uppercase transition-all duration-300 transform hover:-translate-y-0.5"
              data-clickable
            >
              Contact Me
            </button>
          </div>
        </div>

        {/* Interactive mini-terminal pane */}
        <div className="lg:col-span-5 w-full flex flex-col items-center">
          <div className="w-full max-w-md bg-cyber-gray/80 backdrop-blur-md rounded-lg border border-white/5 shadow-2xl overflow-hidden glass-panel relative">
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-cyber-black">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 font-bold uppercase tracking-widest">
                guest_terminal.sh
              </span>
              <TermIcon size={12} className="text-zinc-500" />
            </div>

            {/* Terminal Body */}
            <div className="h-44 overflow-y-auto p-4 font-mono text-[11px] leading-relaxed flex flex-col gap-1.5 scrollbar-none text-zinc-400 select-text">
              {termHistory.map((item, index) => (
                <div key={index} className={item.startsWith("nishant_guest") ? "text-neon-purple font-semibold" : "text-zinc-400"}>
                  {item}
                </div>
              ))}
              <div ref={termEndRef} />
            </div>

            {/* Input Line */}
            <form
              onSubmit={handleTermSubmit}
              className="px-4 py-2 bg-cyber-black border-t border-white/5 flex items-center gap-1.5"
            >
              <span className="font-mono text-[11px] text-neon-purple font-bold">
                guest-deck:~$
              </span>
              <input
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                placeholder="Type 'help'..."
                className="flex-1 bg-transparent border-none outline-none font-mono text-[11px] text-white placeholder-zinc-600 caret-neon-blue"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
              />
            </form>
          </div>
          
          <div className="mt-3 text-[10px] font-mono text-zinc-600 tracking-wider flex items-center gap-1 select-none">
            <span>Type </span>
            <span className="text-neon-blue font-bold px-1 py-0.5 rounded bg-white/5 border border-white/5 font-mono">nigris</span>
            <span> anywhere to unlock secret core terminal</span>
          </div>
        </div>

      </div>

      {/* Down indicator */}
      <div 
        onClick={() => scrollToSection("about")}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-zinc-500 hover:text-white transition-colors duration-300 cursor-pointer select-none animate-bounce"
        data-clickable
      >
        <span className="font-mono text-[8px] tracking-widest uppercase">Scroll Down</span>
        <ArrowDown size={14} />
      </div>
    </section>
  );
}
