import React from "react";
import Star from "./Star";

interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}

const StarRating = ({ rating, setRating }: StarRatingProps) => {
  const handleClick = (value: number) => {
    setRating(value);
  };

  return (
    <div className="flex">
      {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((value) => (
        <Star
          key={value}
          filled={rating >= value}
          half={rating === value - 0.5}
          onClick={() => handleClick(value)}
        />
      ))}
    </div>
  );
};

export default StarRating;
