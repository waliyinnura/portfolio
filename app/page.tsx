"use client";

import Footer from "@/components/Footer";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { ResizableNavbar } from "@/components/Navbar";
import { Projects } from "@/components/Projects";
import WorkExperiences from "@/components/WorkExperiences";

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
