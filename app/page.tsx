"use client";

import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import { ResizableNavbar } from "@/components/Navbar";
const Hero = dynamic(() => import("@/components/Hero"));
const Grid = dynamic(() => import("@/components/Grid"));
const WorkExperiences = dynamic(() => import("@/components/WorkExperiences"));
const Projects = dynamic(() => import("@/components/Projects"));

export default function Home() {
  return (
    <main className="relative w-full flex flex-col items-center justify-center overflow-hidden md:overflow-visible bg-white dark:bg-black">
      <div className="w-full max-w-7xl">
        <ResizableNavbar />
        <Hero />
        <Grid />
        <WorkExperiences />
        <Projects />
        <Footer />
      </div>
    </main>
  );
}
