"use client";

import { useEffect, useState } from "react";
import { ProjectCard } from "@/components/ui/project-card";
// --- Import the dynamic base URL ---
import { API_BASE_URL } from "@/lib/api";

// Define the Project type based on your Mongoose Schema
interface Project {
  _id: string;
  title: string;
  description: string;
  imgSrc: string;
  link: string;
  tags: string[];
  orderIndex: number;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Updated to use the dynamic API_BASE_URL constant
        const response = await fetch(`${API_BASE_URL}/projects`);
        if (!response.ok) throw new Error("Failed to fetch projects");
        
        const data = await response.json();
        
        // Ensure data is sorted by orderIndex for the correct display hierarchy
        setProjects(data.sort((a: Project, b: Project) => a.orderIndex - b.orderIndex));
      } catch (err) {
        console.error("Project fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 bg-bg-page transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col mb-12">
          <h2 className="text-3xl font-black tracking-tighter uppercase text-text-main">
            Selected Builds
          </h2>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video w-full rounded-2xl bg-border-subtle/20 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                title={project.title}
                description={project.description}
                imgSrc={project.imgSrc}
                link={project.link}
                tags={project.tags}
              />
            ))}
          </div>
        )}

        {projects.length === 0 && !loading && (
          <p className="text-center text-text-muted font-mono italic">
            Initializing system builds... Check back soon.
          </p>
        )}
      </div>
    </section>
  );
}