import React from "react";
import DivineLineSvg from "../../svg/DivineLineSvg";
import AuthMenu from "../auth/AuthMenu";
import AlertMenu from "../auth/AlertMenu";
import UserMenu from "../auth/UserMenu";
import { MyNotificationsQuery } from "@/util/apiType";
import { getMyNotifications } from "@/util/api";

const AuthNav = async () => {
  const query: MyNotificationsQuery = {
    size: 10,
  };
  const notifications = await getMyNotifications(query);
  return (
    <>
      <div className="flex gap-3">
        <AuthMenu />
        <DivineLineSvg />
        <AlertMenu notificationsFromApi={notifications} />
        <DivineLineSvg />
        <UserMenu />
      </div>
    </>
  );
};

export default AuthNav;
