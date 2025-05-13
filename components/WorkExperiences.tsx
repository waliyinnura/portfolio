import React from "react";
import { Timeline } from "./ui/Timeline";
import AnimatedSection from "./AnimatedSection";
import { workExperience } from "@/data";

const WorkExperiences = () => {
  return (
    <AnimatedSection>
      <section id="experiences">
        <div className="relative w-full overflow-clip">
          <Timeline data={workExperience} />
        </div>
      </section>
    </AnimatedSection>
  );
};

export default WorkExperiences;
