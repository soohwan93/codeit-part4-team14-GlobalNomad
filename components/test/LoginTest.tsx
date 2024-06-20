"use client";
import { getMyActivityReservationDashBoard, postLogin } from "@/util/api";
import { LoginBody } from "@/util/apiType";
import React from "react";

type Props = {};

const LoginTest = (props: Props) => {
  const loginTest = async () => {
    const body: LoginBody = {
      email: "test@naver.com",
      password: "qwer1234",
    };
    const res = await postLogin(body);
    console.log(res);
  };
  const testReservation = async () => {
    const resResDashboard = await getMyActivityReservationDashBoard(953, {
      month: "12",
      year: 2024,
    });
    console.log(resResDashboard);
  };
  return (
    <>
      {" "}
      <div onClick={loginTest}>로그인</div>
      <div onClick={testReservation}>체험 예약 목록</div>
    </>
  );
};

export default LoginTest;
