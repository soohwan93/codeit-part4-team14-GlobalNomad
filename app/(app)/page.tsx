'use client'

import ReviewModal from "@/components/common/ReviewModal/ReviewModal";
import React, { useState } from "react";
import { Reservation } from "@/components/common/ReviewModal/ReviewType"; // 경로는 프로젝트 구조에 맞게 조정하세요

const DummyData = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const dummyReservation: Reservation = {
    id: 1,
    teamId: "team123",
    userId: 1,
    activity: {
      bannerImageUrl: "", // 여기에 빈 문자열을 넣으면 기본 이미지를 사용하게 됩니다.
      title: "Amazing Activity",
      id: 1
    },
    scheduleId: 1,
    status: "CONFIRMED",
    reviewSubmitted: false,
    totalPrice: 50000,
    headCount: 2,
    date: "2024-06-20",
    startTime: "10:00",
    endTime: "12:00",
    createdAt: "2024-06-01T12:00:00Z",
    updatedAt: "2024-06-10T12:00:00Z"
  };

  return (
    <div>
      {isModalOpen && (
        <ReviewModal reservation={dummyReservation} setState={setIsModalOpen} />
      )}
    </div>
  );
};

export default DummyData;
