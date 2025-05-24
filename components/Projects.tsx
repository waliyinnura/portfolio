import { memo } from "react";
import dynamic from "next/dynamic";
const HoverEffect = dynamic(() => import("./ui/HoverEffect"));
import { projects } from "@/data";
import { LinkPreview } from "./ui/LinkPreview";

/**
 * Component for displaying projects.
 *
 * @remarks
 * This component is a Next.js page component. It uses the {@link HoverEffect} component
 * to display the projects data.
 *
 * @returns The JSX element for the projects component.
 */
const Projects = memo(() => {
  return (
    <section id="projects" className="w-full mx-auto px-4">
      <HoverEffect items={projects} />
      <div className="text-end pb-10 mr-3 z-[99] relative">
        <LinkPreview
          url="https://github.com/waliyinnura?tab=repositories"
          className="font-bold"
        >
          See Github
        </LinkPreview>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;
