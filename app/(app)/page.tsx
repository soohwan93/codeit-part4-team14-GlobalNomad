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
import { Banner } from "@/components/common/Banner";
import Dropdown from "@/components/common/Dropdown";
import { useState } from "react";
import DropdownArrowSvg from "@/components/common/svg/DropdownArrowSvg";

export default function Home() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const options = [
    {
      label: "가격이 낮은 순",
      value: "가격이 낮은 순",
      onClick: () => {
        console.log("Option 1 clicked");
      },
    },
    {
      label: "가격이 높은 순",
      value: "가격이 높은 순",
      onClick: () => {
        console.log("Option 2 clicked");
      },
    },
  ];

  const handleClick = () => {};

  return (
    <div className="relative w-full min-w-[375px] md:min-w-[743px]">
      <Banner />

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

            <div className="w-[90px] rounded-[15px] border-[1px] border-green-20 px-[16px] py-[12px]  text-center text-[14px] font-[400] leading-normal tracking-tighter min-[720px]:w-[120px] min-[720px]:px-[24px] min-[720px]:py-[16px] min-[720px]:text-[18px] min-[830px]:w-[127px]">
              <Dropdown
                Options={options}
                defaultLabel={
                  <div
                    className="flex cursor-pointer items-center justify-between"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <div>가격</div>
                    <DropdownArrowSvg />
                  </div>
                }
                dropdownOpen={dropdownOpen}
                setDropdownOpen={setDropdownOpen}
                originPositionRight={false}
              />
            </div>
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
