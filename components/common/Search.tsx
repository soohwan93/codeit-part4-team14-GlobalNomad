"use client";

import React, { ChangeEvent, useState } from "react";
import SearchLogoSvg from "./svg/SearchLogoSvg";

export const Search = () => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") setIsFocused(false);
    return;
  };

  return (
    <form className="flex w-full max-w-[1200px] flex-col gap-[15px] rounded-[16px] bg-white px-[24px] py-[16px] shadow-lg md:gap-[32px]">
      <span className="text-[16px] font-[700] leading-[26px] md:text-[20px]">
        무엇을 체험하고 싶으신가요?
      </span>
      <div className="flex h-[56px] w-full max-w-[1152px] gap-[12px] py-[4px] ">
        <div className="relative flex w-full max-w-[1004px] rounded-[4px] border-[1px] border-gray-70">
          <div className="h-[48px] w-[48px] p-[12px]">
            <SearchLogoSvg />
          </div>
          <input
            className="z-[1] w-[137px] rounded-[4px] bg-transparent pr-[16px] text-[14px] font-[400] leading-[26px] focus:outline-none md:w-[450px] md:text-[16px] xl:w-[954px]"
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <span
            className={`absolute left-[48px] top-[34px] w-[115px] px-[5px] md:w-[130px] ${isFocused ? "-translate-y-12" : "-translate-y-6"} transform bg-white text-[14px] font-[400] leading-[26px] text-gray-60 transition duration-300 ease-in-out md:text-[16px]`}
          >
            내가 원하는 체험은
          </span>
        </div>
        <button className="w-full max-w-[96px] rounded-[4px] bg-nomad-black px-[20px] py-[8px] text-[16px] font-[700] leading-[26px] text-[#ffffff] md:max-w-[136px] md:px-[40px]">
          검색하기
        </button>
      </div>
    </form>
  );
};
