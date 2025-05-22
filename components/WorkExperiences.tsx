import React from "react";
import { Timeline } from "./ui/Timeline";
import { workExperience } from "@/data";

const WorkExperiences = React.memo(() => {
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
