import React, { forwardRef } from "react";
import MagicButton from "./ui/MagicButton";
import { FaAngleDoubleDown } from "react-icons/fa";

const Hero = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section id="hero" ref={ref}>
      <div className="relative w-full pb-20 pt-36 overflow-hidden">
        <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-white dark:bg-black bg-dot-neutral-700 opacity-25 dark:opacity-50">
          {/* Radial gradient for the container to give a faded look */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
        </div>

        <div className="relative z-10 my-20 flex justify-center">
          <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
            <h2 className="max-w-80 text-center text-xs uppercase tracking-widest text-black-200 dark:text-blue-100 pb-2">
              Well Portfolio
            </h2>

            <h1 className="text-4xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-400 to-neutral-700 dark:from-neutral-50 dark:to-neutral-400 bg-opacity-80 dark:bg-opacity-50">
              Transforming Your Idea Into Reality
            </h1>
            <p className="my-4 font-normal text-sm md:text-base text-black-200 dark:text-neutral-300 max-w-lg text-center mx-auto">
              Hi! I&apos;m Well, a Software Developer based in Indonesia.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
