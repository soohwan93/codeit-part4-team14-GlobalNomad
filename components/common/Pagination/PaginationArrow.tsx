import React from "react";

interface PaginationArrow {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

const PaginationArrow = ({
  width = 40,
  height = 40,
  color = "#4B4B4B",
  className = "",
}: PaginationArrow) => {
  return (
    <svg
      className={className}
      width={`${width}`}
      height={`${height}`}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Property 1=Variant4">
        <path
          id="Vector 668"
          d="M16 11L26.2929 21.2929C26.6834 21.6834 26.6834 22.3166 26.2929 22.7071L16 33"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
};

export default PaginationArrow;
