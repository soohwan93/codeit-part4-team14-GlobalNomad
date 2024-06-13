"use client";

import Image from "next/image";
import Banner_image from "@/public/images/함께 배우면 즐거운 스트릿 댄스.png";
import { Search } from "@/components/common/Search";
import {
  CardResourceCategory,
  CardResourcePopular,
} from "@/components/common/CardResource";
import { Category, CategoryItem } from "@/components/common/Category";
import Pagination from "@/components/common/Pagination";
import Arrow from "@/components/common/svg/Arrow";

export default function Home() {
  const handleClick = () => {};
  return (
    <div className="relative w-full min-w-[375px] md:min-w-[743px]">
      <div className="relative h-full min-h-[240px] overflow-hidden md:min-h-[550px]">
        <Image
          className="absolute z-0 scale-150 object-cover"
          fill
          src={Banner_image}
          alt="Banner_image"
          priority
        />
        <div className="from-0.1% absolute z-[1] h-full w-full bg-gradient-to-r from-black/100"></div>
        <div className="absolute z-[1] flex h-full w-full flex-col gap-[8px] px-[24px] pt-[56px] text-[#ffffff] md:pt-[130px] xl:pt-[130px]">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="line-clamp-2 w-[200px] break-keep text-[24px] font-[700] md:w-[440px] md:text-[54px] xl:w-[550px] xl:text-[68px]">
              함께 배우면 즐거운 스트릿 댄스
            </div>
            <div className="text-[14px] font-[700] leading-[26px] md:text-[20px] xl:text-[24px]">
              1월의 인기 체험 BEST 🔥
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-1/2 z-[2] -mt-[61px] w-full max-w-[1246px] -translate-x-1/2 transform px-[16px] md:-mt-[54px] md:px-[23px]">
        <Search />
      </div>

      <div className="h-full w-full px-[16px] pt-[128px]">
        <div className="mx-auto w-full max-w-[1200px]">
          <div className="flex  flex-col gap-[16px]">
            <div className="flex items-center justify-between">
              <span className="text-[36px] font-[700]">🔥 인기 체험</span>
              <div className="flex gap-[12px]">
                <Arrow className="rotate-180" />
                <Arrow />
              </div>
            </div>
            <CardResourcePopular />
          </div>

          <div className="flex justify-between pb-[24px] pt-[40px]">
            <Category />
            <CategoryItem>리스트</CategoryItem>
          </div>

          <div className="flex flex-col gap-[24px]">
            <span className="text-[36px] font-[700]">🛼 모든 체험</span>
            <CardResourceCategory />
          </div>

          <div className="pb-[203px] pt-[83px]">
            <Pagination count={5} onPageClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
}
