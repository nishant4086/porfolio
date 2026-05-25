"use client";

import { useEffect, useState } from "react";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [isExiting, setIsExiting] = useState(false);

  const bootLogs = [
    "INITIALIZING SYSTEM CORE...",
    "LOADING ENGINE SECTIONS [Next.js 15, Tailwind v4, GSAP]...",
    "CONNECTING CORE NEURAL ARCHITECTURE...",
    "RETRIEVING PROFILE: NISHANT RANKAWAT...",
    "PARSING WORK DATA [Nigris Workflow Orchestrator, Naruto gesture engine]...",
    "COMPILING CORE INTERFACES...",
    "SYSTEM DECRYPTION 100% SUCCESSFUL.",
  ];

  useEffect(() => {
    // Add logs one by one based on progress thresholds
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 8) + 2;
        if (next >= 100) {
          clearInterval(interval);
          return 100;
        }
        return next;
      });
    }, 80);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Distribute logs based on progress percent
    const logIndex = Math.floor((progress / 100) * bootLogs.length);
    const visibleLogs = bootLogs.slice(0, Math.max(1, logIndex));
    setLogs(visibleLogs);

    if (progress === 100) {
      const exitTimeout = setTimeout(() => {
        setIsExiting(true);
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 800); // match transition duration
        return () => clearTimeout(completeTimeout);
      }, 500);
      return () => clearTimeout(exitTimeout);
    }
  }, [progress]);

  return (
    <div
      className={`fixed inset-0 bg-[#030303] z-[9999] flex flex-col items-center justify-center p-6 transition-all duration-800 ease-[cubic-bezier(0.77,0,0.175,1)] crt-overlay ${
        isExiting ? "opacity-0 pointer-events-none scale-105" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-lg font-mono text-xs md:text-sm text-zinc-400">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-6">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-semibold">
            system_boot_sequence.sh
          </span>
        </div>

        {/* Boot Terminal Log Container */}
        <div className="h-48 overflow-y-auto mb-6 flex flex-col gap-1.5 scrollbar-none select-none">
          {logs.map((log, index) => {
            const isSuccess = log.includes("SUCCESSFUL");
            return (
              <div
                key={index}
                className={`flex items-start gap-2 leading-relaxed ${
                  isSuccess ? "text-neon-blue font-bold" : ""
                }`}
              >
                <span className="text-neon-purple select-none">&gt;&gt;</span>
                <span>{log}</span>
              </div>
            );
          })}
        </div>

        {/* Loading Progress Bar Container */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-[10px] uppercase tracking-widest text-zinc-500 font-bold">
            <span>Progress</span>
            <span className="text-neon-blue">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
            <div
              className="h-full bg-gradient-to-r from-neon-purple to-neon-blue transition-all duration-100 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-2 bg-white shadow-[0_0_8px_#ffffff]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
