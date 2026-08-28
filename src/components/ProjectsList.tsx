"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion} from "motion/react";
import { PROJECTS } from "../content";
import { animationTitleSection } from "../variables";
import { Icon } from "./ui/Icon";

const ProjectItemDynamic = dynamic(() =>
  import("./ProjectItem").then((mod) => mod.ProjectItem)
);

const FEATURED_PROJECTS_COUNT = 3;

export const ProjectsList: React.FC = () => {
  const featuredProjects = PROJECTS.slice(0, FEATURED_PROJECTS_COUNT);

  return (
    <motion.section
      {...animationTitleSection}
      id="projects"
      className="flex justify-center items-center bg-bgProject py-10 md:py-24 w-full rounded-[20px]"
    >
      <div className="container flex justify-start items-start flex-col ">
        <h2 className="text-textLight uppercase">Selected Projects</h2>

        <ul className="flex flex-col w-full">
          {featuredProjects.map((project, index) => {
            return (
              <li key={index}>
                <>
                  <ProjectItemDynamic
                    project={{ projectNuber: index + 1, ...project }}
                  />
                </>
                {index < featuredProjects.length - 1 && (
                  <div className="w-full h-[0.5px] bg-grey_500/50"></div>
                )}
              </li>
            );
          })}
        </ul>

        {PROJECTS.length > FEATURED_PROJECTS_COUNT && (
          <div className="flex justify-center w-full pt-10 md:pt-16">
            <Link
              href="/projects"
              aria-label="View all projects"
              className="buttonOrLink inline-flex items-center gap-2 border border-grey_500 px-8 text-textLight transition-colors hover:bg-textLight/10"
            >
              View all {PROJECTS.length} projects
              <Icon id="icon-arrow-up-right" width={12} height={12} />
            </Link>
          </div>
        )}
      </div>
    </motion.section>
  );
};
