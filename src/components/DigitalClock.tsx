"use client";

import { useState, useEffect } from "react";

const WARSAW_TZ = "Europe/Warsaw";

const dateFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: WARSAW_TZ,
  weekday: "short",
  day: "2-digit",
  month: "short",
});

const digitsFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: WARSAW_TZ,
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

const srTimeFmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: WARSAW_TZ,
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
});

const offsetFmt = new Intl.DateTimeFormat("en-US", {
  timeZone: WARSAW_TZ,
  timeZoneName: "shortOffset",
});

/** "CET" at UTC+1, "CEST" at UTC+2 (Europe/Warsaw only ever sits at one of the two). */
function warsawZoneLabel(date: Date): string {
  const part = offsetFmt.formatToParts(date).find((p) => p.type === "timeZoneName");
  const offset = part?.value ?? "";
  if (offset.includes("2")) return "CEST";
  return "CET";
}

interface ClockParts {
  hours: string;
  minutes: string;
  seconds: string;
  formattedDate: string;
  zoneLabel: string;
  srLabel: string;
}

function getClockParts(date: Date): ClockParts {
  const parts = digitsFmt.formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "--";
  return {
    hours: get("hour"),
    minutes: get("minute"),
    seconds: get("second"),
    formattedDate: dateFmt.format(date).toUpperCase(),
    zoneLabel: warsawZoneLabel(date),
    srLabel: srTimeFmt.format(date),
  };
}

export default function DigitalClock() {
  const [parts, setParts] = useState<ClockParts | null>(null);

  useEffect(() => {
    setParts(getClockParts(new Date()));
    const interval = setInterval(() => {
      setParts(getClockParts(new Date()));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      role="group"
      aria-label="Serhii's local time"
      className={`flex flex-col items-center justify-between gap-6 bg-white rounded-[20px] w-full max-w-[525px] md:max-w-[725px] xl:max-w-[525px] md:aspect-[288/80] lg:aspect-[525/258]
     p-6`}
    >
      {/* w-[288px] h-[140px] sm:w-[525px] sm:h-[258px] lg:w-[343px] lg:h-[150px] aspect-[288/80]
      xl:w-[525px] xl:h-[258px] */}
      <div className="flex items-center justify-between w-full">
        <p className="font-bold">My Local Time </p>
        <p className="text-grey_400 uppercase">{parts?.formattedDate ?? ""}</p>
      </div>
      <time
        dateTime={parts ? new Date().toISOString() : undefined}
        className="sr-only"
      >
        {parts ? `Serhii's local time in Warsaw: ${parts.srLabel}` : "Loading Serhii's local time in Warsaw"}
      </time>
      <div
        aria-hidden="true"
        className="flex justify-between gap-2 w-full font-advancedPixel text-black_900 responsive-clock"
      >
        {" "}
        {/* //sm:text-5xl lg:text-3xl xl:text-5xl */}
        <span className="relative flex items-center justify-center text-grey_100 w-full">
          88
          <span
            className={`absolute text-black_900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            {parts?.hours ?? "--"}
          </span>
        </span>
        {/*  */}
        <span className="text-inherit">:</span>
        {/*  */}
        <span className="relative flex items-center justify-center text-grey_100 w-full">
          88
          <span
            className={`absolute text-black_900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            {parts?.minutes ?? "--"}
          </span>
        </span>
        {/*  */}
        <span className="text-inherit">:</span>
        {/*  */}
        <span className="relative flex items-center justify-center text-grey_100 w-full ">
          88
          <span
            className={`absolute text-black_900 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`}
          >
            {parts?.seconds ?? "--"}
          </span>
        </span>
      </div>
      <div className="flex items-center justify-between w-full text-green_500 ">
        <p className="text-3xl md:text-4xl font-bold">{parts?.zoneLabel ?? "CET"}</p>
        <p className="text-3xl md:text-4xl font-bold">WARSAW</p>
      </div>
    </div>
  );
}