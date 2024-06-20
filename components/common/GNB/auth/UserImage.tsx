"use client";

import { signOut } from "@/auth";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Dropdown from "../../Dropdown";
import { useRouter } from "next/navigation";
import { logout } from "@/util/actions";

type Props = { urlData: string };

const UserImage = ({ urlData }: Props) => {
  const router = useRouter();
  const [isImageClicked, setIsImageClicked] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const dropDownOptions = [
    {
      label: "내 정보",
      value: "내 정보 key",
      onClick: () => {
        router.push("/my-page");
      },
    },
    {
      label: "로그아웃",
      value: "로그아웃 key",
      onClick: async () => {
        await logout();
      },
    },
  ];

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };

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
    <div
      ref={imageRef}
      onClick={handleImageClick}
      className="relative h-6 w-6 rounded-full"
    >
      <Image
        id="userImage"
        className="fixed cursor-pointer rounded-full object-cover"
        alt="userImage"
        src={urlData}
        fill
        sizes="100px"
      />
      <Dropdown
        Options={dropDownOptions}
        dropdownOpen={isImageClicked}
        setDropdownOpen={setIsImageClicked}
        originPositionRight
      />
    </div>
  );
};

export default UserImage;
