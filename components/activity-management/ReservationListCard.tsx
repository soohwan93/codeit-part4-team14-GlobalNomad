import Image from "next/image";
import React from "react";

type Props = {};

const ReservationListCard = (props: Props) => {
  return (
    <div className="flex h-32 w-full overflow-hidden rounded-3xl bg-white shadow-sm outline-[1px] md:h-36 xl:h-52">
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
      <section className="my-auto inline-block">
        asdfasdfasfsdfadsfdsafasdf
      </section>
    </div>
  );
};

export default ReservationListCard;
