import React from "react";

type Props = {
  size?: "large" | "middle" | "small";
};

const sizeMap = {
  large: 40,
  middle: 32,
  small: 24,
};

const RoundedCloseSvg: React.FC<Props> = ({ size = "small" }) => {
  const demention = sizeMap[size];
  const innerSize = demention / 2;
  const innerPosition = (demention - innerSize) / 2;

  return (
    <svg
      className="absolute -right-3 -top-3 z-[1] flex items-center"
      xmlns="http://www.w3.org/2000/svg"
      width={demention}
      height={demention}
      viewBox={`0 0 ${demention} ${demention}`}
      fill="none"
    >
      <circle
        cx={demention / 2}
        cy={demention / 2}
        r={demention / 2}
        fill="#1B1B1B"
        fillOpacity="0.8"
      />
      <svg
        x={innerPosition}
        y={innerPosition}
        xmlns="http://www.w3.org/2000/svg"
        width={innerSize}
        height={innerSize}
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M2 2L18 18"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M2 18L18 2"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </svg>
  );
};

export default RoundedCloseSvg;
