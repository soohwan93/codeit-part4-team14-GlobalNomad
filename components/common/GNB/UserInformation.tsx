import Image from "next/image";
import React, { useCallback, useEffect, useRef } from "react";
import placeHolderImg from "@/components/common/GNB/세상에서 가장 멋진 석양.png";
import { UserData } from "./AuthNavButtons";

type Props = {
  userData: UserData | null;
  onClick: () => void;
  isClicked: Boolean;
  setIsImageClicked: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserInformation = ({
  userData,
  onClick,
  isClicked,
  setIsImageClicked,
}: Props) => {
  const imageRef = useRef<HTMLDivElement>(null);

  const handleClickImageOutside = useCallback(
    (e: MouseEvent) => {
      if (
        imageRef.current &&
        !imageRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest("#userImage")
      ) {
        setIsImageClicked(false);
      }
    },
    [setIsImageClicked],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickImageOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickImageOutside);
    };
  }, [handleClickImageOutside]);

  return (
    <>
      <div ref={imageRef} className="flex w-32 gap-3">
        <div onClick={onClick} className="relative h-6 w-6 rounded-full">
          <Image
            id="userImage"
            className="fixed rounded-full object-cover"
            alt="userImage"
            src={
              userData?.profileImageUrl
                ? userData.profileImageUrl
                : placeHolderImg
            }
            fill
            sizes="100px"
          />
          {/* 임시 드롭다운 */}
          <ul
            className={` absolute ${isClicked ? `block` : `hidden`} right-0 mt-7 w-24 transform text-gray-700 transition-transform duration-300 ease-in-out md:left-0 dark:text-gray-300`}
          >
            <li className="">
              <a
                className="block whitespace-nowrap rounded-t bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                href="/my-page"
              >
                내 정보
              </a>
            </li>
            <li className="">
              <a
                className="block whitespace-nowrap rounded-b bg-gray-200 px-4 py-2 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-700"
                href="/signin"
              >
                로그아웃
              </a>
            </li>
          </ul>
        </div>
        <span
          className="hidden w-[90px] overflow-hidden truncate md:block"
          onClick={onClick}
        >
          {userData?.nickname}
        </span>
      </div>
    </>
  );
};

export default UserInformation;
