import React from "react";
import EyeOnSvg from "../common/svg/EyeOnSvg";
import EyeOffSvg from "../common/svg/EyeOffSvg";
import RoundedCloseSvg from "../common/svg/RoundedCloseSvg";
import InteractiveRoundedCloseSvg from "../common/svg/InteractiveRoundedCloseSvg";
import PlainCloseSvg from "../common/svg/PlainCloseSvg";
import AlertSvg from "../common/svg/AlertSvg";
import KebabSvg from "../common/svg/KebabSvg";
import PlusLargeSvg from "../common/svg/PlusLargeSvg";
import PlusSmallSvg from "../common/svg/PlusSmallSvg";
import InteractivePlusSvg from "../common/svg/InteractivePlusSvg";
import MinusLargeSvg from "../common/svg/MinusLargeSvg";
import MinusSmallSvg from "../common/svg/MinusSmallSvg";
import InteractiveMinusSvg from "../common/svg/InteractiveMinusSvg";
import AddImage from "../activity-management/AddImage";

type Props = {};

const SubButtonTest = (props: Props) => {
  return (
    <div className="flex justify-center gap-4">
      <div className="flex flex-col gap-3">
        <EyeOnSvg />
        <EyeOffSvg />
      </div>
      <div className="flex flex-col gap-3">
        <RoundedCloseSvg />
        <RoundedCloseSvg size="large" />
        <RoundedCloseSvg size="middle" />
        <RoundedCloseSvg size="small" />
        -----
        <InteractiveRoundedCloseSvg
          onClick={() => alert("RoundedCloseSvg 클릭")}
        />
      </div>
      <div className="flex flex-col gap-3">
        <PlainCloseSvg size="small" />
        <PlainCloseSvg size="small" thickness="thin" />
        <PlainCloseSvg size="small" thickness="thin" color="black" />
      </div>
      <div className="flex flex-col gap-3">
        <PlainCloseSvg />
        <PlainCloseSvg size="large" />
        <PlainCloseSvg size="large" thickness="thin" />
        <PlainCloseSvg size="large" thickness="thin" color="black" />
      </div>
      <div className="flex flex-col gap-3">
        {/* <AlertSvg isClicked={false} onClick={() => console.log()} /> */}
      </div>
      <div className="flex flex-col gap-3">
        <KebabSvg />
      </div>
      <div className="flex flex-col gap-3">
        <PlusLargeSvg />
        <PlusSmallSvg />
        -----
        {/* <InteractivePlusSvg onClick={() => alert("PlusSvg 클릭")} /> */}
      </div>
      <div className="flex flex-col gap-3">
        <MinusLargeSvg />
        <MinusSmallSvg />
        -----
        <InteractiveMinusSvg onClick={() => alert("MinusSvg 클릭")} />
      </div>
      <div className="flex flex-col gap-3">
        <AddImage onClick={() => alert("MinusSvg 클릭")} />
      </div>
    </div>
  );
};

export default SubButtonTest;
