// "use client";
import ApiTest1 from "@/components/test/ApiTest1";
import ApiTest2 from "@/components/test/ApiTest2";
import ColorTest from "@/components/test/ColorTest";
import {
  getMyActivities,
  getMyActivityReservationDashBoard,
  logout,
  postLogin,
} from "@/util/api";
import type { LoginBody, MyActivitiesQuery } from "@/util/apiType";

import React from "react";
import SubButtonTest from "@/components/test/SubButtonTest";
import LogoTest from "@/components/test/LogoTest";
import ActivityManagementCardWrapper from "@/components/activity-management/ActivityManagementCardWrapper";
import LoginTest from "@/components/test/LoginTest";
import { Button } from "flowbite-react";
import ActivityManagementHeader from "@/components/activity-management/ActivityManagementHeader";
import { cookies } from "next/headers";

type Props = {};

const page = async (props: Props) => {
  // const resActivity = await getMyActivities();
  // console.log(resActivity);
  return (
    <>
      {/* <div>accessToken: {res.accessToken}</div>
    <div>refreshToken: {res.refreshToken}</div>
    <div>유저 이메일: {res.user.email}</div>
  <div>유저 닉네임: {res.user.nickname}</div> */}
      {/* <ColorTest /> */}
      <LoginTest />
      {/* <ApiTest1>apiGETFunctionTest</ApiTest1>
    <ApiTest2>apiGETFunctionTest</ApiTest2> */}
      {/* <div className="my-10">
      <SubButtonTest />
      </div>
    <LogoTest /> */}
      <div className="flex items-center justify-center bg-gray-10 py-20">
        <div className="flex w-[768px] flex-col gap-5 px-5">
          <ActivityManagementHeader />
          {/* <span>{token}</span> */}
          <ActivityManagementCardWrapper />
        </div>
      </div>
    </>
  );
};

export default page;
