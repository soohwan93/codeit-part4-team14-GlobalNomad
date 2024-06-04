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
      className={`${isSelected ? "bg-nomad-black" : "bg-white"} ${isSelected ? "text-white" : "bg-white"} w-[90px] rounded-[15px] border-[1px] border-green-20 px-[16px] py-[12px]  text-center text-[14px] font-[400] leading-normal tracking-tighter hover:bg-nomad-black hover:text-white md:w-[120px] md:px-[24px] md:py-[16px] md:text-[18px] xl:w-[127px]`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isEndPointScroll, setisEndPointScroll] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleCategoryClick = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        setisEndPointScroll(scrollLeft + clientWidth >= scrollWidth);
      }
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      handleScroll();
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
        <div className="pointer-events-none absolute z-0 h-[47px] w-[230px] bg-gradient-to-r from-transparent via-transparent via-70% to-white to-100% md:h-[61px] md:w-[523px] xl:hidden xl:w-[882px] " />
      )}
      <div
        ref={scrollRef}
        className="z-10 w-[230px] touch-pan-x snap-start overflow-hidden overflow-x-auto bg-transparent md:w-[523px] xl:w-[882px] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex w-[580px] gap-[8px] md:w-[790px] md:gap-[14px] xl:w-[882px] xl:gap-[24px]">
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
