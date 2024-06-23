"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Arrow from "./svg/Arrow";

const bannerImageList = [
  {
    title: "모두와 함께 활동을 해봐요!",
    description: "1명부터 50명까지, 모두와 함께할 수 있는 체험들을 찾아보세요!",
    bannerImageUrl: "/images/배너4.png",
  },
  {
    title: "원하는 대로 활동을 만들어 봐요!",
    description: "모두의 기억에 남을, 색다른 체험을 생성하고, 시작하세요!",
    bannerImageUrl: "/images/함께 배우면 즐거운 스트릿 댄스.png",
  },
  {
    title: (
      <>
        무한한 체험,
        <br />
        색다른 활동
      </>
    ),
    description: "전국의 체험 / 활동을 분류별로 찾아보세요!",
    bannerImageUrl: "/images/연인과 사랑의 징검다리 건너기.png",
  },
  {
    title: "손쉽게 예약하고, 참여하세요!",
    description: "클릭 한번으로 손쉽게 예약하고, 참여하세요!",
    bannerImageUrl: "/images/세상에서 가장 멋진 석양.png",
  },
];

export const Banner = () => {
  const bannerContainerRef = useRef<HTMLDivElement>(null);
  const leftArrowRef = useRef<HTMLDivElement>(null);
  const rightArrowRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const banner = bannerContainerRef.current;
    const leftArrow = leftArrowRef.current;
    const rightArrow = rightArrowRef.current;

    const scrollLeft = () => {
      if (banner) {
        const fullWidth = currentIndex - banner.clientWidth;
        banner.scrollBy({ left: fullWidth, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (banner) {
        const fullWidth = currentIndex - banner.clientWidth;
        banner.scrollBy({ left: -fullWidth, behavior: "smooth" });
      }
    };

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % bannerImageList.length,
        );
      }, 5000);
    };

    const stopAutoScroll = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    startAutoScroll();

    if (banner) {
      banner.addEventListener("mouseenter", stopAutoScroll);
      banner.addEventListener("mouseleave", startAutoScroll);
    }

    if (leftArrow) {
      leftArrow.addEventListener("click", scrollLeft);
    }

    if (rightArrow) {
      rightArrow.addEventListener("click", scrollRight);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (banner) {
        banner.removeEventListener("mouseenter", stopAutoScroll);
        banner.removeEventListener("mouseleave", startAutoScroll);
      }
      if (leftArrow) {
        leftArrow.removeEventListener("click", scrollLeft);
      }
      if (rightArrow) {
        rightArrow.removeEventListener("click", scrollRight);
      }
    };
  }, []);

  useEffect(() => {
    if (bannerContainerRef.current) {
      bannerContainerRef.current.scrollTo({
        left: currentIndex * bannerContainerRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [currentIndex]);

  return (
    <div className="relative h-full min-h-[240px] w-full overflow-hidden md:min-h-[550px]">
      <div
        ref={bannerContainerRef}
        className="flex h-full min-h-[240px] w-full touch-pan-x snap-start overflow-hidden overflow-x-auto scrollbar-hide md:min-h-[550px]"
      >
        {bannerImageList.map((image, idx) => (
          <div key={idx} className="relative w-full flex-none">
            <Image
              className="absolute z-0 object-cover"
              fill
              src={image.bannerImageUrl}
              alt="Banner_image"
              priority
            />
            <div className="from-0.1% absolute z-[1] h-full w-full bg-gradient-to-r from-black/100" />
            <div className="absolute z-[1] h-full w-full px-[24px] pt-[56px] text-[#ffffff] md:pt-[130px] xl:pt-[130px]">
              <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-[8px] xl:gap-[20px]">
                <div className="line-clamp-2 h-[72px] w-[200px] break-keep text-[24px] font-[700] md:h-[162px] md:w-[440px] md:text-[54px] xl:h-[200px] xl:w-[550px] xl:text-[68px]">
                  {image.title}
                </div>
                <div className="w-[400px] overflow-hidden text-ellipsis text-[14px] font-[700] leading-[26px] md:w-[600px] md:text-[20px] xl:w-[800px] xl:text-[24px]">
                  {image.description}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div
          className="absolute left-8 top-1/2 z-[3] hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-white bg-opacity-50 p-2 min-[1420px]:flex"
          ref={leftArrowRef}
        >
          <Arrow className="rotate-180" />
        </div>
        <div
          className="absolute right-8 top-1/2 z-[3] hidden -translate-y-1/2 transform cursor-pointer rounded-full bg-white bg-opacity-50 p-2 min-[1420px]:flex"
          ref={rightArrowRef}
        >
          <Arrow />
        </div>
      </div>
    </div>
  );
};
