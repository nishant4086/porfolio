"use client";

import { Cpu } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-cyber-black py-12 relative overflow-hidden">
      {/* Background horizontal styling lines */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        
        {/* Left Side: Logo */}
        <div className="flex items-center gap-2 font-display text-white font-bold select-none text-sm tracking-widest">
          <Cpu className="text-neon-purple" size={14} />
          <span>NISHANT RANKAWAT</span>
        </div>

        {/* Center: System Status */}
        <div className="flex items-center gap-4 font-mono text-[9px] text-zinc-600 tracking-wider">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-blue animate-pulse" />
            <span>NODE: ACTIVE // SERVER_ONLINE</span>
          </div>
          <span>|</span>
          <span>LATENCY: 14ms</span>
        </div>

        {/* Right Side: Copyright */}
        <div className="font-mono text-[10px] text-zinc-500 tracking-wider">
          © {currentYear} // ALL RIGHTS RESERVED
        </div>

      </div>
    </footer>
  );
}
