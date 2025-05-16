"use client";
import React from "react";
import { HoverEffect } from "./ui/HoverEffect";
import { projects } from "@/data";
import { LinkPreview } from "./ui/LinkPreview";

export function Projects() {
  return (
    <section id="projects">
      <div className="max-w-7xl mx-auto px-4">
        <HoverEffect items={projects} />
        <div className="relative text-end pb-10 mr-3 z-[99]">
          <LinkPreview
            url="https://github.com/waliyinnura?tab=repositories"
            className="font-bold"
          >
            See more
          </LinkPreview>
        </div>
      </div>
    </section>
  );
}
