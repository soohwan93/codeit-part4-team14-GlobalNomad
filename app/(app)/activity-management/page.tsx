"use client";
import useDropdownInput from "@/components/common/useDropdownInput";
import ColorTest from "@/components/test/ColorTest";
import React from "react";

const Page = () => {
  const { selected, renderDropdown } = useDropdownInput(["a", "b", "c"], null);
  return <div className="h-screen">a{renderDropdown()}a</div>;
};

export default Page;
