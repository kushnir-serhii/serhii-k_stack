"use client";

import Image from "next/image";
import Link from "next/link";
import { ShowMoreBtn } from "./ui/ShowMoreBtn";
import { Icon } from "./ui/Icon";
import { useId, useState } from "react";
import { LinkBtn } from "./ui/LinkBtn";
import { motion } from "motion/react";
import { animationProjectImage, animationTitleSection } from "../variables";

interface IProject {
  projectNuber: number;
  slug?: string;
  title: string;
  role: string;
  url: string | null;
  techStack: string;
  description?: string[];
  imgSrcArr: string[];
}

interface ProjectItemProps {
  project: IProject;
}
export const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  const [isShowDescription, setIsShowDescription] = useState(false);
  const descriptionId = useId();

  const { projectNuber, slug, title, role, techStack, imgSrcArr, url, description } = project;

  return (
    <div className="flex flex-col items-start gap-10 py-12 lg:py-[100px] h-full">
      <div className="relative bg-black_900">
        <div className="relative z-10 flex items-start flex-col h-full lg:flex-row gap-5 bg-black_900">
          {/* Left part ==============================================================*/}
          <div className="flex flex-col justify-between items-start gap-6 lg:h-[538px] str w-full lg:w-[553px] lg:pr-[130px]">
            <div className="flex flex-col gap-4 items-start">
              {/* Number and title ====================================================*/}
              <div className="flex flex-col items-start gap-4">
                <motion.span
                  {...animationTitleSection}
                  aria-hidden="true"
                  className="text-grey_500 text-8xl font-bold "
                >
                  &lt;{projectNuber}&gt;
                </motion.span>
                <motion.h3
                  {...animationTitleSection}
                  className="text-white"
                >
                  {title}
                </motion.h3>
              </div>

              {/* Role and Tech Stack  =================================================*/}
              <motion.div
                {...animationTitleSection}
                className="flex flex-col gap-2"
              >
                <p className="flex flex-col items-start text-green_500">
                  <span className=" ">Role</span>
                  {role}
                </p>

                <p className="flex flex-col items-start font-bold text-white">
                  <span>Tech Stack</span>
                  {techStack}
                </p>
              </motion.div>
            </div>

            {/* Button =============================================================== */}
            <motion.div {...animationTitleSection} className="flex items-center gap-4">
              <ShowMoreBtn
                aria-expanded={isShowDescription}
                aria-controls={descriptionId}
                onClick={() => {
                  setIsShowDescription(!isShowDescription);
                }}
                className=" hidden lg:flex focus-ring-dark"
              >
                <p>Show {isShowDescription ? "less" : "more"}</p>
                <Icon
                  id="icon-arrow_down"
                  width={25}
                  height={12}
                  className={`mt-[0.5px] transition-all duration-700 ease-in-out  ${
                    isShowDescription && "rotate-180"
                  }`}
                />
              </ShowMoreBtn>
              {slug && (
                <Link
                  href={`/projects/${slug}`}
                  className="hidden lg:flex items-center gap-2 text-sm font-medium text-green_500
                             hover:opacity-75 transition-opacity focus-ring-dark"
                >
                  Case study
                  <Icon id="icon-arrow-up-right" width={12} height={12} />
                </Link>
              )}
            </motion.div>
          </div>

          {/* Right part ==============================================================*/}
          <motion.div {...animationProjectImage}>
            <Image
              src={imgSrcArr[0]}
              width={738}
              height={553}
              loading="lazy"
              alt={`${title} — screenshot 1/2`}
              sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 800px"
              className="rounded-2xl"
            />
          </motion.div>

          <div className="flex items-center gap-4 lg:hidden mr-auto">
            <ShowMoreBtn
              aria-expanded={isShowDescription}
              aria-controls={descriptionId}
              onClick={() => {
                setIsShowDescription(!isShowDescription);
              }}
              className="focus-ring-dark"
            >
              <p>Show {isShowDescription ? "less" : "more"}</p>
              <Icon
                id="icon-arrow_down"
                width={25}
                height={12}
                className={`mt-[0.5px] transition-all duration-700 ease-in-out ${
                  isShowDescription && "rotate-180"
                }`}
              />
            </ShowMoreBtn>
            {slug && (
              <Link
                href={`/projects/${slug}`}
                className="flex min-h-11 items-center gap-2 text-sm font-medium text-green_500
                           hover:opacity-75 transition-opacity focus-ring-dark"
              >
                Case study
                <Icon id="icon-arrow-up-right" width={12} height={12} />
              </Link>
            )}
          </div>
        </div>
        {/* Description =============================================================== */}
        {/* Grid-rows expand (0fr -> 1fr) sizes to whatever the content actually
            needs, instead of clipping long descriptions at a fixed max-height. */}
        <div
          id={descriptionId}
          inert={!isShowDescription}
          aria-hidden={!isShowDescription}
          className={`grid w-full transition-[grid-template-rows,opacity] duration-700 ease-in-out motion-reduce:transition-none ${
            isShowDescription
              ? "grid-rows-[1fr] opacity-100 pt-10"
              : "grid-rows-[0fr] opacity-0 pointer-events-none"
          }`}
        >
          <div className="relative flex min-h-0 flex-col items-center justify-between gap-12 overflow-hidden lg:flex-row lg:gap-24">
            <div className="flex flex-col gap-12 w-full lg:w-[476px]">
              <ul className="flex flex-col gap-4">
                {description?.map((item, index) => (
                  <li key={index}>
                    <p className="text-white/80">{item}</p>
                  </li>
                ))}
              </ul>
              {url?.length && (
                <LinkBtn
                  href={url}
                  ariaLabel="Link to Website"
                  className="hidden lg:flex items-center justify-center gap-2 text-white border border-grey_500 hover:bg-white/10 focus-ring-dark"
                >
                  Website
                  <Icon
                    id="icon-arrow-up-right"
                    width={12}
                    height={12}
                    className={``}
                  />
                </LinkBtn>
              )}
            </div>
            <Image
              src={imgSrcArr[1]}
              width={738}
              height={553}
              loading="lazy"
              alt={`${title} — screenshot 2/2`}
              sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 800px"
              className="rounded-2xl"
            />
            {url?.length && (
              <LinkBtn
                href={url}
                ariaLabel="Link to Website"
                className="flex items-center justify-center gap-2 text-white border border-grey_500 lg:hidden hover:bg-white/10 focus-ring-dark"
              >
                Website
                <Icon
                  id="icon-arrow-up-right"
                  width={12}
                  height={12}
                  className={``}
                />
              </LinkBtn>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
