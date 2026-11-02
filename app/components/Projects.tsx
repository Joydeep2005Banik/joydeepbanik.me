import Link from "next/link";
import projects from "@/DB/projects.json";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section className="mt-8 sm:mt-12 md:mt-16">
      <p className="section-header mb-4 sm:mb-7">Featured Projects</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {projects.map((project: any) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>

      <div className="mt-4 sm:mt-6">
        <Link href="/projects" className="btn-ghost text-sm sm:text-base">
          show all projects
        </Link>
      </div>
    </section>
  );
}
