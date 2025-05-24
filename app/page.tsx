"use client";

import dynamic from "next/dynamic";
import Footer from "@/components/Footer";
import { ResizableNavbar } from "@/components/Navbar";
const Hero = dynamic(() => import("@/components/Hero"), {
  ssr: false,
  loading: () => <div style={{ height: 400 }} />,
});
const Grid = dynamic(() => import("@/components/Grid"), {
  ssr: false,
  loading: () => <div style={{ height: 400 }} />,
});
const WorkExperiences = dynamic(() => import("@/components/WorkExperiences"), {
  ssr: false,
  loading: () => <div style={{ height: 400 }} />,
});
const Projects = dynamic(() => import("@/components/Projects"), {
  ssr: false,
  loading: () => <div style={{ height: 400 }} />,
});

/**
 * The main entry point of the entire app.
 *
 * This component will render every single other components.
 *
 * @returns The main entry point of the app.
 */
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
