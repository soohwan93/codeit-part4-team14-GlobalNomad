"use client";
import React from "react";
import KebabSvg from "../common/svg/KebabSvg";

type Props = {};

const ActivityDetailHeader = ({ data }: any) => {
  return (
    <header className="flex items-center justify-between px-4 py-4 xl:pt-20">
      <div>
        <span className="mb-2.5 text-sm leading-normal text-black">
          {data.category}
        </span>
        <h1 className="mb-4 text-2xl font-bold leading-normal text-nomad-black md:text-3xl">
          {data.title}
        </h1>
        <div className="text-sm text-black ">
          <span className="mr-3 inline-block">
            <div className="mr-1.5 inline-block h-4 w-4 bg-[url('/icons/Star.svg')]" />
            {data.rating.toFixed(1)} ({data.reviewCount})
          </span>
          <span>{data.address}</span>
        </div>
      </div>
      <button type="button">
        <KebabSvg />
      </button>
    </header>
  );
};

export default ActivityDetailHeader;
