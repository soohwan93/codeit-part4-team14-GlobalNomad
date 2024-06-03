import React from "react";
import MinusLargeSvg from "./MinusLargeSvg";
import MinusSmallSvg from "./MinusSmallSvg";

type Props = { onClick?: () => void };

const InteractiveMinusSvg = ({ onClick }: Props) => {
  return (
    <>
      <div className="block md:hidden" onClick={onClick}>
        <MinusSmallSvg />
      </div>
      <div className="hidden md:block" onClick={onClick}>
        <MinusLargeSvg />
      </div>
    </>
  );
};

export default InteractiveMinusSvg;
