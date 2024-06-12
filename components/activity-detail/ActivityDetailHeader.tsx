"use client";
import React, { useState } from "react";
import KebabSvg from "../common/svg/KebabSvg";
import Dropdown from "../common/Dropdown";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ActivityDetailType {
  id: number;
  userId: number;
  title: string;
  description: string;
  category: string;
  price: number;
  address: string;
  bannerImageUrl: string;
  rating: number;
  reviewCount: number;
  createdAt: string;
  updatedAt: string;
  subImages: { id: number; imageUrl: string }[];
  schedules: { id: number; date: string; startTime: string; endTime: string }[];
}

const ActivityDetailHeader = ({ data }: { data: ActivityDetailType }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  const handleDropdownEdit = () => {
    router.push(`/activity-management/${data.id}`);
  };

  const handleDropdownDelete = async () => {};

  const dropdownProps = [
    { label: "수정하기", value: "수정하기", onClick: handleDropdownEdit },
    { label: "삭제하기", value: "삭제하기", onClick: () => {} },
  ];

  return (
    <header className="flex items-center justify-between px-4 py-4 xl:pt-20">
      <div>
        <span className="mb-2.5 text-sm leading-normal text-black">
          {data.category}
        </span>
        <h1 className="mb-4 text-2xl font-bold leading-normal text-nomad-black md:text-3xl">
          <Link href={"http://localhost:3000/activity-detail/993"}>
            {data.title}
          </Link>
        </h1>
        <div className="text-sm text-black">
          <span className="mr-3 inline-block">
            <div className="mr-1.5 inline-block h-4 w-4 bg-[url('/icons/Star.svg')]" />
            {data.reviewCount !== 0 ? (
              <>
                {data.rating.toFixed(1)} ({data.reviewCount})
              </>
            ) : (
              <>후기 없음</>
            )}
          </span>

          <span>{data.address}</span>
        </div>
      </div>
      <Dropdown
        defaultLabel={
          <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <KebabSvg />
          </button>
        }
        originPositionRight
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        Options={dropdownProps}
      />
    </header>
  );
};

export default ActivityDetailHeader;
