import React from "react";
import {
  ActivityApiProps,
  ActivityManagementCardProps,
} from "./ActivityManagementCardWrapper";
import Image from "next/image";
import ActivityManagementKebab from "./ActivityManagementKebab";
import { Tooltip } from "flowbite-react";
import Link from "next/link";
interface Props {
  setActivities: React.Dispatch<React.SetStateAction<ActivityApiProps[]>>;
  prop: ActivityApiProps;
}
const ActivityManagementCard = ({ setActivities, prop }: Props) => {
  const {
    id,
    bannerImageUrl,
    rating,
    reviewCount,
    title,
    price,
  }: ActivityManagementCardProps = prop;
  return (
    <div className="flex h-32 w-full overflow-visible rounded-3xl bg-white pr-3 shadow-lg outline-[1px] md:h-52 md:pr-6 ">
      <Link
        href={`/activity-detail/${id}`}
        className="relative mr-2 inline-block h-full w-32 shrink-0 md:mr-6 md:w-52 "
      >
        <Image
          src={bannerImageUrl}
          fill
          priority
          className="rounded-l-3xl object-cover"
          sizes="(max-width: 768px) 135px, (max-width: 1200px) 160px, 204px"
          alt="reservationImage"
        />
      </Link>
      <section className="my-auto inline-block w-full">
        <div className="mb-7 md:mb-16">
          <span className="flex items-center text-sm text-black md:mb-1.5 md:text-base">
            <div className="my-auto mr-1.5 inline-block h-4 w-4 bg-[url('/icons/star.svg')] md:h-5 md:w-5" />
            {rating} ({reviewCount})
          </span>
          <Tooltip content={title} placement="bottom">
            <h4 className="max-w-[170px] truncate text-nowrap text-sm font-bold leading-[1.625rem] text-green-20 md:max-w-[472px] md:text-xl">
              {title}
            </h4>
          </Tooltip>
        </div>
        <div className="flex items-center justify-between ">
          <span className=" text-base font-medium text-gray-80 md:text-2xl ">
            ₩{price} /인
          </span>
          <ActivityManagementKebab
            setActivities={setActivities}
            activityId={id}
          />
        </div>
      </section>
    </div>
  );
};

export default ActivityManagementCard;
