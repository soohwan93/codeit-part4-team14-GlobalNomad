import React from "react";

interface Props {
  onClick: () => void;
  isClicked: Boolean;
}

const CaretSvg = ({ onClick, isClicked }: Props) => {
  return (
    <svg
      id="caretSvg"
      onClick={onClick}
      className={` ${isClicked && `rotate-180`} block transform cursor-pointer transition-transform duration-300 sm:hidden`}
      fill="none"
      width={24}
      height={24}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 5c-1.074 0-1.648 1.265-.94 2.073l5.521 6.31a1.75 1.75 0 0 0 2.634 0l5.522-6.31c.707-.808.133-2.073-.94-2.073H6.101Z"
        fill="#121"
      />
    </svg>
  );
};

export default CaretSvg;
