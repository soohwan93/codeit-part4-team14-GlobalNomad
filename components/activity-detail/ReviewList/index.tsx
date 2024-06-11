"use client";
import React, { Fragment, useState } from "react";
import Review from "./Review";
import Pagination from "@/components/common/Pagination";
import ratingString from "@/util/ratingString";
import { getActivityReviews } from "@/util/api";

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
  activityId: number;
  totalCount: number;
  averageRating: number;
  reviews: ReviewsType[];
}

const ReviewList = ({
  activityId,
  totalCount,
  averageRating,
  reviews,
}: ReviewDataProps) => {
  const [reviewData, setReviewData] = useState(reviews);
  const isReviewExist = totalCount !== 0 ? true : false;

  const handleReviewPageChange = async (pageNum: number) => {
    const reviews = await getActivityReviews(activityId, {
      page: pageNum,
      size: 3,
    });
    setReviewData(reviews.reviews);
  };

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
              {reviewData.map((item, i) => {
                return (
                  <React.Fragment key={`review-${item.id}`}>
                    <Review />
                    {i !== reviewData.length - 1 && (
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
          onPageClick={(pageNum: number) => handleReviewPageChange(pageNum)}
          pageItemLimit={3}
        />
      </div>
    </>
  );
};

export default ReviewList;
