import React from "react";

type StarProps = {
  filled: boolean;
  halfFilled: boolean;
  onClickHalf: () => void;
  onClickFull: () => void;
};

const Star = ({ filled, halfFilled, onClickHalf, onClickFull }: StarProps) => {
  return (
    <div style={{ display: "inline-block", position: "relative", width: "56px", height: "56px" }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={filled ? "gold" : halfFilled ? "url(#half)" : "gray"}
        width="56px"
        height="56px"
        className="cursor-pointer"
        style={{ position: "absolute", top: 0, left: 0 }}
        onClick={onClickFull}
      >
        <defs>
          <linearGradient id="half">
            <stop offset="50%" stopColor="gold" />
            <stop offset="50%" stopColor="gray" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
      <div
        onClick={onClickHalf}
        style={{ position: "absolute", top: 0, left: 0, width: "50%", height: "100%", cursor: "pointer" }}
      ></div>
    </div>
  );
};

export default Star;
