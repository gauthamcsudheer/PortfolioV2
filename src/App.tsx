import { Navbar } from "@/components/ui/navbar"
import Hero from "@/components/hero"
import AboutSection from "./components/ui/about-section-2"
import ExperienceSection from "./components/experience"

function App() {
  return (
    <div className="relative">
      <Navbar />
      <Hero />
      <AboutSection />
      <ExperienceSection />
    </div>
  )
}

export default App