import React from "react";

type Props = {
  size?: "large" | "small";
  thickness?: "bold" | "thin";
  color?: "black" | "gray";
};

const sizeMap = {
  large: 40,
  small: 24,
};

const thicknessMap = {
  bold: 2.5,
  thin: 1.5,
};

const colorMap = {
  black: "#4B4B4B",
  gray: "#A1A1A1",
};

const pathMap = {
  large: ["M10 10L30 30", "M30 10L10 30"],
  small: ["M6 6L18 18", "M18 6L6 18"],
};

const PlainCloseSvg: React.FC<Props> = ({
  size = "large",
  thickness = "bold",
  color = "gray",
}) => {
  const demention = sizeMap[size];
  const path = pathMap[size];
  const thicknessDemention = thicknessMap[thickness];
  const colorDemention = colorMap[color];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={demention}
      height={demention}
      viewBox={`0 0 ${demention} ${demention}`}
      fill="none"
    >
      <path
        d={path[0]}
        stroke={colorDemention}
        strokeWidth={thicknessDemention}
        strokeLinecap="round"
      />
      <path
        d={path[1]}
        stroke={colorDemention}
        strokeWidth={thicknessDemention}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default PlainCloseSvg;
