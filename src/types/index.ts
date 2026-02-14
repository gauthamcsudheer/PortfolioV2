export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  category: 'Full-Stack' | 'AI/ML' | 'Web';
}