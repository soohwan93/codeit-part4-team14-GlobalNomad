"use client";

import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import ReservationTimeInputs from "./ReservationTimeInputs";
import DaumPostcode from "react-daum-postcode";
import ReservationPopup from "@/components/common/ModalPortal";
import ImageInputs from "./ImageInputs";
import { ERROR_MESSAGE } from "@/util/constraints";

interface Props {
  titleError: boolean;
  descriptionError: boolean;
  addressError: boolean;
  priceError: boolean;
  setTitleError: React.Dispatch<React.SetStateAction<boolean>>;
  setDescriptionError: React.Dispatch<React.SetStateAction<boolean>>;
  setAddressError: React.Dispatch<React.SetStateAction<boolean>>;
  setPriceError: React.Dispatch<React.SetStateAction<boolean>>;
  renderDropdown: () => React.JSX.Element;
  setBannerImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setSubImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setFormattedSchedules: React.Dispatch<React.SetStateAction<string>>;
}

const ActivityCreateForm = (props: Props) => {
  const {
    titleError,
    descriptionError,
    addressError,
    priceError,
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
  const [text, setText] = useState("");
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState<string>("");

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 1000) {
      return;
    }
    setText(e.target.value);
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
                value={text}
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
              <div className="absolute right-3 text-gray-400">{`${text.length}/1000`}</div>
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
            <ReservationPopup
              usePortal
              title="주소"
              setState={setIsAddressOpen}
            >
              <DaumPostcode
                style={{
                  height: "500px",
                }}
                onComplete={handleAddress}
                onClose={handleCloseAddress}
              />
            </ReservationPopup>
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
        <ReservationTimeInputs setFormattedSchedules={setFormattedSchedules} />
        <ImageInputs
          setBannerImageUrl={setBannerImageUrl}
          setSubImageUrls={setSubImageUrls}
        />
      </div>
    </>
  );
};

export default ActivityCreateForm;
