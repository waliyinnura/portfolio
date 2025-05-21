import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";
import Image from "next/image";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[url('/footer-grid.svg')] bg-cover bg-center pt-20 pb-5 px-5">
      <div className="flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-neutral-700 dark:text-neutral-400">
          Ready to take <span className="text-blue-300">your</span> digital
          presence to the next level?
        </h1>
        <p className="mt-5 text-center text-neutral-700 dark:text-neutral-400">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a href="mailto:waliyinnura@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 justify-between items-center">
        <p className="text-sm md:text-base md:font-normal font-light">
          Copyright &copy; {year} Well
        </p>
        <div className="flex items-center gap-3">
          {socialMedia.map((info) => (
            <a
              key={info.id}
              href={info.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black-300 rounded-lg flex justify-center items-center"
            >
              <Image
                src={info.img}
                alt="icons"
                width={20}
                height={20}
                priority={true}
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
