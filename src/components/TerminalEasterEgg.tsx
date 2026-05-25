"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";

export default function TerminalEasterEgg() {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([
    "NIGRIS SECURITY PROTOCOL CRACKED.",
    "WELCOME TO THE SECURE BACKDOOR DECK.",
    "Type 'help' to view available system interfaces.",
  ]);
  const [inputVal, setInputVal] = useState("");
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typedSequence = useRef<string[]>([]);

  // Key listener for easter egg trigger "nigris"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.key) return;

      if (isOpen) {
        // If terminal is open, Esc key can close it
        if (e.key === "Escape") {
          setIsOpen(false);
        }
        return;
      }

      // Collect key strokes
      const char = e.key.toLowerCase();
      if (char.length === 1 && /[a-z]/.test(char)) {
        typedSequence.current.push(char);
        if (typedSequence.current.length > 6) {
          typedSequence.current.shift(); // Keep last 6 chars
        }
        const sequence = typedSequence.current.join("");
        if (sequence === "nigris") {
          setIsOpen(true);
          typedSequence.current = []; // Reset
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input when terminal opens or is clicked
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Scroll to bottom of terminal logs
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, `nishant@nigris-core:~$ ${cmd}`];

    if (!trimmed) {
      setHistory(newHistory);
      return;
    }

    let response: string[] = [];

    switch (trimmed) {
      case "help":
        response = [
          "AVAILABLE COMMANDS:",
          "  about    - Reveal background intelligence on Nishant Rankawat",
          "  skills   - Retrieve categorized technological capabilities",
          "  projects - Enumerate featured software projects",
          "  system   - Print server status and neural engine diagnostics",
          "  secret   - decrypt project 'Nigris' codename credentials",
          "  clear    - Flush terminal console records",
          "  exit     - Sever server connection and exit shell",
        ];
        break;
      case "about":
        response = [
          "INTELLIGENCE REPORT: NISHANT RANKAWAT",
          "-------------------------------------",
          "ROLE: Full Stack Developer & System Builder",
          "FOCUS: Building performant, scalable, and secure systems.",
          "CREATIVE MOTTO: Visual excellence + high performance + clean architecture.",
          "CURRENT WORK: Intern at Coozmoo Digital Solutions, developing Nigris.",
        ];
        break;
      case "skills":
        response = [
          "TECHNOLOGY PROFILE DECRYPTED:",
          "  [FRONTEND] React, Next.js 15, Tailwind CSS, Framer Motion, Redux",
          "  [BACKEND ] Node.js, Express.js, MongoDB, Redis, PostgreSQL",
          "  [DEVOPS  ] AWS, Docker, Kubernetes, Firebase, CI/CD pipelines",
          "  [SYSTEMS ] Python, Go Lang, Bash Scripting, Git, System Design",
        ];
        break;
      case "projects":
        response = [
          "FEATURED CODEBASES:",
          "  1. Nigris - Distributed workflow & scalable orchestration.",
          "  2. Naruto Ninjutsu Detector - OpenCV hand gesture vision engine.",
          "  3. Smart Finance App - Analytics tracking with predictive budgeting.",
          "  4. Social Media Hub - Multi-account dashboard & automation tool.",
        ];
        break;
      case "system":
        response = [
          "SYSTEM STATUS: OPTIMAL",
          "CPU TEMPERATURE: 42°C",
          "MEM LOAD: 3.42 GB / 16.00 GB",
          "CONNECTION: Encrypted WebSocket via Antigravity-Tunnel",
          "SYSTEM CORE: Next.js Node (Active Server)",
        ];
        break;
      case "secret":
      case "nigris":
        response = [
          "DECRYPTING PROJECT 'NIGRIS' CODENAME...",
          "---------------------------------------",
          "PROJECT TYPE: Distributed Workflow Orchestration Layer",
          "MISSION: Automating high-frequency, complex digital operations",
          "by integrating event loop queues with structured workflows.",
          "STATUS: Active deployment phase.",
          "ACCESS CODE: [NIGRIS_DECK_UNLOCKED_SHA256]",
        ];
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      case "exit":
        setIsOpen(false);
        return;
      default:
        response = [
          `bash: command not found: ${trimmed}. Type 'help' for system guide.`,
        ];
    }

    setHistory([...newHistory, ...response]);
    setInputVal("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 md:p-10 font-mono text-sm crt-overlay">
      {/* Terminal Deck Shell */}
      <div className="w-full max-w-4xl h-[70vh] bg-cyber-black rounded-lg border border-neon-blue/30 shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col relative overflow-hidden">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a0f] border-b border-neon-blue/20">
          <div className="flex items-center gap-2 text-neon-blue">
            <TerminalIcon size={16} className="animate-pulse" />
            <span className="text-xs uppercase tracking-widest font-semibold select-none">
              Nigris System Core Terminal v1.4.2
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-zinc-500 hover:text-white transition-colors duration-200"
            data-clickable
          >
            <X size={18} />
          </button>
        </div>

        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.015] to-transparent w-full h-[200%] animate-scanline" />

        {/* Terminal Body */}
        <div 
          className="flex-1 overflow-y-auto p-6 flex flex-col gap-2 scrollbar-thin text-neon-blue select-text"
          onClick={() => inputRef.current?.focus()}
        >
          {history.map((log, index) => {
            const isInput = log.startsWith("nishant@nigris-core:");
            const isError = log.includes("command not found");
            return (
              <div
                key={index}
                className={`leading-relaxed whitespace-pre-wrap ${
                  isInput
                    ? "text-zinc-300"
                    : isError
                    ? "text-red-400 font-bold"
                    : "text-neon-blue"
                }`}
              >
                {log}
              </div>
            );
          })}
          <div ref={terminalEndRef} />
        </div>

        {/* Terminal Input Form */}
        <form
          onSubmit={handleSubmit}
          className="p-4 bg-[#050508] border-t border-neon-blue/10 flex items-center gap-2"
        >
          <span className="text-neon-purple select-none font-bold">
            nishant@nigris-core:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono caret-neon-blue"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </form>
      </div>
    </div>
  );
}
