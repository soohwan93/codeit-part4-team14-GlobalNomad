import { getMyActivities } from "@/util/api";
import React from "react";

const page = async () => {
  const myActivityList = await getMyActivities();

  return (
    <div className="h-screen w-screen bg-gray-10 px-8 pt-16">
      <main className="mx-auto w-full max-w-[75rem]">
        <h2 className="mb-8 text-[2rem] font-bold leading-normal text-black">
          예약 현황
        </h2>
      </main>
    </div>
  );
};

export default page;
