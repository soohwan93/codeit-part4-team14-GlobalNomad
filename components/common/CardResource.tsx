import React from "react";
import Image from "next/image";
import StarSvg from "./svg/StarSvg";
import { ActivityItem } from "@/app/(app)/page";
import { Tooltip } from "@nextui-org/react";

interface CardProps {
  item: ActivityItem;
}

export const CardResourcePopular = ({ item }: CardProps) => {
  return (
    <div className="relative h-[186px] w-[186px] overflow-hidden rounded-[20px] md:h-[384px] md:w-[384px]">
      <Image
        className="absolute z-0 scale-125 rounded-[20px] object-cover"
        fill
        src={item.bannerImageUrl}
        alt="image"
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
      />
      <div className="from-0.1% absolute z-[1] h-full w-full rounded-[20px] bg-gradient-to-t from-black/80"></div>
      <div className="absolute bottom-[8px] z-[1] flex w-[186px] flex-col gap-[6px] px-[20px] py-[12px] text-[#ffffff] md:bottom-0 md:w-[384px] md:gap-[20px] md:py-[30px]">
        <div className="flex gap-[5px]">
          <StarSvg />
          <span className="text-[14px] font-[600]">
            {item.rating} ({item.reviewCount})
          </span>
        </div>
        <div className="break-word line-clamp-2 h-[55px] w-[146px] break-all text-[18px] font-[700] md:h-[90px] md:w-[230px] md:text-[30px]">
          {item.title}
        </div>
        <div className="flex gap-[5px] text-[16px] font-[700] md:text-[20px]">
          <span>₩ {item.price.toLocaleString()}</span>
          <span className="self-center text-[14px] font-[400] text-[#a1a1a1]">
            / 인
          </span>
        </div>
      </div>
    </div>
  );
};

export const CardResourceCategory = ({ item }: CardProps) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="relative w-full overflow-hidden rounded-[20px] pt-[100%]">
        <Image
          className="scale-125 rounded-[20px] object-cover"
          fill
          src={item.bannerImageUrl}
          alt="image"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="flex w-full flex-col gap-[10px] text-[#1b1b1b]">
        <div className="flex gap-[5px]">
          <StarSvg />
          <span className="text-[16px] font-[500]">
            {item.rating}{" "}
            <span className="text-[#a1a1a1]">({item.reviewCount})</span>
          </span>
        </div>
        <div className="truncate break-keep pb-[5px] text-[18px] font-[600] md:text-[24px]">
          <Tooltip
            content={item.title}
            color="foreground"
            placement="top-start"
          >
            <span>{item.title}</span>
          </Tooltip>
        </div>
        <div className="flex gap-[5px] text-[20px] font-[700] md:text-[28px]">
          <span>₩ {item.price.toLocaleString()}</span>
          <span className="self-center text-[16px] font-[400] text-[#4b4b4b] md:text-[20px]">
            / 인
          </span>
        </div>
      </div>
    </div>
  );
};
