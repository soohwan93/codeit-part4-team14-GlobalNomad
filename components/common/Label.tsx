import React, { InputHTMLAttributes } from "react";

interface Props {
  required?: boolean;
  fontSize?: "lg" | "md";
  htmlFor: string;
  labelText: string;
  children: React.ReactNode;
}
/**
 *
 * @param {"lg" | "md"} fontSize 폰트 사이즈를 설정합니다. lg=24px, md=20px 이며 기본은 md입니다.
 * @param {string} htmlFor label의 htmlFor 속성에 들어갈 값입니다.
 * @param {string} labelText label의 text입니다.
 * @returns
 */
const Label = ({
  required,
  fontSize = "md",
  htmlFor,
  labelText,
  children,
}: Props) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <label
        htmlFor={htmlFor}
        className={`${fontSize === "lg" ? `text-2xl` : `text-xl`} font-bold`}
      >
        {labelText}
        {required && <span className="pl-2 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
};

export default Label;
