"use client";

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, RefreshCcw, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bg-page flex flex-col items-center justify-center p-6 text-center overflow-hidden relative">
      {/* Background Decorative Element */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black italic">
          404
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <div className="flex items-center justify-center gap-2 mb-6 text-brand-primary">
          <Terminal size={24} className="animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] font-black">
            System.Error: Path_Not_Defined
          </span>
        </div>

        <h1 className="text-8xl md:text-9xl font-black italic tracking-tighter uppercase mb-4 relative">
          Lost <span className="text-brand-primary">.</span>
        </h1>

        <p className="text-text-muted max-w-md mx-auto mb-12 text-sm md:text-base leading-relaxed">
          The architectural coordinates you requested do not exist in the current deployment. 
          Perhaps the record was moved or never initialized.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/">
            <Button size="lg" className="rounded-2xl px-8 gap-2 font-black uppercase tracking-widest">
              <Home size={18} /> Back to Nexus
            </Button>
          </Link>
          
          <Button 
            variant="outline" 
            size="lg" 
            onClick={() => window.location.reload()}
            className="rounded-2xl px-8 gap-2 border-border-subtle text-text-muted hover:text-text-main"
          >
            <RefreshCcw size={18} /> Retry Sync
          </Button>
        </div>
      </motion.div>

      {/* Animated Glitch Bar */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-1 bg-brand-primary/20"
        animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}