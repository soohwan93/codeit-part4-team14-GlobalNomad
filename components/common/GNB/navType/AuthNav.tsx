import React from "react";
import DivineLineSvg from "../../svg/DivineLineSvg";
import AuthMenu from "../auth/AuthMenu";
import AlertMenu from "../auth/AlertMenu";
import UserMenu from "../auth/UserMenu";

export interface UserData {
  createdAt: string;
  email: string;
  id: number;
  nickname: string;
  profileImageUrl: null | string;
  updatedAt: string;
}

const AuthNav = () => {
  return (
    <>
      <div className="flex gap-3">
        <AuthMenu />
        <DivineLineSvg />
        <AlertMenu />
        <DivineLineSvg />
        <UserMenu />
      </div>
    </>
  );
};

export default AuthNav;
