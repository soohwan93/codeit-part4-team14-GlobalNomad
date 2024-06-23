import React, { useState } from "react";
import Image from "next/image";
import ReviewModal from "../common/ReviewModal/ReviewModal";

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
}

const ReservationCanvanCard = ({ reservation, getStatusText }: ReservationCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="relative flex h-32 w-full overflow-visible rounded-3xl bg-white pr-3 shadow-lg outline-[1px] my-4 md:h-52 md:pr-6">
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
      <section className="my-auto inline-block w-full relative">
        <div className="mb-4 md:mb-6">
          <span className={`flex items-center font-extrabold text-sm md:text-base ${getStatusColor(reservation.status)}`}>
            {getStatusText(reservation.status, reservation.endTime)}
          </span>
          <h4 className="max-w-[170px] truncate text-nowrap text-sm font-bold leading-[1.625rem] text-green-20 md:max-w-[472px] md:text-xl">
            {reservation.activity.title}
          </h4>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-gray-600 text-xs mb-2 md:mb-4 md:text-medium">
              {reservation.date} · {reservation.startTime} - {reservation.endTime} · {reservation.headCount}명
            </div>
            <div className="text-gray-800 font-bold">
              ₩{reservation.totalPrice.toLocaleString()}
            </div>
          </div>
          {isExperienceCompleted && (
            <button 
              className="absolute bottom-1 right-4 bg-nomad-black text-xs text-white py-1 px-2 rounded-lg md:py-2 md:px-4 md:text-medium md:bottom-[-6px]"
              onClick={handleReviewButtonClick}
            >
              후기 작성
            </button>
          )}
        </div>
      </section>
      {isModalOpen && (
        <ReviewModal 
          reservation={reservation} 
          setState={setIsModalOpen} 
        />
      )}
    </div>
  );
};

export default ReservationCanvanCard;
