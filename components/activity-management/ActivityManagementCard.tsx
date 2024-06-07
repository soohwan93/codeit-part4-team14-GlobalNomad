"use client";
import Image from "next/image";
import React from "react";

interface ActivityManagementCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
}

const ActivityManagementCard = ({
  prop,
}: {
  prop: ActivityManagementCardProps;
}) => {
  const { id, title, price, bannerImageUrl, rating, reviewCount } = prop;

  return (
    <div className="flex h-32 w-full overflow-hidden rounded-3xl bg-white pr-3 shadow-sm outline-[1px] md:h-36 md:pr-4 xl:h-52 xl:pr-6">
      <div className="relative mr-2 inline-block h-full w-32 shrink-0 md:mr-3 md:w-40 xl:mr-6 xl:w-52">
        <Image
          src={bannerImageUrl}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 135px, (max-width: 1200px) 160px, 204px"
          alt="reservationImage"
        />
      </div>
      <section className="my-auto inline-block w-full">
        <div className="mb-7 md:mb-10 xl:mb-16">
          <span className="flex items-center text-sm text-black md:mb-1.5 md:text-base">
            <div className="my-auto mr-1.5 inline-block h-4 w-4 bg-[url('/icons/star.svg')] md:h-5 md:w-5" />
            {rating} ({reviewCount})
          </span>
          <h4 className="truncate text-nowrap text-sm font-bold leading-[1.625rem] text-green-20 md:text-lg xl:text-xl">
            {title}
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <span className=" text-base font-medium text-gray-80 md:text-xl xl:text-2xl">
            ₩{price} /인
          </span>
          <button
            className="h-10 w-10 shrink-0 bg-[url('/icons/kebab.svg')] "
            type="button"
          ></button>
        </div>
      </section>
    </div>
  );
};

export default ActivityManagementCard;