"use client";
import { cn } from "@/lib/utils";
import { iconLeftLists, iconRightLists } from "@/data";
import Image from "next/image";
import { memo } from "react";

/**
 * The BentoGrid component.
 *
 * A responsive grid with a set of items.
 *
 * @remarks
 * This component renders a responsive grid with a set of items. It is
 * designed to be used as a top-level component in the site.
 *
 * @param className - The class name to be applied to the container element.
 * @param children - The children elements to be rendered inside the container.
 *
 * @returns The JSX element for the BentoGrid component.
 */
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

/**
 * The BentoGridItem component.
 *
 * A single item in the BentoGrid.
 *
 * @remarks
 * This component renders a single item in the BentoGrid. It is designed to be
 * used as a child element of the BentoGrid component.
 *
 * @param id - The id of the item.
 * @param title - The title of the item.
 * @param description - The description of the item.
 * @param className - The class name to be applied to the container element.
 * @param titleClassName - The class name to be applied to the title element.
 * @param bgImage - The background image of the item.
 *
 * @returns The JSX element for the BentoGridItem component.
 */
export const BentoGridItem = memo(
  ({
    id,
    title,
    description,
    className,
    titleClassName,
    bgImage,
  }: {
    id?: number;
    title?: string;
    description?: string;
    className?: string;
    titleClassName?: string;
    bgImage?: {
      src: string;
      alt: string;
      className?: string;
      priority?: boolean;
    };
  }) => {
    return (
      <div
        className={cn(
          "group/bento bg-neutral-300 dark:bg-black-200 relative row-span-1 flex flex-col justify-center space-y-4 overflow-hidden rounded-3xl border border-transparent shadow-input transition duration-200 hover:md:shadow-xl dark:shadow-none",
          className
        )}
      >
        <div className={` h-full`}>
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
            {bgImage && (
              <Image
                src={bgImage.src}
                alt={bgImage.alt}
                width={100}
                height={100}
                className={cn(
                  "absolute h-fit w-fit overflow-hidden hidden md:block",
                  bgImage.className
                )}
                priority={true}
                style={{ width: "auto", height: "auto" }}
              />
            )}

            {id === 5 && (
              <div className="absolute flex w-fit gap-1 right-4 md:gap-3 lg:gap-5">
                <div className="flex flex-col gap-1 md:gap-6 lg:gap-8">
                  {iconLeftLists.map((item, i) => (
                    <div
                      key={i}
                      className="rounded-full bg-neutral-200 dark:bg-stone-700 px-2 py-2 md:px-4 md:py-4"
                    >
                      <Image
                        height={100}
                        width={100}
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="relative !m-0 object-cover object-top !p-0 transition duration-500 group-hover:z-[999] group-hover:scale-105 bg-transparent lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-1 md:gap-6 lg:gap-8">
                  {iconRightLists.map((item, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-neutral-200 dark:bg-stone-700 px-2 py-2 text-center text-xs md:px-4 md:py-4"
                    >
                      <Image
                        height={100}
                        width={100}
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="relative !m-0 object-cover object-top !p-0 transition duration-500 group-hover:z-[999] group-hover:scale-105 bg-transparent lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
                      />
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

BentoGridItem.displayName = "BentoGridItem";
