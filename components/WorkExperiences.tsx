import React from "react";
import { Timeline } from "./ui/Timeline";
import { workExperience } from "@/data";

const WorkExperiences = () => {
  return (
    <section id="experiences">
      <div className="relative w-full overflow-clip">
        <Timeline data={workExperience} />
      </div>
    </section>
  );
};

export default WorkExperiences;
