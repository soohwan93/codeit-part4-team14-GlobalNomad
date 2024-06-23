import React from "react";
import DivineLineSvg from "../../svg/DivineLineSvg";
import AuthMenu from "../auth/AuthMenu";
import AlertMenu from "../auth/AlertMenu";
import UserMenu from "../auth/UserMenu";
import { auth } from "@/auth";

const AuthNav = async () => {
  const session = await auth();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/notifications`,
    {
      cache: "no-cache",
      method: "POST",
      body: JSON.stringify(session),
    },
  );
  const { data } = await res.json();
  const { totalCount, cursorId, notifications } = data;
  return (
    <>
      <div className="flex gap-3">
        <AuthMenu />
        <DivineLineSvg />
        <AlertMenu
          totalCount={totalCount}
          cursorId={cursorId}
          notifications={notifications}
        />
        <DivineLineSvg />
        <UserMenu />
      </div>
    </>
  );
};

export default AuthNav;
