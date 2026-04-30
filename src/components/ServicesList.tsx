"use client";

import { motion } from "motion/react";
import { services } from "../content";
import { Icon } from "./ui/Icon";
import { animationSection, animationTitleSection } from "../variables";

export const ServicesList: React.FC = () => {
  
  return (
    <section id="services" className="container flex flex-col gap-10">
      <motion.h2 {...animationTitleSection}>Services</motion.h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((item, index) => {
          return (
            <motion.li
              key={index}
              {...animationSection}
              className="flex flex-col gap-6 bg-textLight rounded-[20px] p-6"
            >
              <div className="flex justify-center items-center size-10 bg-accentGreen p-1 rounded-lg">
                <Icon
                  id={item.iconId}
                  width={24}
                  height={24}
                  className="text-textDark"
                />
              </div>
              <h4>{item.service}</h4>
              <p>{item.description}</p>
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
};
