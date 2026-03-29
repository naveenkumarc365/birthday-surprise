import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "../lib/cn";
import { radii } from "../lib/theme";

import mem1 from "../assets/memories/photo-1.jpeg";
import mem2 from "../assets/memories/photo-2.jpeg";
import mem3 from "../assets/memories/photo-3.jpeg";
import mem4 from "../assets/memories/photo-4.jpeg";
import mem5 from "../assets/memories/photo-5.jpeg";
import mem6 from "../assets/memories/photo-6.jpeg";
import mem7 from "../assets/memories/photo-7.jpeg";
import mem8 from "../assets/memories/photo-8.jpeg";
import mem9 from "../assets/memories/photo-9.jpeg";
import mem10 from "../assets/memories/photo-10.jpeg";

const MEMORIES = [
  { image: mem1 },
  { image: mem2 },
  { image: mem3 },
  { image: mem4 },
  { image: mem5 },
  { image: mem6 },
  { image: mem7 },
  { image: mem8 },
  { image: mem9 },
  { image: mem10 },
];

function MemoryFrame({ memory, index, progress, total }) {
  // Use scroll space from 0.05 to 1.0. Each image gets an equal fraction.
  const chunk = 0.95 / total;
  const start = 0.05 + index * chunk;
  const end = start + chunk;
  
  // Fading overlap
  const fade = 0.03;
  
  const fadeInStart = index === 0 ? 0 : start - fade;
  const fadeInEnd = index === 0 ? 0 : start + fade;
  
  // Last image stays 100% opaque until the section literally scrolls out of the viewport
  const fadeOutStart = index === total - 1 ? 1.0 : end - fade;
  const fadeOutEnd = index === total - 1 ? 1.0 : end + fade;

  const opacity = useTransform(
    progress,
    [fadeInStart, fadeInEnd, fadeOutStart, fadeOutEnd],
    [0, 1, 1, 0]
  );
  
  // Richer, slower cinematic movement: zoom, vertical drift, and a slow twist
  const scale = useTransform(progress, [fadeInStart, fadeOutEnd], [0.90, 1.05]);
  const y = useTransform(progress, [fadeInStart, fadeOutEnd], [30, -30]);
  const rotate = useTransform(
    progress, 
    [fadeInStart, fadeOutEnd], 
    [index % 2 === 0 ? -3 : 3, index % 2 === 0 ? 3 : -3]
  );

  return (
    <motion.div 
      style={{ opacity, scale, y, rotate }} 
      className="absolute inset-0 flex items-center justify-center pointer-events-none px-6 sm:px-10 z-10 pt-20 sm:pt-24"
    >
      <div className={cn(
        "relative p-3 sm:p-5 bg-white/[0.04] backdrop-blur-2xl border border-white/10 shadow-[0_32px_80px_-16px_rgba(10,5,30,0.8)]",
        "rounded-[20px] sm:rounded-[28px]"
      )}>
        {/* Smaller sizing for magnificent breathing room */}
        <div className="relative overflow-hidden aspect-[4/5] h-[52vh] max-h-[380px] sm:max-h-[480px] w-auto max-w-[85vw] rounded-[12px] sm:rounded-[16px]">
          <img 
            src={memory.image} 
            alt="Memory"
            className="w-full h-full object-cover filter contrast-[1.05] saturate-[0.75] sepia-[0.2] brightness-[0.95]"
            loading={index < 2 ? "eager" : "lazy"}
          />
          
          {/* Deep edge vignette burn to make it feel like authentic film */}
          <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] mix-blend-multiply rounded-[12px] sm:rounded-[16px]" />
          
          {/* Cinematic Light Leak (soft pink/purple glow crossing the glass) */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FFB8E0]/15 via-transparent to-[#9D7AFF]/25 mix-blend-screen" />
          
          {/* Base bottom darkening for visual grounding */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/40 mix-blend-overlay" />
          
          {/* Subtle heavy grain film noise */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-25 mix-blend-overlay" />
          
          {/* Sharp glass highlight border */}
          <div className="absolute inset-0 border border-white/20 mix-blend-overlay rounded-[12px] sm:rounded-[16px]" />
        </div>
      </div>
    </motion.div>
  );
}

function MemoryLane() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Intro text rapidly fades out as the user begins the very first physical scroll inside the 800vh container
  const textOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.05], [0, -30]);
  const textScale = useTransform(scrollYProgress, [0, 0.05], [1, 0.95]);

  return (
    <section 
      id="memory-lane" 
      ref={containerRef}
      className="relative h-[800vh] bg-[#1D1630]"
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex items-center justify-center">
        {/* Deep, dreamy cinematic backdrop */}
        <div className="pointer-events-none absolute inset-0 bg-[#1D1630]" />
        
        {/* Soft, glowing ambient lights */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-[400px] w-[400px] rounded-full bg-[#E5D4FF]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-0 bottom-20 h-[500px] w-[500px] rounded-full bg-[#B89FFF]/10 blur-[130px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[100vw] rounded-[100%] bg-white/[0.04] blur-[100px]" />

        {/* Intro Atmosphere Layer */}
        <motion.div 
          style={{ opacity: textOpacity, y: textY, scale: textScale }}
          className="absolute top-16 sm:top-20 left-0 right-0 flex flex-col items-center justify-start text-center px-5 z-20 pointer-events-none"
        >
          <p className="text-[11px] uppercase tracking-[0.24em] text-[#E5D9F2]/60">
            A QUIET STREAM
          </p>
          <h2 className="mt-3 font-serif text-[32px] sm:text-[40px] leading-tight text-[#FFFFFF] drop-shadow-md">
            Memories in the mist
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-[14.5px] italic leading-relaxed text-[#D2C5EA]/80 sm:text-[16px]">
            Keep scrolling down to walk through them softly.
          </p>
          
          <motion.div 
            animate={{ y: [0, 6, 0], opacity: [0.3, 0.8, 0.3] }} 
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="mt-10 text-[#E5D9F2]/50"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12l7 7 7-7"/>
            </svg>
          </motion.div>
        </motion.div>

        {/* Cinematic Memory Sequences */}
        {MEMORIES.map((memory, index) => (
          <MemoryFrame 
            key={index}
            memory={memory} 
            index={index} 
            progress={scrollYProgress} 
            total={MEMORIES.length} 
          />
        ))}

        {/* A subtle base gradient ensures the photos never hard-clip at the screen bottom if bounds shift slightly */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#1A132C] to-transparent z-30 opacity-60" />
      </div>
    </section>
  );
}

export default MemoryLane;
