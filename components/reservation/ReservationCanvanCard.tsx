import React, { useState } from "react";
import Image from "next/image";
import ReviewModal from "../common/ReviewModal/ReviewModal";
import { patchMyReservation } from "@/util/api";

interface Activity {
  bannerImageUrl: string;
  title: string;
  id: number;
}

interface Reservation {
  id: number;
  teamId: string;
  userId: number;
  activity: Activity;
  scheduleId: number;
  status: string;
  reviewSubmitted: boolean;
  totalPrice: number;
  headCount: number;
  date: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
}

interface ReservationCardProps {
  reservation: Reservation;
  getStatusText: (status: string, endTime: string) => string;
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
}

const ReservationCanvanCard = ({
  reservation,
  getStatusText,
  setReservations,
}: ReservationCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCanceled, setIsCanceled] = useState(
    reservation.status === "canceled",
  );

  if (!reservation) {
    return null;
  }

  const isExperienceCompleted = reservation.status === "completed";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-blue-500";
      case "canceled":
      case "completed":
        return "text-gray-500";
      case "confirmed":
        return "text-orange-500";
      case "declined":
        return "text-red-500";
      default:
        return "text-gray-800";
    }
  };

  const handleReviewButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCancelButtonClick = async () => {
    try {
      await patchMyReservation(reservation.id, { status: "canceled" });
      setIsCanceled(true);
      window.location.reload(); // 페이지 새로고침
    } catch (error) {
      console.error("예약 취소에 실패했습니다:", error);
    }
  };

  return (
    <div className="flex h-32 w-full overflow-visible rounded-3xl bg-white pr-3 shadow-lg outline-[1px] md:h-52 md:pr-6 ">
      <div className="relative mr-2 inline-block h-full w-32 shrink-0 md:mr-6 md:w-52">
        <Image
          src={reservation.activity.bannerImageUrl}
          fill
          priority
          className="rounded-l-3xl object-cover"
          sizes="(max-width: 768px) 135px, (max-width: 1200px) 160px, 204px"
          alt={reservation.activity.title}
        />
      </div>
      <section className="relative my-auto inline-block w-full">
        <div className="mb-4 md:mb-6">
          <span
            className={`flex items-center text-sm font-extrabold md:text-base ${getStatusColor(reservation.status)}`}
          >
            {getStatusText(reservation.status, reservation.endTime)}
          </span>
          <h4 className="max-w-[170px] truncate text-nowrap text-sm font-bold leading-[1.625rem] text-green-20 md:max-w-[472px] md:text-xl">
            {reservation.activity.title}
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="mb-2 text-xs text-gray-600 md:mb-4 md:text-medium">
              {reservation.date} · {reservation.startTime} -{" "}
              {reservation.endTime} · {reservation.headCount}명
            </div>
            <div className="font-bold text-gray-800">
              ₩{reservation.totalPrice.toLocaleString()}
            </div>
          </div>
          {isExperienceCompleted ? (
            reservation.reviewSubmitted ? (
              <button
                className="absolute bottom-1 right-4 rounded-lg bg-gray-300 px-2 py-1 text-xs text-white md:bottom-[-6px] md:px-4 md:py-2 md:text-medium"
                disabled
              >
                후기 작성 완료
              </button>
            ) : (
              <button
                className="absolute bottom-1 right-4 rounded-lg bg-nomad-black px-2 py-1 text-xs text-white md:bottom-[-6px] md:px-4 md:py-2 md:text-medium"
                onClick={handleReviewButtonClick}
              >
                후기 작성
              </button>
            )
          ) : (
            !isCanceled &&
            reservation.status === "pending" && (
              <button
                className="absolute bottom-1 right-4 rounded-lg border border-nomad-black bg-white px-2 py-1 text-xs text-nomad-black md:bottom-[-6px] md:px-4 md:py-2 md:text-medium"
                onClick={handleCancelButtonClick}
              >
                예약 취소
              </button>
            )
          )}
        </div>
      </section>
      {isModalOpen && (
        <ReviewModal
          setReservations={setReservations}
          reservation={reservation}
          setState={setIsModalOpen}
        />
      )}
    </div>
  );
};

export default ReservationCanvanCard;
