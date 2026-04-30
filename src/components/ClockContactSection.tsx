"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "./ui/Icon";
import { contacts } from "../content";
// import { lazy } from "react";
import { animationSection, animationTitleSection } from "../variables";
import dynamic from "next/dynamic";

const DigitalClockDynamic = dynamic(() => import("../components/DigitalClock"));  

export const ClockContactsSection: React.FC = () => {
  
  return (
    <section aria-label="Clock and contacts section" id="contacts" className="container flex flex-col gap-10">
      <motion.h2 {...animationTitleSection}>Let’s connect</motion.h2>

      <motion.div {...animationSection} className=" flex flex-col-reverse lg:flex-row justify-between items-start gap-10">
        <div className="flex justify-start items-center w-full xl:w-1/2">
          <DigitalClockDynamic />
        </div>
        <div className=" flex flex-col justify-between items-center gap-10 w-full xl:w-1/2 ">
          <p>
            Thank you for stopping by! I’m always excited to explore new
            opportunities and collaborations. Let’s connect through email,
            phone, LinkedIn, or GitHub—I’d love to hear from you!
          </p>
          <ul className="flex flex-col md:flex-row flex-wrap justify-start lg:justify-between items-start gap-4 lg:gap-2 w-full">
            {contacts.map((contact, index) => {
              return (
                <li key={index} className="flex flex-col items-start gap-1">
                  <Link
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Link to contact ${contact.url}`}
                    className="group flex flex-col items-start font-bold gap-2 cursor-pointer transition-all duration-300 hover:text-grey_500"
                  >
                    {contact.text}
                    <Icon
                      id="icon-arrow-up-right"
                      width={12}
                      height={12}
                      className="text-black group-hover:text-grey_500"
                    />
                  </Link>
                  <p className="">{contact.service}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};
