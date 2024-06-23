"use client";

import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import React, { ChangeEvent, MouseEvent, useState } from "react";

import DaumPostcode from "react-daum-postcode";
import ModalPortal from "@/components/common/ModalPortal";

import { ERROR_MESSAGE } from "@/util/constraints";
import { ActivityResponseById } from "@/app/(app)/activity-management/[activityId]/page";
import { Schedule } from "@/util/apiType";
import ReservationTimeInputs from "./ReservationTimeInputs";
import ImageInputs from "./ImageInputs";

interface Props {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  scheduleIdsToRemove: number[];
  schedulesToAdd: Schedule[];
  responseApiData?: ActivityResponseById | null;
  titleError: boolean;
  descriptionError: boolean;
  addressError: boolean;
  priceError: boolean;
  setSubImageIdsToRemove: React.Dispatch<React.SetStateAction<number[]>>;
  setSubImageUrlsToAdd: React.Dispatch<React.SetStateAction<string[]>>;
  setScheduleIdsToRemove: React.Dispatch<React.SetStateAction<number[]>>;
  setSchedulesToAdd: React.Dispatch<React.SetStateAction<Schedule[]>>;
  setTitleError: React.Dispatch<React.SetStateAction<boolean>>;
  setDescriptionError: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressError: React.Dispatch<React.SetStateAction<boolean>>;
  setPriceError: React.Dispatch<React.SetStateAction<boolean>>;
  renderDropdown: () => React.JSX.Element;
  setBannerImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setSubImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setFormattedSchedules: React.Dispatch<React.SetStateAction<string>>;
}

const ActivityCreateOrUpdateForm = (props: Props) => {
  const {
    title,
    address,
    description,
    price,
    setAddress,
    setDescription,
    setPrice,
    setTitle,
    scheduleIdsToRemove,
    schedulesToAdd,
    responseApiData,
    titleError,
    descriptionError,
    addressError,
    priceError,
    setSubImageIdsToRemove,
    setSubImageUrlsToAdd,
    setScheduleIdsToRemove,
    setSchedulesToAdd,
    setTitleError,
    setDescriptionError,
    setAddressError,
    setPriceError,
    renderDropdown,
    setFormattedSchedules,
    setBannerImageUrl,
    setSubImageUrls,
  } = props;

  const [isAddressOpen, setIsAddressOpen] = useState(false);

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 1000) {
      return;
    }
    setDescription(e.target.value);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAddress = ({ address }: { address: string }) => {
    setAddress(address);
    setAddressError(false);
  };

  const handleAddressClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target instanceof HTMLInputElement) {
      setIsAddressOpen(true);
    }
    setAddressError(!!!address);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // 정규식을 사용하여 숫자 외의 문자 입력을 방지
    if (/^\d*$/.test(newValue)) {
      // 빈 문자열이 아닌 경우 숫자 변환 후 최대값을 초과하지 않도록 설정
      if (newValue !== "") {
        let numericValue = Number(newValue);
        if (numericValue > 500000) {
          numericValue = 500000;
        }
        setPrice(String(numericValue));
      } else {
        setPrice("");
      }
    }
  };

  const handleCloseAddress = (state: string) => {
    setAddressError(true);
    if (state === "COMPLETE_CLOSE") {
      setAddressError(false);
    }
    setIsAddressOpen(false);
  };

  return (
    <>
      <div className="flex flex-col">
        <Label required labelText="제목" htmlFor="title">
          <Input
            placeholder="제목"
            value={title}
            onChange={handleTitleChange}
            error={titleError}
            errorMessage={ERROR_MESSAGE.TITLE}
            id="title"
            name="title"
            maxLength={30}
            onBlur={(e) => {
              setTitleError(!e.target.value);
            }}
          />
        </Label>

        <Label required labelText="카테고리" htmlFor="category">
          {renderDropdown()}
        </Label>
        <div className="flex w-full py-7">
          <Label required labelText="설명" htmlFor="description">
            <div className="relative w-full">
              <textarea
                id="description"
                name="description"
                onChange={handleTextAreaChange}
                value={description}
                maxLength={1000}
                rows={10}
                className={`w-full resize-none rounded-[5px] ${descriptionError ? "border-red-20" : "border-gray-70"}`}
                placeholder="체험에 대해 설명해주세요"
                onBlur={(e) => {
                  setDescriptionError(!e.target.value);
                }}
              />
              <div className="absolute left-2 text-xs text-red-20">
                <span>{`${descriptionError ? `${ERROR_MESSAGE.DESCRIPTION}` : ``}`}</span>
              </div>
              <div className="absolute right-3 text-gray-400">{`${description.length}/1000`}</div>
            </div>
          </Label>
        </div>
        <Label required labelText="주소" htmlFor="">
          <Input
            placeholder="클릭하여 선택해 주세요"
            id="address"
            name="address"
            onClick={handleAddressClick}
            readOnly
            value={address}
            error={addressError}
            errorMessage={ERROR_MESSAGE.ADDRESS}
          />
          {isAddressOpen && (
            <ModalPortal usePortal title="주소" setState={setIsAddressOpen}>
              <DaumPostcode
                style={{
                  height: "500px",
                }}
                onComplete={handleAddress}
                onClose={handleCloseAddress}
              />
            </ModalPortal>
          )}
        </Label>
        <Label required labelText="가격" htmlFor="price">
          <Input
            placeholder="숫자만 입력 가능합니다(최대 50만원)"
            id="price"
            name="price"
            value={price}
            onChange={handlePriceChange}
            error={priceError}
            errorMessage={ERROR_MESSAGE.PRICE}
            onBlur={(e) => setPriceError(!e.target.value)}
          />
        </Label>
        <ReservationTimeInputs
          scheduleIdsToRemove={scheduleIdsToRemove}
          schedulesToAdd={schedulesToAdd}
          setScheduleIdsToRemove={setScheduleIdsToRemove}
          setSchedulesToAdd={setSchedulesToAdd}
          responseApiData={responseApiData}
          setFormattedSchedules={setFormattedSchedules}
        />
        <ImageInputs
          setSubImageIdsToRemove={setSubImageIdsToRemove}
          setSubImageUrlsToAdd={setSubImageUrlsToAdd}
          responseApiData={responseApiData}
          setBannerImageUrl={setBannerImageUrl}
          setSubImageUrls={setSubImageUrls}
        />
      </div>
    </>
  );
};

export default ActivityCreateOrUpdateForm;
