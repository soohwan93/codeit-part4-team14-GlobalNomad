// "use client";
import ApiTest1 from "@/components/test/ApiTest1";
import ApiTest2 from "@/components/test/ApiTest2";
import ColorTest from "@/components/test/ColorTest";
import {
  getMyActivities,
  getMyActivityReservationDashBoard,
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
import ActivityManagementWrapper from "@/components/activity-management/ActivityManagementWrapper";

type Props = {};

const page = async (props: Props) => {
  return (
    <ActivityManagementWrapper>
      <ActivityManagementHeader />
      <ActivityManagementCardWrapper />
    </ActivityManagementWrapper>
  );
};

export default page;
