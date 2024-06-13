import React from "react";
import Image from "next/image";
import Star from "@/public/icons/Star.svg";
import image from "@/public/images/함께 배우면 즐거운 스트릿 댄스.png";
import StarSvg from "./svg/StarSvg";

export const CardResourcePopular = () => {
  return (
    <div className="relative h-[186px] w-[186px] overflow-hidden rounded-[20px] md:h-[384px] md:w-[384px]">
      <Image
        className="absolute z-0 scale-125 rounded-[20px] object-cover"
        fill
        src={image}
        alt="image"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />
      <div className="from-0.1% absolute z-[1] h-full w-full rounded-[20px] bg-gradient-to-t from-black/80"></div>
      <div className="absolute bottom-[8px] z-[1] flex w-[186px] flex-col gap-[6px] px-[20px] py-[12px] text-[#ffffff] md:bottom-0 md:w-[384px] md:gap-[20px] md:py-[30px]">
        <div className="flex gap-[5px]">
          <StarSvg />
          <span className="text-[14px] font-[600]">4.9 (793)</span>
        </div>
        <div className="line-clamp-2 w-[146px] break-keep text-[18px] font-[700] md:w-[230px] md:text-[30px]">
          함께 배우면 즐거운 스트릿 댄스
        </div>
        <div className="flex gap-[5px] text-[16px] font-[700] md:text-[20px]">
          <span>₩ 38,000</span>
          <span className="self-center text-[14px] font-[400] text-[#a1a1a1]">
            / 인
          </span>
        </div>
      </div>
    </div>
  );
};

export const CardResourceCategory = () => {
  return (
    <div className="flex w-min flex-col gap-[16px]">
      <div className="relative h-[168px] w-[168px] overflow-hidden rounded-[20px] md:h-[221px] md:w-[221px] xl:h-[283px] xl:w-[283px]">
        <Image
          className="scale-125 rounded-[20px] object-cover"
          fill
          src={image}
          alt="image"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="flex w-[168px] flex-col gap-[10px] text-[#1b1b1b] md:w-[282px]">
        <div className="flex gap-[5px]">
          <StarSvg />
          <span className="text-[16px] font-[500]">
            4.9 <span className="text-[#a1a1a1]">(793)</span>
          </span>
        </div>
        <div className="... truncate break-keep pb-[5px] text-[18px] font-[600] md:text-[24px]">
          함께 배우면 즐거운 스트릿 댄스!!!
        </div>
        <div className="flex gap-[5px] text-[20px] font-[700] md:text-[28px]">
          <span>₩ 38,000</span>
          <span className="self-center text-[16px] font-[400] text-[#4b4b4b] md:text-[20px]">
            / 인
          </span>
        </div>
      </div>
    </div>
  );
};
