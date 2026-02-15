import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Public Components
import { Navbar } from './components/ui/navbar';
import Hero from './components/hero';
import AboutSection from './components/ui/about-section-2';
import ExperienceSection from './components/experience';
import ProjectsSection from './components/projects';
import { ContactSection } from './components/contact';
import { StackedCircularFooter } from './components/ui/stacked-circular-footer';

// Admin Component
import LoginPage from './pages/Login';
import AdminPage from './pages/Admin';
import { ProtectedRoute } from './components/ProtectedRoute';

/**
 * Main Portfolio Layout
 * Encapsulates the public-facing single-page experience.
 */
const PortfolioLayout = () => (
  <div className="relative min-h-screen bg-bg-page text-text-main font-sans selection:bg-brand-primary/30">
    <Navbar />
    <main>
      <Hero />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <StackedCircularFooter />
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PortfolioLayout />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;