import { memo } from "react";
import dynamic from "next/dynamic";
const Timeline = dynamic(() => import("./ui/Timeline"));
import { workExperience } from "@/data";

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
