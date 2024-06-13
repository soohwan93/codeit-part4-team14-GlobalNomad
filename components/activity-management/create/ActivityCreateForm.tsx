"use client";

import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import useDropdownInput from "@/components/common/useDropdownInput";
import React, { FormEvent } from "react";

type Props = {};

const ActivityCreateForm = (props: Props) => {
  const { selected, renderDropdown } = useDropdownInput(
    ["문화 · 예술", "식음료", "스포츠", "투어", "관광", "웰빙"],
    "카테고리",
    null,
  );
  return (
    <>
      <div className="flex flex-col">
        <Label labelText="제목" htmlFor="title">
          <Input
            placeholder="제목"
            id="title"
            name="title"
            // error={error}
            // errorMessage={errorMessage}
            // value={value}
            // disabled={disabled}
            // onFocus={onFocus}
            // onBlur={onBlur}
          />
        </Label>
        <div className="flex flex-col gap-10 pb-10">
          <Label labelText="카테고리" htmlFor="category">
            {renderDropdown()}
            <input type="hidden" name="category" value={selected || ""} />
          </Label>
          <Label labelText="설명" htmlFor="description">
            <textarea
              id="description"
              name="description"
              rows={10}
              className="resize-none rounded-[5px]"
              placeholder="설명"
            ></textarea>
          </Label>
        </div>
        <Label labelText="가격" htmlFor="cost">
          <Input
            placeholder="가격"
            id="cost"
            name="cost"
            // error={error}
            // errorMessage={errorMessage}
            // value={value}
            // disabled={disabled}
            // onFocus={onFocus}
            // onBlur={onBlur}
          />
        </Label>
        <Label labelText="주소" htmlFor="address">
          <Input
            placeholder="주소"
            id="address"
            name="address"
            // error={error}
            // errorMessage={errorMessage}
            // value={value}
            // disabled={disabled}
            // onFocus={onFocus}
            // onBlur={onBlur}
          />
        </Label>
      </div>
    </>
  );
};

export default ActivityCreateForm;
