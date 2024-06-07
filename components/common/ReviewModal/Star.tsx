import React from "react";

interface StarProps {
  filled: boolean;
  half?: boolean;
  onClick: () => void;
}

const Star = ({ filled, half, onClick }: StarProps) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "gold" : half ? "url(#half)" : "gray"}
      width="24px"
      height="24px"
      className="cursor-pointer"
    >
      <defs>
        <linearGradient id="half">
          <stop offset="50%" stopColor="gold" />
          <stop offset="50%" stopColor="gray" />
        </linearGradient>
      </defs>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

export default Star;
