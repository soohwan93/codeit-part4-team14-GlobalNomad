"use client";
import { getActivities } from "@/util/api";
import { ActivityQuerys } from "@/util/apiType";
import React from "react";

const ApiTest1 = ({ children }: { children: React.ReactNode }) => {
  const apiGETFunctionTest = async () => {
    const query: ActivityQuerys = {
      method: "offset",
    };
    const res = await getActivities(query);
    console.log(res);
  };
  return <div onClick={apiGETFunctionTest}>{children}</div>;
};

export default ApiTest1;
