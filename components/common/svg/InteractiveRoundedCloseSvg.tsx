import React from "react";
import RoundedCloseSvg from "./RoundedCloseSvg";

type Props = { onClick: () => void };

const InteractiveRoundedCloseSvg = ({ onClick }: Props) => {
  return (
    <>
      <div className="hidden md:hidden xl:block" onClick={onClick}>
        <RoundedCloseSvg size="large" />
      </div>
      <div className="hidden md:block xl:hidden" onClick={onClick}>
        <RoundedCloseSvg size="middle" />
      </div>
      <div className="block md:hidden xl:hidden" onClick={onClick}>
        <RoundedCloseSvg size="small" />
      </div>
    </>
  );
};

export default InteractiveRoundedCloseSvg;
