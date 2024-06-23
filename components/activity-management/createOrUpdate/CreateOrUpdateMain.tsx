"use client";

import useDropdownInput from "@/components/common/useDropdownInput";
import React, { useEffect, useState } from "react";
import ActivityCreateOrUpdateHeader from "./ActivityCreateOrUpdateHeader";
import ActivityCreateOrUpdateForm from "./ActivityCreateOrUpdateForm";
import { MyActivityBody, PostActivityBody, Schedule } from "@/util/apiType";
import { useNotification } from "@/contexts/NotificationContext";
import { useParams, useRouter } from "next/navigation";
import { validateActivity } from "@/util/validation";
import { ERROR_MESSAGE, NO_IMAGE_URL } from "@/util/constraints";
import { ActivityResponseById } from "@/app/(app)/activity-management/[activityId]/page";

interface CreateMainProps {
  responseApiData?: ActivityResponseById | null;
}

const CreateOrUpdateMain = ({ responseApiData }: CreateMainProps) => {
  const { activityId } = useParams();

  const router = useRouter();

  const { showNotification } = useNotification();
  //formState
  const [title, setTitle] = useState<string>(responseApiData?.title || "");
  const [description, setDescription] = useState(
    responseApiData?.description || "",
  );
  const [address, setAddress] = useState(responseApiData?.address || "");
  const [price, setPrice] = useState<string>(
    String(responseApiData?.price || ""),
  );
  const [bannerImageUrl, setBannerImageUrl] = useState<string>(
    responseApiData?.bannerImageUrl || "",
  );
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);
  const [formattedSchedules, setFormattedSchedules] = useState<string>("");
  //imageUpdateState
  const [subImageIdsToRemove, setSubImageIdsToRemove] = useState<number[]>([]);
  const [subImageUrlsToAdd, setSubImageUrlsToAdd] = useState<string[]>([]);
  //scheduleState
  const [scheduleIdsToRemove, setScheduleIdsToRemove] = useState<number[]>([]);
  const [schedulesToAdd, setSchedulesToAdd] = useState<Schedule[]>([]);
  //errorState
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  //submitButtonState
  const [isDisabled, setIsDisabled] = useState(activityId ? false : true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let body: PostActivityBody | MyActivityBody = getCreateBody(
      e.target as HTMLFormElement,
    );
    const isValid = validateActivity(body, showNotification);

    if (activityId) {
      body = getUpdateBody(e.target as HTMLFormElement);
    }

    if (isValid) {
      let res = null;

      if (activityId) {
        res = await fetch(`/api/updateMyActivity/${activityId}`, {
          method: "PATCH",
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/createMyActivity", {
          method: "POST",
          body: JSON.stringify(body),
        });
      }
      const rs = await res.json();
      if (rs.success === "ok") {
        showNotification(
          `${activityId ? `수정` : `등록`}이 완료되었습니다!`,
          callback,
        );
      } else {
        showNotification(rs.message);
      }
    }
  };

  const callback = () => {
    router.refresh();

    setTimeout(() => {
      router.push("/activity-management");
    }, 500);
  };

  const getUpdateBody = (value: HTMLFormElement) => {
    const formData = new FormData(value);
    // FormData 객체에서 데이터를 가져옴
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const price = formData.get("price") as string;

    const body: MyActivityBody = {
      title: title,
      category: selected || "",
      description: description,
      price: price ? +price : 0,
      address: address,
      bannerImageUrl: bannerImageUrl || NO_IMAGE_URL,
      subImageIdsToRemove: subImageIdsToRemove,
      subImageUrlsToAdd: subImageUrlsToAdd,
      scheduleIdsToRemove: scheduleIdsToRemove,
      schedulesToAdd: schedulesToAdd,
    };
    return body;
  };

  const getCreateBody = (value: HTMLFormElement) => {
    const formData = new FormData(value);
    // FormData 객체에서 데이터를 가져옴
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const address = formData.get("address") as string;
    const price = formData.get("price") as string;

    const body: PostActivityBody = {
      title: title,
      category: selected || "",
      description: description,
      address: address,
      price: price ? +price : 0,
      schedules: JSON.parse(formattedSchedules),
      bannerImageUrl: bannerImageUrl || NO_IMAGE_URL,
      subImageUrls: subImageUrls.length !== 0 ? subImageUrls : [NO_IMAGE_URL],
    };
    return body;
  };

  const { selected, renderDropdown } = useDropdownInput(
    ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"],
    "카테고리",
    responseApiData?.category || null,
    categoryError,
    setCategoryError,
    ERROR_MESSAGE.CATEGORY,
  );

  useEffect(() => {
    // 모든 필수 입력값 에러를 확인
    const isFormValid =
      title &&
      description &&
      price &&
      selected &&
      (formattedSchedules ? JSON.parse(formattedSchedules).length > 0 : false);

    setIsDisabled(!isFormValid);
  }, [title, description, price, selected, formattedSchedules]);

  return (
    <form onSubmit={handleSubmit}>
      <ActivityCreateOrUpdateHeader
        responseApiData={responseApiData}
        isDisabled={isDisabled}
      />
      <ActivityCreateOrUpdateForm
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        address={address}
        setAddress={setAddress}
        price={price}
        setPrice={setPrice}
        setSubImageIdsToRemove={setSubImageIdsToRemove}
        setSubImageUrlsToAdd={setSubImageUrlsToAdd}
        setScheduleIdsToRemove={setScheduleIdsToRemove}
        setSchedulesToAdd={setSchedulesToAdd}
        scheduleIdsToRemove={scheduleIdsToRemove}
        schedulesToAdd={schedulesToAdd}
        responseApiData={responseApiData}
        titleError={titleError}
        descriptionError={descriptionError}
        addressError={addressError}
        priceError={priceError}
        setTitleError={setTitleError}
        setDescriptionError={setDescriptionError}
        setAddressError={setAddressError}
        setPriceError={setPriceError}
        renderDropdown={renderDropdown}
        setBannerImageUrl={setBannerImageUrl}
        setSubImageUrls={setSubImageUrls}
        setFormattedSchedules={setFormattedSchedules}
      />
    </form>
  );
};

export default CreateOrUpdateMain;
