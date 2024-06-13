"use client";
import React, { useState } from "react";
import KebabSvg from "../common/svg/KebabSvg";
import Dropdown from "../common/Dropdown";
import { useRouter } from "next/navigation";
import DeletePopup from "../common/Popup/DeletePopup";

const ActivityDetailHeader = ({ activityId }: { activityId: number }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDeletePopupOpen, SetIsDeletePopupOpen] = useState(false);
  const router = useRouter();

  const handleDropdownEdit = () => {
    router.push(`/activity-management/${activityId}`);
  };

  const handleDropdownDelete = () => {
    SetIsDeletePopupOpen(true);
  };

  const handleActivityDelete = async () => {};

  const dropdownProps = [
    { label: "수정하기", value: "수정하기", onClick: handleDropdownEdit },
    { label: "삭제하기", value: "삭제하기", onClick: handleDropdownDelete },
  ];

  return (
    <>
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
      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={() => {
          SetIsDeletePopupOpen(false);
        }}
        onDelete={handleActivityDelete}
        message="정말 이 활동을 삭제하시겠어요?"
      />
    </>
  );
};

export default ActivityDetailHeader;
