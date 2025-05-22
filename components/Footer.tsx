import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[url('/footer-grid.svg')] bg-cover bg-center pt-20 pb-5 px-5">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl md:text-5xl font-bold text-center text-neutral-700 dark:text-neutral-400">
          Improve your <span className="text-blue-300">digital</span> presence
          with me
        </h1>
        <p className="mt-5 text-xs md:text-base text-center text-neutral-700 dark:text-neutral-400">
          Let&apos;s discuss how I can help you achieve your goals.
        </p>
        <a href="mailto:waliyinnura@gmail.com" className="mt-5">
          <MagicButton
            title="Get in touch"
            icon={<FaLocationArrow aria-hidden="true" />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 justify-between items-center">
        <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-400 md:font-normal font-light pt-5">
          Copyright {currentYear} Well
        </p>
        <div className="flex items-center gap-3">
          {socialMedia.map((media) => (
            <a
              key={media.id}
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black-300 rounded-lg flex justify-center items-center"
              aria-label={media.name} // aksesibilitas
            >
              <Image
                src={media.img}
                alt={media.name} // aksesibilitas
                width={20}
                height={20}
                loading="lazy"
                style={{ width: "auto", height: "auto" }}
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
