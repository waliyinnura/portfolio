import { memo, useEffect, useRef, useState } from "react";
import { FlipWords } from "./ui/FlipWords";
import { wordsHero } from "@/data";

/**
 * The Hero component.
 *
 * @remarks
 * This component renders the hero section of the website. It displays a
 * heading with a rotating word and a call to action button.
 */
const Hero = memo(() => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (node) observer.observe(node);
    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return (
    <section id="hero" className="relative w-full pb-20 pt-36 overflow-hidden">
      <div className="absolute inset-0 flex h-screen items-center justify-center md:bg-dot-neutral-700 bg-white dark:bg-black opacity-20 dark:opacity-60">
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white dark:bg-black md:[mask-image:radial-gradient(ellipse_at_center,transparent_10%,black)]"></div>
      </div>
      <div className="relative z-10 my-20 flex justify-center" ref={ref}>
        <div className="flex max-w-[89vw] flex-col items-center justify-center md:max-w-2xl lg:max-w-[60vw]">
          <h2 className="max-w-80 text-center text-[0.6rem] md:text-xs uppercase tracking-widest text-neutral-700 dark:text-neutral-400 pb-2">
            Well Portfolio
          </h2>
          <h1 className="text-3xl md:text-6xl lg:text-7xl font-bold text-center text-neutral-700 dark:text-neutral-400 ">
            Transforming Your Idea Into{" "}
            <span className="text-blue-300">Reality</span>
          </h1>
          <span className="my-4 font-normal text-[0.7rem] md:text-base text-neutral-700 dark:text-neutral-400 max-w-lg text-center mx-auto">
            Hi! I&apos;m Well, a {isVisible && <FlipWords words={wordsHero} />}
            Developer based in Indonesia.
          </span>
        </div>
      </div>
    </section>
  );
});
Hero.displayName = "Hero";

export default Hero;
