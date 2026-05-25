"use client";

import { useEffect, useState } from "react";
import { Menu, X, Cpu } from "lucide-react";
import AudioToggle from "./AudioToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navLinks = [
    { name: "Home", href: "#home", id: "home" },
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Experience", href: "#experience", id: "experience" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Add background glassmorphism when scrolled
      setIsScrolled(window.scrollY > 20);

      // Track active section on scroll
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    if (elem) {
      const offset = elem.offsetTop - 80;
      window.scrollTo({
        top: offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-cyber-black/75 backdrop-blur-md border-b border-white/5 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, "#home")}
          className="flex items-center gap-2 group font-display text-white font-bold select-none text-base md:text-lg tracking-wider"
          data-clickable
        >
          <Cpu className="text-neon-blue group-hover:rotate-90 transition-transform duration-500" size={18} />
          <span>NISHANT RANKAWAT</span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 font-mono text-xs tracking-widest text-zinc-400">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative py-1 hover:text-white transition-colors duration-200 ${
                    activeSection === link.id ? "text-neon-blue font-semibold" : ""
                  }`}
                  data-clickable
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-blue rounded-full shadow-[0_0_8px_#00f0ff]" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="h-4 w-[1px] bg-white/10" />

          {/* Audio controller */}
          <AudioToggle />
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-4">
          <AudioToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-zinc-400 hover:text-white"
            data-clickable
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 top-[73px] bg-cyber-black/95 backdrop-blur-lg z-30 transition-all duration-300 md:hidden flex flex-col items-center justify-center border-t border-white/5 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <ul className="flex flex-col gap-6 text-center font-display text-lg tracking-widest text-zinc-300">
          {navLinks.map((link, index) => (
            <li
              key={link.id}
              style={{
                transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
              }}
              className={`transform transition-all duration-300 ${
                isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <a
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`py-2 px-6 block rounded-full transition-all duration-200 ${
                  activeSection === link.id
                    ? "text-neon-blue font-bold border border-neon-blue/20 bg-neon-blue/5 shadow-[0_0_15px_rgba(0,240,255,0.05)]"
                    : "hover:text-white"
                }`}
                data-clickable
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
