"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const mainCursorRef = useRef<HTMLDivElement>(null);
  const secondaryCursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    // Check if device supports hover/fine pointer (e.g., desktop)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    // Add active class to body to hide default cursor
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      setHidden(false);
      const { clientX, clientY } = e;

      if (mainCursorRef.current) {
        mainCursorRef.current.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
      }

      if (secondaryCursorRef.current) {
        // Add a slight lag to the trailing secondary cursor
        secondaryCursorRef.current.animate(
          {
            transform: `translate3d(${clientX}px, ${clientY}px, 0)`,
          },
          { duration: 250, fill: "forwards" }
        );
      }
    };

    const onMouseLeave = () => {
      setHidden(true);
    };

    const onMouseEnter = () => {
      setHidden(false);
    };

    // Global listener for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-clickable]") ||
        target.classList.contains("cursor-pointer");

      const hasTextHover = target.closest("[data-hover-text]");

      setIsPointer(!!isClickable);
      setHovered(!!hasTextHover);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // Don't render cursor on mobile/touch interfaces
  if (typeof window !== "undefined" && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <>
      {/* Central Neon Dot */}
      <div
        ref={mainCursorRef}
        className={`fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-neon-blue rounded-full pointer-events-none z-50 transition-transform duration-200 ease-out will-change-transform ${
          hidden ? "opacity-0" : "opacity-100"
        } ${isPointer ? "scale-150 bg-neon-purple" : ""}`}
      />
      {/* Outer Glowing Ring */}
      <div
        ref={secondaryCursorRef}
        className={`fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-neon-blue pointer-events-none z-50 transition-[opacity,width,height,margin-left,margin-top,background-color] duration-300 ease-out will-change-transform ${
          hidden ? "opacity-0" : "opacity-40"
        } ${
          isPointer
            ? "w-12 h-12 -ml-6 -mt-6 border-neon-purple bg-neon-purple/10 opacity-70"
            : ""
        } ${
          hovered
            ? "w-16 h-16 -ml-8 -mt-8 border-neon-blue bg-neon-blue/20 opacity-80"
            : ""
        }`}
      >
        {hovered && (
          <span className="absolute inset-0 flex items-center justify-center text-[8px] uppercase tracking-widest font-display text-white font-bold animate-pulse">
            VIEW
          </span>
        )}
      </div>
    </>
  );
}
