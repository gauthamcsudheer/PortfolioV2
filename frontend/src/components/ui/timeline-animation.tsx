"use client";

import React, { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface TimelineContentProps {
  children: React.ReactNode;
  animationNum?: number;
  timelineRef: React.RefObject<HTMLDivElement | null>;
  customVariants?: Record<string, any>;
  as?: React.ElementType;
  className?: string;
  href?: string;
  target?: string;
  rel?: string;
}

export const TimelineContent: React.FC<TimelineContentProps> = ({
  children,
  animationNum = 0,
  timelineRef,
  customVariants,
  as: Component = "div",
  className,
  ...props
}) => {
  // Trigger animation when the section is in view
  // margin: "-20% 0px" ensures the animation starts slightly after it enters the screen
  const isInView = useInView(timelineRef, { once: true, margin: "-20% 0px" });

  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        type: "tween" as const,
      },
    }),
  };

  const variants = customVariants || defaultVariants;

  return (
    <Component className={cn(className)} {...props}>
      <motion.div
        custom={animationNum}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
      >
        {children}
      </motion.div>
    </Component>
  );
};