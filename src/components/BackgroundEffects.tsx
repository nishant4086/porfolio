"use client";

import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      // Set custom properties on document element for CSS-based glow coordinates
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (!mounted) return null;

  // Generate some static random parameters for CSS particles to avoid layout shifts
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${(i * 7.7) % 100}%`,
    top: `${(i * 13.3) % 100}%`,
    size: `${(i % 3) + 2}px`,
    delay: `${(i * 0.4).toFixed(1)}s`,
    duration: `${(i % 10) + 12}s`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#030303]">
      {/* Dynamic Mouse Glow Layer */}
      <div 
        className="absolute inset-0 transition-opacity duration-500 opacity-60"
        style={{
          background: "radial-gradient(800px circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), rgba(0, 240, 255, 0.08) 0%, rgba(168, 85, 247, 0.06) 40%, transparent 70%)"
        }}
      />

      {/* Static ambient giant glowing spheres */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-neon-blue/10 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full bg-neon-purple/10 blur-[150px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Cyber Grid Layer */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Futuristic grid scanlines / overlay */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#030303] opacity-80" />

      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-white opacity-20 animate-float"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
              boxShadow: "0 0 8px rgba(255, 255, 255, 0.5)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
