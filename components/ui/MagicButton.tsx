import React from "react";

/**
 * The MagicButton component.
 *
 * @remarks
 * This component renders a button with a hover effect that looks like a
 * "magic" button. The button is rendered with a rounded corners and a
 * gradient background. The button also has a `backdrop-blur-3xl` class to
 * blur the background.
 *
 * @example
 * <MagicButton title="Click me" icon={<FaLocationArrow />} />
 *
 * @param {string} title The title of the button.
 * @param {React.ReactNode} icon The icon to be rendered on the left or right
 * side of the button.
 * @param {"left" | "right"} position The position of the icon.
 * @param {(() => void) | undefined} handleClick The function to be called when
 * the button is clicked.
 * @param {string} [otherClasses=""] Additional classes to be added to the
 * button.
 * @returns {React.ReactElement} The MagicButton component.
 */
const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses = "",
}: {
  title: string;
  icon: React.ReactNode;
  position: "left" | "right";
  handleClick?: () => void;
  otherClasses?: string;
}) => (
  <button
    className={`relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-neutral-700 focus:ring-offset-2 focus:ring-offset-white md:mt-10 md:w-60 ${otherClasses}`}
    onClick={handleClick}
    aria-label={title}
  >
    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black-200 dark:bg-white-300 bg-opacity-75 px-7 text-sm font-medium dark:text-neutral-700 text-neutral-200 backdrop-blur-3xl">
      {position === "left" && icon}
      {title}
      {position === "right" && icon}
    </span>
  </button>
);

export default MagicButton;
