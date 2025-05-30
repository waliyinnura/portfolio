"use client";
import { cn } from "@/lib/utils";
import { IconMenu2, IconX } from "@tabler/icons-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import Image from "next/image";

import React, { useCallback, useRef, useState } from "react";
import { useModal } from "./modal/AnimatedModal";
import ReactDOM from "react-dom";

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * A responsive navigation bar that can be used as a top-level component
 * in the site.
 *
 * The navbar will be visible when the user has scrolled down more than 100px
 * and invisible otherwise.
 *
 * @param {NavbarProps} props The props for the Navbar component.
 *
 * @returns {React.ReactElement} The Navbar component.
 */
export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 top-5 z-50 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

/**
 * The NavBody component.
 *
 * This component renders a navigation container with optional blur and shadow
 * effects that are activated based on the `visible` prop. It uses a spring
 * animation for smooth transitions of its properties.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the component.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @param {boolean} [props.visible] - Determines the visibility and styling effects
 * such as blur and shadow.
 *
 * @returns {JSX.Element} The animated NavBody component.
 */
export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        // Blur dan shadow hanya aktif di desktop (md: ke atas)
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "40%" : "100%",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "800px",
      }}
      className={cn(
        "relative z-[60] mx-auto max-w-7xl hidden w-full flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 dark:bg-transparent lg:flex",
        visible &&
          "md:bg-white/80 md:dark:bg-neutral-950/80 md:backdrop-blur-md",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

/**
 * The NavItems component.
 *
 * This component renders a list of links with hover effects. It uses a spring
 * animation for smooth transitions of its properties.
 *
 * @param {object} props - The component props.
 * @param {object[]} props.items - An array of objects with the following properties:
 *   - name (string): The name of the item to be displayed.
 *   - link (string): The link to be opened when the item is clicked.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @param {function} [props.onItemClick] - A callback function to be called when an item is clicked.
 *
 * @returns {JSX.Element} The animated NavItems component.
 */
export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleMouseEnter = useCallback((idx: number) => setHovered(idx), []);
  const handleMouseLeave = useCallback(() => setHovered(null), []);

  return (
    <motion.div
      onMouseLeave={handleMouseLeave}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => handleMouseEnter(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-700 dark:text-neutral-400"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-neutral-800"
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

/**
 * The MobileNav component.
 *
 * This component renders a mobile navigation container with optional blur and shadow
 * effects that are activated based on the `visible` prop. It uses a spring animation
 * for smooth transitions of its properties.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the component.
 * @param {string} [props.className] - Additional class names to apply to the component.
 * @param {boolean} [props.visible] - Determines the visibility and styling effects
 * such as blur and shadow.
 *
 * @returns {JSX.Element} The animated MobileNav component.
 */
export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        // Blur dan shadow hanya aktif di desktop (md: ke atas)
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "90%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "4px" : "2rem",
        y: visible ? 20 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col items-center justify-between bg-transparent px-0 py-2 lg:hidden",
        visible &&
          "md:bg-white/80 md:dark:bg-neutral-950/80 md:backdrop-blur-md",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

/**
 * The MobileNavHeader component.
 *
 * This component renders a mobile navigation header with the logo and toggle
 * button. It is used in the MobileNav component.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the component.
 * @param {string} [props.className] - Additional class names to apply to the component.
 *
 * @returns {JSX.Element} The MobileNavHeader component.
 */
export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "relative flex w-full flex-row items-center justify-between",
        className
      )}
    >
      {children}
    </div>
  );
};

/**
 * The MobileNavMenu component.
 *
 * @remarks
 * This component renders a mobile navigation menu that slides in
 * and out with animation. It is displayed when the `isOpen` prop
 * is true. The menu is styled with a shadow and background color,
 * and accepts additional class names and children elements.
 *
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content to be rendered within the menu.
 * @param {string} [props.className] - Additional class names to apply to the menu.
 * @param {boolean} props.isOpen - Determines whether the menu is visible.
 *
 * @returns {JSX.Element} The MobileNavMenu component.
 */
export const MobileNavMenu = ({
  children,
  className,
  isOpen,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full text-neutral-700 dark:text-neutral-400 flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/**
 * The MobileNavToggle component.
 *
 * This component renders a toggle button for the mobile navigation menu. It
 * displays either an open or close icon depending on the `isOpen` prop. The
 * component is accessible and can be controlled with the Enter or Space key.
 *
 * @param {{ isOpen: boolean; onClick: () => void; }} props The component props.
 * @param {boolean} props.isOpen Determines the visibility of the mobile navigation menu.
 * @param {() => void} props.onClick The callback function that is called when the button is clicked.
 *
 * @returns {JSX.Element} The MobileNavToggle component.
 */
export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  const label = isOpen ? "Tutup menu navigasi" : "Buka menu navigasi";
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") onClick();
  };
  return isOpen ? (
    <IconX
      className="text-neutral-700 dark:text-neutral-400"
      onClick={onClick}
      aria-label={label}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    />
  ) : (
    <IconMenu2
      className="text-neutral-700 dark:text-neutral-400"
      onClick={onClick}
      aria-label={label}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    />
  );
};

/**
 * The NavbarLogo component.
 *
 * This component renders the logo of the website, which is a rounded
 * image with a link to the hero section. The logo is styled with a
 * relative z-index of 20, and has a margin right of 4rem.
 *
 * @returns {JSX.Element} The NavbarLogo component.
 */
export const NavbarLogo = () => {
  return (
    <a
      href="#hero"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-neutral-700 dark:text-neutral-400"
    >
      <Image
        src="/logo-w.png"
        alt="logo"
        width={30}
        height={30}
        priority={true}
        className="rounded-sm"
      />
      <span className="font-medium text-neutral-700 dark:text-neutral-400">
        Well
      </span>
    </a>
  );
};

type NavbarButtonProps = {
  // type?: 'button' | 'submit' | 'reset';
  variant?: "primary" | "secondary" | "dark" | "gradient";
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * The NavbarButton component.
 *
 * @remarks
 * This component renders a customizable button with several styling variants.
 * It integrates with a modal system to open a modal on click. The button
 * supports different visual styles through the `variant` prop and additional
 * classes via the `className` prop.
 *
 * @param {NavbarButtonProps} props - The component props.
 * @param {"primary" | "secondary" | "dark" | "gradient"} [props.variant="primary"] - The visual style of the button.
 * @param {string} [props.className] - Additional class names to apply to the button.
 * @param {React.ReactNode} props.children - The content to be rendered inside the button.
 *
 * @returns {JSX.Element} The NavbarButton component.
 */
export const NavbarButton: React.FC<NavbarButtonProps> = ({
  // type = 'button',
  variant = "primary",
  className,
  children,
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary:
      "bg-neutral-700 dark:bg-neutral-200 shadow-none dark:text-neutral-700 text-neutral-200",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };
  const { open, setOpen } = useModal();
  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <button
        className={cn(baseStyles, variantStyles[variant], className)}
        onClick={() => openModal()}
        {...props}
      >
        {children}
      </button>

      {/* Animated Modal */}
      {typeof window !== "undefined" &&
        ReactDOM.createPortal(
          open && (
            <AnimatePresence>
              {open && (
                <motion.div
                  className="fixed inset-0 z-[99999] flex items-center justify-center bg-black bg-opacity-50 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={closeModal}
                  role="dialog"
                  aria-modal="true"
                >
                  <motion.div
                    className="relative bg-white dark:bg-neutral-800 p-6 shadow-lg rounded-xl w-[90%] max-w-md"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <h2 className="text-xl font-semibold text-center mb-4">
                      Click here to download
                    </h2>
                    <div className="grid grid-cols-1 gap-4">
                      <a
                        href="/CV.pdf"
                        download="CV_Well.pdf"
                        className="w-full px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-600 transition text-center"
                      >
                        Download CV
                      </a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          ),
          document.body
        )}
    </div>
  );
};
