"use client";
import { useScroll, useTransform, motion } from "motion/react";
import { memo, useEffect, useRef, useState } from "react";
import { LinkPreview } from "./LinkPreview";
import { AnimatedTooltip } from "./AnimatedTooltip";
import { FlipWords } from "./FlipWords";
import { wordsExperiences } from "@/data";

export interface TimelineEntry {
  id: number;
  title: string;
  subTitle: string;
  desc: string;
  company: string;
  jobDesc: string;
  urlPreview: string;
  iconLists: { id: number; name: string; image: string }[];
}

const Timeline = memo(({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
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

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.getBoundingClientRect().height);
    }
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      ref={containerRef}
      className="relative w-full bg-white font-sans dark:bg-black"
    >
      <div className="mx-auto max-w-7xl py-20 text-center">
        <h1 className="text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-400">
          This is <span className="text-blue-300">my</span>
          <br />
          <span className="mt-1 text-3xl font-bold leading-none md:text-6xl lg:text-7xl">
            {isVisible ? <FlipWords words={wordsExperiences} /> : "Experiences"}
          </span>
        </h1>
      </div>

      <div ref={ref} className="relative max-w-7xl pb-20">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black md:left-3">
                <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-800" />
              </div>
              <h3 className="hidden text-xl font-bold text-neutral-700 dark:text-neutral-400 md:block md:pl-20 md:text-3xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-neutral-700 dark:text-neutral-400 md:hidden">
                {item.title}
              </h3>
              <div className="relative">
                <LinkPreview
                  url={
                    item.urlPreview ||
                    "https://github.com/waliyinnura?tab=repositories"
                  }
                  className="font-bold text-neutral-700 dark:text-neutral-400 mb-8 text-xl md:text-3xl"
                >
                  {item.company}
                </LinkPreview>
                <p className="mb-8 pt-2 text-xs font-normal text-neutral-700 dark:text-neutral-400 md:text-sm">
                  {item.desc}
                </p>
                <p className="mt-8 mb-2 text-xs font-bold text-neutral-700 dark:text-neutral-400 md:text-sm">
                  What I do here
                </p>
                <p className="mb-8 text-xs font-normal text-neutral-700 dark:text-neutral-400 md:text-sm">
                  {item.jobDesc}
                </p>
                <p className="mt-8 text-xs font-bold text-neutral-700 dark:text-neutral-400 md:text-sm">
                  What I learn here
                </p>
                <div className="relative flex items-center py-5">
                  <AnimatedTooltip items={item.iconLists} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <div
          style={{ height: `${height}px` }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700 md:left-8"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-stone-50 dark:from-stone-600 from-[0%] via-blue-500 dark:via-blue-500 via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
});

Timeline.displayName = "Timeline";

export default Timeline;
