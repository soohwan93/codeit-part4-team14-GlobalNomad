"use client";

import React, { useEffect, useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import Image from "next/image";
import ReservationPopup from "./ReservationPopup";
import StarRating from "./StarRating";
import { Reservation } from "./ReviewType";

type ReviewModalProps = {
  reservation: Reservation;
  setState: (state: boolean) => void;
};

const ReviewModal = ({ reservation, setState }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    console.log("Review submitted:", { rating, reviewText });
    setState(false);
  };

  const handleReviewChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <ReservationPopup
      title="후기 작성"
      setState={setState}
      buttonName="작성하기"
      onButtonClick={handleSubmit}
      usePortal={true}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="flex w-full gap-2 md:gap-6 items-center">
          <div className="relative rounded-[12px] overflow-hidden w-[100px] h-[100px] md:w-[126px] md:h-[126px]">
            <Image
              src={reservation.activity.bannerImageUrl}
              alt={reservation.activity.title}
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col text-black gap-2">
            <h2 className="text-[16px] font-bold md:text-[20px]">
              {reservation.activity.title}
            </h2>
            <div className="text-sm md:text-base text-gray-600">
              <span>{reservation.date}</span>
              <span className="mx-1 md:mx-2">·</span>
              <span>
                {reservation.startTime} - {reservation.endTime}
              </span>
              <span className="mx-1 md:mx-2">·</span>
              <span>{reservation.headCount} 명</span>
            </div>
            <div className="w-full border-t border-gray-300" />
            <span className="text-[20px] font-bold md:text-[32px]">
              ₩{reservation.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>

        <StarRating rating={rating} setRating={setRating} />
        <textarea
          ref={textareaRef}
          className="text-black200 w-full px-[16px] py-[8px] border border-2 border-gray-400 rounded-[4px] text-body1-regular mobile:h-[346px] h-[240px]"
          placeholder="후기를 작성해주세요"
          value={reviewText}
          onChange={handleReviewChange}
          onKeyDown={handleKeyDown}
          style={{ resize: "none" }}
        />
      </div>
    </ReservationPopup>
  );
};

export default ReviewModal;
