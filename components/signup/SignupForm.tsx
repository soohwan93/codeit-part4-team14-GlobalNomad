"use client";

import React from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import AuthMainLogo from "@/components/common/svg/AuthMainLogo";
import Link from "next/link";
import { useFormValidation } from "@/hooks/useFormValidation";
import { postUser } from "@/util/api";
import { useNotification } from "@/contexts/NotificationContext";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validateNickname,
  validatePassword,
} from "@/util/validation";

const SignupForm = () => {
  const initialState = {
    email: "",
    nickName: "",
    password: "",
    confirmPassword: "",
  };

  const validationRules = {
    email: validateEmail,
    nickName: validateNickname,
    password: validatePassword,
    confirmPassword: (value: string) => ({
      isValid: value === state.password,
      error: value === state.password ? "" : "비밀번호가 일치하지 않습니다.",
    }),
  };

  const { state, errors, handleChange, handleBlur, validateForm } =
    useFormValidation(initialState, validationRules);
  const { showNotification } = useNotification();
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const body = {
      email: state.email,
      nickname: state.nickName,
      password: state.password,
    };

    try {
      const response = await postUser(body);
      showNotification("가입이 완료되었습니다!", () => router.push("/signin"));
    } catch (error: any) {
      showNotification(error.message);
    }
  };

  const isFormFilled =
    state.email &&
    state.nickName &&
    state.password &&
    state.confirmPassword &&
    !errors.email &&
    !errors.nickName &&
    !errors.password &&
    !errors.confirmPassword;

  return (
    <div className="m-auto mt-10 flex h-screen w-[90%] flex-col items-center justify-center">
      <Link href="/">
        <AuthMainLogo />
      </Link>
      <form className="mt-6 w-full max-w-md md:mt-10" onSubmit={handleSubmit}>
        <label htmlFor="email" className="mb-2 inline-block">
          이메일
        </label>
        <Input
          type="email"
          id="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="이메일을 입력해 주세요"
          error={!!errors.email}
          errorMessage={errors.email}
          autoComplete="email"
        />
        <label htmlFor="nickName" className="mb-2 inline-block">
          닉네임
        </label>
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
        <label htmlFor="password" className="mb-2 inline-block">
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
        <label htmlFor="confirmPassword" className="mb-2 inline-block">
          비밀번호 확인
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
        <Button disabled={!isFormFilled} type="submit">
          회원가입 하기
        </Button>
      </form>
      <p className="mb-8 mt-4 md:mt-8">
        회원이신가요?{" "}
        <Link
          className="text-green-20 underline underline-offset-2"
          href="/signin"
        >
          로그인하기
        </Link>
      </p>
    </div>
  );
};

export default SignupForm;
