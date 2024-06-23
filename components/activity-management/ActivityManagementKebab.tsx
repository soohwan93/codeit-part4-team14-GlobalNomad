"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Dropdown from "../common/Dropdown";
import { useRouter } from "next/navigation";
import DeletePopup from "../common/Popup/DeletePopup";
import { useNotification } from "@/contexts/NotificationContext";
import { ActivityApiProps } from "./ActivityManagementCardWrapper";

type Props = {
  setActivities: React.Dispatch<React.SetStateAction<ActivityApiProps[]>>;
  activityId: number;
};

const ActivityManagementKebab = ({ setActivities, activityId }: Props) => {
  const { showNotification } = useNotification();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const kebabRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if ((e.target as Element).closest(`#kebabBtn_${activityId}`)) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  const deleteActivity = async (activityId: number) => {
    const call = await fetch(`/api/deleteMyActivity/${activityId}`, {
      method: "DELETE",
    });
    const res = await call.json();
    if (res.message === "삭제가 완료 되었습니다!") {
      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== activityId),
      );
    }
    showNotification(res.message);
  };

  const kebabDropdown = [
    {
      label: "수정하기",
      value: "수정하기 key",
      onClick: () => {
        router.push(`/activity-management/${activityId}`);
      },
    },
    {
      label: "삭제하기",
      value: "삭제하기 key",
      onClick: () => {
        setIsDeletePopupOpen(!isDeletePopupOpen);
      },
    },
  ];

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        kebabRef.current &&
        !kebabRef.current.contains(e.target as Node) &&
        !(e.target as Element).closest(`#kebabBtn_${activityId}`)
      ) {
        setIsDropdownOpen(false);
      }
    },
    [setIsDropdownOpen, activityId],
  );

  const handleCloseDeletePopup = () => {
    setIsDeletePopupOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative" ref={kebabRef} onClick={handleClick}>
      <button
        id={`kebabBtn_${activityId}`}
        className="h-5 w-5 shrink-0 bg-[url('/icons/kebabSmall.svg')] md:h-10 md:w-10 md:bg-[url('/icons/kebab.svg')]"
        type="button"
      />
      <Dropdown
        dropdownOpen={isDropdownOpen}
        setDropdownOpen={setIsDropdownOpen}
        Options={kebabDropdown}
        originPositionRight
        customClassName={`right-0 lg:-right-14`}
      />
      <DeletePopup
        isOpen={isDeletePopupOpen}
        message="정말 삭제하시겠습니까?"
        onClose={() => {
          setIsDropdownOpen(false);
          handleCloseDeletePopup();
        }}
        onDelete={() => deleteActivity(activityId)}
      />
    </div>
  );
};

export default ActivityManagementKebab;
