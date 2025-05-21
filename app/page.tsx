"use client";

import Footer from "@/components/Footer";
// import { Cards } from "@/components/Cards";
import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { ResizableNavbar } from "@/components/Navbar";
// import { Phase } from "@/components/Phase";
import { Projects } from "@/components/Projects";
import WorkExperiences from "@/components/WorkExperiences";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  return (
    <main className="relative w-full flex flex-col items-center justify-center overflow-hidden md:overflow-visible bg-white dark:bg-black">
      <div className="w-full max-w-7xl">
        <ResizableNavbar />
        <Hero ref={heroRef} />
        <Grid />
        {/* <Cards /> */}
        <Projects />
        <WorkExperiences />
        {/* <Phase /> */}
        <Footer />
      </div>
    </main>
  );
}
