import React from "react";
import RoundedCloseSvg from "./RoundedCloseSvg";

type Props = { onClick?: () => void };

const InteractiveRoundedCloseSvg = ({ onClick }: Props) => {
  return (
    <>
      <div className="hidden md:block " onClick={onClick}>
        <RoundedCloseSvg size="middle" />
      </div>
      <div className="block md:hidden " onClick={onClick}>
        <RoundedCloseSvg size="small" />
      </div>
    </>
  );
};

export default InteractiveRoundedCloseSvg;
