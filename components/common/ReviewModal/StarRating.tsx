import React from "react";
import Star from "./Star";

type StarRatingProps = {
  rating: number;
  setRating: (rating: number) => void;
};

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const handleClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={rating >= star}
          onClick={() => handleClick(star)}
        />
      ))}
    </div>
  );
};

export default StarRating;
