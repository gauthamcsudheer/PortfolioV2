import React from 'react';
import {Navbar} from './components/ui/navbar';
import Hero from './components/hero';
import AboutSection from './components/ui/about-section-2';
import ExperienceSection from './components/experience';
import ProjectsSection from './components/projects';
import { ContactSection } from './components/contact';
import { StackedCircularFooter } from './components/ui/stacked-circular-footer';

function App() {
  return (
    <div className="relative min-h-screen bg-bg-page text-text-main font-sans selection:bg-brand-primary/30">
      {/* The Global Navbar stays fixed to provide constant navigation 
        throughout your full-stack journey.
      */}
      <Navbar />

      <main>
        {/* 1. IDENTITY: High-impact introduction to Gautham Sudheer.
        */}
        <Hero />

        {/* 2. PHILOSOPHY: Your mission of architecting scalable systems 
             with machine intelligence.
        */}
        <AboutSection />

        {/* 3. CREDIBILITY: Chronicling your 9.24 CGPA, ML Honours, 
             and Digital Specialist Engineer role at Infosys.
        */}
        <ExperienceSection />

        {/* 4. PROOF: Showcasing technical builds like Discussify and Synapse.
        */}
        <ProjectsSection />

        {/* 5. CONVERSION: Turning project ideas into reality.
        */}
        <ContactSection />
      </main>

      {/* 6. CLOSURE: Reconnecting via LinkedIn, GitHub, and Instagram.
      */}
      <StackedCircularFooter />
    </div>
  );
}

export default App;