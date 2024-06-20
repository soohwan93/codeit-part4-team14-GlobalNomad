import React from "react";
import Star from "./Star";

type StarRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
};

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const handleHalfClick = (value: number) => {
    setRating(value);
  };

  const handleFullClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={rating >= star}
          halfFilled={rating >= star - 0.5 && rating < star}
          onClickHalf={() => handleHalfClick(star - 0.5)}
          onClickFull={() => handleFullClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
