import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { MovingBorder } from "./MovingBorder";
import { PointerHighlight } from "./PointerHighlight";

export const HoverEffect = ({
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

  return (
    <div className="w-full">
      <div className="mx-auto max-w-7xl py-20 text-center">
        <h1 className="text-2xl md:text-4xl font-semibold text-black dark:text-white z-50">
          Take a <span className="text-blue-300">look</span> at <br />
          <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
            My Recent
            <PointerHighlight
              rectangleClassName="bg-neutral-400 border-neutral-400 leading-loose opacity-50"
              pointerClassName="text-stone-600 h-5 w-5"
              containerClassName="inline-block mx-1"
            >
              <span className="relative z-10">Projects</span>
            </PointerHighlight>
          </span>
        </h1>
      </div>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-5",
          className
        )}
      >
        {items.map((item, idx) => (
          <a
            href={item?.link}
            target="_blank"
            key={item?.link}
            className="relative group block p-2 h-full w-full"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <AnimatePresence>
              {hoveredIndex === idx && (
                <motion.span
                  className="absolute inset-0 h-full w-full bg-neutral-400 dark:bg-slate-400/[0.8] hidden md:block rounded-3xl"
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
            <div className="absolute inset-0 rounded-2xl h-full w-full overflow-hidden">
              <MovingBorder rx="30%" ry="30%">
                <div
                  className={cn("h-20 w-20 opacity-[0.8] blur-2xl")}
                  style={{
                    background:
                      "linear-gradient(90deg,rgba(181, 201, 255, 1) 0%, rgba(69, 107, 222, 1) 50%, rgba(0, 89, 255, 1) 100%)",
                    borderRadius: "20px",
                  }}
                />
              </MovingBorder>
            </div>
            <Card>
              <CardImage img={item.img} />
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.des}</CardDescription>
            </Card>
          </a>
        ))}
      </div>
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden bg-neutral-200 dark:bg-black-200 border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        "text-black-200 dark:text-zinc-100 font-bold tracking-wide my-2",
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
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
};
export const CardImage = ({ img }: { img: string }) => {
  return (
    <div className="w-full flex justify-center my-1">
      <div
        className="relative w-full max-w-md aspect-[3/2] overflow-hidden rounded-2xl"
        style={{ backgroundColor: "#13162D" }}
      >
        <Image
          src={img}
          alt="cover"
          fill
          className="object-cover"
          priority={true}
        />
      </div>
    </div>
  );
};
