import React, { forwardRef } from 'react';
import { Spotlight } from './ui/Spotlight';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import MagicButton from './ui/MagicButton';
import { FaAngleDoubleDown } from 'react-icons/fa';

const Hero = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section id="hero" ref={ref}>
      <div className="relative pb-20 pt-36">
        <div>
          <Spotlight className="-left-10 -top-40 h-screen md:-left-32 md:-top-20" fill="white" />
          <Spotlight className="left-full top-10 h-[80vh] w-[50vw]" fill="rgba(197,179,88,0.3)" />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="rgba(197,179,88,0.8)" />
        </div>

        <div className="absolute left-0 top-0 flex h-screen w-full items-center justify-center bg-black bg-grid-[rgba(197,179,88,0.1)]">
          {/* Radial gradient for the container to give a faded look */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        </div>

        <div className="relative z-10 my-20 flex justify-center">
          <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
            <h2 className="max-w-80 text-center text-xs uppercase tracking-widest text-blue-100">
              Well Portfolio
            </h2>

            <TextGenerateEffect
              className="text-center text-[40px] md:text-5xl lg:text-6xl"
              words="Transforming Your Idea into Reality"
            />

            <p className="mb-4 text-center text-sm text-blue-100 md:text-xl md:tracking-wider lg:text-2xl">
              Hi I&apos;m Well, a Software Developer based in Indonesia
            </p>

            <a href="#about">
              <MagicButton title="Show my work" icon={<FaAngleDoubleDown />} position="right" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Hero;
