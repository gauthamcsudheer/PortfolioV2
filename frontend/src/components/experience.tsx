"use client";

import React, { useRef, useEffect, useState } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { cn } from "@/lib/utils";

// --- Types ---
interface Milestone {
  _id: string;
  type: 'work' | 'education';
  year: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  orderIndex: number;
}

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
    <div className="absolute left-[-5px] top-[0px] w-[9px] h-[9px] bg-brand-primary rounded-full transition-transform group-hover:scale-150 shadow-[0_0_10px_var(--color-brand-primary)] z-10" />
    
    <div className="flex flex-col">
      <span className="text-[10px] leading-none font-bold text-brand-primary uppercase tracking-[0.2em] font-mono mb-3">
        {year}
      </span>
      
      <h3 className="text-xl font-bold text-text-main tracking-tight">{title}</h3>
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
    </div>
  </TimelineContent>
);

export default function ExperienceSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/experience");
        const data = await response.json();
        // Sorting by orderIndex as defined in your Admin panel
        setMilestones(data.sort((a: Milestone, b: Milestone) => a.orderIndex - b.orderIndex));
      } catch (err) {
        console.error("Timeline sync error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, []);

  const workExperience = milestones.filter(m => m.type === 'work');
  const educationHistory = milestones.filter(m => m.type === 'education');

  return (
    <section id="experience" className="mt-12 py-24 px-6 bg-bg-page transition-colors duration-300" ref={sectionRef}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Professional Experience Column */}
        <div>
          <SectionTitle>Experience</SectionTitle>
          <div className="space-y-0">
            {loading ? (
              <div className="h-32 w-full bg-border-subtle/10 animate-pulse rounded-xl" />
            ) : (
              workExperience.map((item, index) => (
                <ExperienceCard 
                  key={item._id}
                  animationNum={index}
                  timelineRef={sectionRef}
                  {...item}
                />
              ))
            )}
          </div>
        </div>

        {/* Academic Foundation Column */}
        <div>
          <SectionTitle>Education</SectionTitle>
          <div className="space-y-0">
            {loading ? (
              <div className="h-32 w-full bg-border-subtle/10 animate-pulse rounded-xl" />
            ) : (
              educationHistory.map((item, index) => (
                <ExperienceCard 
                  key={item._id}
                  animationNum={index + workExperience.length}
                  timelineRef={sectionRef}
                  {...item}
                />
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}