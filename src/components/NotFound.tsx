"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const NotFoundAnime = dynamic(
  () => import("./NotFoundAnime").then((module) => ({ default: module.NotFoundAnime })),
  { ssr: false }
);


export const NotFound: React.FC = () => {

  return (
    <div aria-label="404" className="container flex flex-col justify-center items-start w-full gap-[100px] pt-10 pb-96">
      <div className="flex flex-col justify-start items-start  flex-shrink-0 relative gap-6">
        <h2 className=" font-bold text-5xl text-left text-black">
          The page wasn’t found, let’s go to a better place.
        </h2>
        <div className="flex justify-center items-center gap-2.5 py-1 border-t-0 border-r-0 border-b border-black">
          <Link
            href="/"
            aria-label="link to home page"
            className="text-lg font-bold text-left text-black"
          >
            Take me home
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-start w-full lg:max-w-[625px]  gap-6">
        <NotFoundAnime />
      </div>
    </div>
  );
};
