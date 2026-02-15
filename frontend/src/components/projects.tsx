import { ProjectCard } from "@/components/ui/project-card";

export default function ProjectsSection() {
  const projects = [
    {
      title: "Discussify",
      description: "A real-time collaborative platform built on the MERN stack, designed for high-concurrency discussions and seamless state management.",
      imgSrc: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
      link: "#",
      tags: ["MERN Stack", "Socket.io", "React"]
    },
    {
      title: "Synapse",
      description: "An intelligent data processing engine that integrates machine intelligence, reflecting my specialized research in ML.",
      imgSrc: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      tags: ["AI", "ML Honours", "TypeScript"]
    },
    {
      title: "Quantum Insights",
      description: "A data visualization dashboard developed with the same technical rigor applied to my 9.24 CGPA academic background.",
      imgSrc: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      link: "#",
      tags: ["Data Viz", "Framer Motion"]
    }
  ];

  return (
    <section id="projects" className="py-24 px-6 bg-bg-page transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-black tracking-tighter uppercase mb-12 text-text-main">
          Selected Builds
        </h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}