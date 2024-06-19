"use client";

import useDropdownInput from "@/components/common/useDropdownInput";
import React, { useEffect, useState } from "react";
import ActivityCreateHeader from "./ActivityCreateHeader";
import ActivityCreateForm from "./ActivityCreateForm";
import { PostActivityBody } from "@/util/apiType";
import { postActivity } from "@/util/api";
import { useNotification } from "@/contexts/NotificationContext";
import { useRouter } from "next/navigation";
import { validateActivityCreate } from "@/util/validation";
import { ERROR_MESSAGE, NO_IMAGE_URL } from "@/util/constraints";

type Props = {};

const CreateMain = (props: Props) => {
  const router = useRouter();
  const { isOpen, showNotification } = useNotification();

  //imageState
  const [bannerImageUrl, setBannerImageUrl] = useState<string>("");
  const [subImageUrls, setSubImageUrls] = useState<string[]>([]);
  const [formattedSchedules, setFormattedSchedules] = useState<string>("");
  //errorState
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [priceError, setPriceError] = useState(false);
  const [categoryError, setCategoryError] = useState(false);
  //submitButtonState
  const [isDisabled, setIsDisabled] = useState(true);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = getCreateBody(e.target as HTMLFormElement);
    const isValid = validateActivityCreate(body, showNotification);

    console.log(body);
    if (isValid) {
      try {
        const res = await postActivity(body);
        console.log(res);
        if (res) {
          showNotification("등록이 완료되었습니다!");
          if (!isOpen) {
            router.refresh();
            router.push("/activity-management");
          }
        }
      } catch (error: any) {
        showNotification(error.message);
      }
    }
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
      price: price ? +price : 0,
      schedules: JSON.parse(formattedSchedules),
      address: address,
      bannerImageUrl: bannerImageUrl || NO_IMAGE_URL,
      subImageUrls: subImageUrls.length !== 0 ? subImageUrls : [NO_IMAGE_URL],
    };
    return body;
  };

  const { selected, renderDropdown } = useDropdownInput(
    ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"],
    "카테고리",
    null,
    categoryError,
    setCategoryError,
    ERROR_MESSAGE.CATEGORY,
  );

  useEffect(() => {
    // 모든 필수 입력값 에러를 확인
    const isFormValid =
      !titleError &&
      !descriptionError &&
      !priceError &&
      !categoryError &&
      (formattedSchedules ? JSON.parse(formattedSchedules).length > 0 : false);

    setIsDisabled(!isFormValid);
  }, [
    titleError,
    descriptionError,
    addressError,
    priceError,
    categoryError,
    formattedSchedules,
  ]);

  return (
    <form onSubmit={handleSubmit}>
      <ActivityCreateHeader isDisabled={isDisabled} />
      <ActivityCreateForm
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

export default CreateMain;
