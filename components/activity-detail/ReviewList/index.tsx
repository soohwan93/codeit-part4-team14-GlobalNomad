import React from "react";
import Review from "./Review";

type Props = {};

const ReviewList = (props: Props) => {
  const reviewList: any[] = [1, 2, 3];
  return (
    <>
      <div className="mb-12">
        {reviewList.map((item, i) => {
          return (
            <>
              <Review key={item.id} />
              {i !== reviewList.length - 1 && <hr className="bg-nomad-black" />}
            </>
          );
        })}
      </div>
    </>
  );
};

export default ReviewList;
