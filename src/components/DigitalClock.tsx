"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import { nanoid } from "nanoid";

export default function DigitalClock() {
  const [time, setTime] = useState< Date | null >( null  );
  const formattedDate = format(time || new Date(), "EEE dd MMM").toUpperCase();

  useEffect(() => {
      setTime(new Date())
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time?.getHours().toString().padStart(2, "0");
  const minutes = time?.getMinutes().toString().padStart(2, "0");
  const seconds = time?.getSeconds().toString().padStart(2, "0");
  
  return (
    <div
      aria-labelledby="Digital Clock"
      className={`flex flex-col items-center justify-between gap-6 bg-white rounded-[20px] w-full max-w-[525px] md:max-w-[725px] xl:max-w-[525px] md:aspect-[288/80] lg:aspect-[525/258]
     p-6`}
    >
      {/* w-[288px] h-[140px] sm:w-[525px] sm:h-[258px] lg:w-[343px] lg:h-[150px] aspect-[288/80]
      xl:w-[525px] xl:h-[258px] */}
      <div className="flex items-center justify-between w-full">
        <p className="font-bold">My Local Time </p>
        <p className="text-textGrey uppercase">{formattedDate}</p>
      </div>
      <div className="flex justify-between gap-2 w-full font-advanced-pixel-lcd text-textDark responsive-clock">
        {" "}
        {/* //sm:text-5xl lg:text-3xl xl:text-5xl */}
        <span
          key={nanoid()}
          className="relative flex items-center justify-center text-gray-100 w-full"
        >
          88
          <span
            className={`absolute text-textDark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            {hours}
          </span>
        </span>
        {/*  */}
        <span key={nanoid()} className="text-inherit">
          :
        </span>
        {/*  */}
        <span
          key={nanoid()}
          className="relative flex items-center justify-center text-gray-100 w-full"
        >
          88
          <span
            className={`absolute text-textDark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            {minutes}
          </span>
        </span>
        {/*  */}
        <span key={nanoid()} className="text-inherit">
          :
        </span>
        {/*  */}
        <span
          key={nanoid()}
          className="relative flex items-center justify-center text-gray-100 w-full "
        >
          88
          <span
            className={`absolute text-textDark top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            {seconds}
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between w-full text-green_500 ">
        <p className="text-3xl md:text-4xl font-bold">CET</p>
        <p className="text-3xl md:text-4xl font-bold">WARSAW</p>
      </div>
    </div>
  );
}