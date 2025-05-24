import { memo } from "react";
import dynamic from "next/dynamic";
const Timeline = dynamic(() => import("./ui/Timeline"));
import { workExperience } from "@/data";

/**
 * Component for displaying work experiences.
 *
 * @remarks
 * This component is a Next.js page component. It uses the {@link Timeline} component
 * to display the work experiences data.
 *
 * @returns The JSX element for the work experiences component.
 */
const WorkExperiences = memo(() => {
  return (
    <section id="experiences">
      <div className="relative w-full overflow-clip px-5">
        <Timeline data={workExperience} />
      </div>
    </section>
  );
});

WorkExperiences.displayName = "WorkExperiences";

export default WorkExperiences;
