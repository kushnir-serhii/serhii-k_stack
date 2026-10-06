"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { MainLogo } from "./MainLogo";
import { LinkBtn } from "./ui/LinkBtn";
import { navLinks, cvPath, legalLinks } from "../constants/navLinks";

export const Footer: React.FC = () => {
  return (
    <footer className="block bg-black text-grey_300 w-full">
      <div className=" flex flex-col justify-between gap-6 md:gap-10 mx-auto py-5 max-w-[1440px] w-full px-4 md:px-10 lg:px-20 ">
        <div className="flex flex-col gap-8 md:gap-0 md:flex-row justify-between items-center w-full">
          <MainLogo classNameLogo="text-white" classNameLink="focus-ring-black rounded-md" />
          <div className="flex flex-col md:flex-row items-center md:justify-end gap-6 w-full md:max-w-[540px]">
            {navLinks
              .filter(({ label }) => label !== "My CV" && label !== "Contacts")
              .map(({ label, href, external }) => (
                <Link
                  key={label}
                  href={href}
                  className="inline-flex min-h-11 items-center text-inherit rounded-md focus-ring-black"
                  {...(external && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {label}
                  {external && <span className="sr-only"> (opens in new tab)</span>}
                </Link>
              ))}

            <LinkBtn
              href={cvPath}
              ariaLabel="Download CV"
              className="downloadLinkBtn w-full flex md:max-w-[220px] text-black_900 focus-ring-black"
            >
              Open CV
            </LinkBtn>
          </div>
        </div>

        <motion.p
          aria-hidden="true"
          className="font-bold responsive-heading-footer text-center lg:text-start w-full uppercase text-white"
        >
          Full stack Developer{" "}
        </motion.p>

        <div className="flex flex-col items-center justify-center w-full">
          {/* Line */}
          <div className="w-full h-[0.5px] bg-grey_500 mb-6"></div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-grey_300 w-64 md:px-0 sm:w-full">
            <p className="text-inherit text-center md:text-start">
              ©Copyright Serhii Kushnir {new Date().getFullYear()}. All Rights Reserved
            </p>
            <nav aria-label="Legal" className="flex items-center gap-6">
              {legalLinks.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="inline-flex min-h-11 items-center text-base text-inherit rounded-md transition-colors hover:text-white focus-ring-black"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
