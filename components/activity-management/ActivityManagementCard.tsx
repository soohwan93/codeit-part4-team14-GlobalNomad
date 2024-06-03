import Image from "next/image";
import React from "react";
import Button from "../common/Button";

type Props = {};

const ActivityManagementCard = (props: Props) => {
  return (
    <div className="flex h-32 w-full overflow-hidden rounded-3xl bg-white pr-3 shadow-sm outline-[1px] md:h-36 md:pr-4 xl:h-52 xl:pr-6">
      <div className="relative mr-2 inline-block h-full w-52 md:mr-3 xl:mr-6">
        <Image
          src={"/images/함께 배우면 즐거운 스트릿 댄스.png"}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 135px, (max-width: 1200px) 160px, 204px"
          alt="reservationImage"
        />
      </div>
      <section className="my-auto inline-block w-full">
        <div className="md:mb-3 xl:mb-4">
          <span className="text-sm font-bold leading-[1.625rem] text-gray-70 md:text-base">
            status
          </span>
          <h4 className="text-sm font-bold leading-[1.625rem] text-green-20 md:text-lg xl:text-xl">
            activity title
          </h4>
          <span className="text-xs leading-6 text-nomad-black md:text-sm xl:text-lg">
            duration
          </span>
        </div>
        <div className="flex w-full justify-between">
          <h5 className="text-base font-medium leading-normal text-black md:text-xl xl:text-2xl">
            가격
          </h5>
          <Button additionalClass="xl:w-32 md:h-10 w-20" size="sm">
            후기 작성
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ActivityManagementCard;
