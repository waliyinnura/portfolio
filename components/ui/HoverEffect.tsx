import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { memo, useCallback, useState } from "react";
import { PointerHighlight } from "./PointerHighlight";

/**
 * A component that renders a list of items with a hover effect that appears when
 * the item is hovered. The hover effect is an animated background that fades in
 * when the item is hovered and fades out when the item is no longer hovered.
 *
 * @param {object} props
 * @prop {object[]} items An array of objects with the properties:
 *   - id (number): The id of the item
 *   - title (string): The title of the item
 *   - des (string): The description of the item
 *   - img (string): The URL of the image for the item
 *   - iconLists (string[]): An array of strings representing the icon lists
 *   - link (string): The URL of the link for the item
 * @prop {string} [className] The class name of the component
 * @returns The JSX element for the component
 */
const HoverEffect = ({
  items,
  className,
}: {
  items: {
    id: number;
    title: string;
    des: string;
    img: string;
    iconLists: string[];
    link: string;
  }[];
  className?: string;
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const handleMouseEnter = useCallback(
    (idx: number) => setHoveredIndex(idx),
    []
  );
  const handleMouseLeave = useCallback(() => setHoveredIndex(null), []);

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl py-20 text-center">
        <h2 className="text-xl md:text-2xl font-semibold text-neutral-700 dark:text-neutral-400 z-50">
          Take a <span className="text-blue-300">look</span> at <br />
          <span className="mt-1 text-3xl font-bold leading-none md:text-6xl lg:text-7xl">
            My Recent
            <PointerHighlight
              rectangleClassName="bg-neutral-400 border-neutral-400 leading-loose opacity-25"
              pointerClassName="text-stone-600 h-5 w-5"
              containerClassName="inline-block mx-1"
            >
              <span className="relative z-10">Projects</span>
            </PointerHighlight>
          </span>
        </h2>
      </div>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5",
          className
        )}
      >
        {items.map((item, idx) => (
          <a
            href={item.link}
            target="_blank"
            key={item.id}
            className="relative group block p-2"
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={handleMouseLeave}
            role="button"
            tabIndex={0}
            aria-label={item.title}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-400/[0.8] dark:bg-neutral-700/[0.8] hidden md:block rounded-3xl"
                  layoutId="hoverBackground"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card>
              <CardImage img={item.img} />
              <div className="p-2">
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.des}</CardDescription>
              </div>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

/**
 * The Card component.
 *
 * @remarks
 * This component is a wrapper around the `div` element. It provides a number of
 * pre-defined styles for the card.
 *
 * @example
 * <Card>
 *   <CardImage img={item.img} />
 *   <div className="p-2">
 *     <CardTitle>{item.title}</CardTitle>
 *     <CardDescription>{item.des}</CardDescription>
 *   </div>
 * </Card>
 *
 * @export
 * @param {React.ComponentPropsWithoutRef<'div'>} props The component props.
 * @returns {React.ReactElement} The Card component.
 */
export const Card = memo(
  ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <div
        className={cn(
          "rounded-2xl h-full w-full p-4 overflow-hidden bg-neutral-200 dark:bg-black-200 border border-transparent group-hover:border-slate-700 relative z-20",
          className
        )}
      >
        <div className="relative z-50">{children}</div>
      </div>
    );
  }
);
Card.displayName = "Card";

/**
 * The CardTitle component.
 *
 * @remarks
 * This component is a wrapper around the `h3` element. It provides a number of
 * pre-defined styles for the card title.
 *
 * @example
 * <CardTitle>{item.title}</CardTitle>
 *
 * @export
 * @param {React.ComponentPropsWithoutRef<'h3'>} props The component props.
 * @returns {React.ReactElement} The CardTitle component.
 */
export const CardTitle = memo(
  ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <h3
        className={cn(
          "text-black-200 dark:text-zinc-100 font-bold text-left tracking-wide my-4",
          className
        )}
      >
        {children}
      </h3>
    );
  }
);
CardTitle.displayName = "CardTitle";

/**
 * The CardDescription component.
 *
 * @remarks
 * This component is a wrapper around the `p` element. It provides a number of
 * pre-defined styles for the card description.
 *
 * @example
 * <CardDescription>{item.des}</CardDescription>
 *
 * @export
 * @param {React.ComponentPropsWithoutRef<'p'>} props The component props.
 * @returns {React.ReactElement} The CardDescription component.
 */
export const CardDescription = memo(
  ({
    className,
    children,
  }: {
    className?: string;
    children: React.ReactNode;
  }) => {
    return (
      <p
        className={cn(
          "my-1 text-black dark:text-zinc-400 tracking-wide leading-relaxed text-sm",
          className
        )}
      >
        {children}
      </p>
    );
  }
);
CardDescription.displayName = "CardDescription";

/**
 * The CardImage component.
 *
 * @remarks
 * This component renders an image with a rounded top-left and top-right corners.
 * The image is positioned absolutely and fills the parent element.
 *
 * @example
 * <CardImage img="https://picsum.photos/200/300" />
 *
 * @export
 * @param {string} img The image URL.
 * @returns {React.ReactElement} The CardImage component.
 */
export const CardImage = memo(({ img }: { img: string }) => {
  return (
    <div className="h-44 sm:h-60 md:h-44 w-full relative bg-transparent transition-transform duration-300 group-hover:scale-105">
      <Image
        src={img}
        alt="cover"
        fill
        sizes="100%"
        loading="lazy"
        className="rounded-t-2xl absolute inset-0 object-cover object-center mix-blend-multiply"
      />
    </div>
  );
});
CardImage.displayName = "CardImage";

export default HoverEffect;
