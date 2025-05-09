'use client';

import { FloatingDockComponents } from '@/components/Dock';
import Grid from '@/components/Grid';
import Hero from '@/components/Hero';
import { ResizableNavbar } from '@/components/Navbar';
import WorkExperiences from '@/components/WorkExperiences';

export default function Home() {
  return (
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-hidden md:overflow-visible bg-black px-5 sm:px-10">
      <div className="w-full max-w-7xl">
        {/* <div className="w-full max-w-screen-2xl"> */}
        <ResizableNavbar />
        <Hero />
        <Grid />
        <WorkExperiences />
        <FloatingDockComponents />
      </div>
    </main>
  );
}
