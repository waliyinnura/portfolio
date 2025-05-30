"use client";

import { Root, Trigger, Content } from "@radix-ui/react-hover-card";
import { encode } from "qss";
import React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";
import Image from "next/image";

type LinkPreviewProps = {
  children: React.ReactNode;
  url: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  layout?: string;
} & (
  | { isStatic: true; imageSrc: string }
  | { isStatic?: false; imageSrc?: never }
);

/**
 * A component that renders a link that previews the website when hovered.
 *
 * @param {React.ReactNode} children The content of the link.
 * @param {string} url The URL of the website to preview.
 * @param {string} [className] The additional class names for the link.
 * @param {number} [width=200] The width of the preview image.
 * @param {number} [height=125] The height of the preview image.
 * @param {boolean} [isStatic=false] Whether the image is a static image or
 *   should be fetched from Microlink.
 * @param {string} [imageSrc=""] The URL of the static image.
 * @returns {React.ReactElement} The LinkPreview component.
 */

export const LinkPreview = ({
  children,
  url,
  className,
  width = 200,
  height = 125,
  isStatic = false,
  imageSrc = "",
}: LinkPreviewProps) => {
  let src;
  if (!isStatic) {
    const params = encode({
      url,
      screenshot: true,
      meta: false,
      embed: "screenshot.url",
      colorScheme: "dark",
      "viewport.isMobile": true,
      "viewport.deviceScaleFactor": 1,
      "viewport.width": width * 3,
      "viewport.height": height * 3,
    });
    src = `https://api.microlink.io/?${params}`;
  } else {
    src = imageSrc;
  }

  const [isOpen, setOpen] = React.useState(false);

  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);

  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted ? (
        <div className="hidden">
          <Image
            src={src}
            width={width}
            height={height}
            alt=""
            aria-hidden="true"
          />
        </div>
      ) : null}

      <Root
        openDelay={50}
        closeDelay={100}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <Trigger
          onMouseMove={handleMouseMove}
          className={cn(className)}
          href={url}
          target="_blank"
        >
          {children}
        </Trigger>

        <Content
          className="[transform-origin:var(--radix-hover-card-content-transform-origin)]"
          side="top"
          align="center"
          sideOffset={10}
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                className="md:shadow-xl rounded-xl"
                style={{
                  x: translateX,
                }}
              >
                <a
                  href={url}
                  className="block p-1 bg-white border-2 border-transparent md:shadow rounded-xl hover:border-neutral-200 dark:hover:border-neutral-800"
                  style={{ fontSize: 0 }}
                  aria-label={`Preview of ${url}`}
                >
                  <Image
                    src={isStatic ? imageSrc : src}
                    width={width}
                    height={height}
                    className="rounded-lg"
                    alt={`Preview of ${url}`}
                  />
                  <span className="sr-only">Visit {url}</span>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </Content>
      </Root>
    </>
  );
};
