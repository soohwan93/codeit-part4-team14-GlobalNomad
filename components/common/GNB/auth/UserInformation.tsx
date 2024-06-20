import { auth } from "@/auth";
import React from "react";
import { Tooltip } from "flowbite-react";
import UserImage from "./UserImage";
import placeHolderImg from "@/public/icons/userNoImage.svg";

const UserInformation = async () => {
  const session = await auth();
  const userData = session?.user;
  const urlData = userData?.profileImageUrl
    ? userData.profileImageUrl
    : placeHolderImg;
  return (
    <>
      <div className="flex gap-3 md:w-32">
        <UserImage urlData={urlData} />
        <Tooltip
          content={userData?.nickname}
          placement="bottom-start"
          animation={false}
          arrow={false}
        >
          <span className="hidden w-[90px] overflow-hidden truncate md:block">
            {userData?.nickname}
          </span>
        </Tooltip>
      </div>
    </>
  );
};

export default UserInformation;
