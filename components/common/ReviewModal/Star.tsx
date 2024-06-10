import React from "react";

type StarProps = {
  filled: boolean;
  onClick: () => void;
};

const Star = ({ filled, onClick }: StarProps) => {
  return (
    <svg
      onClick={onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "gold" : "gray"}
      width="56px"
      height="56px"
      className="cursor-pointer"
      style={{ margin: "0 2px" }}
    >
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
    </svg>
  );
};

export default Star;
