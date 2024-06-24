import React, {
  useState,
  useRef,
  ChangeEvent,
  KeyboardEvent,
  useCallback,
} from "react";
import Image from "next/image";
import StarRating from "./StarRating";
import { Reservation } from "./ReviewType";
import ModalPortal from "../ModalPortal";
import { postMyReservationReview } from "@/util/api";
import { useNotification } from "@/contexts/NotificationContext";

type ReviewModalProps = {
  reservation: Reservation;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  setReservations: React.Dispatch<React.SetStateAction<Reservation[]>>;
};

const ReviewModal = ({
  setReservations,
  reservation,
  setState,
}: ReviewModalProps) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const { showNotification } = useNotification();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  console.log(reservation);
  const handleSubmit = useCallback(async () => {
    try {
      const id = reservation.id;
      console.log(id);
      const reviewData = {
        rating,
        content: reviewText,
      };

      const res = await postMyReservationReview(id, reviewData);

      if (typeof res === "string") {
        showNotification(res);
        return;
      }

      setState(false);
      showNotification("후기 작성이 완료되었습니다.");
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation.id === id
            ? { ...reservation, reviewSubmitted: true }
            : reservation,
        ),
      );
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  }, [
    rating,
    reviewText,
    reservation.id,
    setState,
    showNotification,
    setReservations,
  ]);

  const handleReviewChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      setReviewText(event.target.value);
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit();
      }
    },
    [handleSubmit],
  );

  const handleFocus = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  return (
    <ModalPortal
      title="후기 작성"
      setState={setState}
      buttonName="작성하기"
      onButtonClick={handleSubmit}
      usePortal={true}
    >
      <div className="flex h-75vh flex-col items-center justify-center gap-6 md:h-full">
        <div className="flex w-full flex-col items-center justify-center gap-2 px-4 md:flex-row md:justify-start md:gap-6 md:px-0">
          <div className="relative h-[256px] w-[256px] overflow-hidden rounded-[12px] md:h-[126px] md:w-[126px]">
            <Image
              src={reservation.activity.bannerImageUrl}
              alt={reservation.activity.title}
              layout="fill"
              objectFit="cover"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex w-full flex-col gap-2 text-center text-black md:w-auto md:text-left">
            <h2 className="text-[16px] font-bold md:text-[20px]">
              {reservation.activity.title}
            </h2>
            <div className="text-sm text-gray-600 md:text-base">
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
        <div className="flex w-full flex-grow">
          <textarea
            ref={textareaRef}
            className="text-black200 text-body1-regular flex-grow rounded-[4px] border-2 border-gray-400 px-[16px] py-[8px] md:h-[240px]"
            placeholder="후기를 작성해주세요"
            value={reviewText}
            onChange={handleReviewChange}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            style={{ resize: "none" }}
          />
        </div>
      </div>
    </ModalPortal>
  );
};

export default ReviewModal;
