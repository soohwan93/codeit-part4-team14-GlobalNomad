"use client";
import React, { useRef, useState } from "react";
import KebabSvg from "../common/svg/KebabSvg";
import Dropdown from "../common/Dropdown";
import { useRouter } from "next/navigation";
import DeletePopup from "../common/Popup/DeletePopup";
import NotificationPopup from "../common/Popup/NotificationPopup";
import { deleteMyActivity } from "@/util/api";

const ActivityDetailHeader = ({ activityId }: { activityId: number }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [poopUpMessage, setPopupMessage] = useState("");
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const deleteSuccess = useRef(false);
  const router = useRouter();

  const handleDropdownEdit = () => {
    router.push(`/activity-management/${activityId}`);
  };

  const handleDropdownDelete = () => {
    setIsDeletePopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
    if (deleteSuccess.current) {
      router.push("/");
    }
  };

  const handleActivityDelete = async () => {
    setIsDeletePopupOpen(false);

    try {
      await deleteMyActivity(activityId);
      deleteSuccess.current = true;
      setPopupMessage("이 활동을 성공적으로 삭제했어요!");
      setIsPopupOpen(true);
    } catch (err: any) {
      if (String(err.message) === "Unexpected end of JSON input") {
        deleteSuccess.current = true;
        setPopupMessage("이 활동을 성공적으로 삭제했어요!");
        setIsPopupOpen(true);
      } else {
        setPopupMessage(
          "예기치 못한 오류로 활동을 삭제하지 못했어요. 잠시후 다시 시도해 주세요.",
        );
        setIsPopupOpen(true);
      }
    }
  };

  const dropdownProps = [
    { label: "수정하기", value: "수정하기", onClick: handleDropdownEdit },
    { label: "삭제하기", value: "삭제하기", onClick: handleDropdownDelete },
  ];

  return (
    <div className="z-[1]">
      <Dropdown
        defaultLabel={
          <button
            type="button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <KebabSvg />
          </button>
        }
        originPositionRight
        dropdownOpen={isDropdownOpen}
        setDropdownOpen={setIsDropdownOpen}
        Options={dropdownProps}
      />
      <DeletePopup
        isOpen={isDeletePopupOpen}
        onClose={() => {
          setIsDeletePopupOpen(false);
        }}
        onDelete={handleActivityDelete}
        message="정말 이 활동을 삭제하시겠어요?"
      />
      <NotificationPopup
        message={poopUpMessage}
        isOpen={isPopupOpen}
        onClose={handlePopupClose}
      />
    </div>
  );
};

export default ActivityDetailHeader;
