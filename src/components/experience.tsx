"use client";

import React, { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utils";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-3xl font-black tracking-tighter uppercase mb-16 text-text-main">
    {children}
  </h2>
);

const ExperienceCard = ({ year, title, subtitle, description, tags, timelineRef, animationNum }: any) => (
  <TimelineContent
    as="div"
    animationNum={animationNum}
    timelineRef={timelineRef}
    className="group relative pl-8 pb-16 border-l border-border-subtle last:pb-0"
  >
    {/* Architectural Node */}
    <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] bg-brand-primary rounded-full transition-transform group-hover:scale-150 shadow-[0_0_10px_var(--color-brand-primary)]" />
    
    <span className="text-[12px] font-bold text-brand-primary uppercase tracking-[0.2em] font-mono">
      {year}
    </span>
    
    <h3 className="text-xl font-bold mt-2 text-text-main tracking-tight">{title}</h3>
    <h4 className="text-sm font-semibold text-text-muted mb-6 uppercase tracking-widest">{subtitle}</h4>
    
    <p className="text-sm text-text-muted max-w-xl leading-relaxed text-justify mb-6">
      {description}
    </p>

    {tags && (
      <div className="flex flex-wrap gap-2">
        {tags.map((tag: string) => (
          <span key={tag} className="px-3 py-1 text-[10px] border border-border-subtle rounded-full text-text-muted font-mono uppercase tracking-wider bg-text-main/5">
            {tag}
          </span>
        ))}
      </div>
    )}
  </TimelineContent>
);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section id="experience" className="py-24 px-6 bg-bg-page transition-colors duration-300" ref={sectionRef}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Professional Experience Column */}
        <div>
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-0">
            <ExperienceCard 
              animationNum={0}
              timelineRef={sectionRef}
              year="2025 — PRESENT"
              title="Digital Specialist Engineer"
              subtitle="Infosys"
              description="Engineering specialized web solutions with a focus on full-stack architecture and machine intelligence integration. Optimizing enterprise-grade systems for performance and scalability."
              tags={["MERN Stack", "TypeScript", "System Design"]}
            />
          </div>
        </div>

        {/* Academic Foundation Column */}
        <div>
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-0">
            <ExperienceCard 
              animationNum={1}
              timelineRef={sectionRef}
              year="2021 — 2025"
              title="B.Tech Computer Science & Engineering"
              subtitle="Rajagiri School of Engineering & Technology"
              description="Graduated with high honors, focusing on machine intelligence and scalable computing systems. Actively led technical student initiatives as Secretary of the ACM student chapter."
              tags={["9.24 CGPA", "Honours in ML"]}
            />
          </div>
        </div>

      </div>
    </section>
  );
}