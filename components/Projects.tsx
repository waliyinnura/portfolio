"use client";
import React from "react";
import { HoverEffect } from "./ui/HoverEffect";
import { projects } from "@/data";
import AnimatedSection from "./AnimatedSection";
// import { PinContainer } from "./ui/3dPin";

export function Projects() {
  return (
    <AnimatedSection>
      <section id="projects">
        <div className="max-w-7xl mx-auto px-4">
          <HoverEffect items={projects} />
        </div>
      </section>
    </AnimatedSection>
  );
}
