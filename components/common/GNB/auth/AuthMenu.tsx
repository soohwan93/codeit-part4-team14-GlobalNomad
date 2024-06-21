"use client";

import React, { useEffect, useRef, useState } from "react";
import CaretSvg from "../../svg/CaretSvg";
import Dropdown from "../../Dropdown";
import Link from "next/link";
import DivineLineSvg from "../../svg/DivineLineSvg";
import { useRouter } from "next/navigation";

const AuthMenu = () => {
  const router = useRouter();
  const [isDropDownClicked, setIsDropDownClicked] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);

  const dropDownOptions = [
    {
      label: "예약내역",
      value: "예약내역 key",
      onClick: () => {
        router.push("/reservations");
      },
    },
    {
      label: "내 체험 관리",
      value: "내 체험 관리 key",
      onClick: () => {
        router.push("/activity-management");
      },
    },
    {
      label: "예약 현황",
      value: "예약 현황 key",
      onClick: () => {
        router.push("/reservation-status");
      },
    },
  ];

  const handleDropdownClick = () => {
    setIsDropDownClicked(!isDropDownClicked);
  };

  const handleClickDropdownOutside = (e: MouseEvent) => {
    if (
      dropDownRef.current &&
      !dropDownRef.current.contains(e.target as Node) &&
      !(e.target as Element).closest("#caretSvg")
    ) {
      setIsDropDownClicked(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickDropdownOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickDropdownOutside);
    };
  }, []);

  return (
    <>
      <div ref={dropDownRef} className="relative flex">
        <CaretSvg onClick={handleDropdownClick} isClicked={isDropDownClicked} />
        <Dropdown
          Options={dropDownOptions}
          dropdownOpen={isDropDownClicked}
          setDropdownOpen={setIsDropDownClicked}
        />
      </div>
      <Link href={"/reservations"} className="hidden sm:block">
        예약내역
      </Link>
      <DivineLineSvg className="hidden sm:block" />
      <Link href={"/activity-management"} className="hidden sm:block">
        내 체험 관리
      </Link>
      <Link href={"/reservation-status"} className="hidden sm:block">
        예약현황
      </Link>
    </>
  );
};

export default AuthMenu;
