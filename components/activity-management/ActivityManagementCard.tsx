"use client";
import Image from "next/image";
import React from "react";

type Props = {};

const ActivityManagementCard = (props: Props) => {
  return (
    <div className="flex h-32 w-full overflow-hidden rounded-3xl bg-white pr-3 shadow-sm outline-[1px] md:h-36 md:pr-4 xl:h-52 xl:pr-6">
      <div className="relative mr-2 inline-block h-full w-32 shrink-0 md:mr-3 md:w-40 xl:mr-6 xl:w-52">
        <Image
          src={"/images/함께 배우면 즐거운 스트릿 댄스.png"}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 135px, (max-width: 1200px) 160px, 204px"
          alt="reservationImage"
        />
      </div>
      <section className="my-auto inline-block w-full">
        <div className="mb-7 md:mb-10 xl:mb-16">
          <span className="text-sm text-black md:mb-1.5 md:text-base">
            rating
          </span>
          <h4 className="truncate text-nowrap text-sm font-bold leading-[1.625rem] text-green-20 md:text-lg xl:text-xl">
            title
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <span className=" text-base font-medium text-black md:text-xl xl:text-2xl">
            bill
          </span>
          <button
            className="h-10 w-10 shrink-0 bg-[url('/icons/kebab.svg')] "
            type="button"
          ></button>
        </div>
      </section>
    </div>
  );
};

export default ActivityManagementCard;
