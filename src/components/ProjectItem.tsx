"use client";

import Image from "next/image";
import Link from "next/link";
import { ShowMoreBtn } from "./ui/ShowMoreBtn";
import { Icon } from "./ui/Icon";
import { useState } from "react";
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

  const { projectNuber, slug, title, role, techStack, imgSrcArr, url, description } = project;

  return (
    <div className="flex flex-col items-start gap-10 py-12 lg:py-[100px] h-full">
      <div className="relative bg-bgProject">
        <div className="relative z-10 flex items-start flex-col h-full lg:flex-row gap-5 bg-bgProject">
          {/* Left part ==============================================================*/}
          <div className="flex flex-col justify-between items-start gap-6 xl:h-[538px] str w-full lg:w-[553px] lg:pr-[130px]">
            <div className="flex flex-col gap-4 items-start">
              {/* Number and title ====================================================*/}
              <div className="flex flex-col items-start gap-4">
                <motion.span
                  {...animationTitleSection}
                  className="text-grey_500 text-8xl font-bold "
                >
                  &lt;{projectNuber}&gt;
                </motion.span>
                <motion.h3
                  {...animationTitleSection}
                  className="text-textLight"
                >
                  {title}
                </motion.h3>
              </div>

              {/* Role and Tech Stack  =================================================*/}
              <motion.div
                {...animationTitleSection}
                className="flex flex-col gap-2"
              >
                <p className="flex flex-col items-start text-accentGreen">
                  <span className=" ">Role</span>
                  {role}
                </p>

                <p className="flex flex-col items-start font-bold text-textLight">
                  <span>Tech Stack</span>
                  {techStack}
                </p>
              </motion.div>
            </div>

            {/* Button =============================================================== */}
            <motion.div {...animationTitleSection} className="flex items-center gap-4">
              <ShowMoreBtn
                ariaLabel="Show more"
                onClick={() => {
                  setIsShowDescription(!isShowDescription);
                }}
                className=" hidden lg:flex"
              >
                <p>Show {isShowDescription ? "less" : "more"}</p>
                <Icon
                  id="icon-arrow_down"
                  width={25}
                  height={12}
                  className={`mt-[0.5px] transition-all duration-700 easy-in-out  ${
                    isShowDescription && "rotate-180"
                  }`}
                />
              </ShowMoreBtn>
              {slug && (
                <Link
                  href={`/projects/${slug}`}
                  className="hidden lg:flex items-center gap-2 text-sm font-medium text-accentGreen hover:opacity-75 transition-opacity"
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
              alt="project image"
              sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 800px"
              aria-label="project image"
              className="rounded-2xl"
            />
          </motion.div>

          <ShowMoreBtn
            ariaLabel="Show more button"
            onClick={() => {
              setIsShowDescription(!isShowDescription);
            }}
            className="lg:hidden mr-auto"
          >
            <p>Show {isShowDescription ? "less" : "more"}</p>
            <Icon
              id="icon-arrow_down"
              width={25}
              height={12}
              className={`mt-[0.5px] transition-all duration-700 easy-in-out ${
                isShowDescription && "rotate-180"
              }`}
            />
          </ShowMoreBtn>
        </div>
        {/* Description =============================================================== */}
        <div
          className={`relative flex items-center justify-between flex-col lg:flex-row gap-12 lg:gap-24 w-full 
            transition-all duration-700 easy-in-out
          ${
            isShowDescription
              ? "z-0 max-h-[1000px] lg:max-h-[845px] opacity-100 pt-10"
              : "-z-0 max-h-0 opacity-0 pt-0"
          }
          `}
        >
          <div className="flex flex-col gap-12 w-full lg:w-[476px]">
            <ul className="flex flex-col gap-4">
              {description?.map((item, index) => (
                <li key={index}>
                  <p className="text-textLight/80">{item}</p>
                </li>
              ))}
            </ul>
            {/* <p className="text-textLight">{project.description}</p> */}
            {url?.length && (
              <LinkBtn
                href={url}
                ariaLabel="Link to Website"
                clasName="hidden lg:flex items-center justify-center gap-2 text-textLight border border-grey_500 hover:bg-textLight/10"
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
            alt="project image"
            sizes="(max-width: 1024px) 100vw, (max-width: 1400px) 50vw, 800px"
            aria-label="project image"
            className="rounded-2xl"
          />
          {url?.length && (
            <LinkBtn
              href={url}
              ariaLabel="Link to Website"
              clasName="flex items-center justify-center gap-2 text-textLight border border-grey_500 lg:hidden hover:bg-textLight/10"
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
  );
};
