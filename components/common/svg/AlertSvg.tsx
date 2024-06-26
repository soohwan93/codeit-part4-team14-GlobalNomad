import React from "react";

type Props = {
  totalCount?: number;
  isClicked: Boolean;
};

const AlertSvg: React.FC<Props> = ({ totalCount, isClicked }: Props) => {
  return (
    <div className="relative">
      <svg
        className="cursor-pointer"
        id="alertSvg"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M8.35179 20.2418C9.19288 21.311 10.5142 22 12 22C13.4858 22 14.8071 21.311 15.6482 20.2418C13.2264 20.57 10.7736 20.57 8.35179 20.2418Z"
          fill={isClicked ? `#FFC23D` : `#4B4B4B`}
        />
        <path
          d="M18.7491 9V9.7041C18.7491 10.5491 18.9903 11.3752 19.4422 12.0782L20.5496 13.8012C21.5612 15.3749 20.789 17.5139 19.0296 18.0116C14.4273 19.3134 9.57274 19.3134 4.97036 18.0116C3.21105 17.5139 2.43882 15.3749 3.45036 13.8012L4.5578 12.0782C5.00972 11.3752 5.25087 10.5491 5.25087 9.7041V9C5.25087 5.13401 8.27256 2 12 2C15.7274 2 18.7491 5.13401 18.7491 9Z"
          fill={isClicked ? `#FFC23D` : `#4B4B4B`}
        />
      </svg>
      {!!totalCount && !isClicked && (
        <div className="absolute right-0 top-0">
          <span className="relative flex h-[7px] w-[7px]">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex h-[7px] w-[7px] rounded-full bg-red-500"></span>
          </span>
        </div>
      )}
    </div>
  );
};

export default AlertSvg;
