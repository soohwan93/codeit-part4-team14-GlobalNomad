import React from "react";
import Image from "next/image";
import Banner_image from "@/public/images/함께 배우면 즐거운 스트릿 댄스.png";

export const Banner = () => {
  return (
    <div className="relative h-full min-h-[240px] overflow-hidden md:min-h-[550px]">
      <Image
        className="absolute z-0 scale-150 object-cover"
        fill
        src={Banner_image}
        alt="Banner_image"
        priority
      />
      <div className="from-0.1% absolute z-[1] h-full w-full bg-gradient-to-r from-black/100"></div>
      <div className="absolute z-[1] h-full w-full px-[24px] pt-[56px] text-[#ffffff] md:pt-[130px] xl:pt-[130px]">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[8px]">
          <div className="line-clamp-2 w-[200px] break-keep text-[24px] font-[700] md:w-[440px] md:text-[54px] xl:w-[550px] xl:text-[68px]">
            함께 배우면 즐거운 스트릿 댄스
          </div>
          <div className="text-[14px] font-[700] leading-[26px] md:text-[20px] xl:text-[24px]">
            1월의 인기 체험 BEST 🔥
          </div>
        </div>
      </div>
    </div>
  );
};
