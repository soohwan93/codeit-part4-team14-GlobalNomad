import React from "react";
import AuthLogoSvg from "../common/svg/AuthLogoSvg";
import HeaderLogoSvg from "../common/svg/HeaderLogoSvg";

type Props = {};

const LogoTest = (props: Props) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <AuthLogoSvg />
      <HeaderLogoSvg />
    </div>
  );
};

export default LogoTest;
