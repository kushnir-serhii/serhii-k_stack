"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { services } from "../content";
import { Icon } from "./ui/Icon";
import { animationSection, animationTitleSection } from "../variables";

const ALL_LINK =
  "inline-flex h-[52px] items-center justify-center rounded-full border border-textDark px-6 font-medium text-textDark transition-colors hover:bg-textDark hover:text-textLight focus:outline-none focus-visible:ring-2 focus-visible:ring-green_600 focus-visible:ring-offset-2";

export const ServicesList: React.FC = () => {
  return (
    <section id="services" className="container flex flex-col gap-10">
      <div className="flex items-center justify-between gap-4">
        <motion.h2 {...animationTitleSection}>Services</motion.h2>
        <Link href="/services" className={`${ALL_LINK} hidden md:inline-flex`}>
          All services
        </Link>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((item) => (
          <motion.li key={item.slug} {...animationSection} className="h-full">
            <Link
              href={`/services#${item.slug}`}
              className="group relative flex h-full flex-col gap-6 rounded-[20px] bg-textLight p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-green_600"
            >
              <div className="flex items-center justify-between">
                <div className="flex justify-center items-center size-10 bg-accentGreen p-1 rounded-lg">
                  <Icon
                    id={item.iconId}
                    width={24}
                    height={24}
                    className="text-textDark"
                  />
                </div>
                <Icon
                  id="icon-arrow-up-right"
                  width={16}
                  height={16}
                  className="text-textDark opacity-30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </div>
              <h4>{item.service}</h4>
              <p>{item.description}</p>
            </Link>
          </motion.li>
        ))}
      </ul>
      <Link href="/services" className={`${ALL_LINK} md:hidden w-full`}>
        All services
      </Link>
    </section>
  );
};
