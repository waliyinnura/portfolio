/* eslint-disable @next/next/no-img-element */
"use client";
import { cn } from "@/lib/utils";
import { GridGlobe } from "./GridGlobe";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "md:grid-row-7 mx-auto grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-5 lg:gap-8",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  title,
  description,
  className,
  imgClassName,
  titleClassName,
  img,
  spareImg,
}: {
  id?: number;
  title?: string;
  description?: string;
  className?: string;
  imgClassName?: string;
  titleClassName?: string;
  img?: string;
  spareImg?: string;
}) => {
  const leftLists = ["ReactJS", "Express", "Typescript"];
  const rightLists = ["NextJS", "NestJS", "MySQL"];

  return (
    <div
      className={cn(
        "group/bento bg-neutral-300 dark:bg-black-200 relative row-span-1 flex flex-col justify-center space-y-4 overflow-hidden rounded-3xl border border-transparent shadow-input transition duration-200 hover:shadow-xl dark:shadow-none",
        className
      )}
    >
      <div className={` h-full`}>
        <div className="absolute h-full w-full">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center")}
            />
          )}
        </div>
        <div
          className={`absolute -bottom-5 right-0 ${id === 5 && "w-full opacity-80"} `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="h-full w-full object-cover object-center"
            />
          )}
        </div>

        <div
          className={cn(
            titleClassName,
            "relative flex min-h-40 flex-col p-5 px-5 transition duration-200 group-hover/bento:translate-x-2 md:h-full lg:p-10 text-neutral-700 dark:text-neutral-400"
          )}
        >
          <div className="z-10 font-sans text-sm font-extralight text-neutral-700 dark:text-neutral-400 md:max-w-32 md:text-xs lg:text-base">
            {description}
          </div>
          <div
            className={`z-10 max-w-96 font-sans text-lg font-bold lg:text-3xl`}
          >
            {title}
          </div>

          {id === 1 && <GridGlobe />}

          {id === 5 && (
            <div className="absolute -right-1 flex w-fit gap-1 lg:-right-1 md:gap-3 lg:gap-5">
              <div className="flex flex-col gap-3 md:gap-6 lg:gap-8">
                {leftLists.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg mdrounded-2xl bg-neutral-200 dark:bg-stone-700 px-3 py-2 text-center text-xs md:px-4 md:py-4 md:text-lg lg:px-6 lg:py-6 lg:text-xl"
                  >
                    {item}
                  </span>
                ))}
                <span></span>
              </div>
              <div className="flex flex-col gap-3 md:gap-6 lg:gap-8">
                <span></span>
                {rightLists.map((item, i) => (
                  <span
                    key={i}
                    className="rounded-lg mdrounded-2xl bg-neutral-200 dark:bg-stone-700 px-3 py-2 text-center text-xs md:px-4 md:py-4 md:text-lg lg:px-6 lg:py-6 lg:text-xl"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
