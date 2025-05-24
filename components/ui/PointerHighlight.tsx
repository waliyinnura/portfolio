"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useRef, useEffect, useState, memo } from "react";

/**
 * PointerHighlight component.
 *
 * @remarks
 * This component provides a visual highlight effect around its children,
 * using animated borders and a pointer icon. The dimensions of the highlight
 * adapt to the size of the container dynamically via a ResizeObserver.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be highlighted.
 * @param {string} [props.rectangleClassName] - Additional class names for the rectangle.
 * @param {string} [props.pointerClassName] - Additional class names for the pointer icon.
 * @param {string} [props.containerClassName] - Additional class names for the container.
 *
 * @returns {JSX.Element} The PointerHighlight component.
 */
export function PointerHighlight({
  children,
  rectangleClassName,
  pointerClassName,
  containerClassName,
}: {
  children: React.ReactNode;
  rectangleClassName?: string;
  pointerClassName?: string;
  containerClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const container = containerRef.current; // Store the current value of the ref
    if (container) {
      const { width, height } = container.getBoundingClientRect();
      setDimensions({ width, height });
    }

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    if (container) {
      resizeObserver.observe(container);
    }

    return () => {
      if (container) {
        resizeObserver.unobserve(container); // Use the stored variable here
      }
    };
  }, []);

  return (
    <div
      className={cn("relative w-fit", containerClassName)}
      ref={containerRef}
    >
      {children}
      {dimensions.width > 0 && dimensions.height > 0 && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          initial={{ opacity: 0, scale: 0.95, originX: 0, originY: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <motion.div
            className={cn(
              "absolute inset-0 border border-neutral-800 dark:border-neutral-200",
              rectangleClassName
            )}
            initial={{
              width: 0,
              height: 0,
            }}
            whileInView={{
              width: dimensions.width,
              height: dimensions.height,
            }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="pointer-events-none absolute"
            initial={{ opacity: 0 }}
            whileInView={{
              opacity: 1,
              x: dimensions.width + 4,
              y: dimensions.height + 4,
            }}
            style={{
              rotate: -90,
            }}
            transition={{
              opacity: { duration: 0.1, ease: "easeInOut" },
              duration: 1,
              ease: "easeInOut",
            }}
          >
            <Pointer
              className={cn("h-5 w-5 text-blue-500", pointerClassName)}
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

/**
 * A pointer icon.
 *
 * @remarks
 * This component is a wrapper around the `svg` element. It provides a number of
 * pre-defined styles for the pointer icon.
 *
 * @example
 * <Pointer className="h-5 w-5 text-blue-500" />
 *
 * @export
 * @param {React.SVGProps<SVGSVGElement>} props The component props.
 * @returns {React.ReactElement} The Pointer component.
 */
const Pointer = memo(({ ...props }: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z"></path>
    </svg>
  );
});

Pointer.displayName = "Pointer";
