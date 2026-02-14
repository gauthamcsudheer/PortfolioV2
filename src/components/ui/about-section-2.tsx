"use client";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { useRef } from "react";

export default function AboutSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.4,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: 40,
      opacity: 0,
    },
  };

  const textVariants = {
    visible: (i: number) => ({
      filter: "blur(0px)",
      opacity: 1,
      transition: {
        delay: i * 0.3,
        duration: 0.7,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
    },
  };

  return (
    <section id="about" className="pt-32 pb-50 px-4 bg-bg-page transition-colors duration-300 flex items-center">
      <div className="max-w-6xl mx-auto" ref={heroRef}>
        <div className="flex flex-col lg:flex-row items-start gap-8">
          <div className="flex-1">
            <TimelineContent
              as="h1"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl !leading-[120%] font-black tracking-tighter text-text-main mb-8 uppercase"
            >
              I am{" "}
              <TimelineContent
                as="span"
                animationNum={1}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-brand-primary border-2 border-brand-primary/50 border-dotted px-3 rounded-xl inline-block"
              >
                architecting
              </TimelineContent>{" "}
              complex web systems to be highly scalable and AI-driven. My goal is to bridge the gap between human needs and{" "}
              <TimelineContent
                as="span"
                animationNum={2}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-orange-500 border-2 border-orange-500/50 border-dotted px-3 rounded-xl inline-block"
              >
                machine intelligence
              </TimelineContent>{" "}
              to build software that actually{" "}
              <TimelineContent
                as="span"
                animationNum={3}
                timelineRef={heroRef}
                customVariants={textVariants}
                className="text-emerald-500 border-2 border-emerald-500/50 border-dotted px-3 rounded-xl inline-block"
              >
                empowers you.
              </TimelineContent>
            </TimelineContent>
          </div>
        </div>
      </div>
    </section>
  );
}