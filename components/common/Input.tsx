import React, { useState, InputHTMLAttributes } from "react";
import EyeOnSvg from "./svg/EyeOnSvg";
import EyeOffSvg from "./svg/EyeOffSvg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  errorMessage?: string;
}

const Input = ({
  type = "text",
  error,
  errorMessage,
  value,
  placeholder,
  disabled,
  onFocus,
  onBlur,
  ...props
}: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-24 flex-col">
      <div className="relative">
        <input
          type={type === "password" && showPassword ? "text" : type}
          className={`w-full rounded-[5px] border px-5 py-4 ${error ? "border-red-20" : "border-gray-70"} placeholder:text-gray-60 ${type === "password" ? "pr-12" : ""} focus:border-green-20 focus:outline-none disabled:border-slate-200 disabled:bg-slate-50 disabled:text-slate-500 disabled:shadow-none`}
          value={value}
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          disabled={disabled}
          {...props}
        />
        {type === "password" && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <EyeOnSvg /> : <EyeOffSvg />}
          </span>
        )}
      </div>
      <div className="ml-2 mt-2 text-start text-xs font-normal text-red-20">
        {error && <span>{errorMessage}</span>}
      </div>
    </div>
  );
};

export default Input;
