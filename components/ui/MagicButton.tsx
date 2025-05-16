import React from "react";

const MagicButton = ({
  title,
  icon,
  position,
  handleClick,
  otherClasses,
}: {
  title: string;
  icon: React.ReactNode;
  position: string;
  handleClick?: () => void;
  otherClasses?: string;
}) => {
  return (
    <button
      className="relative inline-flex h-12 w-full overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-gold-100 focus:ring-offset-2 focus:ring-offset-white md:mt-10 md:w-60"
      onClick={handleClick}
    >
      <span
        className={`inline-flex h-full w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black-200 dark:bg-white-300 bg-opacity-75 px-7 text-sm font-medium text-white dark:text-black backdrop-blur-3xl ${otherClasses}`}
      >
        {position === "left" && icon}
        {title}
        {position === "right" && icon}
      </span>
    </button>
  );
};

export default MagicButton;
