"use client";
import React, { Fragment } from "react";
import Review from "./Review";
import Pagination from "@/components/common/Pagination";

type Props = {};

const ReviewList = (props: Props) => {
  const reviewList: any[] = [];
  const isReviewExist = reviewList.length !== 0 ? true : false;

  return (
    <div className="mb-36 md:mb-72">
      <div className="mb-10 md:mb-20">
        {isReviewExist ? (
          reviewList.map((item, i) => {
            return (
              <React.Fragment key={item}>
                <Review />
                {i !== reviewList.length - 1 && (
                  <hr className="bg-nomad-black" />
                )}
              </React.Fragment>
            );
          })
        ) : (
          <div className="mt-10 text-center text-lg md:mt-20">
            현재 등록된 후기가 없습니다.
          </div>
        )}
      </div>
      <Pagination count={3} onPageClick={() => {}} pageItemLimit={3} />
    </div>
  );
};

export default ReviewList;
