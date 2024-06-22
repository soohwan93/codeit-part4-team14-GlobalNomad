"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";

interface CategoryItemProps {
  children: ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
}

const CATEGORY_LIST = [
  "문화 · 예술",
  "식음료",
  "스포츠",
  "투어",
  "관광",
  "웰빙",
];

export const CategoryItem = ({
  children,
  isSelected,
  onClick,
}: CategoryItemProps) => {
  return (
    <button
      className={`${isSelected ? "bg-nomad-black" : "bg-white"} ${isSelected ? "text-white" : "bg-white"} w-[90px] rounded-[15px] border-[1px] border-green-20 px-[16px] py-[12px]  text-center text-[14px] font-[400] leading-normal tracking-tighter hover:bg-nomad-black hover:text-white min-[720px]:w-[120px] min-[720px]:px-[24px] min-[720px]:py-[16px] min-[720px]:text-[18px] min-[830px]:w-[127px]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

interface CategoryProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const Category = ({
  selectedCategory,
  setSelectedCategory,
}: CategoryProps) => {
  const [isEndPointScroll, setIsEndPointScroll] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
    handleScroll();
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
      setIsEndPointScroll(scrollLeft + clientWidth >= scrollWidth);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div>
      {!isEndPointScroll && (
        <div className="pointer-events-none absolute z-0 h-[47px] w-[220px] bg-gradient-to-r from-transparent via-transparent via-70% to-white to-100% min-[450px]:w-[270px] min-[550px]:w-[370px] min-[720px]:h-[61px] min-[720px]:w-[523px] min-[980px]:w-[732px] min-[1080px]:hidden min-[1080px]:w-[882px]" />
      )}
      <div
        ref={scrollRef}
        className="z-10 w-[220px] touch-pan-x snap-start overflow-hidden overflow-x-auto bg-transparent min-[450px]:w-[270px] min-[550px]:w-[370px] min-[720px]:w-[523px] min-[980px]:w-[732px] min-[1080px]:w-[882px] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-[580px] gap-[8px] min-[720px]:w-[790px] min-[720px]:gap-[14px] min-[830px]:w-[882px] min-[830px]:gap-[24px]">
          {CATEGORY_LIST.map((item: string) => {
            return (
              <CategoryItem
                key={item}
                isSelected={item === selectedCategory}
                onClick={() => handleCategoryClick(item)}
              >
                {item}
              </CategoryItem>
            );
          })}
        </div>
      </div>
    </div>
  );
};
