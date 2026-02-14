"use client"

import React, { useState, useEffect, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import profileImg from "@/assets/profile.jpg";

// --- BlurText Animation Component ---
interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  className?: string;
  style?: React.CSSProperties;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 50,
  animateBy = "words",
  direction = "top",
  className = "",
  style,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <p ref={ref} className={cn("inline-flex flex-wrap justify-center", className)} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-20px" : "20px"})`,
            transition: `all 0.5s ease-out ${i * delay}ms`,
          }}
        >
          {segment === " " ? "\u00A0" : segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </p>
  );
};

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove); // Fixed Typo
  }, []);

  return (
    <div className={cn(
      "relative min-h-screen overflow-hidden transition-colors duration-300",
      "bg-bg-page text-text-main" 
    )}>
      {/* Background Engineering Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(var(--color-brand-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-primary) 1px, transparent 1px)`, 
           backgroundSize: '40px 40px' }} />

      {/* Interactive Spotlight */}
      <div className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
           style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.04), transparent 80%)` }} />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center md:justify-start px-4 md:pt-32">
        
        {/* Super Condensed Name Stack */}
        <div className="relative text-center w-full max-w-7xl">
          <div className="flex flex-col items-center space-y-24 md:-space-y-10 lg:-space-y-12">
            <BlurText
              text="GAUTHAM"
              delay={80}
              animateBy="letters"
              className={cn(
                "font-bold uppercase transition-transform origin-center tracking-[-0.03em] sm:tracking-[-0.05em]",
                "text-[75px] scale-y-[3.0] sm:text-[140px] sm:scale-y-[1.8] md:text-[160px] lg:text-[210px] lg:scale-y-[1.4]" 
              )}
              style={{ color: "var(--color-brand-primary)", fontFamily: "'Fira Code', monospace" }}
            />
            
            <BlurText
              text="SUDHEER"
              delay={80}
              animateBy="letters"
              className={cn(
                "font-bold uppercase transition-transform origin-center tracking-[-0.03em] sm:tracking-[-0.05em]",
                "text-[75px] scale-y-[3.0] sm:text-[140px] sm:scale-y-[1.8] md:text-[160px] lg:text-[210px] lg:scale-y-[1.4]"
              )}
              style={{ color: "var(--color-brand-primary)", fontFamily: "'Fira Code', monospace" }}
            />
          </div>

          {/* Profile Picture Overlay */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <div className={cn(
              "w-[95px] h-[160px] sm:w-[120px] sm:h-[200px] md:w-[130px] md:h-[235px] lg:w-[150px] lg:h-[250px] rounded-full border-4 overflow-hidden transition-all duration-500 hover:scale-110 grayscale hover:grayscale-0",
              "border-white shadow-xl dark:border-bg-dark bg-bg-dark"
            )}>
              <img src={profileImg} alt="Gautham C Sudheer" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Tagline using High-Contrast Semantic Variables */}
        <div className="mt-12 md:mt-4 max-w-2xl px-6 text-center">
          <BlurText
            text="Architecting scalable web solutions with machine intelligence."
            delay={100}
            animateBy="words"
            className="text-[10px] sm:text-sm md:text-base lg:text-lg text-text-muted font-mono tracking-[0.2em] uppercase"
          />
        </div>
      </main>
    </div>
  );
}