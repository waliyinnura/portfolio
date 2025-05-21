"use client";
import React from "react";
import { HoverEffect } from "./ui/HoverEffect";
import { projects } from "@/data";
import { LinkPreview } from "./ui/LinkPreview";

export function Projects() {
  return (
    <section id="projects" className="w-full mx-auto px-4">
      <HoverEffect items={projects} />
      <div className="text-end pb-10 mr-3 z-[99] relative">
        <LinkPreview
          url="https://github.com/waliyinnura?tab=repositories"
          className="font-bold"
        >
          See more
        </LinkPreview>
      </div>
    </section>
  );
}
