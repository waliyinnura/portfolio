"use client";

import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "motion/react";
import Image from "next/image";

/**
 * A component that renders a list of items with tooltips that appear when
 * the item is hovered. The tooltips are animated and have a springy
 * movement effect.
 *
 * @param {object} props
 * @prop {object[]} items An array of objects with the properties:
 *   - id (number): The id of the item
 *   - name (string): The name of the item
 *   - image (string): The URL of the image for the item
 */
export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const halfWidth = (event.target as HTMLElement).offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <>
      {items.map((item) => (
        <div
          className="group relative -mr-3"
          key={item.name}
          tabIndex={0} // aksesibilitas: bisa difokuskan
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
          aria-describedby={
            hoveredIndex === item.id ? `tooltip-${item.id}` : undefined
          }
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  x: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-14 z-[9999] flex flex-col items-center justify-center rounded-md bg-black dark:bg-white opacity-50 px-4 py-2 text-xs md:shadow-xl"
                role="tooltip"
                id={`tooltip-${item.id}`}
                aria-live="polite"
              >
                <div className="relative z-[999] text-base font-bold dark:text-neutral-700 text-neutral-400">
                  {item.name}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            onMouseMove={handleMouseMove}
            height={100}
            width={100}
            src={item.image}
            alt={item.name}
            className="relative !m-0 object-cover object-top !p-0 transition duration-500 group-hover:z-[999] group-hover:scale-105 rounded-full bg-black lg:w-10 lg:h-10 w-8 h-8 flex justify-center items-center"
          />
        </div>
      ))}
    </>
  );
};
