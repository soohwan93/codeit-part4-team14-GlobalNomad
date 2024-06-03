import React from "react";
import PlusLargeSvg from "./PlusLargeSvg";
import PlusSmallSvg from "./PlusSmallSvg";

type Props = { onClick?: () => void };

const InteractivePlusSvg = ({ onClick }: Props) => {
  return (
    <>
      <div className="block md:hidden" onClick={onClick}>
        <PlusSmallSvg />
      </div>
      <div className="hidden md:block" onClick={onClick}>
        <PlusLargeSvg />
      </div>
    </>
  );
};

export default InteractivePlusSvg;
