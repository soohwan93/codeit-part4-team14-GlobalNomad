"use client";

import { FormEvent, useState } from "react";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/util/validation";
import Button from "../common/Button";
import Input from "../common/Input";
import { useFormValidation } from "@/hooks/useFormValidation";
import { patchUser } from "@/util/api";
import useToggle from "@/hooks/useToggle";
import NotificationPopup from "../common/Popup/NotificationPopup";
import ProfileImageUploader from "./ProfileImageUploader";

interface Props {
  email: string;
  nickname: string;
  profileImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

const MyInfo = ({ data }: { data: Props }) => {
  const initialState = {
    email: data.email,
    nickName: data.nickname,
    password: "",
    confirmPassword: "",
  };

  const validationRules = {
    nickName: validateNickname,
    password: validatePassword,
    confirmPassword: (value: string) => ({
      isValid: value === state.password,
      error: value === state.password ? "" : "비밀번호가 일치하지 않습니다.",
    }),
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(
    data.profileImageUrl,
  );
  const { state, setState, errors, handleChange, handleBlur, validateForm } =
    useFormValidation(initialState, validationRules);
  const { isOpen, toggle } = useToggle();
  const [popupMessage, setPopupMessage] = useState<string>("");

  const isFormFilled =
    state.nickName &&
    state.password &&
    state.confirmPassword &&
    !errors.nickName &&
    !errors.password &&
    !errors.confirmPassword;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      setPopupMessage("입력한 정보가 올바르지 않습니다.");
      toggle();
      return;
    }

    const body = {
      nickname: state.nickName,
      profileImageUrl: selectedImage || null,
      newPassword: state.password,
    };

    try {
      await patchUser(body);
      setPopupMessage("정보가 성공적으로 업데이트되었습니다.");
      setState({ ...state, password: "", confirmPassword: "" });
    } catch (error: any) {
      setPopupMessage(error.message || "정보 업데이트에 실패했습니다.");
    } finally {
      toggle();
    }
  };

  return (
    <>
      <div className="mt-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold">내 정보</h1>
        <Button
          size="sm"
          type="submit"
          form="my-info-form"
          disabled={!isFormFilled}
        >
          저장하기
        </Button>
      </div>
      <ProfileImageUploader
        selectedImage={selectedImage}
        onImageChange={setSelectedImage}
        setPopupMessage={setPopupMessage}
        togglePopup={toggle}
      />
      <div>
        <form id="my-info-form" onSubmit={handleSubmit}>
          <label className="mb-2 block text-2xl font-bold">이메일</label>
          <Input
            type="email"
            id="email"
            name="email"
            value={state.email}
            disabled
            readOnly
            autoComplete="email"
          />
          <label className="mb-2 block text-2xl font-bold">닉네임</label>
          <Input
            id="nickName"
            name="nickName"
            value={state.nickName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="닉네임을 입력해 주세요"
            error={!!errors.nickName}
            errorMessage={errors.nickName}
            autoComplete="username"
          />
          <label htmlFor="password" className="mb-2 block text-2xl font-bold">
            비밀번호
          </label>
          <Input
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="8자 이상 입력해 주세요"
            error={!!errors.password}
            errorMessage={errors.password}
            autoComplete="new-password"
          />
          <label
            htmlFor="confirmPassword"
            className="mb-2 block text-2xl font-bold"
          >
            비밀번호 재입력
          </label>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={state.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="비밀번호를 한번 더 입력해 주세요"
            error={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword}
            autoComplete="new-password"
          />
        </form>
      </div>
      <NotificationPopup
        message={popupMessage}
        isOpen={isOpen}
        onClose={toggle}
      />
    </>
  );
};

export default MyInfo;
