import React from "react";

const DefaultUserSvg = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="160"
      height="160"
      viewBox="0 0 600 600"
      fill="white"
      preserveAspectRatio="none"
    >
      <defs>
        <clipPath id="circular-border">
          <circle cx="300" cy="300" r="280" />
        </clipPath>
        <clipPath id="avoid-antialiasing-bugs">
          <rect width="100%" height="498" />
        </clipPath>
      </defs>

      <circle cx="300" cy="300" r="300" fill="#121" />
      <circle
        cx="300"
        cy="300"
        r="280"
        fill="#121"
        clipPath="url(#avoid-antialiasing-bugs)"
      />
      <circle cx="300" cy="230" r="115" stroke="#121" strokeWidth="1" />
      <circle
        cx="300"
        cy="550"
        r="205"
        clipPath="url(#circular-border)"
        stroke="#121"
        strokeWidth="1"
      />
    </svg>
  );
};

export default DefaultUserSvg;
