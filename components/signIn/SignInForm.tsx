"use client";

import React from "react";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import AuthMainLogo from "@/components/common/svg/AuthMainLogo";
import { validateEmail, loginValidatePassword } from "@/util/validation";
import { postLogin } from "@/util/api";
import { useNotification } from "@/contexts/NotificationContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useFormValidation } from "@/hooks/useFormValidation";

const SignInForm = () => {
  const initialState = {
    email: "",
    password: "",
  };

  const validationRules = {
    email: validateEmail,
    password: loginValidatePassword,
  };

  const { state, errors, handleChange, handleBlur, validateForm } =
    useFormValidation(initialState, validationRules);
  const { showNotification } = useNotification();
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const body = { email: state.email, password: state.password };

    try {
      const response = await postLogin(body);
      router.push("/");
    } catch (error: any) {
      showNotification(error.message);
    }
  };

  return (
    <div className="m-auto flex h-screen w-[90%] flex-col items-center justify-center gap-[40px]">
      <Link href="/">
        <AuthMainLogo />
      </Link>
      <form onSubmit={handleSignIn} className="w-full max-w-md">
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
          placeholder="8자 이상 작성해 주세요"
          error={!!errors.password}
          errorMessage={errors.password}
          autoComplete="current-password"
        />
        <Button type="submit">로그인 하기</Button>
      </form>
      <p>
        회원이 아니신가요?{" "}
        <Link
          className="text-green-20 underline underline-offset-2"
          href="/signup"
        >
          회원가입하기
        </Link>
      </p>
    </div>
  );
};

export default SignInForm;
