"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import BackgroundEffects from "@/components/BackgroundEffects";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";
import TerminalEasterEgg from "@/components/TerminalEasterEgg";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Blank server-render matching styling background to prevent layout flicker
    return <div className="fixed inset-0 bg-[#030303]" />;
  }

  return (
    <>
      {/* Loading boot screen */}
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Main App Content */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative min-h-screen flex flex-col"
        >
          {/* Background Ambient Layout */}
          <BackgroundEffects />
          
          {/* Custom Cursor System */}
          <CustomCursor />

          {/* Hidden Keyboard Easter Egg terminal */}
          <TerminalEasterEgg />

          {/* Navigation */}
          <Navbar />

          {/* Sections */}
          <main className="flex-1 w-full relative z-10">
            <Hero />
            
            {/* Divider lines between major blocks */}
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
            </div>
            
            <About />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
            </div>
            
            <Skills />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
            </div>
            
            <Projects />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
            </div>
            
            <Experience />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12">
              <div className="h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
            </div>
            
            <Contact />
          </main>

          {/* Footer */}
          <Footer />
        </motion.div>
      )}
    </>
  );
}
