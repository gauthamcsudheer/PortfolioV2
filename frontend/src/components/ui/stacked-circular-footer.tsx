"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Github, Instagram, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

function StackedCircularFooter() {
  const currentYear = 2026; //

  return (
    <footer className="bg-bg-page py-12 border-t border-border-subtle transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center">
          
          {/* Brand Logo - Matches Navbar GCS. branding */}
          <div className="mb-8 flex items-center justify-center">
            <span className="text-3xl font-black tracking-tighter text-text-main uppercase">
              GCS<span className="text-brand-primary">.</span>
            </span>
          </div>

          {/* Navigation - Standard Anchor Tags for Vite Performance */}
          <nav className="mb-8 flex flex-wrap justify-center gap-6 text-sm font-bold uppercase tracking-widest font-mono text-text-muted">
            <a href="#about" className="hover:text-brand-primary transition-colors">About</a>
            <a href="#experience" className="hover:text-brand-primary transition-colors">Experience</a>
            <a href="#projects" className="hover:text-brand-primary transition-colors">Projects</a>
            <a href="#contact" className="hover:text-brand-primary transition-colors">Contact</a>
          </nav>

          {/* Targeted Social Icons */}
          <div className="mb-8 flex space-x-6">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-border-subtle hover:bg-brand-primary hover:text-white transition-all shadow-lg shadow-brand-primary/10"
              asChild
            >
              <a href="https://linkedin.com/in/gauthamcsudheer" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-4 w-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-border-subtle hover:bg-brand-primary hover:text-white transition-all shadow-lg shadow-brand-primary/10"
              asChild
            >
              <a href="https://github.com/gauthamcsudheer" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                <span className="sr-only">GitHub</span>
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-border-subtle hover:bg-brand-primary hover:text-white transition-all shadow-lg shadow-brand-primary/10"
              asChild
            >
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </a>
            </Button>
          </div>

          {/* Credits & Tenure Metadata */}
          <div className="text-center">
            <p className="text-[10px] text-text-muted font-mono uppercase tracking-[0.2em] mb-2">
              Digital Specialist Engineer @ Infosys
            </p>
            <p className="text-[10px] text-text-muted font-mono uppercase tracking-[0.2em]">
              © {currentYear} Gautham C Sudheer. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { StackedCircularFooter };