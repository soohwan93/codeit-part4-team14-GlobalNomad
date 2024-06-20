import React, { Suspense } from "react";
import UserSkeleton from "./UserSkeleton";
import UserInformation from "./UserInformation";

const UserMenu = async () => {
  return (
    <Suspense fallback={<UserSkeleton />}>
      <UserInformation />
    </Suspense>
  );
};

export default UserMenu;
