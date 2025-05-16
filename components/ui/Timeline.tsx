"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { LinkPreview } from "./LinkPreview";
import { AnimatedTooltip } from "./AnimatedTooltip";
import Image from "next/image";
import { FlipWords } from "./FlipWords";
import { words } from "@/data";

interface TimelineEntry {
  id: number;
  title: string;
  subTitle: string;
  desc: string;
  company: string;
  jobDesc: string;
  urlPreview: string;
  img: string[];
  iconLists: { id: number; name: string; image: string }[];
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full bg-white font-sans dark:bg-black" ref={containerRef}>
      <div className="mx-auto max-w-7xl py-20 text-center justify-center">
        <h1 className="text-2xl md:text-4xl font-semibold text-black dark:text-white">
          This is my
          <br />
          <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
            <FlipWords words={words} />
          </span>
        </h1>
      </div>

      <div ref={ref} className="relative max-w-7xl pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:gap-10 md:pt-40"
          >
            <div className="sticky top-40 z-40 flex max-w-xs flex-col items-center self-start md:w-full md:flex-row lg:max-w-sm">
              <div className="absolute left-3 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-black md:left-3">
                <div className="h-4 w-4 rounded-full border border-neutral-300 bg-neutral-200 p-2 dark:border-neutral-700 dark:bg-neutral-800" />
              </div>
              <h3 className="hidden text-xl font-bold text-neutral-500 dark:text-neutral-500 md:block md:pl-20 md:text-5xl">
                {item.title}
              </h3>
            </div>

            <div className="relative w-full pl-20 pr-4 md:pl-4">
              <h3 className="mb-4 block text-left text-2xl font-bold text-neutral-500 dark:text-neutral-500 md:hidden">
                {item.title}
              </h3>
              <div className="relative">
                <LinkPreview
                  url={
                    item.urlPreview
                      ? item.urlPreview
                      : "https://github.com/waliyinnura?tab=repositories"
                  }
                  className="font-bold text-black dark:text-white mb-8 text-xl md:text-3xl"
                >
                  {item.company}
                </LinkPreview>
                <p className="mb-8 pt-2 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
                  {item.desc}
                </p>
                <p className="mt-8 mb-2 text-xs font-bold text-neutral-800 dark:text-neutral-200 md:text-sm">
                  What I do here
                </p>
                <p className="mb-8 text-xs font-normal text-neutral-800 dark:text-neutral-200 md:text-sm">
                  {item.jobDesc}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {item.img.map((image, index) => (
                    <Image
                      key={index}
                      src={image}
                      alt={item.company + "image" + index}
                      width={500}
                      height={500}
                      priority={true}
                      className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
                    />
                  ))}
                </div>
                <p className="mt-8 text-xs font-bold text-neutral-800 dark:text-neutral-200 md:text-sm">
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
          style={{
            height: height + "px",
          }}
          className="absolute left-8 top-0 w-[2px] overflow-hidden bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] dark:via-neutral-700 md:left-8"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full bg-gradient-to-t from-stone-50 dark:from-stone-600 from-[0%] via-orange-300 dark:via-orange-300 via-[10%] to-transparent"
          />
        </div>
      </div>
    </div>
  );
};
