import React from "react";

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
