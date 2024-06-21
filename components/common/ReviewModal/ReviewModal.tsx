import React, { useState, useRef, ChangeEvent, KeyboardEvent, useCallback } from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import { Reservation } from "./ReviewType";
import ReservationPopup from "../ModalPortal";
import { postMyReservationReview } from "@/util/api";

type ReviewModalProps = {
  reservation: Reservation;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
};

const ReviewModal = ({ reservation, setState }: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = useCallback(async () => {
    try {
      const reviewData = {
        rating,
        content: reviewText,
      };

      await postMyReservationReview(reservation.id, reviewData);
      console.log("Review submitted:", { rating, reviewText });

      setState(false);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  }, [rating, reviewText, reservation.id, setState]);

  const handleReviewChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setReviewText(event.target.value);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  const handleFocus = useCallback(() => {
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
      <div className="flex flex-col items-center justify-center gap-6 h-75vh md:h-full">
        <div className="flex flex-col md:flex-row w-full gap-2 justify-center md:justify-start md:gap-6 items-center px-4 md:px-0">
          <div className="relative rounded-[12px] overflow-hidden w-[256px] h-[256px] md:w-[126px] md:h-[126px]">
            <Image
              src={reservation.activity.bannerImageUrl}
              alt={reservation.activity.title}
              layout="fill"
              objectFit="cover"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-black gap-2 text-center md:text-left w-full md:w-auto">
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
        <div className="flex-grow w-full flex">
          <textarea
            ref={textareaRef}
            className="flex-grow text-black200 px-[16px] py-[8px] border-2 border-gray-400 rounded-[4px] text-body1-regular md:h-[240px]"
            placeholder="후기를 작성해주세요"
            value={reviewText}
            onChange={handleReviewChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            style={{ resize: "none" }}
          />
        </div>
      </div>
    </ReservationPopup>
  );
};

export default ReviewModal;
