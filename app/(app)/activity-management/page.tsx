"use client";
import ApiTest1 from "@/components/test/ApiTest1";
import ApiTest2 from "@/components/test/ApiTest2";
import ColorTest from "@/components/test/ColorTest";
import { logout, postLogin } from "@/util/api";
import type { LoginBody } from "@/util/apiType";

import React from "react";

type Props = {};

const page = (props: Props) => {
  const loginTest = async () => {
    const body: LoginBody = {
      email: "test@naver.com",
      password: "qwer1234",
    };
    const res = await postLogin(body);
    console.log(res);
  };

  return (
    <>
      <ColorTest />
      <div onClick={loginTest}>로그인</div>
      <div onClick={logout}>로그아웃</div>
      <ApiTest1>apiGETFunctionTest</ApiTest1>
      <ApiTest2>apiGETFunctionTest</ApiTest2>
    </>
  );
};

export default page;
