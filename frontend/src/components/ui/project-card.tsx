"use client";

import * as React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProjectCardProps extends React.HTMLAttributes<HTMLDivElement> {
  imgSrc: string;
  title: string;
  description: string;
  link: string;
  linkText?: string;
  tags?: string[];
}

const ProjectCard = React.forwardRef<HTMLDivElement, ProjectCardProps>(
  ({ className, imgSrc, title, description, link, linkText = "View Project", tags, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-500 ease-in-out hover:-translate-y-2 hover:shadow-xl",
          "border-border-subtle", 
          className
        )}
        {...props}
      >
        {/* Optimized Image Handler */}
        <div className="aspect-video overflow-hidden border-b border-border-subtle bg-slate-100 dark:bg-slate-800">
          <img
            src={imgSrc}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070";
            }}
          />
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-6">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.map((tag) => (
                <span key={tag} className="text-[10px] font-mono font-bold uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-2 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
          
          <h3 className="text-xl font-bold tracking-tight text-text-main transition-colors duration-300 group-hover:text-brand-primary">
            {title}
          </h3>
          
          <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">
            {description}
          </p>
          
          {/* External Link */}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="group/button mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-primary transition-all duration-300 hover:gap-3"
            onClick={(e) => e.stopPropagation()} 
          >
            {linkText}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1" />
          </a>
        </div>
      </div>
    );
  }
);
ProjectCard.displayName = "ProjectCard";

export { ProjectCard };