"use client";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import useDropdownInput from "@/components/common/useDropdownInput";
import React, { FormEvent } from "react";
import ActivityCreateHeader from "./ActivityCreateHeader";
import ActivityCreateForm from "./ActivityCreateForm";

type Props = {};

const CreateMain = (props: Props) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    // FormData 객체에서 데이터를 가져옴
    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    console.log("title: ", title);
    console.log("category: ", category);
    console.log("description: ", description);
  };
  return (
    <form onSubmit={handleSubmit}>
      <ActivityCreateHeader />
      <ActivityCreateForm />
    </form>
  );
};

export default CreateMain;
