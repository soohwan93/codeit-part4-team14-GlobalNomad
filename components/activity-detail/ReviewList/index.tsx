"use client";
import React, { Fragment } from "react";
import Review from "./Review";
import Pagination from "@/components/common/Pagination";
import ratingString from "@/util/ratingString";

interface ReviewsType {
  id: number;
  user: {
    profileImageUrl: string;
    nickname: string;
    id: number;
  };
  activityId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}
interface ReviewDataProps {
  totalCount: number;
  averageRating: number;
  reviews: ReviewsType[];
}

const ReviewList = ({
  totalCount,
  averageRating,
  reviews,
}: ReviewDataProps) => {
  const isReviewExist = totalCount !== 0 ? true : false;

  return (
    <>
      <div className="mb-36">
        <div className="mb-10 md:mb-20">
          <header>
            <h3 className="text-xl font-bold leading-[130%] text-nomad-black">
              후기
            </h3>
            {isReviewExist && (
              <div>
                <span className="text-[3.125rem] font-semibold text-nomad-black">
                  {averageRating.toFixed(1)}
                </span>
                <div className="ml-4 inline-block">
                  <span className="text-lg leading-[133%] text-nomad-black">
                    {ratingString(averageRating)}
                  </span>
                  <div className="text-sm text-nomad-black">
                    <span className="mr-3 inline-block">
                      <div className="mr-1.5 inline-block h-4 w-4 bg-[url('/icons/Star.svg')]" />
                      {totalCount.toLocaleString()}개 후기
                    </span>
                  </div>
                </div>
              </div>
            )}
          </header>
          {isReviewExist ? (
            <>
              {reviews.map((item, i) => {
                return (
                  <React.Fragment key={`review-${item.id}`}>
                    <Review />
                    {i !== reviews.length - 1 && (
                      <hr className="bg-nomad-black" />
                    )}
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <div className="mt-10 text-center text-lg md:mt-20">
              현재 등록된 후기가 없습니다.
            </div>
          )}
        </div>
        <Pagination
          count={totalCount}
          onPageClick={() => {}}
          pageItemLimit={3}
        />
      </div>
    </>
  );
};

export default ReviewList;
