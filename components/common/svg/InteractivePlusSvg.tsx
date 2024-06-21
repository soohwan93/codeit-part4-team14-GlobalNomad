import React from "react";
import PlusLargeSvg from "./PlusLargeSvg";
import PlusSmallSvg from "./PlusSmallSvg";

type Props = { isDateInvalid: boolean; onClick?: () => void };

const InteractivePlusSvg = ({ isDateInvalid, onClick }: Props) => {
  return (
    <>
      <div className={`${isDateInvalid && `cursor-not-allowed`}`}>
        <div
          className={`${isDateInvalid ? `pointer-events-none` : `cursor-pointer`}  block md:hidden`}
          onClick={onClick}
        >
          <PlusSmallSvg />
        </div>
        <div
          className={`${isDateInvalid ? `pointer-events-none` : `cursor-pointer`}  hidden md:block`}
          onClick={onClick}
        >
          <PlusLargeSvg />
        </div>
      </div>
    </>
  );
};

export default InteractivePlusSvg;
