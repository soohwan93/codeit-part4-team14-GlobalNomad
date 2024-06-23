"use client";

import React from "react";
import { Search } from "@/components/common/Search";
import {
  CardResourceCategory,
  CardResourcePopular,
} from "@/components/common/CardResource";
import { Category } from "@/components/common/Category";
import Pagination from "@/components/common/Pagination";
import Arrow from "@/components/common/svg/Arrow";
import { Banner } from "@/components/common/Banner";
import Dropdown from "@/components/common/Dropdown";
import { useEffect, useRef, useState } from "react";
import DropdownArrowSvg from "@/components/common/svg/DropdownArrowSvg";
import Link from "next/link";
import { ActivityItem } from "@/app/(app)/page";

interface MainInfoProps {
  activities: ActivityItem[];
  totalCount: number;
}

export const MainInfo = ({ activities, totalCount }: MainInfoProps) => {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [activityList, setActivityList] = useState<ActivityItem[]>(activities);
  const [filteredActivityList, setFilteredActivityList] =
    useState<ActivityItem[]>(activities);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentList, setCurrentList] = useState<ActivityItem[]>(
    activities.slice(0, 8),
  );
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchWord, setSearchWord] = useState<string>("");
  const [filterReset, setFilterReset] = useState<boolean>(false);

  const sliderContainerRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLDivElement>(null);
  const rightArrowRef = useRef<HTMLDivElement>(null);

  const options = [
    {
      label: "가격이 낮은 순",
      value: "price_asc",
      onClick: () => {
        priceActivityList("price_asc");
        handleFilterReset();
      },
    },
    {
      label: "가격이 높은 순",
      value: "price_desc",
      onClick: () => {
        priceActivityList("price_desc");
        handleFilterReset();
      },
    },
  ];

  const sortActivity = [...activityList];
  const sortActivityList = sortActivity?.sort((a, b) => {
    if (a.rating === b.rating) {
      return b.reviewCount - a.reviewCount;
    }
    return b.rating - a.rating;
  });

  const activityPopularList = sortActivityList?.slice(0, 6);

  const priceActivityList = (sortType: string) => {
    let sortedList: ActivityItem[] = [];

    if (sortType === "price_asc") {
      sortedList = [...filteredActivityList].sort((a, b) => a.price - b.price);
    } else if (sortType === "price_desc") {
      sortedList = [...filteredActivityList].sort((a, b) => b.price - a.price);
    }

    setFilteredActivityList(sortedList);
    setCurrentPage(1);
  };

  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);

    if (category) {
      const filteredList = activityList?.filter(
        (item) => item.category === category,
      );
      setFilteredActivityList(filteredList);
    } else {
      setFilteredActivityList(activityList);
    }
    setCurrentPage(1);
  };

  const handleSearch = (word: string) => {
    setSearchWord(word);
    if (word.trim() === "") {
      setFilteredActivityList(activityList);
    } else {
      const filteredList = activityList.filter(
        (item) => item.title.includes(word) || item.description.includes(word),
      );
      setFilteredActivityList(filteredList);
    }
    setCurrentPage(1);
  };

  useEffect(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    setCurrentList(filteredActivityList.slice(startIdx, endIdx));
  }, [currentPage, itemsPerPage, filteredActivityList]);

  const handleFilterReset = () => {
    setFilterReset(!filterReset);
  };

  const handlePageClick = (pageNum: number) => {
    setCurrentPage(pageNum);
  };

  useEffect(() => {
    const slider = sliderContainerRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;

    const scrollLeft = () => {
      if (slider) {
        slider.scrollBy({ left: -408, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (slider) {
        slider.scrollBy({ left: 408, behavior: "smooth" });
      }
    };

    if (leftArrow) {
      leftArrow.addEventListener("click", scrollLeft);
    }

    if (rightArrow) {
      rightArrow.addEventListener("click", scrollRight);
    }

    return () => {
      if (leftArrow) {
        leftArrow.removeEventListener("click", scrollLeft);
      }
      if (rightArrow) {
        rightArrow.removeEventListener("click", scrollRight);
      }
    };
  }, []);

  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth > 1283) {
        setItemsPerPage(8);
      } else if (window.innerWidth > 771 && window.innerWidth <= 1283) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(4);
      }
    };

    window.addEventListener("resize", updateItemsPerPage);
    updateItemsPerPage();

    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [searchWord.length]);

  useEffect(() => {
    handlePageClick(1);
  }, [itemsPerPage]);

  const customClassName = "right-[-28px] top-[48px] z-[2]";

  return (
    <div className="relative w-full min-w-[375px] md:min-w-[743px]">
      <Banner />

      <div className="absolute left-1/2 z-[2] -mt-[61px] w-full max-w-[1246px] -translate-x-1/2 transform px-[16px] md:-mt-[54px] md:px-[23px]">
        <Search onSearch={handleSearch} />
      </div>

      {searchWord.length === 0 ? (
        <div className="h-full w-full px-[16px] pt-[144px]">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center justify-between">
                <span className="text-[36px] font-[700]">🔥 인기 체험</span>
                <div className="hidden xl:flex xl:gap-[12px]">
                  <div ref={leftArrowRef} className="cursor-pointer">
                    <Arrow className="rotate-180" />
                  </div>
                  <div ref={rightArrowRef} className="cursor-pointer">
                    <Arrow />
                  </div>
                </div>
              </div>
              <div
                ref={sliderContainerRef}
                className="flex w-full touch-pan-x snap-start gap-[16px] overflow-hidden overflow-x-auto scrollbar-hide md:gap-[32px] xl:gap-[24px]"
              >
                {activityPopularList?.map((item: ActivityItem) => (
                  <Link key={item.id} href={`/activity-detail/${item.id}`}>
                    <CardResourcePopular item={item} />
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex justify-between pb-[24px] pt-[40px]">
              <Category
                selectedCategory={selectedCategory}
                setSelectedCategory={handleCategorySelect}
              />

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
                  customClassName={customClassName}
                />
              </div>
            </div>

            <div className="flex flex-col gap-[24px]">
              {selectedCategory ? (
                <span className="text-[36px] font-[700]">
                  {selectedCategory}
                </span>
              ) : (
                <span className="text-[36px] font-[700]">모든 체험</span>
              )}
              {totalCount && currentList.length > 0 ? (
                <div className="grid w-full grid-cols-2 grid-rows-2 gap-x-[8px] gap-y-[24px] md:grid-cols-3 md:grid-rows-3 md:gap-x-[16px] md:gap-y-[32px] xl:grid-cols-4 xl:grid-rows-2 xl:gap-x-[24px] xl:gap-y-[48px]">
                  {currentList.map((item: ActivityItem) => (
                    <Link key={item.id} href={`/activity-detail/${item.id}`}>
                      <CardResourceCategory item={item} />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex h-full min-h-[898px] w-full max-w-[1200px] items-center justify-center pt-[16px] md:pt-[24px]">
                  <span className="text-[18px] font-[700] md:text-[24px]">
                    등록된 체험이 없습니다.
                  </span>
                </div>
              )}
            </div>

            <div className="pb-[203px] pt-[83px]">
              <Pagination
                count={
                  totalCount === 0
                    ? activities.length
                    : selectedCategory
                      ? activityList.filter(
                          (item) => item.category === selectedCategory,
                        ).length
                      : activityList.length
                }
                pageItemLimit={itemsPerPage}
                onPageClick={handlePageClick}
                pageRefreshSwitch={filterReset}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full px-[16px] pt-[144px]">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col">
                <span className="gap-[12px] text-[24px] font-[400] md:text-[32px]">
                  <span className="font-[700]">{searchWord}</span>으로 검색한
                  결과입니다.
                </span>
                <div className="text-[16px] font-[400] leading-[26px]">
                  <span>총 {filteredActivityList.length}개의 결과</span>
                </div>
              </div>
            </div>

            {filteredActivityList.length > 0 ? (
              <div className="pt-[16px] md:pt-[24px]">
                <div className="grid w-full grid-cols-2 grid-rows-2 gap-x-[8px] gap-y-[24px] md:grid-cols-3 md:grid-rows-3 md:gap-x-[16px] md:gap-y-[32px] xl:grid-cols-4 xl:grid-rows-2 xl:gap-x-[24px] xl:gap-y-[48px]">
                  {currentList.map((item: ActivityItem) => (
                    <div key={item.id}>
                      <CardResourceCategory item={item} />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[380px] w-full max-w-[1200px] items-center justify-center pt-[16px] md:min-h-[500px] md:pt-[24px]">
                <span className="text-[18px] font-[700] md:text-[24px]">
                  검색결과가 없습니다.
                </span>
              </div>
            )}

            <div className="pb-[203px] pt-[83px]">
              <Pagination
                count={filteredActivityList.length}
                pageItemLimit={itemsPerPage}
                onPageClick={handlePageClick}
                pageRefreshSwitch={filterReset}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
