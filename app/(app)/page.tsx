"use client";

import ReviewModal from "@/components/common/ReviewModal/ReviewModal";
import { useState } from "react";

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(true);

  const reservation = {
    id: 0,
    teamId: "string",
    userId: 0,
    activity: {
      bannerImageUrl: "",
      title: "강아지 배우와 즐거운 댄스",
      id: 0,
    },
    scheduleId: 0,
    status: "confirmed",
    reviewSubmitted: false,
    totalPrice: 10000,
    headCount: 1,
    date: "2023-02-14",
    startTime: "11:00",
    endTime: "12:30",
    createdAt: "2024-05-23T04:34:57.301Z",
    updatedAt: "2024-05-23T04:34:57.301Z",
  };

  return (
    <div>
      {isModalOpen && (
        <ReviewModal reservation={reservation} setState={setIsModalOpen} />
      )}
      <div id="portal" />
    </div>
  );
}
