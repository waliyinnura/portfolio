import React from "react";
import { Timeline } from "./ui/Timeline";
import { workExperience } from "@/data";

const WorkExperiences = () => (
  <section id="experiences">
    <div className="relative w-full overflow-clip px-5">
      <Timeline data={workExperience} />
    </div>
  </section>
);

export default WorkExperiences;
