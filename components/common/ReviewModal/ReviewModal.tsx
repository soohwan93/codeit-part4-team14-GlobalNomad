// ReviewModal.tsx
"use client";
import React, { useState } from "react";
import ReservationPopup from "./ModalPortal";
import Image from "next/image";
import StarRating from "./StarRating";
import { Reservation } from "./ReviewType";


interface ReviewModalProps {
  reservation: Reservation;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReviewModal = ({ reservation, setState }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleSubmit = () => {
    console.log("Review submitted:", { rating, reviewText }); // 임시 확인용 콘솔 로그
    setState(false);
    alert("후기가 등록되었습니다.");
  };

  return (
    <ReservationPopup title="후기 작성" setState={setState} buttonName="작성하기" onButtonClick={handleSubmit} usePortal={true}>
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 mb-4">
          <Image src={reservation.activity.bannerImageUrl} alt={reservation.activity.title} layout="fill" objectFit="cover" className="rounded-lg" />
        </div>
        <div className="text-lg font-bold">{reservation.activity.title}</div>
        <div className="text-gray-600 mb-4">
          {reservation.date} · {reservation.startTime} - {reservation.endTime} · {reservation.headCount}명
        </div>
        <div className="text-gray-800 font-bold mb-4">₩{reservation.totalPrice.toLocaleString()}</div>
        <StarRating rating={rating} setRating={setRating} />
        <textarea
          className="border rounded-lg p-2 w-full mb-4"
          placeholder="후기를 작성해주세요"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
        />
      </div>
    </ReservationPopup>
  );
};

export default ReviewModal;
