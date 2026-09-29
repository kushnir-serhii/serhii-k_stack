"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { LinkBtn } from "./ui/LinkBtn";
import { animationHeroComponent, animationHeroTitle } from "../variables";
import { githubUrl, cvPath } from "../constants/navLinks";

const GitAnime = dynamic(
  () => import("./GitAnime").then((module) => ({ default: module.GitAnime })),
  { ssr: false }
);
export const Hero: React.FC = () => {

  return (
    <section aria-labelledby="hero-title" className="flex flex-col gap-[54px] w-full ">
      <div className="container flex flex-col gap-14">
        <motion.h1
          id="hero-title"
          {...animationHeroTitle}
          className="responsive-heading text-display font-bold text-left uppercase text-black"
        >
          Full stack Developer serhii kushnir
        </motion.h1>
        {/* Content */}
        <div className="flex flex-col justify-between lg:flex-row gap-8 w-full">
          <motion.div
            {...animationHeroComponent}
            className="flex flex-col gap-8 lg:max-w-[540px] lg:w-1/2 h-full"
          >
            <p className="text-lg font-bold leading-5 text-black_900">
              &lt;React TS Next.js Node.js Tailwind CSS-in-JS&gt;
            </p>
            <p className="text-black_900">
              A full-stack developer focused on creating scalable, efficient
              solutions. With an engineering background and a structured
              problem-solving approach, I contribute effectively to both team
              and individual projects.
            </p>
            <LinkBtn
              href={cvPath}
              ariaLabel="Download CV"
              className="downloadLinkBtn flex focus-ring"
            >
              Open CV
            </LinkBtn>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
            className="flex justify-end w-full lg:w-1/2"
          >
            {/* Animation start */}
            <Link
              href={githubUrl}
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Link to GitHub (opens in new tab)"
              className="flex items-end w-full lg:max-w-[540px] rounded-2xl focus-ring"
            >
              <GitAnime />
            </Link>
          </motion.div>
          {/* Animation end */}
        </div>
      </div>
    </section>
  );
};
